import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const staffSelector = (state) => state.staff;

const selectListStaffSelector = createSelector(
  staffSelector,
  (state) => state.staffs
);

const selectPageSelector = createSelector(staffSelector, (state) => state.page);
const selectSizeSelector = createSelector(staffSelector, (state) => state.size);
const selectTotalElementSelector = createSelector(
  staffSelector,
  (state) => state.totalElement
);
/** function */
export const selectListStaff = (state) => {
  return selectListStaffSelector(state);
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
