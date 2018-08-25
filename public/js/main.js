let select = (sel) => {return document.querySelector(sel)};

let login_main_button = select('#login_main_button'),
    reg_exiting_acc_login = select('#reg_exiting_acc_login'),
    index_container = select('#index_container'),
    login_modal = select('#login_modal'),
    main_nav_bar = select('#main_nav_bar'),
    admin_home_main_container = select('#admin_home_main_container'),
    notfound_main_container = select('#notfound_main_container'),
    close_login_modal = select('#close_login_modal'),
    invitation_footer = select('#invitation_footer'),
    success_modal = select('.success_modal'),
    pass_change_main_container = select('#pass_change_main_container'),
    suc_login_btn = select('.suc_login_btn');

let setBlur = (el, blur) => { if(el !== null){el.style.filter = `blur(${blur}px)`}};
let setDisplay = (el, display) => { if(el !== null){el.style.display = display}};
let executeEvent = (el, cb) => {if(el !== null){el.onclick = () => {cb()}}};
let executeKeyup = (el, cb) => {if(el !== null){el.onkeyup = () => {cb()}}};

let blur = () => {
    setBlur(index_container, 5);
    setBlur(main_nav_bar, 5);
    setBlur(admin_home_main_container, 5);
    setBlur(notfound_main_container, 5);
    setBlur(pass_change_main_container, 5);
    setBlur(invitation_footer, 5);
}

let unblur = () => {
    setBlur(index_container, 0);
    setBlur(main_nav_bar, 0);
    setBlur(admin_home_main_container, 0);
    setBlur(notfound_main_container, 0);
    setBlur(pass_change_main_container, 0);
    setBlur(invitation_footer, 0);
}

let openLoginModal = () => {
    setDisplay(login_modal, 'block');
    setDisplay(success_modal,'none');
    blur();
}

let closeLoginModal = () =>{
    setDisplay(login_modal, 'none');
    unblur();
}


executeEvent(login_main_button, openLoginModal);
executeEvent(close_login_modal,  closeLoginModal);
executeEvent(reg_exiting_acc_login, openLoginModal);
executeEvent(suc_login_btn, openLoginModal);

