
/* Layout page functions */
let main = require('./layout/main.js');
let flash = require('./layout/flash.js');
let forgot_pass = require('./layout/forgot_pass.js');
let home_page = require('./layout/home_page.js');


/* Home page functions */
let users_load = require('./home/users_load');
let chat = require('./home/chat');
let emoji = require('./home/emoji');
let gen_invite = require('./home/gen_invite');

/* Index page functions */
let registration = require('./index/registration');

/* Pass_change page functions */
let change_pass = require('./pass_change/change_pass');

/* Profile settings page functions */
let profile = require('./profile_settings/profile');
let delete_img = require('./profile_settings/delete_img.js');

console.log('webpack works');