"use strict";
module.exports = (sequelize, DataTypes, User) => {
    return sequelize.define('Token', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });
};
