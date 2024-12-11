import * as yup from 'yup';

export const userEditValidationGeneral = yup.object({
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
});