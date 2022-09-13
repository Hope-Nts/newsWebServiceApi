const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Web service running on ${port}...`);
});
