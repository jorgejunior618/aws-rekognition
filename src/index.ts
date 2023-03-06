import express, { json, urlencoded } from "express";
import dotenv  from 'dotenv';
import routes from "./routes";

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes);
// app.use(authRoute);
// app.use(errorHandler);

app.listen(30001, () => {
  console.log("Aplicação executando em:");
  console.log("http://localhost:30001/");
});
