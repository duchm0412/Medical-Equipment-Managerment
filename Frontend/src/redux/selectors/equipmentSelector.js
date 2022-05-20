import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const equipmentSelector = (state) => state.equipment;

const selectListEquipmentSelector = createSelector(
  equipmentSelector,
  (state) => state.equipments
);

const selectPageSelector = createSelector(
  equipmentSelector,
  (state) => state.page
);
const selectSizeSelector = createSelector(
  equipmentSelector,
  (state) => state.size
);
const selectTotalElementSelector = createSelector(
  equipmentSelector,
  (state) => state.totalElement
);
/** function */
export const selectListEquipment = (state) => {
  return selectListEquipmentSelector(state);
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
