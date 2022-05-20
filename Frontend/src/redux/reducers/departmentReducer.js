import * as types from "../constants";

const initialState = {
  departments: [],
  page: 1,
  size: 5,
  totalElement: 18,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_DEPARTMENT:
      return {
        ...state,
        departments: actions.payload.departments,
        page: actions.payload.page,
        totalSize: actions.payload.totalElement,
      };
    default:
      return state;
  }
}
