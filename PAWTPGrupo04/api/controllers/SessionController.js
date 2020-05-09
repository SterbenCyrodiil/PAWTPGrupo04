const jwt = require('jsonwebtoken')
const passport = require('passport');

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ // procurar pelo utilizador
            CCutente: req.body.CCutente
        })

        if (!user) 
        { // utilizador não encontrado
            res.status(401).send({
                success: false, 
                msg: 'Authentication failed. User not found.'
            });
        } else 
        { // verificar se a password está correta
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // se o utilizador for encontrado e a password estiver correta, gera o token
                    var token = jwt.sign(user, process.env.JWT_SECRET);
                    // criar cookie para retorno do token para o cliente
                    res.cookie(
                        'user-session',
                        jwtToken,
                        {
                            expires: new Date(Date.now() + process.env.SESSION_EXP),
                            httpOnly: true
                        }
                    )
                    res.status(200).json({
                        success: true, 
                        token: 'JWT ' + token
                    });             
                } else { // password incorreta
                    res.status(401).send({
                        success: false, 
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.json(null);
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('user-session')
    res.status(200).json({ 
        success: 'true' 
    })
}

module.exports = {
    loginUser,
    logoutUser
}