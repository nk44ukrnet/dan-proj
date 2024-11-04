import React, {useEffect} from 'react';
import Aside from './components/Aside.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHouse,
    faArrowRightFromBracket,
    faCircleHalfStroke,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout, toggleDarkMode} from '../../store/index.js';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorUser, selectorDarkMode} from "../../store/selectors.js";


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selUser = useSelector(selectorUser);
    const selDarkMode = useSelector(selectorDarkMode);

    function handleDarkModeToggle(){
        dispatch(toggleDarkMode());
    }

    useEffect(() => {
        document.body.classList.toggle('dark-mode', selDarkMode);
    }, [selDarkMode, selUser]);

    function handleLogout() {
        dispatch(logout());
        navigate('/login');
    }
    return (
        <Aside className="shadow">
            <span className="pointer btn-type times"><FontAwesomeIcon icon={faXmark} /></span>
            <p>Hello, <strong>{selUser?.firstName}</strong></p>
            <ul>
                <li className="transition1"><Link to="/"><FontAwesomeIcon icon={faHouse} /> <span>Home</span></Link></li>
                <li className="transition1 colored pointer" onClick={handleDarkModeToggle}><FontAwesomeIcon icon={faCircleHalfStroke} /> <span>Toggle Theme</span></li>
                <li className="transition1 colored pointer" onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} /> <span>Log out</span></li>
            </ul>
        </Aside>
    );
};

export default Sidebar;