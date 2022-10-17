import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css';
import Login from './components/Login/Login';
import ReactBootsrap from "./components/ReactBootsrap";
import Main from './layout/Main';



function App() {

const router = createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {path:'/',
       element:<ReactBootsrap></ReactBootsrap>
    },
      {path:'/register',
       element:<ReactBootsrap></ReactBootsrap>
    },
      {path:'/login',
       element:<Login></Login>
    },
    ]
  }
])


  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
