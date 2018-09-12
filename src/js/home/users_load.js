let users_load = () => {

    let all_users_ul  = document.querySelector('#all_users_ul');

    document.onreadystatechange = () => {
        if (document.readyState == "interactive") {
            if(all_users_ul){
                fetch('/users/get_users', {
                    credentials: 'include'
                }).then((res) => {
                    res.json().then((users) => {
                        users.forEach((user) => {
                            let eachuser = document.querySelector('.eachuser');
                            let new_each_user = eachuser.cloneNode(true);
                            new_each_user.style.display = 'block';
                            let users_list_item = new_each_user.querySelector('.each_user_list');
                            users_list_item.setAttribute('id', `receiver_id${user._id}`);
        
                            let user_link = users_list_item.querySelector('.username_link_chat');
                            user_link.setAttribute('href', `/users/conversation?receiver=${user._id}`);
                            user_link.innerText = user.username;
        
                            if(user.profile_img){
                                let profile_img = new_each_user.querySelector('.profile_avatar_each');
                                profile_img.style.background = `url('/users/image?image=${user.profile_img}') no-repeat center`;
                                profile_img.style.backgroundSize = 'cover';
                            }
        
                            let online_stat = new_each_user.querySelector(".online_status_each_user");
                            
                            if(user.status == 'online'){
                                online_stat.style.display = 'block';
                            } else {
                                online_stat.style.display = 'none';
                            }
                            
                            all_users_ul.appendChild(new_each_user);
                        });
                    });
                });
            }
        }
    }
    
    
}

module.exports = users_load();