// app/layout.js or app/RootLayout.js
'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import ThemeRegistry from './components/ThemeRegistry'; 
import ThemeToggle from './components/ThemeToggle';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeRegistry>
            <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
                <ThemeToggle />
              </header>
              {children}
            </ThemeRegistry>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
