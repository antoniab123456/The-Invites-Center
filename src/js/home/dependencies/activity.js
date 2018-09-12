

/* The track activity function that will display the online/offline status of users */
let trackActivity = (activity, display) => {
    if(activity){
        let users_rendered = document.querySelector(`#each_user${activity}`);
        let convo_attr = document.querySelector(`#convo_${activity}`);
        let preview_user = document.querySelector(`#preview_${activity}`);
        
        if(users_rendered){
            let online_status_each_user = users_rendered.querySelector('.online_status_each_user');
            online_status_each_user.style.display = display;
        }

        if(convo_attr){
            let online_status_convo = convo_attr.querySelector('.online_status_convo');
            online_status_convo.style.display = display;
        }

        if(preview_user){
            let online_status = preview_user.querySelector('.online_status');
            online_status.style.display = display;
        }
    }
}

module.exports = trackActivity;