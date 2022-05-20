import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const inventorySelector = (state) => state.inventory;

const selectListInventorySelector = createSelector(
  inventorySelector,
  (state) => state.inventorys
);

const selectPageSelector = createSelector(
  inventorySelector,
  (state) => state.page
);
const selectSizeSelector = createSelector(
  inventorySelector,
  (state) => state.size
);
const selectTotalElementSelector = createSelector(
  inventorySelector,
  (state) => state.totalElement
);
/** function */
export const selectListInventory = (state) => {
  return selectListInventorySelector(state);
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
