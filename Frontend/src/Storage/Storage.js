const isRememberMe = () => {
  if (
    localStorage.getItem("isRememberMe") !== null &&
    localStorage.getItem("isRememberMe") !== undefined
  ) {
    // convert string to boolean and return result
    return JSON.parse(localStorage.getItem("isRememberMe"));
  }
  return true;
};

const setRememberMe = (isRememberMe) => {
  localStorage.setItem("isRememberMe", isRememberMe);
};

const setItem = (key, value) => {
  if (isRememberMe()) {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
};
const setItemToSession = (key, value) => {
  sessionStorage.setItem(key, value);
};
const getItem = (key) => {
  if (isRememberMe()) {
    return localStorage.getItem(key);
  }
  return sessionStorage.getItem(key);
};

const removeItem = (key) => {
  if (isRememberMe()) {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};
const removeIteminSession = (key) => {
  sessionStorage.removeItem(key);
};

const setToken = (token) => {
  setItem("token", token);
};

const removeToken = () => {
  removeItem("token");
};

const getToken = () => {
  return getItem("token");
};

const isAuth = () => {
  return getToken() !== null && getToken() !== undefined;
};

const setUserInfo = (user) => {
  setItem("firstName", user.firstName);
  setItem("lastName", user.lastName);
  setItem("userName", user.userName);
  setItem("email", user.email);
  setItem("role", user.role);
  setItem("status", user.status);
};

const setEquipmentInfo = (user) => {
  setItemToSession("equipmentId", user.equipmentId);
  setItemToSession("equipmentName", user.equipmentName);
  setItemToSession("classify", user.classify);
  setItemToSession("description", user.description);
  setItemToSession("brand", user.brand);
  setItemToSession("staffName", user.staffName);
  setItemToSession("insurance", user.insurance);
  setItemToSession("equipmentStatus", user.equipmentStatus);
};

const removeEquipmentInfo = () => {
  removeIteminSession("equipmentId");
  removeIteminSession("equipmentName");
  removeIteminSession("classify");
  removeIteminSession("description");
  removeIteminSession("brand");
  removeIteminSession("staffName");
  removeIteminSession("insurance");
  removeIteminSession("equipmentStatus");
  removeIteminSession("unitPrice");
  removeIteminSession("quantity");
};
const getUserInfo = () => {
  return {
    firstName: getItem("firstName"),
    lastName: getItem("lastName"),
    userName: getItem("userName"),
    email: getItem("email"),
    role: getItem("role"),
    status: getItem("status"),
  };
};

const removeUserInfo = () => {
  removeItem("firstName");
  removeItem("lastName");
  removeItem("userName");
  removeItem("email");
  removeItem("role");
  removeItem("status");
};

// export
const Storage = {
  isRememberMe,
  setRememberMe,
  setToken,
  getToken,
  removeToken,
  isAuth,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  setEquipmentInfo,
  removeEquipmentInfo,
  getItem,
};
export default Storage;
