const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialet,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log("err" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("../models/productModels")(sequelize, DataTypes);

db.users = require("../models/userModel")(sequelize, DataTypes);

db.loans = require("../models/loanModel")(sequelize, DataTypes);

db.users.hasMany(db.loans, {
  foreignKey: 'user_id',
  as: 'loan'
})

db.loans.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user'
})

db.sequelize.sync({
  force: false,
}).then(() => {
    console.log('yes re-sync done!');
});


module.exports = db;