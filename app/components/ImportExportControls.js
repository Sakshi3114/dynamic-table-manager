'use client';

import { Box, Button } from '@mui/material';
import Papa from 'papaparse';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '@/app/store/tableSlice';
import { saveAs } from 'file-saver';

export default function ImportExportControls() {
  const dispatch = useDispatch();
  const { columns, data } = useSelector((state) => state.table);
  const inputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const rows = result.data.map((row, index) => ({
          id: `${Date.now()}-${index}`,
          ...row,
        }));
        dispatch(setData(rows));
      },
      error: (err) => {
        alert('CSV Import Failed: ' + err.message);
      },
    });
  };

  const handleExport = () => {
    const visibleCols = columns.filter(col => col.visible);
    const exportData = data.map(row => {
      const filteredRow = {};
      visibleCols.forEach(col => {
        filteredRow[col.key] = row[col.key];
      });
      return filteredRow;
    });

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'table_data.csv');
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <input
        type="file"
        accept=".csv"
        hidden
        ref={inputRef}
        onChange={handleImport}
      />
      <Button variant="contained" onClick={() => inputRef.current.click()}>
        Import CSV
      </Button>
      <Button variant="outlined" onClick={handleExport}>
        Export CSV
      </Button>
    </Box>
  );
}
