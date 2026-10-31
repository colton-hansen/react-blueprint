import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ButtonsPage } from '@/pages/buttons/ButtonsPage'
import { FontsPage } from '@/pages/fonts/FontsPage'
import { FormsPage } from '@/pages/forms/FormsPage'
import { HomePage } from '@/pages/home/HomePage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { PopupsPage } from '@/pages/popups/PopupsPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <HomePage /> },
      { path: 'fonts', element: <FontsPage /> },
      { path: 'forms', element: <FormsPage /> },
      { path: 'buttons', element: <ButtonsPage /> },
      { path: 'popups', element: <PopupsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
