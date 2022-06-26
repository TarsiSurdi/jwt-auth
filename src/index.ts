import express from "express";

import prisma from "./database";
// import requestLogger from "./middlewares/RequestLogger";
import routes from "./routes";

const PORT = Number(process.env.PORT) || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

const app = express();

app.use(express.json());
// app.use(requestLogger);
app.use(routes);

app.listen(PORT, HOSTNAME, () => {
  console.log(`🔥 Server started at http://${HOSTNAME}:${PORT}`);
  prisma
    .$connect()
    .then(() => {
      console.log("📦 Successfully connected to database!");
    })
    .catch((err) => {
      console.error("🚫 Database connection error:\n" + err);
    });
});
