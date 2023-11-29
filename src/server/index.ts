import cors from "cors";
import morgan from "morgan";
import pingRouter from "../feature/ping/router/pingRouter.js";
import app from "./app.js";
import { corsOptions } from "./utils/corsOptions.js";
import {
  generalError,
  endpointNotFound,
} from "./middleware/errorMiddleware.js";
import gamesRouter from "../feature/games/router/gamesRouter.js";

app.use(cors(corsOptions));
app.use(morgan("dev"));

app.get("/", pingRouter);
app.use("/games", gamesRouter);
app.use(endpointNotFound);
app.use(generalError);
