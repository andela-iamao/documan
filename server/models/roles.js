module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'roles can only contain letters'
        },
        notEmpty: {
          msg: 'title field cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Roles.hasMany(models.Users, { foreignKey: 'roleId' });
        // associations can be defined here
      }
    }
  });
  return Roles;
};
