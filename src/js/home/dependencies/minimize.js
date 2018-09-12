let minimizeConvo = (convo_div, receiver, response, container) => {
    convo_div.style.display = 'none';
    
    /* Clone the convo preview in the html */
    let convo_preview = document.querySelector('.convo_preview');
    let new_convo_preview = convo_preview.cloneNode(true);
    new_convo_preview.style.display = 'block';
    new_convo_preview.setAttribute('id', `preview_${receiver}`);

    if(response.profile_img){     
        let preview_img = new_convo_preview.querySelector(".preview_convo_profile_image");
        preview_img.style.background = `url("/users/image?image=${response.profile_img}") no-repeat center`;
        preview_img.style.backgroundSize = 'cover';
    } 
    
    let user_name_panel  = new_convo_preview.querySelector(".user_name_panel");
    user_name_panel.innerText = response.username;
    container.appendChild(new_convo_preview);

    new_convo_preview.onclick = () => {
        convo_div.style.display = 'block';
        new_convo_preview.remove();
    }


    let close_chat_preview = new_convo_preview.querySelector(".close_chat_preview");

    close_chat_preview.onclick = () => {
        convo_div.remove();
        return false;
    }
}

module.exports = minimizeConvo;