module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define('Access', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Access.hasMany(models.Document, {
          foreignKey: 'accessId'
        });
      }
    },
    freezeTableName: true,
  });
  return Access;
};
