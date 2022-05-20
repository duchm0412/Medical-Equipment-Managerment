import * as types from "../constants";

export function getListDepartmentAction(departments, page, totalElement) {
  return {
    type: types.GET_LIST_DEPARTMENT,
    payload: { departments, page, totalElement },
  };
}
