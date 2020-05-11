const jwt = require('jsonwebtoken')

const User = require('../models/user')

const signInUser = async (req, res) => {
    try {
        const user = await User.findOne({ // procurar pelo utilizador
            CCutente: req.body.CCutente
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
                    'user-session',
                    jwtToken,
                    {
                        expires: new Date(Date.now() + process.env.SESSION_EXP),
                        httpOnly: true
                    }
                )
                res.status(200).json({success: true, token: 'JWT ' + token});
            } else 
            { // password incorreta
                res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'});
            }
        }
    } catch (err) { // Bad Request, dados do request inválidos
        console.log(err);
        res.status(400).json(null);
    }
}

const getLoggedUser = async (req, res) => {
    // res.json(req.user_data)
    if (req.user_data) {
        const user = await User.findById(req.user_data._id, "CC name genero birthdate phoneNumber role");
        res.status(200).send(user);
    }
    // O Middleware já se encarregou de criar o "response" no caso de erros de autenticação
}

const signOutUser = (req, res) => {
    // Remover a cookie armazenada com a informação do Token de login
    res.clearCookie('user-session')
    res.status(200).json({ 
        success: 'true' 
    })
}

module.exports = {
    signInUser,
    getLoggedUser,
    signOutUser
}