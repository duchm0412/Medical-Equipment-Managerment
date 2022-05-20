import * as types from "../constants";

const initialState = {
  staffs: [],
  page: 1,
  size: 5,
  totalElement: 18,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_STAFF:
      return {
        ...state,
        staffs: actions.payload.staffs,
        page: actions.payload.page,
        totalSize: actions.payload.totalElement,
      };
    default:
      return state;
  }
}
