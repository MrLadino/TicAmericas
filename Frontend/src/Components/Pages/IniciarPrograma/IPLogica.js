// Frontend/src/Components/Pages/IniciarPrograma/IPLogica.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useIniciarPrograma = () => {
  const navigate = useNavigate();

  const [modo, setModo] = useState(""); // "administrar" | "iniciar"
  // categorías = [{ id: 1, name: 'Electrónica' }, ...]
  const [categorias, setCategorias] = useState([]);
  // elementos = { "Electrónica": [{file_id, file_name, file_url, file_type}, ...], ... }
  const [elementos, setElementos] = useState({});
  // categoría seleccionada = { id, name } o null
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [error, setError] = useState("");
  const [mostrarPanel, setMostrarPanel] = useState(false);

  // 1. Cargar categorías y archivos al montar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/advertising", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener publicidad");
        return res.json();
      })
      .then((data) => {
        // data: array de categorías con { category_id, name, user_id, files: [...] }
        const cats = data.map((cat) => ({
          id: cat.category_id,
          name: cat.name,
        }));
        setCategorias(cats);

        // Construimos "elementos"
        const tempElementos = {};
        data.forEach((cat) => {
          tempElementos[cat.name] = cat.files || [];
        });
        setElementos(tempElementos);

        // Seleccionar primera si no hay nada
        if (cats.length > 0 && !categoriaSeleccionada) {
          setCategoriaSeleccionada(cats[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching advertising:", err);
      });
  }, []);

  // 2. Validar que exista al menos una categoría con archivos
  const validarPublicidad = () => {
    return Object.keys(elementos).some((catName) => {
      const arr = elementos[catName];
      return arr && arr.length > 0;
    });
  };

  // 3. Iniciar programa => redirige a /programa
  const iniciarPrograma = () => {
    if (validarPublicidad()) {
      setModo("iniciar");
      navigate("/programa");
    } else {
      alert("Debes configurar al menos una categoría con imágenes o videos antes de iniciar.");
    }
  };

  // 4. Abrir panel de administración
  const abrirAdministrarPublicidad = () => {
    setModo("administrar");
  };

  // 5. Crear nueva categoría
  const agregarCategoria = async () => {
    const nuevaCategoria = prompt("Introduce el nombre de la nueva categoría:");
    if (!nuevaCategoria) return;

    // Chequear si ya existe localmente
    if (categorias.some((c) => c.name === nuevaCategoria)) {
      setError("El nombre de la categoría ya existe localmente.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:5000/api/advertising/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: nuevaCategoria }),
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || "Error al crear categoría");
      }
      const data = await resp.json(); 
      // data = { message, category_id, name }

      // Actualizar estado local
      setCategorias((prev) => [
        ...prev,
        { id: data.category_id, name: data.name },
      ]);
      setElementos((prev) => ({ ...prev, [data.name]: [] }));

      // Seleccionar la nueva
      setCategoriaSeleccionada({ id: data.category_id, name: data.name });
      setError("");
    } catch (error) {
      console.error("Error al crear categoría:", error);
      setError(error.message);
    }
  };

  // 6. Editar categoría
  const editarCategoria = async (catId) => {
    const catObj = categorias.find((c) => c.id === Number(catId));
    if (!catObj) return;

    const nuevoNombre = prompt(
      "Introduce el nuevo nombre para la categoría:",
      catObj.name
    );
    if (!nuevoNombre) return;

    // Si ya existe localmente
    if (categorias.some((c) => c.name === nuevoNombre)) {
      setError("Ya existe otra categoría con ese nombre en tu estado local.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(
        `http://localhost:5000/api/advertising/category/${catObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: nuevoNombre }),
        }
      );
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || "Error al editar categoría");
      }
      // Actualizar estado local
      // 1) Actualizar la lista "categorias"
      const nuevas = categorias.map((c) =>
        c.id === catObj.id ? { ...c, name: nuevoNombre } : c
      );
      setCategorias(nuevas);

      // 2) Renombrar key en "elementos"
      const copiaElementos = { ...elementos };
      copiaElementos[nuevoNombre] = copiaElementos[catObj.name];
      delete copiaElementos[catObj.name];
      setElementos(copiaElementos);

      // 3) Actualizar categoriaSeleccionada
      setCategoriaSeleccionada({ id: catObj.id, name: nuevoNombre });
      setError("");
    } catch (error) {
      console.error("Error al editar categoría:", error);
      setError(error.message);
    }
  };

  // 7. Eliminar categoría
  const eliminarCategoria = async (catId) => {
    const catObj = categorias.find((c) => c.id === Number(catId));
    if (!catObj) return;

    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${catObj.name}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(
        `http://localhost:5000/api/advertising/category/${catObj.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || "Error al eliminar categoría");
      }

      // Actualizar estado local
      const nuevas = categorias.filter((c) => c.id !== catObj.id);
      setCategorias(nuevas);

      const copiaElementos = { ...elementos };
      delete copiaElementos[catObj.name];
      setElementos(copiaElementos);

      // Seleccionar otra si queda
      if (nuevas.length > 0) {
        setCategoriaSeleccionada(nuevas[0]);
      } else {
        setCategoriaSeleccionada(null);
      }

      setError("");
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      setError(error.message);
    }
  };

  // 8. Seleccionar categoría
  const seleccionarCategoria = (catId) => {
    const obj = categorias.find((c) => c.id === Number(catId));
    if (obj) {
      setCategoriaSeleccionada(obj);
      setError("");
    }
  };

  // 9. Subir archivos (imágenes/videos)
  const agregarElemento = async (catName, files) => {
    if (!files || files.length === 0) {
      setError("No se seleccionaron archivos válidos.");
      return;
    }
    // catObj
    const catObj = categorias.find((c) => c.name === catName);
    if (!catObj) {
      setError("Categoría no encontrada en el estado local.");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", catObj.id);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "video/mp4",
        "video/webm",
      ];
      if (!validTypes.includes(file.type)) {
        alert(`Archivo "${file.name}" no permitido. Solo imágenes o videos.`);
        continue;
      }
      formData.append("files", file);
    }

    try {
      const token = localStorage.getItem("token");
      const resp = await fetch("http://localhost:5000/api/advertising/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.message || "Error al subir archivos");
      }
      const data = await resp.json();
      console.log("Archivos subidos:", data);

      // Recargar la publicidad
      const resp2 = await fetch("http://localhost:5000/api/advertising", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newData = await resp2.json();

      const cats = newData.map((cat) => ({
        id: cat.category_id,
        name: cat.name,
      }));
      setCategorias(cats);

      const tempElementos = {};
      newData.forEach((cat) => {
        tempElementos[cat.name] = cat.files || [];
      });
      setElementos(tempElementos);

      // Re-seleccionar la misma categoría
      const sameCat = cats.find((c) => c.id === catObj.id);
      if (sameCat) {
        setCategoriaSeleccionada(sameCat);
      }
      setError("");
    } catch (error) {
      console.error("Error al subir archivos:", error);
      setError(error.message);
    }
  };

  // 10. Eliminar un archivo (imagen o video) REAL en BD
  const eliminarElemento = async (catName, archivo) => {
    if (
      !window.confirm(
        `¿Estás seguro de eliminar este archivo? (${archivo.file_name || archivo.name})`
      )
    ) {
      return;
    }

    // Si es un archivo que ya existe en la BD => tiene file_id
    if (archivo.file_id) {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch(
          `http://localhost:5000/api/advertising/file/${archivo.file_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!resp.ok) {
          const errData = await resp.json();
          throw new Error(errData.message || "Error al eliminar archivo");
        }
        // Una vez borrado en BD, actualizamos estado local
        const copia = { ...elementos };
        copia[catName] = copia[catName].filter(
          (item) => item.file_id !== archivo.file_id
        );
        setElementos(copia);
        cerrarPanel();
        setError("");
      } catch (error) {
        console.error("Error al eliminar archivo:", error);
        setError(error.message);
      }
    } else {
      // Era un archivo local no subido
      const copia = { ...elementos };
      copia[catName] = copia[catName].filter(
        (item) =>
          (item.file_name || item.name) !== (archivo.file_name || archivo.name)
      );
      setElementos(copia);
      cerrarPanel();
    }
  };

  // 11. Seleccionar archivo para panel
  const seleccionarArchivo = (archivo) => {
    setArchivoSeleccionado(archivo);
    setMostrarPanel(true);
  };

  const cerrarPanel = () => {
    setArchivoSeleccionado(null);
    setMostrarPanel(false);
  };

  // 12. "Hecho": vuelve al modo "administrar"
  const volverAlEstadoBase = () => {
    setModo("administrar");
    setError("");
  };

  return {
    modo,
    categorias,
    elementos,
    categoriaSeleccionada,
    error,
    archivoSeleccionado,
    mostrarPanel,
    iniciarPrograma,
    abrirAdministrarPublicidad,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
    seleccionarCategoria,
    agregarElemento,
    eliminarElemento,
    seleccionarArchivo,
    cerrarPanel,
    volverAlEstadoBase,
    validarPublicidad,
  };
};

export default useIniciarPrograma;
