/* Invitation Generation link */

let invite_users_btn = select('#invite_users_btn');
let gen_link_model = select('#gen_link_model');
let get_link_close = select('#get_link_close');

let displayGenModal = () => {
    setDisplay(gen_link_model, 'block');
    blur();
}

let closeGenModal = () => {
    setDisplay(gen_link_model, 'none');
    unblur();
}

executeEvent(invite_users_btn, displayGenModal)
executeEvent(get_link_close, closeGenModal)

