import React, {useEffect, useState, useRef} from 'react';
import Aside from './components/Aside.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHouse,
    faArrowRightFromBracket,
    faCircleHalfStroke,
    faXmark,
    faPlus,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout, toggleDarkMode} from '../../store/index.js';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorUser, selectorDarkMode} from "../../store/selectors.js";
import cn from 'classnames';
import Bars from './components/Bars.jsx'


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selUser = useSelector(selectorUser);
    const selDarkMode = useSelector(selectorDarkMode);
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef();


    function handleDarkModeToggle() {
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
        <>
            <Bars ref={sidebarRef} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={open ? faXmark : faBars} className="bars" style={{pointerEvents: 'none'}}/>
            </Bars>

            <Aside ref={sidebarRef} className={cn('shadow', {'active': open})}>
                <span className="pointer btn-type times" onClick={() => setOpen(!open)}><FontAwesomeIcon icon={faXmark}
                                                                                                         style={{pointerEvents: 'none'}}/></span>
                <p>Hello, <strong>{selUser?.firstName}</strong></p>
                <ul>
                    <li className="transition1"><Link to="/"><FontAwesomeIcon icon={faHouse}/> <span>Home</span></Link>
                    </li>
                    <li className="transition1 colored pointer" onClick={handleDarkModeToggle}><FontAwesomeIcon
                        icon={faCircleHalfStroke}/> <span>Toggle Theme</span></li>
                    <li className="transition1"><Link to="/post-add"><FontAwesomeIcon icon={faPlus}/> Add post</Link>
                    </li>
                    <li className="transition1 colored pointer" onClick={handleLogout}><FontAwesomeIcon
                        icon={faArrowRightFromBracket}/> <span>Log out</span></li>
                </ul>
            </Aside>
        </>
    );
};

export default Sidebar;