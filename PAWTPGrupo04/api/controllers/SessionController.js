const jwt = require('jsonwebtoken')

const User = require('../models/user')

const signInUser = async (req, res, next) => {
    const user = await User.findOne({ CC: req.body.CC }, '+password').catch(next);

    if (!user) 
    { // utilizador não encontrado
        next({
            message: 'Authentication failed! User is not registered.',
            status: 404
        })
    } else 
    { // verificar se a password está correta
        const isValid = await user.comparePassword(req.body.password).catch(next);

        if (isValid) 
        { // se o utilizador for encontrado e a password estiver correta, gera o token
            var token = jwt.sign({_id: user._id, CC: user.CC, role: user.role}, process.env.JWT_SECRET);
            res.cookie('session', token,
                {
                    expires: new Date(Date.now() + process.env.SESSION_EXP),
                    httpOnly: true
                }
            )
            // ## No futuro isto será alterado para utilização de headers possivelmente
            res.json({
                user: { cc: user.CC, role: user.role },
                token: 'JWT ' + token
            });
        } else {
            next({
                message: 'Authentication failed. Wrong password.',
                status: 401
            })
        }
    }
}

const getLoggedUser = async (req, res) => {
    if (req.session) {
        const user = await User.findById(req.session._id)
            .catch((e) => {
                return null
            });
        res.json(user);
    } else {
        next({
            message: 'You should be logged in to retrieve the info',
            status: 401
        })
    }
}

const signOutUser = (req, res) => {
    if (req.session) {
        // Remover a cookie armazenada com a informação do Token de login
        res.clearCookie('session')
        res.send("Session cleared. User signed out successfully");
    } else {
        res.send("No session is active at the moment")
    }
}

module.exports = {
    signInUser,
    getLoggedUser,
    signOutUser
}