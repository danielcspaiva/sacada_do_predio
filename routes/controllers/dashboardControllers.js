const User = require('../../models/User');
const Case = require('../../models/Case')

let dashboradControllers = {
    //GET DASHBOARD
    getDashboard: (req, res, next) => {
        let { user } = req.session.passport;
        User.findById(user)
        .then( user => {
            console.log(user);
            res.render('dashboard/dashboard', { user: user });
        })
        .catch(error => console.log(error));
    },
    //GET DASHBOARD/CREATE
    getNewCase: (req, res, next) => {
        res.render('dashboard/new-case');
    },
    //POST DASHBOARD/CREATE
    postNewCase:  (req, res, next) => {
        let { user } = req.session.passport;
        
        const {
            title,
            description,
            address,
        } = req.body;
        
        if (req.file) {
            const {
                originalname,
                url
            } = req.file;
            
            Case.create({
                title: title,
                description: description,
                imageName: originalname,
                imageUrl: url,
                user: user,
                address: address
            })
            .then( response => {
                console.log(response);
                User.findByIdAndUpdate(user, { $push: {casesCreated: response}})
                .then( response => {
                    console.log(response)
                    res.redirect('/dashboard');
                })
                .catch( error => console.log(error))
            })
            .catch(error => console.log(error));
        } else {
            Case.create({
                title: title,
                description: description,
                user: user,
                address: address
            })
            .then( response => {
                console.log(response);
                User.findByIdAndUpdate(user, { $push: {casesCreated: response}})
                .then( response => {
                    console.log(response)
                    res.redirect('/dashboard');
                })
                .catch( error => console.log(error))
            })
            .catch(error => console.log(error));
        }
    }
    //DELETE DASHBOARD/DELETE/:ID
    //GET DASHBOARD/EDIT/:ID
    //POST DASHBOARD/EDIT/:ID
}

module.exports = dashboradControllers;