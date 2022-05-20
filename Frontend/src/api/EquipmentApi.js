import Api from "./Api";

const url = "/equipments";
const url2 = "/equiopfdp";
// GET
const getAll = (page, size) => {
  const requestParams = {
    page,
    size,
  };
  return Api.get(url, { params: requestParams });
};
const getnoPaging = () => {
  return Api.get(`${url}/nopage`);
};
// get by dp id
const getEquipmentByDpId = (id) => {
  return Api.get(`${url}/getbydpid/${id}`);
};
const create = (
  equipmentId,
  equipmentName,
  classify,
  description,
  brand,
  staffName,
  insurance,
  equipmentStatus
) => {
  const body = {
    equipmentId: equipmentId,
    equipmentName: equipmentName,
    classify: classify,
    description: description,
    brand: brand,
    staffName: staffName,
    insurance: insurance,
    equipmentStatus: equipmentStatus,
  };
  return Api.post(url, body);
};
const intoDepartment = (
  equipmentId,
  equipmentName,
  classify,
  description,
  brand,
  staffName,
  insurance,
  unitPrice,
  quantity,
  departmentId
) => {
  const body = {
    equipmentId: equipmentId,
    equipmentName: equipmentName,
    classify: classify,
    description: description,
    brand: brand,
    staffName: staffName,
    insurance: insurance,
    equipmentStatus: "READY",
    departmentId: departmentId,
    unitPrice: unitPrice,
    quantity: quantity,
  };
  return Api.post(url2, body);
};

// check exists
const existsByEquipmentId = (id) => {
  return Api.get(`${url}/checkid/${id}`);
};
const existsByEquipmentName = (name) => {
  return Api.get(`${url}/checkname/${name}`);
};

// delete
const deleteById = (id) => {
  return Api.delete(`${url}/${id}`);
};
const deleteInEquipOfDpById = (equipmentId, departmentId) => {
  return Api.delete(`${url2}/deleteEOD/${equipmentId}/${departmentId}`);
};

const update = (
  equipmentId,
  equipmentName,
  classify,
  description,
  brand,
  staffName,
  insurance,
  equipmentStatus
) => {
  const body = {
    equipmentId: equipmentId,
    equipmentName: equipmentName,
    classify: classify,
    description: description,
    brand: brand,
    staffName: staffName,
    insurance: insurance,
    equipmentStatus: equipmentStatus,
  };
  return Api.put(url, body);
};
//
const warningErrorEquipment = (equipmentId, equipmentStatus) => {
  const body = {
    equipmentId: equipmentId,
    equipmentStatus: "BROKEN",
  };
  return Api.put(url, body);
};
const getLikeName = (name) => {
  return Api.get(`${url}/likename/${name}`);
};
const getOnlyDpIDEquipID = (dpId) => {
  return Api.get(`equiopfdp/getbydp/${dpId}`);
};
// export
const EquipmentApi = {
  getAll,
  getLikeName,
  getOnlyDpIDEquipID,
  create,
  existsByEquipmentId,
  existsByEquipmentName,
  deleteById,
  getEquipmentByDpId,
  intoDepartment,
  deleteInEquipOfDpById,
  update,
  warningErrorEquipment,
  getnoPaging,
};
export default EquipmentApi;
