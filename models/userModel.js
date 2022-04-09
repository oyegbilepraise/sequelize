module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlpha: true,
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 255],
                    msg: 'password must be longer than 6 characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Please enter a valid email address'
                }
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    });

    return User;
}