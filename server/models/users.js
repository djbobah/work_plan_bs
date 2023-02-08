const Sequelize = require("sequelize");
const config = require("config");
const chalk = require("chalk");

const modelUsers = () => {
  const sequelize = new Sequelize(
    "users",
    config.get("connectPlanRabot.user"),
    config.get("connectPlanRabot.password"),
    {
      dialect: "mariadb",
      host: config.get("connectPlanRabot.host"),
      define: {
        timestamps: false,
      },
    }
  );

  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.TINYINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      tab: { type: Sequelize.INTEGER, allowNull: false },
      id_sl: { type: Sequelize.TEXT, allowNull: false },
      dolzhnost: { type: Sequelize.TEXT, allowNull: false },
      fio: { type: Sequelize.TEXT, allowNull: false },
      date_r: { type: Sequelize.DATE, allowNull: false },
      tel_g: { type: Sequelize.TEXT, allowNull: false },
      DECT: { type: Sequelize.TEXT, allowNull: false },
      tel_gor: { type: Sequelize.TEXT, allowNull: false },
      FAX_g: { type: Sequelize.TEXT, allowNull: false },
      FAX_gor: { type: Sequelize.TEXT, allowNull: false },
      tel_s: { type: Sequelize.TEXT, allowNull: false },
      pol: { type: Sequelize.CHAR, allowNull: false },
      addr: { type: Sequelize.CHAR, allowNull: false },
      email: { type: Sequelize.CHAR, allowNull: false },
      sort: { type: Sequelize.TINYINT, allowNull: false },
      Comment: { type: Sequelize.TEXT, allowNull: true },
      Tabel: { type: Sequelize.INTEGER, allowNull: true },
      uvolen: { type: Sequelize.TINYINT, allowNull: true },
      noplan: { type: Sequelize.TINYINT, allowNull: true },
    },
    { freezeTableName: true }
  );
  const Sluzhba = sequelize.define(
    "sluzhba",
    {
      id: {
        type: Sequelize.TINYINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_sl: { type: Sequelize.TEXT, allowNull: false },
      name: { type: Sequelize.TEXT, allowNull: false },
      sort: { type: Sequelize.TINYINT, allowNull: false },
    },
    { freezeTableName: true }
  );

  sequelize
    .sync()
    .then(() => {
      console.log(chalk.green("DB Users connection sucessful."));
    })
    .catch((err) => console.log(err));

  return { User, Sluzhba };
};

module.exports = modelUsers;
