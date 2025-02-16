export const Validity = (data) => {
    var error = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=,*\d) (?=.*[a-z]) (?=.*[A-Z]) [a-zA-Z0-9]{8,}$/;
    const phone_pattern = /^\d{9}$/;

    // Validate phone number and update message
    
    const email=data.email;
    const password=data.password;
    const phone = data.phone;

    const passwordLength = data.password.length;
    if (email==="") {
        error.email = "Email should contain a value";
    } else if (!email_pattern.test(email)) {
        error.email = "Email is not valid";
    } else {
        error.email = "";
    }

   
    if (password==="") {
        error.password = "Password should contain a value";
    } else if (passwordLength>5) {
        error.password = "";
    } else {
        error.password = "Enter an Validate Password";
        console.log("Wrong password")
    }

    if (phone==="") {
        error.phone = "phone should contain a value";
    } else if (!phone_pattern.test(phone)) {
        error.phone = "";
    } else {
        error.phone = "Enter an Validate Number";
        console.log("Number should contain 10 digits")
    }


    return error;
};
