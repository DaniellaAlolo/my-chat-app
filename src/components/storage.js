// Spara data till localStorage
export const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// Hämta data från localStorage
export const getFromSessionStorage = (key) => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// Ta bort data från localStorage
export const removeFromSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

// Spara JWT-token
export const saveToken = (token) => {
  saveToSessionStorage("token", token);
};

// Hämta JWT-token
export const getToken = () => {
  return getFromSessionStorage("token");
};

// Ta bort JWT-token
export const removeToken = () => {
  removeFromSessionStorage("token");
};

// Spara användardata
export const saveDecodedUserData = (userData) => {
  saveToSessionStorage("userData", JSON.stringify(userData));
};

// Hämta användardata
export const getUserData = () => {
  return getFromSessionStorage("userData");
};

// Ta bort användardata
export const removeUserData = () => {
  removeFromSessionStorage("userData");
};
