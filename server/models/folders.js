export default (sequelize, DataTypes) => {
  const Folders = sequelize.define('Folders', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This folder is already exists'
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Folders.hasMany(models.Document, { foreignKey: 'folderId' });
        Folders.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        // associations can be defined here
      }
    }
  });
  return Folders;
};
