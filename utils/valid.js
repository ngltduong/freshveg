export const validUpdateUser = (fullname, surname, email, password, phone, cf_password) =>{
    if(!fullname || !surname ||!email || !password || !phone)
        return 'Please add all fields.'
    
    if(!validateEmail(email))
        return 'Invalid emails.'

    if(password.length < 6)
        return 'Password must be at least 6 characters.'    
    
    if(cf_password !== password)
        return 'Confirm password does not match.'
}

export const validRegister = (fullname, surname, email, password, phone) =>{
    if(!fullname || !surname ||!email || !password || !phone)
        return 'Please add all fields.'
    
    if(!validateEmail(email))
        return 'Invalid emails.'

    if(password.length < 6)
        return 'Password must be at least 6 characters.'    
}


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

