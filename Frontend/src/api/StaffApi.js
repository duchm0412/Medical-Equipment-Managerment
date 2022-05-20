import Api from "./Api";

const url = "/staffs";
// Tìm nhân viên qua email
const findStaffByEmail = (email) => {
  return Api.get(`${url}/${email}`);
};
// Tìm nhân viên qua departmentID
const findStaffByDepartmentId = (id) => {
  return Api.get(`${url}/departmentId/${id}`);
};
// Tìm tất cả nhân viên
const getAll = (page, size) => {
  const requestParams = {
    page,
    size,
  };
  return Api.get(url, { params: requestParams });
};
//Kiểm tra tồn tại nhana viên qua staffID
const findStaffByStaffId = (staffId) => {
  return Api.get(`${url}/staffId/${staffId}`);
};
//Kiểm tra tồn tại nhana viên qua phone
const findStaffByStaffPhone = (phone) => {
  return Api.get(`${url}/phone/${phone}`);
};
// Tạo mới nhân viên
const create = (staffId, fullName, phone, email, departmentId, role) => {
  const body = {
    staffId: staffId,
    fullName: fullName,
    phone: phone,
    email: email,
    departmentId: departmentId,
    role: role,
  };
  return Api.post(url, body);
};
// cập nhật
const update = (staffId, fullName, phone, email, departmentId, role) => {
  const body = {
    staffId: staffId,
    fullName: fullName,
    phone: phone,
    email: email,
    departmentId: departmentId,
    role: role,
  };
  return Api.put(url, body);
};
// delete
const deletebyId = (id) => {
  return Api.delete(`${url}/staffId/${id}`);
};
const getLikeName = (name) => {
  return Api.get(`${url}/likename/${name}`);
};
// export
const StaffApi = {
  findStaffByEmail,
  getLikeName,
  getAll,
  findStaffByStaffId,
  findStaffByStaffPhone,
  create,
  findStaffByDepartmentId,
  update,
  deletebyId,
};
export default StaffApi;
