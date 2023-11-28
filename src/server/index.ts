import cors from "cors";
import morgan from "morgan";
import pingRouter from "../feature/ping/router/pingRouter.js";
import app from "./app.js";
import { corsOptions } from "./utils/corsOptions.js";
import { generalError, methodNotFound } from "./middleware/errorMiddleware.js";

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.get("/", pingRouter);
app.use(methodNotFound);
app.use(generalError);
