
let login_username = select('#login_username'),
    username_incorrect = select('#username_incorrect'),
    signin_form = select('.signin_form'),
    pass_link = select('#pass_link'),
    pass_success = select('#pass_success'),
    secure_index = select('#secure_index'),
    pass_changed_input = select('#pass_changed_input'),
    pass_not_equal_err = select('#pass_not_equal_err'),
    pass_equal = select('#pass_equal'),
    pass_confirm_changed_input = select('#pass_confirm_changed_input'),
    login_header_p = select('#login_header_p'),
    submit_pass_change_btn = select('#submit_pass_change_btn'),
    forgot_password_link = select('#forgot_password_link'),
    back_to_login = select('#back_to_login'),
    send__forgot_link = select('#send__forgot_link'),
    hide_for_pass = select('#hide_for_pass'),
    no_credent_err = select('#no_credent_err'),
    inner_login_modal = select('#inner_login_modal');

/* Open and close the model for resetting the password */
let openPasswordModel = () => {
    signin_form.reset();
    setDisplay(hide_for_pass, 'none');
    setDisplay(send__forgot_link, 'block');
    setDisplay(back_to_login, 'block');
    login_header_p.style.fontSize = '23px';
    login_header_p.style.marginBottom = '4%';
    login_header_p.innerText = "Enter your email or username";
    inner_login_modal.style.height = '240px';
}

let closePasswordModel = () => {
    setDisplay(hide_for_pass, 'block');
    setDisplay(send__forgot_link, 'none');
    setDisplay(back_to_login, 'none');
    login_header_p.style.fontSize = '';
    login_header_p.innerText = "Sign in";
    inner_login_modal.style.height = '';
}

/*  Incorrect username/no username provided error when resetting password */
let handleForgotErrors = () => {
    setDisplay(username_incorrect, 'block');
    login_username.style.border = '1px solid #e40808';
    let hideUsernameError = () =>{
        setDisplay(username_incorrect, '');
        login_username.style.border = '';
    }
    setTimeout(hideUsernameError, 3000);
}

/* Send the request to the server with the username or email*/
let sendPasswordChange = () => {
    let value = login_username.value;

    if(value.length == 0){
        handleForgotErrors();
    } else {
        let query;

        /* Find out email or username entered*/

        let email_regex = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
        (email_regex.test(value)) ? query = 'email': query = 'user';
         
        let information = {
            query: query, 
            value: value
        }

        /* Functionality */
        let xhr = new window.XMLHttpRequest()
        xhr.open('POST', '/users/forgot/', true);
        xhr.onload = () => {
            if(xhr.status == 200){
                if(xhr.responseText == 'error'){
                    handleForgotErrors();
                } else {
                    /* Styles */
                    setDisplay(login_modal, 'none');
                    setDisplay(pass_link, 'block');
                }
            }
        }
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.send(JSON.stringify(information));
    }
}


/* Password validation when entered into the change pass form 
Check values on keyup*/

/* Validate confirmed password */
let validateConfirmedPassword = () =>{
    if(pass_confirm_changed_input.value.length > 0){
        if(pass_confirm_changed_input.value !== pass_changed_input.value){
            setDisplay(pass_not_equal_err, 'block');
            setDisplay(pass_equal, 'none');
            pass_confirm_changed_input.style.border = '1px solid #e40808';
        } else {
            setDisplay(pass_not_equal_err, 'none');
            setDisplay(pass_equal, 'block');
            pass_confirm_changed_input.style.border = '1px solid #24c24b';
        }
    } else {
        setDisplay(pass_not_equal_err, 'none');
        setDisplay(pass_equal, 'none');
        pass_confirm_changed_input.style.border = '';
    }
}

/*  */
let validatePassword = () => {
    let e = pass_changed_input.value;
    if(e.length > 0) {
        if(e.length < 8){
            setDisplay(pass_short_err, 'block');
            setDisplay(pass_success, 'none'); 
            pass_changed_input.style.border = '1px solid #e40808';
        } else {
            setDisplay(pass_short_err, 'none');
            setDisplay(pass_success, 'block');
            pass_changed_input.style.border = '1px solid #24c24b';

            let lett_index = 1; 

            /* Make the password security bar */
            if(e.length % 3 == 1){
                e.split('').forEach(lett =>{
                    lett_index += 1;
                });
            }
        
            if(lett_index !== 1){
                if(lett_index >= 8){secure_index.innerHTML = '&#9679;';} 
                if(lett_index >= 14) { secure_index.innerHTML = '&#9679;&#9679;';} 
                if(lett_index >= 23){secure_index.innerHTML = '&#9679;&#9679;&#9679;'; }    
            }
        }
    } else{
        setDisplay(pass_short_err, 'none');
        setDisplay(pass_success, 'none');
        pass_changed_input.style.border = '';
    }
    validateConfirmedPassword();
}

/* If the validation is passed, send the request to the server */
let sendPassForm = () => {
    if(pass_changed_input.value.length == 0 || pass_confirm_changed_input.value.length == 0){
        no_credent_err.style.display = "block";
        pass_changed_input.onkeyup = () => {
            no_credent_err.style.display = "none";
        }
    } else {
        if(pass_changed_input.value.length > 8 && pass_confirm_changed_input.value == pass_changed_input.value){
            let url_location = window.location.href.split('=');
            let information = {
                pass: pass_changed_input.value,
                token: url_location[1]
            }

            let xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/users/change_pass', true);
            xhr.onload = () => {
                if(xhr.status == 200){
                    if(xhr.responseText !== 'err'){
                        blur();
                        pass_changed.style.display = 'block';

                        let redirect = () => {
                            window.location.assign('/');
                        }
                        setTimeout(redirect, 3000);
                    } 
                }
            }

            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
            xhr.send(JSON.stringify(information));
        }
    }
}



executeEvent(forgot_password_link, openPasswordModel);
executeEvent(back_to_login, closePasswordModel);
executeEvent(send__forgot_link, sendPasswordChange);
executeEvent(submit_pass_change_btn, sendPassForm);
executeKeyup(pass_changed_input, validatePassword);
executeKeyup(pass_confirm_changed_input, validateConfirmedPassword);
