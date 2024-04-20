import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({permittedRoles, children}) {
    const user = useSelector((state)=>{
        return state.user.userData
    })
    const token = localStorage.getItem('token')

    if(!user && token) {
        return <h1>Loding...</h1>
    }
    if(!user) {
        return <Navigate to={'/login'}/>
    }

    if(!permittedRoles.includes(user.role)) {
        return <Navigate to={'/unauthorized'}/>
    }

    return children
}