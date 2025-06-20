import React from 'react';
import './MyProfile.css';

const MyProfile = () => {
  const user = {
    name: 'Juan Pérez',
    email: 'juanperez@email.com',
    bio: 'Desarrollador web apasionado por React y el diseño UX.',
    avatar: 'https://via.placeholder.com/150' // Puedes reemplazar con una URL real
  };

  return (
    <div className="profile-container">
      <img src={user.avatar} alt="Avatar" className="profile-avatar" />
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Biografía:</strong> {user.bio}</p>
    </div>
  );
};

export default MyProfile;
