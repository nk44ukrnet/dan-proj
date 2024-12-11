import React, {useEffect, useState, useRef} from 'react';
import Aside from './components/Aside.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHouse,
    faArrowRightFromBracket,
    faCircleHalfStroke,
    faXmark,
    faPlus,
    faBars,
    faUser,
    faAward,
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout, toggleDarkMode} from '../../store/index.js';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorUser, selectorDarkMode} from "../../store/selectors.js";
import cn from 'classnames';
import Bars from './components/Bars.jsx'
import Overlay from './components/Overlay.jsx';
import {useIsAdmin} from "../../customHooks/useIsAdmin.js";


const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selUser = useSelector(selectorUser);
    const selDarkMode = useSelector(selectorDarkMode);
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef();

    const isAdmin = useIsAdmin();

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
                <p style={{overflow: 'hidden'}}>Hello, <strong className="text-underline"><Link to={`/user-view/${selUser?._id}`}>{selUser?.firstName}</Link></strong></p>
                <ul>
                    <li className="transition1"><Link to="/"><FontAwesomeIcon icon={faHouse}/> <span>Home</span></Link>
                    </li>
                    <li className="transition1 pointer" onClick={handleDarkModeToggle}><FontAwesomeIcon
                        icon={faCircleHalfStroke}/> <span>Toggle Theme</span></li>
                    <li className="transition1"><Link to="/post-add"><FontAwesomeIcon icon={faPlus}/> Add post</Link>
                    </li>
                    {isAdmin && <li className="transition1"><Link to="/award-add"><FontAwesomeIcon icon={faPlus}/> Add
                        Award <br/> (for admins)</Link>
                    </li>}
                    <li className="transition1"><Link to={`/award-list/`}><FontAwesomeIcon
                        icon={faAward}/> All awards</Link>
                    </li>
                    <li className="transition1"><Link to={`/user-view/${selUser?._id}`}><FontAwesomeIcon
                        icon={faUser}/> My Account</Link>
                    </li>
                    <li className="transition1 pointer" onClick={handleLogout}><FontAwesomeIcon
                        icon={faArrowRightFromBracket}/> <span>Log out</span></li>
                </ul>
            </Aside>

            {open && <Overlay onClick={() => setOpen(!open)}/>}
        </>
    );
};

export default Sidebar;