import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough(val) {
          if (val.length < 5) {
            throw new Error('username cannot be less than 5');
          }
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email is already in use'
      },
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough(val) {
          if (val.length < 8) {
            throw new Error('password cannot be less than 8 characters');
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Document);
      },
      isPassword: (encodedPassword, password) =>
        bcrypt.compareSync(password, encodedPassword)
    }
  });
  return Users;
};
