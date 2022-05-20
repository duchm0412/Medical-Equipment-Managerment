import Api from "./Api";
const url = "/Fbtoken";
const getFbToken = () => {
  return Api.get(`${url}`);
};

// export
const FacebookApi = { getFbToken };
export default FacebookApi;
