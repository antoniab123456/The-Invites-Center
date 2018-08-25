let main = {
    getIndex: (req, res) => {
        res.render('index');
    },
    getInvite: (req,res) => {
        res.render('invitation');
    },
    getHome: (req, res) => {
        res.render('admin');
    },
    notFound: (req, res) => {
        res.render('notfound');
    }
}

module.exports = main;