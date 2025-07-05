import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  data: [],
  columns: [
    { key: 'name', label: 'Name', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'age', label: 'Age', visible: true },
    { key: 'role', label: 'Role', visible: true },
  ],
  searchQuery: '',
  sortColumn: null,
  sortOrder: null,
  currentPage: 1,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    addRow(state, action) {
      const row = { id: uuidv4(), ...action.payload };
      state.data.push(row);
    },
    deleteRow(state, action) {
      state.data = state.data.filter((row) => row.id !== action.payload);
    },
    updateRow(state, action) {
      const index = state.data.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSort(state, action) {
      state.sortColumn = action.payload.column;
      state.sortOrder = action.payload.order;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    addColumn(state, action) {
      state.columns.push(action.payload);
    },
    toggleColumnVisibility(state, action) {
      const column = state.columns.find((col) => col.key === action.payload);
      if (column) {
        column.visible = !column.visible;
      }
    },
  },
});

export const {
  setData,
  addRow,
  deleteRow,
  updateRow,
  setSearchQuery,
  setSort,
  setCurrentPage,
  addColumn,
  toggleColumnVisibility,
} = tableSlice.actions;

export default tableSlice.reducer;
