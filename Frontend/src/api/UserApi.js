import Api from "./Api";

const url = "/users";

const existsByEmail = (email) => {
  return Api.get(`${url}/email/${email}`);
};
const existsByUsername = (username) => {
  return Api.get(`${url}/userName/${username}`);
};
const existsByPhone = (phone) => {
  return Api.get(`${url}/phone/${phone}`);
};

const create = (
  username,
  email,
  password,
  phone,
  firstname,
  lastname,
  address
) => {
  const body = {
    userName: username,
    email: email,
    password: password,
    phone: phone,
    firstName: firstname,
    lastName: lastname,
    address: address,
  };
  return Api.post(url, body);
};

const resendEmailToActiveAccount = (email) => {
  const requestParams = {
    email: email,
  };

  return Api.get(`${url}/userRegistrationConfirmRequest`, {
    params: requestParams,
  });
};

const requestResetPassword = (email) => {
  const requestParams = {
    email: email,
  };

  return Api.get(`${url}/resetPasswordRequest`, { params: requestParams });
};

const resendEmailToResetPassword = (email) => {
  const requestParams = {
    email: email,
  };

  return Api.get(`${url}/resendResetPassword`, { params: requestParams });
};

const resetPassword = (token, newPassword) => {
  const requestParams = {
    token: token,
    newPassword: newPassword,
  };

  return Api.get(`${url}/resetPassword`, { params: requestParams });
};

const getProfile = () => {
  return Api.get(`${url}/profile`);
};

const changeProfile = (avatarUrl) => {
  const body = {
    avatarUrl: avatarUrl,
  };
  return Api.put(`${url}/profile`, body);
};

// export
const api = {
  existsByEmail,
  existsByPhone,
  existsByUsername,
  create,
  resendEmailToActiveAccount,
  requestResetPassword,
  resendEmailToResetPassword,
  resetPassword,
  getProfile,
  changeProfile,
};
export default api;
