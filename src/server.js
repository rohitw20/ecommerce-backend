const app = require(".");
const { connectDb } = require("./config/db");

const PORT = 8080;

app.listen(PORT, async () => {
  await connectDb();
  console.log("listening on port : ", PORT);
});
