import { Navigate } from "react-router-dom";


export const ProtectedPath = ({children}:{children:JSX.Element}) => {
    
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to={'/signup'} replace={true}/>;
    }
    
    return children;
}