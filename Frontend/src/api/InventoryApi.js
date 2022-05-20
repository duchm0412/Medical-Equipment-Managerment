import Api from "./Api";

const url = "/inventorys";
// GET
const getAll = (page, size) => {
  const requestParams = {
    page,
    size,
  };
  return Api.get(url, { params: requestParams });
};
const getAllnoPage = () => {
  return Api.get(url);
};
const create = (
  equipmentId,
  equipmentName,
  classify,
  description,
  brand,
  staffName,
  insurance,
  unitPrice,
  quantity
) => {
  const body = {
    equipmentId: equipmentId,
    equipmentName: equipmentName,
    classify: classify,
    description: description,
    brand: brand,
    staffName: staffName,
    insurance: insurance,

    unitPrice: unitPrice,
    quantity: quantity,
  };
  return Api.post(url, body);
};
// check exists
const existsByEquipmentId = (id) => {
  return Api.get(`${url}/${id}`);
};
const existsByEquipmentName = (name) => {
  return Api.get(`${url}/checkname/${name}`);
};

// delete
const deleteById = (id) => {
  return Api.delete(`${url}/equipmentId/${id}`);
};
const getLikeName = (name) => {
  return Api.get(`${url}/likename/${name}`);
};
const update = (
  equipmentId,
  equipmentName,
  classify,
  description,
  brand,
  staffName,
  insurance,
  unitPrice,
  quantity
) => {
  const body = {
    equipmentId: equipmentId,
    equipmentName: equipmentName,
    classify: classify,
    description: description,
    brand: brand,
    staffName: staffName,
    insurance: insurance,
    unitPrice: unitPrice,
    quantity: quantity,
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
const setQuantity = (equipmentId, quantity) => {
  const body = {
    equipmentId: equipmentId,
    quantity: quantity,
  };
  return Api.post(`${url}/setQuantity`, body);
};
// export
const InventoryApi = {
  getAll,
  getLikeName,
  create,
  existsByEquipmentId,
  existsByEquipmentName,
  deleteById,
  update,
  setQuantity,
  warningErrorEquipment,
  getAllnoPage,
};
export default InventoryApi;
