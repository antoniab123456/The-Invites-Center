let forgot_pass = () => {

    let login_username = document.querySelector('#login_username'),
    username_incorrect = document.querySelector('#username_incorrect'),
    signin_form = document.querySelector('.signin_form'),
    pass_link = document.querySelector('#pass_link'),
    login_header_p = document.querySelector('#login_header_p'),
    forgot_password_link = document.querySelector('#forgot_password_link'),
    back_to_login = document.querySelector('#back_to_login'),    
    send__forgot_link = document.querySelector('#send__forgot_link'),
    hide_for_pass = document.querySelector('#hide_for_pass'),
    inner_login_modal = document.querySelector('#inner_login_modal');


    /* Open and close the model for resetting the password */
    forgot_password_link.onclick = (e) =>{
        signin_form.reset();
        hide_for_pass.style.display = 'none';
        send__forgot_link.style.display = 'block';
        back_to_login.style.display = 'block';
        login_header_p.style.fontSize = '23px';
        login_header_p.style.marginBottom = '3%';
        login_header_p.innerText = "Enter your email or username";
        inner_login_modal.style.height = '240px';
        e.preventDefault();
    }

    back_to_login.onclick = (e) => {
        hide_for_pass.style.display = 'block';
        send__forgot_link.style.display = 'none';
        back_to_login.style.display = 'none';
        login_header_p.style.fontSize = '';
        login_header_p.innerText = "Sign in";
        inner_login_modal.style.height = '';
        e.preventDefault();
    }



    /* Send the request to the server with the username or email*/
    send__forgot_link.onclick = () =>{
        let value = login_username.value;

        /*  Incorrect username/no username provided error when resetting password */
        let handleForgotErrors = () => {
            username_incorrect.style.display = 'block';
            login_username.style.border = '1px solid #e40808';
            let hideUsernameError = () =>{
                username_incorrect.style.display = '';
                login_username.style.border = '';
            }
            setTimeout(hideUsernameError, 3000);
        }


        if(value.length == 0){
            handleForgotErrors();
        } else {
            let query;

            /* Find out email or username entered*/
            let email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            (email_regex.test(value)) ? query = 'email': query = 'user';
            
            let information = { query: query, value: value }
            /* Functionality */
            let xhr = new window.XMLHttpRequest()
            xhr.open('POST', '/users/forgot/', true);
            xhr.onload = () => {
                if(xhr.status == 200){
                    if(xhr.responseText == 'error'){
                        handleForgotErrors();
                    } else {
                        /* Styles */
                        login_modal.style.display = 'none';
                        pass_link.style.display = 'block';
                    }
                }
            }
            xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
            xhr.send(JSON.stringify(information));
        }
    } 
}

module.exports = forgot_pass;