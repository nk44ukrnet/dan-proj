import * as yup from 'yup';

export const authLoginValidation = yup.object({
    'loginOrEmail': yup
        .string()
        .required('Field is required'),
    'password': yup
        .string()
        .required('Password is required')
        .min(7, 'Password must be at least 7 characters long')
        .matches(/^\S*$/, 'Password must not contain spaces'),
})