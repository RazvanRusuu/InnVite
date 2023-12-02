import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running ${port}`);
});
