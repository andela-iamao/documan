module.exports = (sequelize, DataType) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    content: {
      type: DataType.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.Users);
      }
    }
  });
  return Document;
};
