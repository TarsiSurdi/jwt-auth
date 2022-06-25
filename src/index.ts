import express from "express";
import routes from "./routes";

const PORT = Number(process.env.PORT) || 3000;
const HOSTNAME = process.env.HOST || "localhost";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, HOSTNAME, () => {
  console.log(`🔥 Server started at http://${HOSTNAME}:${PORT}`);
});
