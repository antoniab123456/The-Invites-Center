
let pass_success = document.querySelector('#pass_success'),
    secure_index = document.querySelector('#secure_index'),
    pass_changed_input = document.querySelector('#pass_changed_input'),
    pass_not_equal_err = document.querySelector('#pass_not_equal_err'),
    pass_equal = document.querySelector('#pass_equal'),
    pass_confirm_changed_input = document.querySelector('#pass_confirm_changed_input'),
    submit_pass_change_btn = document.querySelector('#submit_pass_change_btn'),
    no_credent_err = document.querySelector('#no_credent_err');


/* Password validation when entered into the change pass form. Check values on keyup */
/* Validate confirmed password */
let validateConfirmedPassword = () => {
    if(pass_confirm_changed_input.value.length > 0){
        if(pass_confirm_changed_input.value !== pass_changed_input.value){
            pass_not_equal_err.style.display = 'block';
            pass_equal.style.display =  'none';
            pass_confirm_changed_input.style.border = '1px solid #e40808';
        } else {
            pass_not_equal_err.style.display = 'none';
            pass_equal.style.display =  'block';
            pass_confirm_changed_input.style.border = '1px solid #24c24b';
        }
    } else {
        pass_not_equal_err.style.display = 'none';
        pass_equal.style.display =  'none';
        pass_confirm_changed_input.style.border = '';
    }
}

pass_confirm_changed_input.onkeyup = () => {
    validateConfirmedPassword();
}

/*  Validate the passoowrds entered and test for security*/
pass_changed_input.onkeyup = () => {
    let e = pass_changed_input.value;
    if(e.length > 0) {
        if(e.length < 8){
            pass_short_err.style.display =  'block';
            pass_success.style.display =  'none';
            pass_changed_input.style.border = '1px solid #e40808';
        } else {
            pass_short_err.style.display =  'none';
            pass_success.style.display =  'block';
            pass_changed_input.style.border = '1px solid #24c24b';

        
            if(e.length >= 8){secure_index.innerHTML = '&#9679;';} 
            if(e.length >= 14) { secure_index.innerHTML = '&#9679;&#9679;';} 
            if(e.length >= 23){secure_index.innerHTML = '&#9679;&#9679;&#9679;'; }    
            
        }
    } else{
        pass_short_err.style.display =  'none';
        pass_success.style.display =  'none';
        pass_changed_input.style.border = '';
    }
    validateConfirmedPassword();
}


/* If the validation is passed, send the request to the server */
submit_pass_change_btn.onclick = () => {
    if(pass_changed_input.value.length == 0 || pass_confirm_changed_input.value.length == 0){
        no_credent_err.style.display = "block";
        pass_changed_input.onkeyup = () => {
            no_credent_err.style.display = "none";
        }
    } else {
        if(pass_changed_input.value.length > 8 && pass_confirm_changed_input.value == pass_changed_input.value){

            let url_location = window.location.href.split('=');
            let information = { pass: pass_changed_input.value, token: url_location[1] }
          
            let xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/users/change_pass', true);
            xhr.onload = () => {
                if(xhr.status == 200){
                    if(xhr.responseText !== 'err'){
                        main_nav_bar.style.filter = 'blur(5px)';
                        pass_change_main_container.style.filter = 'blur(5px)';
                        invitation_footer.style.filter = 'blur(5px)';
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

