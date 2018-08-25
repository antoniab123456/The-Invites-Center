
/* Flash error/success messages */

let err_modal = select('.err_modal');

let hideError = () => {
    setDisplay(err_modal, 'none');
} 

let hideSuccess = () => {
    setDisplay(success_modal, 'none');
} 

window.onclick = (e) =>{
    if(e.target == err_modal){
        setDisplay(err_modal, 'none');
        unblur();
    }
    if(e.target == success_modal){
        setDisplay(success_modal, 'none');
        unblur();
    }
}

/* Hide error/success models after they appear */
document.onreadystatechange = () => {
    if (document.readyState == "interactive") {
        if(err_modal !== null){
            setTimeout(hideError, 3000);
        }
        if(success_modal !== null){
            setTimeout(hideSuccess, 5000);
        }
    }
}
