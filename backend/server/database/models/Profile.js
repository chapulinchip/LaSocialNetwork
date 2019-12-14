const {sequelize} = require('../database');
const {DataTypes} = require('sequelize');
const {User} = require('./User');

const Profile = sequelize.define('Profile',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: User,
                key: 'username'
            }
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coverPhotoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profilePhotoUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
);

module.exports = {Profile};