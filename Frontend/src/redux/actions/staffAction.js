import * as types from "../constants";

export function getListStaffAction(staffs, page, totalElement) {
  return {
    type: types.GET_LIST_STAFF,
    payload: { staffs, page, totalElement },
  };
}
