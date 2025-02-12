// Profile.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { authenticated } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    description: "",
    phone: "",
    profile_photo: "",
    companyName: "",
    companyDescription: "",
    companyLocation: "",
    companyPhone: "",
    companyPhoto: "",
    companyContact: "", // Campo adicional (si en algún momento lo necesitas)
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (authenticated) {
      axios
        .get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const data = response.data;
          setProfileData({
            name: data?.name || "",
            email: data?.email || "",
            description: data?.description || "",
            phone: data?.phone || "",
            profile_photo: data?.profile_photo || "",
            companyName: data?.companyName || "",
            companyDescription: data?.companyDescription || "",
            companyLocation: data?.companyLocation || "",
            companyPhone: data?.companyPhone || "",
            companyPhoto: data?.companyPhoto || "",
            companyContact: data?.companyContact || "",
          });
          setLoading(false);
        })
        .catch(() => {
          setError("Error al cargar los datos del perfil");
          setLoading(false);
        });
    }
  }, [authenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const token = localStorage.getItem("token");
      axios
        .post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfileData((prevData) => ({
            ...prevData,
            [name]: res.data.fileUrl, // Guarda la URL devuelta por el backend
          }));
        })
        .catch(() => {
          setError("Error al subir la imagen");
        });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:5000/api/profile", profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Perfil actualizado con éxito");
      setEditing(false);
    } catch {
      setError("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setEditing((prev) => !prev);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mt-24 mx-auto p-6">
      <h2 className="text-4xl font-bold text-red-600 mb-6 text-center">Mi Perfil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Perfil de usuario */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="flex items-center justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl">
              <img
                src={
                  profileData.profile_photo.startsWith("http")
                    ? profileData.profile_photo
                    : `http://localhost:5000${profileData.profile_photo}`
                }
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {editing && (
            <div className="mt-4 text-center">
              <label className="cursor-pointer bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                Cambiar Imagen
                <input type="file" name="profile_photo" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          )}
          <div className="mt-6">
            <label className="text-lg font-semibold text-gray-800">Nombre:</label>
            {editing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-700">{profileData.name}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold text-gray-800">Email:</label>
            <p className="text-gray-700">{profileData.email}</p>
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold text-gray-800">Descripción:</label>
            {editing ? (
              <textarea
                name="description"
                value={profileData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-700">{profileData.description}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold text-gray-800">Teléfono:</label>
            {editing ? (
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-700">{profileData.phone}</p>
            )}
          </div>
        </div>

        {/* Información de la Empresa */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Empresa</h2>
          <div className="flex items-center justify-center">
            <div className="w-40 h-40 rounded-md overflow-hidden shadow-xl">
              <img
                src={
                  profileData.companyPhoto.startsWith("http")
                    ? profileData.companyPhoto
                    : `http://localhost:5000${profileData.companyPhoto}`
                }
                alt="Foto de la empresa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {editing && (
            <div className="mt-4 text-center">
              <label className="cursor-pointer bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                Cambiar Imagen
                <input type="file" name="companyPhoto" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          )}
          <div className="mt-6">
            <label className="text-lg font-semibold">Nombre:</label>
            {editing ? (
              <input
                type="text"
                name="companyName"
                value={profileData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500 text-black"
              />
            ) : (
              <p>{profileData.companyName}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold">Descripción:</label>
            {editing ? (
              <textarea
                name="companyDescription"
                value={profileData.companyDescription}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500 text-black"
              />
            ) : (
              <p>{profileData.companyDescription}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold">Ubicación:</label>
            {editing ? (
              <input
                type="text"
                name="companyLocation"
                value={profileData.companyLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500 text-black"
              />
            ) : (
              <p>{profileData.companyLocation}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold">Teléfono:</label>
            {editing ? (
              <input
                type="text"
                name="companyPhone"
                value={profileData.companyPhone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500 text-black"
              />
            ) : (
              <p>{profileData.companyPhone}</p>
            )}
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold">Contacto:</label>
            {editing ? (
              <input
                type="text"
                name="companyContact"
                value={profileData.companyContact}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500 text-black"
              />
            ) : (
              <p>{profileData.companyContact}</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button onClick={editing ? handleSave : handleEdit} className="bg-red-600 text-white py-2 px-4 rounded-md w-full hover:bg-red-700">
          {editing ? "Guardar" : "Editar Perfil"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
