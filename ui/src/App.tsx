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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function App() {
  const queryClient = new QueryClient()
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </MantineProvider>
  );
}