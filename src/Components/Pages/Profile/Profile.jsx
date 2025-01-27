import { useProfile } from "./Perfil";

const Profile = () => {
  const {
    editing,
    userInfo,
    handleEdit,
    handleChange,
    handleFileChange,
    handleSave,
  } = useProfile();

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Perfil de usuario a la izquierda */}
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-4xl font-bold text-red-600 mb-6">Mi Perfil</h2>
          
          {/* Foto de perfil */}
          <div className="flex items-center space-x-6">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl">
              <img
                src={userInfo.profilePhoto}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {editing && (
            <div className="mt-4 text-center">
              <label
                htmlFor="profile-photo-upload"
                className="cursor-pointer bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Imagen
              </label>
              <input
                type="file"
                id="profile-photo-upload"
                name="profilePhoto"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {/* Información del usuario */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800">Nombre del usuario</h4>
            <div className="mt-4">
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
                />
              ) : (
                <p className="text-gray-700">{userInfo.name}</p>
              )}
            </div>
          </div>

          {/* Información adicional del usuario */}
          <h4 className="text-lg font-semibold text-gray-800 mt-6">Información adicional</h4>
          <div className="mt-4">
            <label className="block text-sm text-gray-600">Descripción</label>
            {editing ? (
              <textarea
                name="description"
                value={userInfo.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-700">{userInfo.description}</p>
            )}
          </div>

          {/* Información de contacto del usuario */}
          <div className="mt-4">
            <label className="block text-sm text-gray-600">Teléfono</label>
            {editing ? (
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-700">{userInfo.phone}</p>
            )}
          </div>
        </div>

        {/* Perfil de la empresa debajo del perfil del usuario */}
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-4xl font-bold text-red-600 mb-6">Información de la Empresa</h2>

          {/* Nombre de la empresa */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Nombre de la empresa</h4>
            <div className="mt-4">
              {editing ? (
                <input
                  type="text"
                  name="companyInfo.companyName"
                  value={userInfo.companyInfo.companyName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
                />
              ) : (
                <p className="text-gray-200">{userInfo.companyInfo.companyName}</p>
              )}
            </div>
          </div>

          {/* Foto de la empresa */}
          <div className="mt-6">
            <label className="block text-sm text-gray-300">Foto de la Empresa</label>
            <div className="flex items-center space-x-6">
              <div className="w-full h-40 rounded-md overflow-hidden shadow-xl">
                <img
                  src={userInfo.companyPhoto}
                  alt="Foto de la empresa"
                  className="w-full h-full object-cover"
                />
              </div>
              {editing && (
                <div className="mt-4 text-center">
                  <label
                    htmlFor="company-photo-upload"
                    className="cursor-pointer bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Imagen
                  </label>
                  <input
                    type="file"
                    id="company-photo-upload"
                    name="companyPhoto"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Descripción de la empresa */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Descripción de la empresa</h4>
            <div className="mt-4">
              {editing ? (
                <textarea
                  name="companyInfo.companyDescription"
                  value={userInfo.companyInfo.companyDescription}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
                />
              ) : (
                <p className="text-gray-200">{userInfo.companyInfo.companyDescription}</p>
              )}
            </div>
          </div>

          {/* Ubicación de la empresa */}
          <div className="mt-4">
            <label className="block text-sm text-gray-300">Ubicación de la empresa</label>
            {editing ? (
              <input
                type="text"
                name="companyInfo.companyLocation"
                value={userInfo.companyInfo.companyLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-200">{userInfo.companyInfo.companyLocation}</p>
            )}
          </div>

          {/* Teléfono de la empresa */}
          <div className="mt-4">
            <label className="block text-sm text-gray-300">Teléfono de la empresa</label>
            {editing ? (
              <input
                type="text"
                name="companyInfo.companyPhone"
                value={userInfo.companyInfo.companyPhone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2 rounded-md focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-200">{userInfo.companyInfo.companyPhone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Botón de Editar/Hecho debajo de la información de la empresa */}
      <div className="w-full mt-8">
        <button
          onClick={editing ? handleSave : handleEdit}
          className="bg-red-600 text-white py-2 px-4 rounded-md w-full hover:bg-red-700"
        >
          {editing ? "Hecho" : "Editar perfil"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
