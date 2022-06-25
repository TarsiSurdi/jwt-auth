import { PrismaClient } from "@prisma/client";
import express from "express";
import routes from "./routes";

const PORT = Number(process.env.PORT) || 3000;
const HOSTNAME = process.env.HOST || "localhost";

export const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, HOSTNAME, () => {
  console.log(`🔥 Server started at http://${HOSTNAME}:${PORT}`);
  prisma
    .$connect()
    .then(() => {
      console.log("📦 Succesfully connected to database!");
    })
    .catch((err) => {
      console.error("🚫 Database connection error:\n" + err);
    });
});
