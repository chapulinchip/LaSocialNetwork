const {sequelize} = require('../database');
const {DataTypes} = require('sequelize');
const {getJWTFromId} = require('../../middleware/authenticate');

const ENUM_EMAIL = 'email';
const ENUM_FACEBOOK = 'facebook';
const ENUM_GOOGLE = 'google';

const User = sequelize.define('User',
    {
        id: {
            type: DataTypes.BLOB,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        typeLogin: {
            type: DataTypes.ENUM(ENUM_EMAIL, ENUM_FACEBOOK, ENUM_GOOGLE),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        lastConnection: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        language: {
            type: DataTypes.ENUM('en', 'es', 'fr'),
            allowNull: false,
            defaultValue: 'en'
        }
    }
);

User.prototype.generateAccessToken = function () {
    const id = this.dataValues.id;
    return getJWTFromId(id);
};

module.exports = {User};