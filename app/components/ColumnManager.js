'use client';

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormControlLabel, Checkbox, TextField, Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addColumn, toggleColumnVisibility } from '@/app/store/tableSlice';

export default function ColumnManager({ open, onClose }) {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.table);
  const [newColumn, setNewColumn] = useState({ key: '', label: '' });

  const handleCheckboxToggle = (key) => {
    dispatch(toggleColumnVisibility(key));
  };

  const handleAddColumn = () => {
    if (newColumn.key && newColumn.label) {
      dispatch(addColumn({ ...newColumn, visible: true }));
      setNewColumn({ key: '', label: '' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Box>
          {columns.map((col) => (
            <FormControlLabel
              key={col.key}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={() => handleCheckboxToggle(col.key)}
                />
              }
              label={col.label}
            />
          ))}
        </Box>

        <Box mt={3}>
          <TextField
            label="New Column Key"
            value={newColumn.key}
            onChange={(e) => setNewColumn({ ...newColumn, key: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="New Column Label"
            value={newColumn.label}
            onChange={(e) => setNewColumn({ ...newColumn, label: e.target.value })}
            fullWidth
            margin="dense"
          />
          <Button variant="contained" onClick={handleAddColumn} sx={{ mt: 1 }}>
            Add Column
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
