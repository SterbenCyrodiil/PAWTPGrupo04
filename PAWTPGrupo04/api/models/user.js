const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs');

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

	CC: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    
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
userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/**
 * Disponibiliza um método para permitir comparar a password encriptada
 */
userSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema)