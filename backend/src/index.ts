import express from "express";
import cors from "cors";
import routes from "#routes"
import supabase from "#database";
import { logger } from "#utility"

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use('/', routes)

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
