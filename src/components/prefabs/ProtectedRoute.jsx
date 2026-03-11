import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({user, children, redirectTo = "/auth"}) {
    if(!user) {
        return <Navigate to={redirectTo}/>
    }

    return children ?? <Outlet/>;
}