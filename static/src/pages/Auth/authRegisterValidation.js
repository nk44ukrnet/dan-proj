import * as yup from 'yup';

export const authRegisterValidation = yup.object({
    'firstName': yup
        .string()
        .required('First Name is required.')
        .matches(/^[a-zA-Zа-яА-Я]+$/, 'Allowed characters for First Name is a-z, A-Z, а-я, А-Я.')
        .min(2, 'First Name must be between 2 and 25 characters')
        .max(25, 'First Name must be between 2 and 25 characters'),
    'lastName': yup
        .string()
        .required('Last Name is required.')
        .matches(/^[a-zA-Zа-яА-Я]+$/, 'Allowed characters for Last Name is a-z, A-Z, а-я, А-Я.')
        .min(2, 'Last Name must be between 2 and 25 characters')
        .max(25, 'Last Name must be between 2 and 25 characters'),
    'email': yup
        .string()
        .required('Email is required.')
        .matches(
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Email is not valid'
        ),
    'login': yup
        .string()
        .required('Login is required.')
        .matches(/^[a-zA-Z0-9]+$/, 'Allowed characters for login is a-z, A-Z, 0-9.')
        .min(3, 'Login must be between 3 and 10 characters')
        .max(10, 'Login must be between 3 and 10 characters'),
    'password': yup
        .string()
        .required('Password is required.')
        .matches(/^[a-zA-Z0-9]+$/, 'Allowed characters for password is a-z, A-Z, 0-9.')
        .min(7, 'Password must be between 7 and 30 characters')
        .max(30, 'Password must be between 7 and 30 characters'),
});