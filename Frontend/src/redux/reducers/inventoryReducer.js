import * as types from "../constants";
const initialState = {
  inventorys: [],
  page: 1,
  size: 5,
  totalElement: 18,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_INVENTORY:
      return {
        ...state,
        inventorys: actions.payload.inventorys,
        page: actions.payload.page,
        totalSize: actions.payload.totalElement,
      };
    default:
      return state;
  }
}
