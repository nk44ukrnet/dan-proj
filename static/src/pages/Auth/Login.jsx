import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import AuthWrapper from "./components/AuthWrapper.jsx";
import Frame from "./components/Frame.jsx";
import {Link, useNavigate} from "react-router-dom";
import {authLoginValidation} from "./authLoginValidation.js";
import {useFormik} from "formik";
import {API} from '../../config/API.js';
import {sendRequest} from '../../helpers/sendRequest.js'
import {useDispatch, useSelector} from "react-redux";
import {setSession} from "../../store/index.js";

const ButtonMod = styled(Button)`
    display: flex;
    align-items: center;
    gap: 10px;
`

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const buttonRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialFormData = {
        loginOrEmail: '',
        password: '',
    }
    const formik = useFormik({
        initialValues: initialFormData,
        validationSchema: authLoginValidation,
        onSubmit: async (values, {resetForm}) => {
            buttonRef.current.setAttribute('disabled', 'disabled');

            await sendRequest(`${API}users/login`, 'POST', {
                body: JSON.stringify(values),
            })
                .then(data => {
                    console.log('login', data);
                    dispatch(setSession(data));
                    navigate("/");
                })
                .catch((err) => {
                    if (err.message || err.loginOrEmail || err.password) {
                        setErrorMessage(err.message || err.loginOrEmail ||  err.password); // Display the specific error message from the server
                    } else if (typeof err === 'object') {
                        setErrorMessage(`Error happened on server: "${JSON.stringify(err)}"`); // Display object details if present
                    } else {
                        setErrorMessage(`Error happened on server: "${err}"`);
                    }
                    console.error('Error:', err);
                }).finally(() => {
                    buttonRef.current.removeAttribute('disabled');
                })


            console.log('login values ', values);
        }
    })
    return (
        <AuthWrapper className="p2">
            <Frame className="p2 bg br shadow">
                <form onSubmit={formik.handleSubmit}>
                    <h6 className="text-center">Login to your account</h6>

                    <Input
                        name="loginOrEmail"
                        type="text"
                        placeholder="Enter your Email"
                        isError={formik.errors.loginOrEmail && formik.touched.loginOrEmail ? formik.errors.loginOrEmail : null}
                        errorMessage={formik.errors.loginOrEmail && formik.touched.loginOrEmail ? formik.errors.loginOrEmail : null}
                        {...formik.getFieldProps("loginOrEmail")}
                    />

                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        isError={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        errorMessage={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                        {...formik.getFieldProps("password")}
                    />

                    {errorMessage && <p className="error">{errorMessage}</p>}

                    <ButtonMod type="submit" className="transition1" ref={buttonRef}>
                        Log in <FontAwesomeIcon icon={faRightToBracket}/>
                    </ButtonMod>
                    <p className="text-center">Dont have an account? <Link to="/register">Register now!</Link></p>
                </form>
            </Frame>
        </AuthWrapper>
    );
};

export default Login;