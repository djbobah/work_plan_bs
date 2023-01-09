const Sequelize = require("sequelize");

const modelAuto = () => {
  const sequelize = new Sequelize("transport", "root", "Kamensk", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false,
    },
  });

  const Avtos = sequelize.define(
    "avto",
    {
      id: {
        type: Sequelize.TINYINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );

  const Gn = sequelize.define(
    "gn",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      marka: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nomer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      archive: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    },
    { freezeTableName: true }
  );
  // Gn.hasOne(Avtos);

  sequelize
    .sync()
    .then(() => {
      console.log("DB connection sucessful.");
    })
    .catch((err) => console.log(err));

  // console.log("aaaaaaaaaaaaaa", Avtos);
  return { Avtos, Gn };
};

module.exports = modelAuto;
