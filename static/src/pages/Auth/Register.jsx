import React, {useRef, useState} from 'react';
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import Frame from "./components/Frame.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from 'formik'
import {authRegisterValidation} from './authRegisterValidation.js'
import {API} from '../../config/API.js';
import {sendRequest} from '../../helpers/sendRequest.js'
import {useDispatch} from "react-redux";
import {setUser} from "../../store/index.js";


const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const buttonRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
    }
    const formik = useFormik({
        initialValues: initialFormData,
        validationSchema: authRegisterValidation,
        onSubmit: async (values, {resetForm}) => {

            buttonRef.current.setAttribute('disabled', 'disabled');

            await sendRequest(`${API}users`, 'POST', {
                body: JSON.stringify(values),
            })
                .then(data => {
                    console.log(data);
                    //dispatch(setUser(data));
                    navigate("/login");
                })
                .catch((err) => {
                    if (err.message) {
                        setErrorMessage(err.message); // Display the specific error message from the server
                    } else if (typeof err === 'object') {
                        setErrorMessage(`Error happened on server: "${JSON.stringify(err)}"`); // Display object details if present
                    } else {
                        setErrorMessage(`Error happened on server: "${err}"`);
                    }
                    console.error('Error:', err);
                }).finally(() => {
                    buttonRef.current.removeAttribute('disabled');
                })

            //console.log('Register values ', values);
        }
    })
    return (
        <AuthWrapper className="p2">
            <Frame className="p2 bg br shadow">
                <form onSubmit={formik.handleSubmit}>
                    <h6 className="text-center">Register</h6>
                    <Input
                        name="firstName"
                        placeholder="Enter your First Name"
                        isError={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null}
                        errorMessage={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null}
                        {...formik.getFieldProps("firstName")}
                    />
                    <Input
                        name="lastName"
                        placeholder="Enter your Last Name"
                        isError={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}
                        errorMessage={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}
                        {...formik.getFieldProps("lastName")}
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your Email"
                        isError={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                        errorMessage={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                        {...formik.getFieldProps("email")}
                    />
                    <Input
                        name="login"
                        placeholder="Enter your login"
                        isError={formik.errors.login && formik.touched.login ? formik.errors.login : null}
                        errorMessage={formik.errors.login && formik.touched.login ? formik.errors.login : null}
                        {...formik.getFieldProps("login")}
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
                    <Button type="submit" className="transition1" ref={buttonRef}>Register</Button>
                    <p className="text-center">Already have an account? <Link to="/login">Log in!</Link></p>
                </form>
            </Frame>
        </AuthWrapper>
    );
};

export default Register;