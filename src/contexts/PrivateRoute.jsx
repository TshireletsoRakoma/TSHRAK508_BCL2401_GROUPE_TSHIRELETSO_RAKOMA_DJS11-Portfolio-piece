import React from 'react'; // Importing React library for JSX syntax
import { Navigate } from 'react-router-dom'; // Importing Navigate component from react-router-dom for redirection
import { useAuth } from './AuthContext'; // Importing useAuth hook from AuthContext for authentication

const PrivateRoute = ({ children }) => { // Defining PrivateRoute component, accepting children as props
  const { user } = useAuth(); // Destructuring user from useAuth hook to check authentication

  // If user is not authenticated, redirect to login page using Navigate component
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children components
  return children;
};

export default PrivateRoute; // Exporting PrivateRoute component as default
