const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
const ageRegex = /^(100|[1-9][0-9]?)$/;


export const checkFullNameError = (fullName) => {
  if (!fullName) {
    return "Please enter your full name"
  } else if (fullName.length < 3) {
    return "Full Name should be at least 3 characters long"
  } else {
    return ''
  }
}

export const checkEmailError = (email) => {
  if (!email) {
    return ('Please enter your email address');
  } else if (!emailRegex.test(email)) {
    return ('Please enter a valid email address');
  } else {
    return ('');
  }
}

export const checkPasswordError = (password) => {
  if (!password) {
    return ('Please enter your password');
  } else if (password.length < 8) {
    return ('Password should be at least 8 characters long');
  } else {
    return ('');
  }
}


export const checkRepeatPasswordError = (oldPassword, repeatPassword) => {
  if (!repeatPassword) {
    return ('Please repeat your password');
  } else if (repeatPassword !== oldPassword) {
    return ('Passwords do not match');
  } else {
    return ('');
  }
}

export const checkAddressError = (address) => {
  if (!address) {
    return ('Please enter your address');
  } else if (address.length < 5) {
    return ('Address should be at least 5 characters long');
  } else {
    return ('');
  }
}

export const checkAgeError = (age) => {
  if (!age) {
    return ('Please enter your age');
  } else if (!ageRegex.test(age)) {
    return ('Age should be between 1 and 100');
  } else {
    return ('');
  }
}

export const checkPhoneError = (phone) => {
  if (!phone) {
    return ('Please enter your phone number');
  } else if (!phoneRegex.test(phone)) {
    return ('Please enter a valid phone number');
  } else {
    return ('');
  }
}

export const checkGenderError = (gender) => {
  if (!gender) {
    return ('Please choose gender')
  } else {
    return ('');
  }
}

export const checkValueLoginError = (valueLogin) => {
  if (!valueLogin) {
    return ('Please enter your email address or phone number');
  } else if (!emailRegex.test(valueLogin) && !phoneRegex.test(valueLogin)) {
    return ('Please enter a valid email address or phone number');
  } else {
    return ('');
  }
}

export const checkContactMessageError = (message) => {
  if (!message) {
    return ('Please enter your message');
  } else if (message.length < 10) {
    return ('Message should be at least 10 characters long');
  } else {
    return ('');
  }
}