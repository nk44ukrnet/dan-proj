import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorSession} from "../store/selectors.js";
import {useEffect} from "react";


export function notLoggedIn() {
    const navigate = useNavigate();
    const session = useSelector(selectorSession);
    useEffect(() => {
        if (!session) {
            navigate('/register');
        }
    }, []);
    return false;
}