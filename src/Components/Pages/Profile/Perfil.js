import { useState } from "react";

export const useProfile = () => {
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    company: "TIC Americas",
    profilePhoto: "https://via.placeholder.com/150",
    companyPhoto: "https://via.placeholder.com/150",
    description: "Desarrollador Full Stack en TIC Americas.",
    phone: "123-456-7890",
    position: "Desarrollador",
    address: "Calle Ficticia 123, Ciudad Ejemplo",
    birthDate: "1990-01-01",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/juanperez",
      twitter: "https://twitter.com/juanperez",
      github: "https://github.com/juanperez",
    },
    companyInfo: {
      companyName: "TIC Americas",
      companyDescription: "Empresa dedicada a la tecnología y desarrollo de software.",
      companyLocation: "Calle Ficticia 123, Ciudad Ejemplo",
      companyPhone: "987-654-3210",
      companyWebsite: "https://ticamericas.com",
    },
    connectedUsers: [
      { name: "Carlos López", profilePhoto: "https://via.placeholder.com/50" },
      { name: "Ana García", profilePhoto: "https://via.placeholder.com/50" },
      { name: "Pedro Ruiz", profilePhoto: "https://via.placeholder.com/50" },
    ],
  });

  const handleEdit = () => setEditing(!editing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => {
      const keys = name.split(".");
      if (keys.length > 1) {
        return {
          ...prevInfo,
          [keys[0]]: { ...prevInfo[keys[0]], [keys[1]]: value },
        };
      }
      return { ...prevInfo, [name]: value };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: URL.createObjectURL(files[0]),
    }));
  };

  const handleSave = () => {
    alert("Cambios guardados exitosamente.");
    setEditing(false);
  };

  return {
    editing,
    userInfo,
    handleEdit,
    handleChange,
    handleFileChange,
    handleSave,
  };
};
