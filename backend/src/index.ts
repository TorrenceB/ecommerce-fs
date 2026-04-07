import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "#routes"
import { logger } from "#utility"

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors());
app.use('/', routes)
app.use(logger);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
