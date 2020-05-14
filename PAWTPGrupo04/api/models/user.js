const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const GenderEnum = Object.freeze({
	Male: 'male',
	Female: 'female',
	Other: 'other',
});

const StateEnum = Object.freeze({
	Suspeito: 'suspeito',
	Infetado: 'infetado',
	Regularizado: 'regularizado'
});

const RolesEnum = Object.freeze({
    Admin: 'admin',
    Tecnico: 'tecnico',
    Utente: 'utente',
});

/**
 * TODO acabar as validações dos atributos
 */
const userSchema = new mongoose.Schema({

	CC: { 
        type: String, 
        unique: true, 
        required: true,
        validate: value => {
            if (!validator.isIdentityCard(value, 'pt-PT')) {
                throw new Error({error: 'Invalid Credit Card address'})
            }
        }
    },
    password: { 
        type: String, 
        required: true 
    },
    
	name:{ type: String, required: true },
	genero: {type: String, required: true, enum: Object.values(GenderEnum)},
	birthdate: {type: Date, required: true},
	phoneNumber:{type: Number, required: true },
	role: { type: String, required: true, enum: Object.values(RolesEnum)},
	estado: {type: String, required:true, enum: Object.values(StateEnum)},
	deleted: {type: Boolean, default: false},
	updated_at: { type: Date, default: Date.now },
})

/** 
 * Para segurança, encripta e guarda a password do user utilizando o Bcrypt.
 */
userSchema.pre('save', async (next) => {
    try {
        const user = this;
        if (this.isModified('password') || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
        next();
    } catch (err) {
        return next(err);
    }
})

/**
 * Disponibiliza um método para permitir comparar a password encriptada
 */
userSchema.methods.comparePassword = async function (passw) {
    return new Promise( async (resolve, reject) => {
        try {
            console.log(passw, "\n",this.password)
            const isPasswValid = await bcrypt.compare(passw, this.password);
            resolve(isPasswValid);
        } catch(err) {
            reject(err);
        }
    })
}

module.exports = mongoose.model('User', userSchema)