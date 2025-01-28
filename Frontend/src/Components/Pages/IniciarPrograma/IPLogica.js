import { useState } from "react";

const useIniciarPrograma = () => {
  const [modo, setModo] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [elementos, setElementos] = useState({});
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [error, setError] = useState("");
  const [mostrarPanel, setMostrarPanel] = useState(false);

  const iniciarPrograma = () => {
    setModo("iniciar");
    alert("Programa iniciado exitosamente.");
  };

  const abrirAdministrarPublicidad = () => {
    setModo("administrar");
  };

  const validarPublicidad = () => {
    // Comprueba si hay elementos en las categorías.
    return categorias.some((categoria) => elementos[categoria]?.length > 0);
  };

  const agregarCategoria = () => {
    const nuevaCategoria = prompt("Introduce el nombre de la nueva categoría:");
    if (nuevaCategoria && !categorias.includes(nuevaCategoria)) {
      setCategorias([...categorias, nuevaCategoria]);
      setElementos({ ...elementos, [nuevaCategoria]: [] });
      setError("");
    } else {
      setError("El nombre de la categoría es inválido o ya existe.");
    }
  };

  const editarCategoria = (categoria) => {
    const nuevoNombre = prompt("Introduce el nuevo nombre para la categoría:", categoria);
    if (nuevoNombre && !categorias.includes(nuevoNombre)) {
      const nuevasCategorias = categorias.map((cat) =>
        cat === categoria ? nuevoNombre : cat
      );
      const nuevosElementos = { ...elementos };
      nuevosElementos[nuevoNombre] = nuevosElementos[categoria];
      delete nuevosElementos[categoria];
      setCategorias(nuevasCategorias);
      setElementos(nuevosElementos);
      setCategoriaSeleccionada(nuevoNombre);
      setError("");
    } else {
      setError("El nombre de la categoría es inválido o ya existe.");
    }
  };

  const eliminarCategoria = () => {
    if (window.confirm(`¿Estás seguro de eliminar la categoría "${categoriaSeleccionada}"?`)) {
      const nuevasCategorias = categorias.filter((cat) => cat !== categoriaSeleccionada);
      const nuevosElementos = { ...elementos };
      delete nuevosElementos[categoriaSeleccionada];
      setCategorias(nuevasCategorias);
      setElementos(nuevosElementos);
      setCategoriaSeleccionada("");
      setError("");
    }
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setError("");
  };

  const agregarElemento = (categoria, archivos) => {
    if (archivos && archivos.length) {
      const nuevosArchivos = Array.from(archivos);
      setElementos({
        ...elementos,
        [categoria]: [...(elementos[categoria] || []), ...nuevosArchivos],
      });
      setError("");
    } else {
      setError("No se seleccionaron archivos válidos.");
    }
  };

  const eliminarElemento = (categoria, archivo) => {
    if (
      window.confirm(`¿Estás seguro de eliminar este archivo? (${archivo.name})`)
    ) {
      setElementos({
        ...elementos,
        [categoria]: elementos[categoria].filter((item) => item !== archivo),
      });
      cerrarPanel();
    }
  };

  const seleccionarArchivo = (archivo) => {
    setArchivoSeleccionado(archivo);
    setMostrarPanel(true);
  };

  const cerrarPanel = () => {
    setArchivoSeleccionado(null);
    setMostrarPanel(false);
  };

  const volverAlEstadoBase = () => {
    setModo("");
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
    validarPublicidad
  };
};

export default useIniciarPrograma;
