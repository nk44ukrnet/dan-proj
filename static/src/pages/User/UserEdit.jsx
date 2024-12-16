import React, {useEffect, useState, useRef} from 'react';
import {notLoggedIn} from "../../helpers/notLoggedIn.js";
import Sidebar from "../../compositions/Sidebar/Sidebar.jsx";
import Content from "../../containers/Content/Content.jsx";
import Main from "../../containers/Main/Main.jsx";
import {useParams, Link} from "react-router-dom";
import {sendRequest} from "../../helpers/sendRequest.js";
import {API} from "../../config/API.js";
import {useSelector} from "react-redux";
import {selectorSession, selectorUser} from "../../store/selectors.js";
import {useFormik} from "formik";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import {userEditValidationGeneral} from './userEditValidationGeneral.js'
import {useIsCurrentUser} from "../../customHooks/useIsCurrentUser.js";
import {setUser} from "../../store/index.js";
import {useDispatch} from "react-redux";
import ImageUpload from "../../components/ImageUpload/ImageUpload.jsx";
import {useNavigate} from "react-router-dom";

const UserEdit = () => {
    notLoggedIn();
    const dispatch = useDispatch();
    const {id: userID} = useParams();
    const selUser = useSelector(selectorUser);
    const selSession = useSelector(selectorSession);
    const canEdit = useIsCurrentUser(selUser._id);
    const [imageUrl, setImageUrl] = useState(''); // State to store image URL
    const navigate = useNavigate();

    const btnRef = useRef();

    const [inputStatus, setInputStatus] = useState('');

    const [userData, setUserData] = useState(null); // State to store the first request data
    const [error, setError] = useState(null); // State to handle any errors
    const [loading, setLoading] = useState(true); // State for loading indicator

    const headers = {
        Authorization: selSession.token,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the post data
                const userResponse = await sendRequest(`${API}users/${userID}`, 'GET');
                setUserData(userResponse);
                console.log('user response ', userResponse)

            } catch (err) {
                setError(err); // Handle errors
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchData();


    }, [userID]); // Runs when `userID` changes


    const initialDataData = {
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        avatar: imageUrl || userData?.avatar || '', // Always a string
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialDataData,
        validationSchema: userEditValidationGeneral,
        onSubmit: async (values, {resetForm}) => {

            btnRef.current.setAttribute('disabled', 'disabled');

            await sendRequest(`${API}users`, 'PUT', {
                body: JSON.stringify(values),
            }, headers)
                .then(data => {
                    setInputStatus(`Changes successfully saved`);
                    dispatch(setUser(data));
                    navigate(`/user-view/${userID}`)
                })
                .catch((err) => {
                    setInputStatus('There was an error while saving user. Try different values for one of the inputs');
                })
                .finally(() => {
                    btnRef.current.removeAttribute('disabled');
                })
        }
    })

    const handleImageUpload = (url) => {
        setImageUrl(url || ''); // Fallback to empty string
        formik.setFieldValue('avatar', url || ''); // Sync Formik's avatar field with empty string
    };

    // Early return for loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message || 'Something went wrong.'}</p>;

    return (
        <Main>
            <Sidebar/>
            <Content>
                {canEdit && <div>
                    <h5>Edit User general info</h5>

                    {inputStatus && <p>{inputStatus}</p>}

                    <form onSubmit={formik.handleSubmit}>

                        <p>Avatar:</p>
                        <ImageUpload
                            imgUrl={formik.values.avatar || userData.avatar}
                            onUpload={handleImageUpload}
                            disableCancle={true}
                        />
                        <input
                            type="hidden"
                            name="avatar"
                            value={formik.values.avatar || ''} // Always a string
                        />

                        <Input
                            name="firstName"
                            labelText="First Name"
                            placeholder="Enter your First Name"
                            isError={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null}
                            errorMessage={formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null}
                            {...formik.getFieldProps("firstName")}
                        />
                        <Input
                            name="lastName"
                            labelText="Last Name"
                            placeholder="Enter your Last Name"
                            isError={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}
                            errorMessage={formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}
                            {...formik.getFieldProps("lastName")}
                        />
                        <div className="casual-flex">
                            <Button type="submit" ref={btnRef}>Save</Button>
                            <Link to={`/user-view/${userID}`}
                                  className="btn-link-error without-text-decoration">Cancel</Link>
                        </div>
                    </form>
                </div>}
                {!canEdit && <h5>You can't perform this action. Return to <Link to={`/`}>Home</Link></h5>}

            </Content>
        </Main>
    );
};

export default UserEdit;