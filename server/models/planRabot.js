const Sequelize = require("sequelize");
const config = require("config");
const chalk = require("chalk");

const modelPlanRabot = () => {
  const sequelize = new Sequelize(
    "plan_rabot",
    config.get("connectPlanRabot.user"),
    config.get("connectPlanRabot.password"),
    {
      dialect: "mysql",
      host: config.get("connectPlanRabot.host"),
      define: {
        timestamps: false,
      },
    }
  );

  const Object = sequelize.define(
    "object",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.TEXT, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
    },
    { freezeTableName: true }
  );
  const PodrOrg = sequelize.define(
    "podr_org",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.TEXT, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
    },
    { freezeTableName: true }
  );
  const VidRabot = sequelize.define(
    "vid_rabot",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.TEXT, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
      id_sl: { type: Sequelize.TEXT, allowNull: true },
    },
    { freezeTableName: true }
  );

  const Plan = sequelize.define(
    "plan",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_sl: { type: Sequelize.TEXT, allowNull: false },
      id_object: { type: Sequelize.INTEGER, allowNull: false },
      id_vid_rabot: { type: Sequelize.INTEGER, allowNull: false },
      id_podr_org: { type: Sequelize.INTEGER, allowNull: true },
      sposob: { type: Sequelize.CHAR, allowNull: false },
      Brigada: { type: Sequelize.TEXT, allowNull: true },
      st_brigadi: { type: Sequelize.TEXT, allowNull: true },
      avto: { type: Sequelize.INTEGER, allowNull: true },
      vipolneno: { type: Sequelize.TINYINT, allowNull: true },
      Prichina_nevipol: { type: Sequelize.TEXT, allowNull: true },
      data_rabot: { type: Sequelize.DATEONLY, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
      id_gn: { type: Sequelize.TINYINT, allowNull: true },
      OPASN: { type: Sequelize.TINYINT, allowNull: true },
      utv_avto: { type: Sequelize.TINYINT, allowNull: true },
      utv_opasn: { type: Sequelize.TINYINT, allowNull: true },
    },
    { freezeTableName: true }
  );

  sequelize
    .sync()
    .then(() => {
      console.log(chalk.green("DB !PLAN RABOT! connection sucessful."));
    })
    .catch((err) => console.log(err));

  return { Object, PodrOrg, VidRabot, Plan };
};

module.exports = modelPlanRabot;
