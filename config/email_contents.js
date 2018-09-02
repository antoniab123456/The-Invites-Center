

let message = {
    emailVerification: (token) => { 
        let contents = {
            subject: 'Email confirmation',
            text: `Click on the link to confirm your email: http://localhost:4000/users/verify?token=${token}!`,
        }

        return contents;
    },
    forgotPassword: (token) => {
        let contents = {
                subject: 'Password Reset',
                text: `You are receiving this email because you requested a password change in your account. <br> <br>
                Please, follow the link to reset your password: http://localhost:4000/users/change_pass?token=${token}
                <br> <br> <br>Ignore this email if you didn't request the change!`
        }

        return contents;
    },
    passwordChanged: {
        subject: 'Password Changed',
        text: `The password in your account was successfully changed!<br><br>
        If you didn't request the change, please, contact support: support@invites.center.com`
    }
}

module.exports = message;