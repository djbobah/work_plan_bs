const Sequelize = require("sequelize");
const config = require("config");
const chalk = require("chalk");

const modelDangerWork = () => {
  const sequelize = new Sequelize(
    "plan_rabot",
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

  const DangerWorks = sequelize.define(
    "statistic_utv_opasn",
    {
      id: {
        type: Sequelize.TINYINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_rab: { type: Sequelize.INTEGER, allowNull: false },
      user: { type: Sequelize.TEXT, allowNull: false },
      remote_addr: { type: Sequelize.TEXT, allowNull: false },
      date_utv: { type: Sequelize.DATEONLY, allowNull: false },
      time_utv: { type: Sequelize.TIME, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
    },
    { freezeTableName: true }
  );

  sequelize
    .sync()
    .then(() => {
      console.log(chalk.green("DB UTV_DANGER_WORK connection sucessful."));
    })
    .catch((err) => console.log(err));

  return { DangerWorks };
};

module.exports = modelDangerWork;
