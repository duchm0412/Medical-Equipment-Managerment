import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import userLoginInfo from "./userLoginInfoReducer";
import group from "./groupReducer";
import department from "./departmentReducer";
import equipment from "./equipmentReducer";
import staff from "./staffReducer";
import inventory from "./inventoryReducer";
import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  userLoginInfo,
  group,
  equipment,
  department,
  staff,
  inventory,
});
