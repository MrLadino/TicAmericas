import React, { useState } from 'react';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    company: 'TIC Americas',
    profilePhoto: 'https://via.placeholder.com/150',
    companyPhoto: 'https://via.placeholder.com/150',
    description: 'Desarrollador Full Stack en TIC Americas.',
    phone: '123-456-7890',
    position: 'Desarrollador',
    address: 'Calle Ficticia 123, Ciudad Ejemplo',
    birthDate: '1990-01-01',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/juanperez',
      twitter: 'https://twitter.com/juanperez',
      github: 'https://github.com/juanperez',
    },
    companyInfo: {
      companyName: 'TIC Americas',
      companyDescription: 'Empresa dedicada a la tecnología y desarrollo de software.',
      companyLocation: 'Calle Ficticia 123, Ciudad Ejemplo',
      companyPhone: '987-654-3210',
      companyWebsite: 'https://ticamericas.com',
    },
    connectedUsers: [
      { name: 'Carlos López', profilePhoto: 'https://via.placeholder.com/50' },
      { name: 'Ana García', profilePhoto: 'https://via.placeholder.com/50' },
      { name: 'Pedro Ruiz', profilePhoto: 'https://via.placeholder.com/50' },
    ],
  });

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUserInfo({ ...userInfo, [name]: URL.createObjectURL(files[0]) });
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios, como una API o localStorage
    alert('Cambios guardados exitosamente.');
    setEditing(false);
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Perfil del usuario (izquierda) */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Mi Perfil</h2>
        <div className="flex items-center space-x-6">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img
              src={userInfo.profilePhoto}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            {editing ? (
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 mb-4"
              />
            ) : (
              <button
                onClick={handleEdit}
                className="text-black hover:underline mb-4"
              >
                Editar perfil
              </button>
            )}
            <h3 className="text-xl font-semibold text-gray-800">{userInfo.name}</h3>
            <p className="text-gray-600">{userInfo.email}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800">Información adicional</h4>
          <div className="mt-4">
            <label className="block text-sm text-gray-600">Descripción</label>
            {editing ? (
              <textarea
                name="description"
                value={userInfo.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2"
              />
            ) : (
              <p className="text-gray-700">{userInfo.description}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-600">Teléfono</label>
            {editing ? (
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2"
              />
            ) : (
              <p className="text-gray-700">{userInfo.phone}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-600">Posición</label>
            {editing ? (
              <input
                type="text"
                name="position"
                value={userInfo.position}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2"
              />
            ) : (
              <p className="text-gray-700">{userInfo.position}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-600">Dirección</label>
            {editing ? (
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2"
              />
            ) : (
              <p className="text-gray-700">{userInfo.address}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-600">Fecha de nacimiento</label>
            {editing ? (
              <input
                type="date"
                name="birthDate"
                value={userInfo.birthDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 mt-2"
              />
            ) : (
              <p className="text-gray-700">{userInfo.birthDate}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-600">Enlaces de redes sociales</label>
            <div className="space-y-2 mt-2">
              {['linkedin', 'twitter', 'github'].map((platform) => (
                <div key={platform}>
                  {editing ? (
                    <input
                      type="url"
                      name={`socialLinks.${platform}`}
                      value={userInfo.socialLinks[platform]}
                      onChange={handleChange}
                      placeholder={`Enlace a ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                      className="w-full border border-gray-300 p-2"
                    />
                  ) : (
                    <p className="text-gray-700">{userInfo.socialLinks[platform]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {editing && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Hecho
              </button>
              <button
                onClick={handleEdit}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Información de la empresa (derecha) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Información de la Empresa</h3>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Nombre de la empresa</label>
          {editing ? (
            <input
              type="text"
              name="companyInfo.companyName"
              value={userInfo.companyInfo.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mt-2"
            />
          ) : (
            <p className="text-gray-700">{userInfo.companyInfo.companyName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Descripción</label>
          {editing ? (
            <textarea
              name="companyInfo.companyDescription"
              value={userInfo.companyInfo.companyDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mt-2"
            />
          ) : (
            <p className="text-gray-700">{userInfo.companyInfo.companyDescription}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Ubicación</label>
          {editing ? (
            <input
              type="text"
              name="companyInfo.companyLocation"
              value={userInfo.companyInfo.companyLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mt-2"
            />
          ) : (
            <p className="text-gray-700">{userInfo.companyInfo.companyLocation}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Teléfono</label>
          {editing ? (
            <input
              type="text"
              name="companyInfo.companyPhone"
              value={userInfo.companyInfo.companyPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mt-2"
            />
          ) : (
            <p className="text-gray-700">{userInfo.companyInfo.companyPhone}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Sitio web</label>
          {editing ? (
            <input
              type="url"
              name="companyInfo.companyWebsite"
              value={userInfo.companyInfo.companyWebsite}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 mt-2"
            />
          ) : (
            <p className="text-gray-700">{userInfo.companyInfo.companyWebsite}</p>
          )}
        </div>

        {editing && (
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Hecho
            </button>
            <button
              onClick={handleEdit}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Parte de usuarios conectados */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Usuarios Conectados</h3>
        <div className="space-y-4">
          {userInfo.connectedUsers.map((user, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-800">{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
