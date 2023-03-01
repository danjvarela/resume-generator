import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from '@pages/Landing'
import Login from '@pages/Login'
import Resumes from '@pages/Resumes'
import Signup from '@pages/Signup'
import Drafts from '@pages/Drafts'
import Profile from '@pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/resumes',
    element: <Resumes />,
  },
  {
    path: '/drafts',
    element: <Drafts />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
