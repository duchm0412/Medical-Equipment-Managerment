import Api from "./Api";

const url = "/departments";
// GET
const getAll = (page, size) => {
  const requestParams = {
    page,
    size,
  };
  return Api.get(url, { params: requestParams });
};
const getAllNotPaging = () => {
  return Api.get(url);
};
//DELETE
const deleteById = (id) => {
  return Api.delete(`${url}/${id}`);
};
//CREATE
const create = (departmentId, departmentName, description, manager, status) => {
  const body = {
    departmentId: departmentId,
    departmentName: departmentName,
    description: description,
    manager: manager,
    status: status,
  };
  return Api.post(url, body);
};
//Checkexist
const existsByDepartmentId = (id) => {
  return Api.get(`${url}/checkid/${id}`);
};
const existsByDepartmentName = (name) => {
  return Api.get(`${url}/checkname/${name}`);
};
//Update
const update = (departmentId, departmentName, description, manager, status) => {
  const body = {
    departmentId: departmentId,
    departmentName: departmentName,
    description: description,
    manager: manager,
    status: status,
  };
  return Api.put(url, body);
};
// Get like name
const getLikeName = (name) => {
  return Api.get(`${url}/likename/${name}`);
};
// export
const api = {
  getAll,
  deleteById,
  create,
  existsByDepartmentId,
  existsByDepartmentName,
  update,
  getLikeName,
  getAllNotPaging,
};
export default api;
