// components/RowActions.js
'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import { Edit, Save, Cancel, Delete } from '@mui/icons-material';

export default function RowActions({ isEditing, onEdit, onSave, onCancel, onDelete }) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {isEditing ? (
        <>
          <Tooltip title="Save">
            <IconButton size="small" color="success" onClick={onSave}>
              <Save fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton size="small" onClick={onCancel}>
              <Cancel fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={onEdit}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={onDelete}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
}
