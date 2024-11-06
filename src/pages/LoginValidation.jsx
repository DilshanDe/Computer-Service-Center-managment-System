function LoginValidation(values) {
    let errors = {};
    
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    
    if (!values.email) {
      errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email format is invalid";
    }
    
    if (!values.password) {
      errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number";
    }
    
    return errors;
  }
  
  export default LoginValidation;
  