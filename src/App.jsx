import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import Error from './components/Error'
import Feed from './components/Feed'
import Home from './components/Home'
import PostDetails from './components/PostDetails'
import Signup from './components/Signup'
import Login from './components/Login'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <Error/>
  },
  {
    path: '/feed',
    element: <Feed />,
    errorElement: <Error />
  },
  {
    path: '/post/:postId',
    element: <PostDetails />,
    errorElement: <Error />
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <Error />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />
  },

])


function App() {

  return (
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  )
}

export default App
