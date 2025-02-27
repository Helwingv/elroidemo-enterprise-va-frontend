import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import PersonnelOverview from '../pages/PersonnelOverview';
import Alerts from '../pages/Alerts';
import Patients from '../pages/Patients';
import PatientProfile from '../pages/PatientProfile';
import Benefits from '../pages/Benefits';
import ComplianceAudit from '../pages/ComplianceAudit';
import Providers from '../pages/Providers';
import Marketplace from '../pages/Marketplace';
import Consent from '../pages/Consent';
import DataElements from '../pages/DataElements';
import DataMapping from '../pages/DataMapping';
import HealthRecords from '../pages/HealthRecords';
import CarePlanner from '../pages/CarePlanner';
import Insights from '../pages/Insights';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import TwoFactorVerification from '../pages/TwoFactorVerification';
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../hooks/useAuth';
import { SidebarProvider } from '../hooks/useSidebar';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <SidebarProvider>
            <MainLayout>
              <Outlet />
            </MainLayout>
        </SidebarProvider>
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/personnel/:id',
        element: <PersonnelOverview />,
      },
      {
        path: '/alerts',
        element: <Alerts />,
      },
      {
        path: '/patients',
        element: <Patients />,
      },
      {
        path: '/patients/:id',
        element: <PatientProfile />,
      },
      {
        path: '/providers',
        element: <Providers />,
      },
      {
        path: '/marketplace',
        element: <Marketplace />,
      },
      {
        path: '/data-mapping',
        element: <DataMapping />,
      },
      {
        path: '/benefits',
        element: <Benefits />,
      },
      {
        path: '/compliance',
        element: <ComplianceAudit />,
      },
      {
        path: '/consent',
        element: <Consent />,
      },
      {
        path: '/data-elements',
        element: <DataElements />,
      },
      {
        path: '/care-planner',
        element: <CarePlanner />,
      },
      {
        path: '/health-records',
        element: <HealthRecords />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/insights',
        element: <Insights />,
      },
    ],
  },
]);