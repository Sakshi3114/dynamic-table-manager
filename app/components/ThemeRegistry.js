'use client';

import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

export default function ThemeRegistry({ children }) {
  const mode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
