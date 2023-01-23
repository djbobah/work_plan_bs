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
      id_sl: { type: Sequelize.TEXT, allowNull: true },
      id_object: { type: Sequelize.INTEGER, allowNull: true },
      id_vid_rabot: { type: Sequelize.INTEGER, allowNull: true },
      id_podr_org: { type: Sequelize.INTEGER, allowNull: true },
      sposob: { type: Sequelize.CHAR, allowNull: false },
      Brigada: { type: Sequelize.TEXT, allowNull: false },
      st_brigadi: { type: Sequelize.CHAR, allowNull: false },
      avto: { type: Sequelize.INTEGER, allowNull: false },
      vipolneno: { type: Sequelize.TINYINT, allowNull: false },
      Prichina_nevipol: { type: Sequelize.TEXT, allowNull: false },
      data_rabot: { type: Sequelize.DATEONLY, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
      id_gn: { type: Sequelize.TINYINT, allowNull: false },
      OPASN: { type: Sequelize.TINYINT, allowNull: false },
      utv_avto: { type: Sequelize.TINYINT, allowNull: false },
      utv_opasn: { type: Sequelize.TINYINT, allowNull: false },
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
