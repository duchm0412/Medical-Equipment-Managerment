import * as types from "../constants";

export function getListEquipmentAction(equipments, page, totalElement) {
  return {
    type: types.GET_LIST_EQUIPMENT,
    payload: { equipments, page, totalElement },
  };
}
