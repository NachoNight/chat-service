module.exports = app => {
  app.get("/", (_, res) => res.send("NachoNight Chat Service"));
};
