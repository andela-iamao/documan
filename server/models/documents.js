module.exports = (sequelize, DataType) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataType.STRING,
      allowNull: false
    },
    content: {
      type: DataType.TEXT,
      allowNull: false
    },
    accessId: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    ownerId: {
      type: DataType.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        Document.belongsTo(models.Access, {
          foreignKey: 'accessId'
        });
      }
    }
  });
  return Document;
};
