'use client';

import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/app/store/tableSlice';

export default function TableToolbar({ onManageColumns }) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.table.searchQuery);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      <Button variant="outlined" onClick={onManageColumns}>
        Manage Columns
      </Button>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </Box>
  );
}
