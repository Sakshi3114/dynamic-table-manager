// app/components/ThemeToggle.js
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { toggleTheme } from '../store/themeSlice';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
