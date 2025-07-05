'use client';

import { Button, Container, Typography, Box } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Dynamic Data Table Manager
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Manage, import, and edit tabular data dynamically using Next.js, Redux, and MUI.
      </Typography>
      <Box>
        <Link href="/table">
          <Button variant="contained" size="large">
            Go to Table Manager
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
