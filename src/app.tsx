import { CreateTripPage } from './pages/create-trip'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { TripDetailsPage } from './pages/trip-details'

const router = createBrowserRouter([
  {
    path: '/plann-er-web',
    element: <CreateTripPage />,
  },
  {
    path: '/plann-er-web/trips/:tripId',
    element: <TripDetailsPage />
  }
])


export function App() {
  return <RouterProvider router={router}/>
}