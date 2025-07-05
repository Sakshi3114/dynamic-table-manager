'use client';

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TableSortLabel,
  Paper, Box, Button
} from '@mui/material';
import { useState } from 'react';
import EditableRow from './EditableRow';
import RowActions from './RowActions';

export default function DataTable({
  data,
  columns,
  sortColumn,
  sortOrder,
  onSort,
  currentPage,
  onPageChange,
  rowsPerPage,
  totalCount,
  onSaveChanges
}) {
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [editedRows, setEditedRows] = useState({});
  const [editingRowId, setEditingRowId] = useState(null);
  const [rowEdits, setRowEdits] = useState({});

  const visibleColumns = columns.filter((col) => col.visible);

  const handleEditAllChange = (id, updatedRow) => {
    setEditedRows((prev) => ({
      ...prev,
      [id]: updatedRow
    }));
  };

  const handleSaveAll = () => {
    const updatedData = data.map(row => editedRows[row.id] || row);
    onSaveChanges(updatedData);
    setIsEditingAll(false);
    setEditedRows({});
  };

  const handleCancelAll = () => {
    setIsEditingAll(false);
    setEditedRows({});
  };

  const handleSingleEditChange = (id, updatedRow) => {
    setRowEdits((prev) => ({
      ...prev,
      [id]: updatedRow
    }));
  };

  const handleSaveRow = (id) => {
    const updatedRow = rowEdits[id];
    const newData = data.map((row) => (row.id === id ? updatedRow : row));
    onSaveChanges(newData);
    setEditingRowId(null);
    setRowEdits({});
  };

  const handleCancelRow = () => {
    setEditingRowId(null);
    setRowEdits({});
  };

  const handleDeleteRow = (id) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      const newData = data.filter((row) => row.id !== id);
      onSaveChanges(newData);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {!isEditingAll ? (
          <Button variant="contained" onClick={() => setIsEditingAll(true)}>
            Edit All
          </Button>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={handleSaveAll}>
              Save All
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancelAll}>
              Cancel All
            </Button>
          </>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col) => (
                <TableCell key={col.key}>
                  <TableSortLabel
                    active={sortColumn === col.key}
                    direction={sortOrder === 'asc' ? 'asc' : 'desc'}
                    onClick={() => onSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data.map((row) => {
                const isRowEditing = editingRowId === row.id;

                if (isEditingAll) {
                  return (
                    <EditableRow
                      key={row.id}
                      row={editedRows[row.id] || row}
                      columns={columns}
                      onChange={(updatedRow) =>
                        handleEditAllChange(row.id, updatedRow)
                      }
                    />
                  );
                }

                return isRowEditing ? (
                  <EditableRow
                    key={row.id}
                    row={rowEdits[row.id] || row}
                    columns={columns}
                    onChange={(updatedRow) =>
                      handleSingleEditChange(row.id, updatedRow)
                    }
                    renderActions={
                      <RowActions
                        isEditing={true}
                        onSave={() => handleSaveRow(row.id)}
                        onCancel={handleCancelRow}
                      />
                    }
                  />
                ) : (
                  <TableRow key={row.id}>
                    {visibleColumns.map((col) => (
                      <TableCell key={col.key}>{row[col.key]}</TableCell>
                    ))}
                    <TableCell>
                      <RowActions
                        isEditing={false}
                        onEdit={() => {
                          setEditingRowId(row.id);
                          setRowEdits({ [row.id]: row });
                        }}
                        onDelete={() => handleDeleteRow(row.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={currentPage - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        onPageChange={(e, newPage) => onPageChange(newPage + 1)}
      />
    </>
  );
}
