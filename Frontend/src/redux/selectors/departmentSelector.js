import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const departmentSelector = (state) => state.department;

const selectListDepartmentSelector = createSelector(
  departmentSelector,
  (state) => state.departments
);

const selectPageSelector = createSelector(
  departmentSelector,
  (state) => state.page
);
const selectSizeSelector = createSelector(
  departmentSelector,
  (state) => state.size
);
const selectTotalElementSelector = createSelector(
  departmentSelector,
  (state) => state.totalElement
);
/** function */
export const selectListDepartment = (state) => {
  return selectListDepartmentSelector(state);
};
export const selectPage = (state) => {
  return selectPageSelector(state);
};

export const selectSize = (state) => {
  return selectSizeSelector(state);
};

export const selectTotalElement = (state) => {
  return selectTotalElementSelector(state);
};
