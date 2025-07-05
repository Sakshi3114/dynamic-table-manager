'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import {
  setSort,
  setCurrentPage,
  setData
} from '@/app/store/tableSlice';

import ColumnManager from '../components/ColumnManager';
import TableToolbar from '../components/TableToolbar';
import DataTable from '../components/DataTable';
import ImportExportControls from '../components/ImportExportControls';

const ROWS_PER_PAGE = 10;

export default function TablePage() {
  const dispatch = useDispatch();
  const {
    data,
    columns,
    searchQuery,
    sortColumn,
    sortOrder,
    currentPage
  } = useSelector((state) => state.table);

  const [openModal, setOpenModal] = useState(false);

  // Inject dummy data
  useEffect(() => {
    if (data.length === 0) {
      dispatch(setData([
        { id: '1', name: 'Alice', email: 'alice@example.com', age: 28, role: 'Engineer' },
        { id: '2', name: 'Bob', email: 'bob@example.com', age: 35, role: 'Manager' },
        { id: '3', name: 'Charlie', email: 'charlie@example.com', age: 22, role: 'Intern' },
        { id: '4', name: 'David', email: 'david@example.com', age: 30, role: 'Engineer' },
      ]));
    }
  }, [dispatch, data]);

  const filteredData = useMemo(() => {
    let filtered = data.filter((row) =>
      columns.some(
        (col) =>
          col.visible &&
          row[col.key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, columns, searchQuery, sortColumn, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filteredData.slice(start, start + ROWS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleSort = (columnKey) => {
    let newOrder = 'asc';
    if (sortColumn === columnKey && sortOrder === 'asc') {
      newOrder = 'desc';
    }
    dispatch(setSort({ column: columnKey, order: newOrder }));
  };

  const handleSaveChanges = (updatedData) => {
    dispatch(setData(updatedData));
  };
  

  return (
    <Box sx={{ p: 4 }}>
      
      <ImportExportControls />
      <TableToolbar onManageColumns={() => setOpenModal(true)} />
      <ColumnManager open={openModal} onClose={() => setOpenModal(false)} />

      <DataTable
        data={paginatedData}
        columns={columns}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onSort={handleSort}
        currentPage={currentPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        rowsPerPage={ROWS_PER_PAGE}
        totalCount={filteredData.length}
        onSaveChanges={handleSaveChanges} 
     />
    </Box>
  );
}
