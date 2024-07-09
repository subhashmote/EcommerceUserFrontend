import { Children } from "react";

const { useNavigate, Navigate } = require("react-router-dom");



export const OpenRoutes = ({children}) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
    return getTokenFromLocalStorage?.token === undefined ? children : (<Navigate to={'/'} replace={true}/>)
}