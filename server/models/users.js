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
          args: ['^[a-z0-9_.]+$', 'i'],
          msg: 'username must contains only letters, numbers, "." and "_"'
        },
        len: {
          args: [4, 16],
          msg: 'username cannot be less than 4 or greater than 16 characters'
        },
        hasLetters(value) {
          if (!/[a-z]/i.test(value)) {
            throw new Error('username must contain letters');
          }
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
        },
        hasOneSymbol(value) {
          if (value.replace(/[^-]/g, '').length > 1) {
            throw new Error('firstname cannot have more than one -');
          } else if (value.replace(/[^']/g, '').length > 1) {
            throw new Error('firstname cannot have more than one \'');
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
          msg: 'lastname can only contain letters and/or - and \''
        },
        len: {
          args: [2, 16],
          msg: 'lastname cannot be less than 2 or greater than 16 characters'
        },
        hasLetters(value) {
          if (!/[a-z]/i.test(value)) {
            throw new Error('lastname must contain letters');
          }
        },
        hasOneSymbol(value) {
          if (value.replace(/[^-]/g, '').length > 1) {
            throw new Error('lastname cannot have more than one -');
          } else if (value.replace(/[^']/g, '').length > 1) {
            throw new Error('lastname cannot have more than one \'');
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
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
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate(user) {
        if (user.password) {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
          user.updatedAt = Date.now();
        }
      },
      beforeBulkUpdate(users) {
        if (users.attributes && users.attributes.password) {
          const salt = bcrypt.genSaltSync();
          const password = users.attributes.password;
          users.attributes.password = bcrypt.hashSync(password, salt);
        }
      }
    },
    classMethods: {
      associate(models) {
        Users.belongsTo(models.Roles, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
        Users.hasMany(models.Document, {
          foreignKey: {
            name: 'ownerId',
            allowNull: false,
            onDelete: 'CASCADE'
          }
        });
        Users.hasMany(models.Folders, {
          foreignKey: {
            name: 'ownerId',
            allowNull: false,
            onDelete: 'CASCADE'
          }
        });
      }
    },
    instanceMethods: {
      isPassword: (encodedPassword, password) =>
        bcrypt.compareSync(password, encodedPassword)
    }
  });
  return Users;
};
