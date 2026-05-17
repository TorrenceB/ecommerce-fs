import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "#routes"

import { logger } from "#utility"
import errorHandler from "#middleware/error-handler";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', routes)
app.use(logger);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
