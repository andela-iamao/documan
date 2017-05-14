export default function (sequelize, DataTypes) {
  const Blacklist = sequelize.define('Blacklist', {
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Blacklist;
}
