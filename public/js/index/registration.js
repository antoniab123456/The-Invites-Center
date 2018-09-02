let main_reg_btn = document.querySelector('#main_reg_btn'),
    reg_form = document.querySelector('.reg_form'),
    reg_email = document.querySelector('#reg_email'),
    reg_name = document.querySelector('#reg_name'),
    reg_username = document.querySelector('#reg_username'),
    reg_password = document.querySelector('#reg_password'),
    reg_password_confirm = document.querySelector('#reg_password_confirm'),
    email_not_correct_reg = document.querySelector('#email_not_correct_reg'),
    email_taken_reg = document.querySelector('#email_taken_reg'),
    username_taken_reg = document.querySelector('#username_taken_reg'),
    pass_short_reg = document.querySelector('#pass_short_reg'),
    pass_secure_reg = document.querySelector('#pass_secure_reg'),
    secure_index_reg = document.querySelector('#secure_index_reg'),
    pass_not_equal_reg = document.querySelector('#pass_not_equal_reg'),
    pass_equal_reg = document.querySelector('#pass_equal_reg'),
    success_reg = document.querySelector('#success_reg');


/* Validate email dinamically*/
reg_email.onkeyup = (e) => {
    if(e.target.value.length !== 0){
        let email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!email_regex.test(e.target.value)){
            email_not_correct_reg.style.display = 'block';
            e.target.style.border = "1px solid red";
        } else {
            email_not_correct_reg.style.display = 'none';
            e.target.style.border = "";
        }
    } else{
        email_not_correct_reg.style.display = 'none';
        e.target.style.border = "";
    }
}


/* Password validation with the reg form */
let validateConfirmedPassword = () => {
    if(reg_password_confirm.value.length !== 0){
        if(reg_password_confirm.value !== reg_password.value){
            pass_not_equal_reg.style.display = 'block';
            pass_equal_reg.style.display =  'none';
            reg_password_confirm.style.border = '1px solid #e40808';
        } else {
            pass_not_equal_reg.style.display = 'none';
            pass_equal_reg.style.display =  'block';
            reg_password_confirm.style.border = '1px solid #24c24b';
        }
    } else {
        pass_not_equal_reg.style.display = 'none';
        pass_equal_reg.style.display =  'none';
        reg_password_confirm.style.border = '';
    }
}

reg_password_confirm.onkeyup = () => {
    validateConfirmedPassword();
}

/*  Validate the passwords entered and test for security*/
reg_password.onkeyup = (e) => {
    let val = e.target.value;
    if(val.length !== 0) {
        if(val.length < 8){
            pass_short_reg.style.display =  'block';
            pass_secure_reg.style.display =  'none';
            e.target.style.border = '1px solid #e40808';
        } else {
            pass_short_reg.style.display =  'none';
            pass_secure_reg.style.display =  'block';
            e.target.style.border = '1px solid #24c24b';

            if(val.length >= 8){secure_index_reg.innerHTML = '&#9679;';} 
            if(val.length >= 14) { secure_index_reg.innerHTML = '&#9679;&#9679;';} 
            if(val.length >= 23){secure_index_reg.innerHTML = '&#9679;&#9679;&#9679;'; }    
            
        }
    } else{
        pass_short_reg.style.display =  'none';
        pass_secure_reg.style.display =  'none';
        e.target.style.border = '';
    }
    validateConfirmedPassword();
}


/* Cehck if the form is filled in with all the right values, 
if so, send a request to the Server to register */
main_reg_btn.onclick = (e) =>{
    let email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(email_regex.test(reg_email.value) && 
    reg_password.value.length >=8 && 
    reg_password.value == reg_password_confirm.value &&
    reg_username.value !== 0) {
        let information = {
            email: reg_email.value,
            name: reg_name.value,
            username: reg_username.value,
            password: reg_password.value
        }

        let xhr = new window.XMLHttpRequest();

        xhr.open('POST', '/users/register', true);
        xhr.onload = () => {
            if(xhr.status === 200){
                /* Error, the email is already taken */
                if(xhr.response == 'email_exists'){
                    email_taken_reg.style.display = 'block';
                    reg_email.style.border = '1px solid red';
                    setTimeout(() => {
                        email_taken_reg.style.display = 'none';
                        reg_email.style.border = '';
                    }, 2000)
                } 

                /* Error, the username is already taken */
                if(xhr.response == 'username_exists'){
                    username_taken_reg.style.display = 'block';
                    reg_username.style.border = '1px solid red';
                    setTimeout(() => {
                        username_taken_reg.style.display = 'none';
                        reg_username.style.border = '';
                    }, 2000)
                } 

                /* SUCCESSFUULLY registered */
                if(xhr.response == 'success'){ 
                    success_reg.style.display = 'block'; 
                    reg_form.reset(); 
                    main_nav_bar.style.filter = 'blur(5px)';
                    invitation_footer.style.filter = 'blur(5px)';
                    index_container.style.filter = 'blur(5px)'
                    pass_secure_reg.style.display = 'none';
                    pass_equal_reg.style.display =  'none';
                    reg_password_confirm.style.border = '';
                    reg_password.style.border = '';

                    setTimeout(() => {
                        success_reg.style.display = 'none';
                        main_nav_bar.style.filter = 'blur(0px)';
                        invitation_footer.style.filter = 'blur(0px)';
                        index_container.style.filter = 'blur(0px)'
                    }, 3000);
                } 
            }
        }

        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        xhr.send(JSON.stringify(information));
    } else{ 
        /* If fields are empty  */
        if(reg_email.value.length == 0){
            email_not_correct_reg.style.display = 'block';
            reg_email.style.border = "1px solid red";
            setTimeout(() =>{
                email_not_correct_reg.style.display = 'none';
                reg_email.style.border = "";
            }, 3000);
        }

        if(reg_password.value.length == 0){
            pass_short_reg.style.display = 'block';
            reg_password.style.border = "1px solid red";
            setTimeout(() =>{
                pass_short_reg.style.display = 'none';
                reg_password.style.border = "";
            }, 3000);
        }

        if(reg_password_confirm.value.length == 0){
            reg_password_confirm.style.border = "1px solid red";
            setTimeout(() =>{
                reg_password_confirm.style.border = "";
            }, 3000);
        }

        if(reg_username.value.length == 0){
            reg_username.style.border = "1px solid red";
            setTimeout(() => {
                reg_username.style.border = "";
            }, 3000)
        }
    }
    e.preventDefault();
} 