const error = require("../config/error");
const messageRoutes = require("../routes/message");

module.exports = (app) => {
  app.use("/v1", messageRoutes);
  app.use(error);
}