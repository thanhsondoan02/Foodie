const validateForm = (form) => (value) => {
    let errors = {};
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const numberRegex = /\d/;
    if (form === "newsletter") {
        if (!value.email) {
            errors.email = "Please enter your email address";
        } else if (!emailRegex.test(value.email)) {
            errors.email = "Please enter a valid email address";
        }
    } else if (form === "registration") {
        // full name
        if (!value.fullName) {
            errors.fullName = "Please enter your full name";
        } else if (value.fullName.length < 3) {
            errors.fullName = "Name is too short";
        }
        // email
        if (!value.email) {
            errors.email = "Please enter your email address";
        } else if (!emailRegex.test(value.email)) {
            errors.email = "Please enter a valid email address";
        }
        // password
        if (!value.password) {
            errors.password = "Please enter your password";
        } else if (value.password.length < 8 || value.repeatPassword.length < 8) {
            errors.password = "Password should be at least 8 characters long";
        }
        if (!value.repeatPassword) {
            errors.repeatPassword = "Please repeat your password";
        }
        if (value.password !== value.repeatPassword) {
            errors.password = "Passwords do not match";
        }
    } else if (form === "profile") {
        if (value.fullName.length !== 0 && value.fullName.length < 3) {
            errors.fullName = "Name is too short";
        }
        if (value.address.length !== 0 && value.address.length < 5) {
            errors.address = "Address is too short";
        }
        if (value.email.length !== 0 && !emailRegex.test(value.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (value.password.length !== 0 && value.password.length < 8) {
            errors.password = "Password should be at least 8 characters long";
        }
        if (value.number.length !== 0 && value.number.length < 5) {
            errors.number = "Phone number is too short";
        }
        else if (value.number.length !== 0 && !numberRegex.test(value.number)) {
            errors.number = "Please enter a valid phone number";
        }
    } else if (form === "login") {
        if (!value.email) {
            errors.email = 'Please enter email';
        } else if (!emailRegex.test(value.email)) {
            errors.email = 'Please enter valid email';
        }

        if (!value.password) {
            errors.password = 'Please enter a valid password';
        } else if (value.password.length < 8) {
            errors.password = 'Password should be min. 8 characters';
        }
    } else if (form === "contact") {
        if (!value.fullName) {
            errors.fullName = "Please enter your full name"
        }
        else if (numberRegex.test(value.fullName)) {
            errors.fullName = "Please enter a valid full name"
        }
        else if (value.fullName && value.fullName.length < 3) {
            errors.fullName = "Please enter a valid full name"
        }
        if (!value.email) {
            errors.email = "Please enter an email"
        }
        else if (!emailRegex.test(value.email)) {
            errors.email = "Please enter valid email"
        }
        if (!value.message) {
            errors.message = "Please write a message"
        }
        else if (value.message && value.message.length < 10) {
            errors.message = "The message should be min. 10 characters"
        }
    } else if (form === "payment") {
        if (!value.firstName) {
            errors.firstName = "Please enter first name"
        }
        if (!value.firstName) {
            errors.firstName = "Please enter last name"
        }
        if (!value.cardNumber || value.cardNumber.length < 16) {
            errors.cardNumber = "Please enter a valid card number"
        }
        if (!value.cvv || value.cvv.length < 3) {
            errors.cvv = "Please enter valid CVV"
        }
        if (!value.month || value.month > 12 || value.month < 1) {
            errors.year = "Please enter valid month"
        }
        if (!value.year || value.year > 28 || value.year < 17) {
            errors.year = "Please enter valid year"
        }
    }

    return errors;
}

export default validateForm;