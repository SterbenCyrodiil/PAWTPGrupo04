const jwt = require('jsonwebtoken')

const User = require('../models/user')

const signInUser = async (req, res) => {
    
    try {
        const user = await User.findOne({ // procurar pelo utilizador
            CC: req.body.CC
        })

        if (!user) 
        { // utilizador não encontrado
            res.status(401).json({success: false, msg: 'Authentication failed! User is not registered.'});
        } else 
        { // verificar se a password está correta
            const isValid = await user.comparePassword(req.body.password);

            if (isValid) 
            { // se o utilizador for encontrado e a password estiver correta, gera o token
                var token = jwt.sign({_id: user._id, CC: user.CC, role: user.role}, process.env.JWT_SECRET);
                res.cookie( // criar cookie para retorno do token para o cliente
                    'user_session',
                    token,
                    {
                        expires: new Date(Date.now() + process.env.SESSION_EXP),
                        httpOnly: true
                    }
                )
                // ## No futuro isto será alterado para utilização de headers possivelmente
                res.status(200).json({success: true, token: 'JWT ' + token});
            } else {
                res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        }
    } catch (err) {
        console.log(err);
        res.json({success: false, msg: 'Authentication failed. Something went wrong with your request.'});
    }
}

const getLoggedUser = async (req, res) => {
    // ## Não há verificações uma vez que o middleware já se encarregou de erro de autenticação
    const user = await User.findById(
        req.user_data._id, "CC name genero birthdate phoneNumber role");
    res.status(200).json(user);
}

const signOutUser = (req, res) => {
    // Remover a cookie armazenada com a informação do Token de login
    // ## No futuro isto será alterado para utilização de headers possivelmente
    res.clearCookie('user_session')
    res.status(200).send("User signed out successfully.");
}

module.exports = {
    signInUser,
    getLoggedUser,
    signOutUser
}