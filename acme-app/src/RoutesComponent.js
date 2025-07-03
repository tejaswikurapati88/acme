import { useRoutes } from 'react-router-dom'
import Login from './components/LoginPage/Login'
import Register from './components/RegistrationPage/Register'
import Home from './components/Home/Home'
import Medications from './components/Medications/Medications'
import About from './components/About/About'
import Contact from './components/contact/Contact'

const RoutesComponent=()=>{
    const routes = useRoutes([
        {path: "/", element: <Home/>},
        {path: '/login', element : <Login />},
        {path: "/register", element : <Register />},
        {path: "/medications", element : <Medications />},
        {path: "/about", element: <About />},
        {path: "/contact", element: <Contact />}
    ])
    return routes
}

export default RoutesComponent;
