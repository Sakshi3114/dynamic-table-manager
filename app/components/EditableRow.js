// components/EditableRow.js
'use client';

import { TableRow, TableCell, TextField } from '@mui/material';

export default function EditableRow({ row, columns, onChange, renderActions }) {
  const handleChange = (key, value) => {
    onChange({
      ...row,
      [key]: value,
    });
  };

  const visibleCols = columns.filter(col => col.visible);

  return (
    <TableRow>
      {visibleCols.map((col) => (
        <TableCell key={col.key}>
          <TextField
            value={row[col.key]}
            onChange={(e) => handleChange(col.key, e.target.value)}
            size="small"
            fullWidth
          />
        </TableCell>
      ))}
      <TableCell>{renderActions}</TableCell>
    </TableRow>
  );
}
