const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const moment = require('moment')

const userSchema = new mongoose.Schema({

	CC: { 
        type: String, unique: true, required: true, 
        validate: {
            validator: function(cc) {
                const re = /^[0-9]{8} [0-9] [A-Z]{2}[0-9]$/;
                return re.test(cc)
            }
        }
    },
    password: { 
        type: String, required: true, minlength: 7,
        select: false // Prevent password from being populated
    },
    firstName:{ 
        type: String, required: true 
    },
    lastName:{ 
        type: String, required: true 
    },
    genero: { 
        type: String, required: true, 
        enum: ['MALE', 'FEMALE', 'OTHER']
    },
	birthdate: { 
        type: Date, required: true
    },
    email: { 
        type: String, unique: true, required: true,
        validate: {
            validator: function(email) {
                const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email);
            }
        }
    },
    phoneNumber: { 
        type: Number, required: true,
        validate: {
            validator: function(phone) {
                const re = /^(9[1236][0-9]) ?([0-9]{3}) ?([0-9]{3})$/;
                return re.test(phone);
            }
        }
    },

    role: { 
        type: String, required: true, default: 'UTENTE', 
        enum: ['ADMIN', 'TECNICO', 'UTENTE']
    },
	estado: {
        type: String, required: true, default: 'SUSPEITO', 
        enum: ['INFETADO', 'SUSPEITO', 'REGULARIZADO'],
        select: false // Prevent from being populated
    },

    deleted: { type: Boolean, default: false,
        select: false // Prevent from being populated
    },
	updated_at: { type: Date, default: moment().format() },
})

/** 
 * Encripta e guarda a password do User utilizando o Bcrypt, antes de realizar 'save'
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
    const isPasswValid = await bcrypt.compare(passw, this.password);
    return isPasswValid;
    // # Qualquer erro encontrado é automaticamente inserido na Promisse chain pelo 'async'
    // return new Promise( async (resolve, reject) => {
    //     try {
    //         const isPasswValid = await bcrypt.compare(passw, this.password);
    //         resolve(isPasswValid);
    //     } catch(err) {
    //         reject(err);
    //     }
    // })
}

module.exports = mongoose.model('User', userSchema)