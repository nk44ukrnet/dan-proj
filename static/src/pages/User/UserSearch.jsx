import React, {useRef, useEffect, useState} from 'react';
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import Input from "../../components/Input/Input.jsx";
import {Link} from "react-router-dom";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";

const UserSearch = () => {
    const textRef = useRef();
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await sendRequest(`${API}users`, 'GET');
                setUsers(response.users);
            } catch (e) {
                console.log(e);
            }
        }

        loadUsers();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        let searchVal = textRef.current.value;
        if (searchVal.trim().length > 0) {
            setFilteredUsers(users.filter(user => user.firstName.toLowerCase().includes(searchVal.trim().toLowerCase())));
        }
    }

    return (
        <Main>
            <Sidebar/>
            <Content>
                <h5>Find Author</h5>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Type for Search" className="input" onChange={handleSubmit} ref={textRef}/>
                </form>
                <div className="user-flex">
                    {filteredUsers.length > 0 && filteredUsers.map((user) => (
                        <Link to={`/user-view/${user._id}`} key={user._id}>
                            {user.avatar && <img src={user.avatar} alt="avatar" className="avatar"/>}
                            <span>{user.firstName}</span>
                        </Link>
                    ))}
                </div>
            </Content>
        </Main>
    );
};

export default UserSearch;