import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This username is already in use'
      },
      validate: {
        is: {
          args: ['^[a-z0-9_]+$', 'i'],
          msg: 'username cannot contain symbols or spaces except _'
        },
        len: {
          args: [4, 8],
          msg: 'username cannot be less than 4 or greater than 8 characters'
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z\'-]+$', 'i'],
          msg: 'firstname can only contain letters and/or - and \''
        },
        len: {
          args: [2, 16],
          msg: 'firstname cannot be less than 2 or greater than 16 characters'
        },
        hasLetters(value) {
          if (!/[a-z]/i.test(value)) {
            throw new Error('firstname must contain letters');
          }
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z\'-]+$', 'i'],
          msg: 'lastname can only contain letters and/or \' and -'
        },
        len: {
          args: [2, 16],
          msg: 'lastname cannot be less than 2 or greater than 16 characters'
        },
        hasLetters(value) {
          if (!/[a-z]/i.test(value)) {
            throw new Error('lastname must contain letters');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email is already in use'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email is not valid'
        },
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
