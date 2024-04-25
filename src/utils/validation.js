import { body } from "express-validator";

export const addlocationValidation = [
    body("cityName", "location name is required").not().isEmpty(),
];

export const addweatherDataValidation = [
    body("name", "weatherData name is required").not().isEmpty(),
];

export const forgotPasswordValidation = [
    body("email", "Email must be provided").not().isEmpty(),
];


export const resetPasswordValidation = [
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const otpValidation = [
    body("otp", "Otp must be provided").not().isEmpty(),
];

export const testValidations = [
    body("cityName", "location name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
];

export const signUpValidations = [
    body("Names", " names is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const signInValidations = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Invalid password").isStrongPassword()
];
