const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

const userSchema = new mongoose.Schema({

	CC: { type: String, unique: true, required: true,validate: {
        validator: function(value) {
            return new Promise( function (resolve, reject) {
                const isValid = /^[0-9]{8} [0-9] [A-Z]{2}[0-9]$/.test(value);
                if (isValid) {
                    resolve(true);
                } else {
                    reject(new Error(`${value} não é um número de CC válido!`));
                }
            });
        }
    }},
    password: { type: String, required: true, minlength: 6, maxlength: 36 },
    
    name:{ type: String, required: true },
	genero: {type: String, required: true, enum: Object.values(GenderEnum)},
	birthdate: {type: Date, required: true},
    phoneNumber:{type: Number, required: true, validate: {
        validator: function(value) {
            return new Promise( function (resolve, reject) {
                const isValid = /^(9[1236][0-9]) ?([0-9]{3}) ?([0-9]{3})$/.test(value);
                if (isValid)
                    resolve(true);
                else
                    reject(new Error(`${value} não é um número de telefone válido!`));
            })
        }
    }},
	role: { type: String, required: true, default: 'utente', enum: Object.values(RolesEnum)},
	estado: {type: String, required:true, default: 'suspeito', enum: Object.values(StateEnum)},
	deleted: {type: Boolean, default: false},
	updated_at: { type: Date, default: Date.now },
})

/** 
 * Para segurança, encripta e guarda a password do user utilizando o Bcrypt.
 */
userSchema.pre('save', async function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
})

/**
 * Disponibiliza um método para permitir comparar a password encriptada
 */
userSchema.methods.comparePassword = async function (passw) {
    return new Promise( async (resolve, reject) => {
        try {
            const isPasswValid = await bcrypt.compare(passw, this.password);
            resolve(isPasswValid);
        } catch(err) {
            reject(err);
        }
    })
}

module.exports = mongoose.model('User', userSchema)