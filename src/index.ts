import express, { json, urlencoded } from "express";

import routes from "./routes";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes);
// app.use(authRoute);
// app.use(errorHandler);

app.listen(3000, () => {
  console.log("Aplicação executando em:");
  console.log("http://localhost:3000/");
});
