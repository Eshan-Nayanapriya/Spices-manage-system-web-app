import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [role, setRole] = useState(sessionStorage.getItem('role') || ''); // New state for the role

  console.log(role)
  console.log(token)
  const Token = Boolean(token);

  return (
    <AdminContext.Provider value={{ Token, setToken, role, setRole }}> {/* Include role and setRole in the context */}
      {children}
    </AdminContext.Provider>
  );
};
