import * as types from "../constants";

export function getListInventoryAction(inventorys, page, totalElement) {
  return {
    type: types.GET_LIST_INVENTORY,
    payload: { inventorys, page, totalElement },
  };
}
