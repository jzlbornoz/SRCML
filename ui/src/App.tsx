import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Users } from './pages/Users';
import { Profile } from './pages/Profile';
import { Library } from './pages/Library';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Login } from './components/Login';
export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="profile" element={<Profile />} />
              <Route path="library" element={<Library />} />
              {/* Redirección por defecto */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SignedIn>
    </MantineProvider>
  );
}