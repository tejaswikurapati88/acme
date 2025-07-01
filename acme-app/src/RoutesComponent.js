import { useRoutes } from 'react-router-dom'
import Login from './components/LoginPage/Login'
import Register from './components/RegistrationPage/Register'
import Home from './components/Home/Home'

const RoutesComponent=()=>{
    const routes = useRoutes([
        {path: "/", element: <Home/>},
        {path: '/login', element : <Login />},
        {path: "/register", element : <Register />}
    ])
    return routes
}

export default RoutesComponent;
