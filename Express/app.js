import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cacheDecorator from "./middleware/redis_cache.js";
import { logError } from "./utils/logger.js";
import HttpError from "./utils/HttpError.js";

import accountRouter from "./routes/account.js";
import wordBannerRouter from "./routes/wordBanner.js";
import roleBaseRouter from "./routes/roleBase.js";
import weaponBaseRouter from "./routes/weaponBase.js";
import RoleDetailedRouter from "./routes/roleDetailed.js";
import WeaponDetailedRouter from "./routes/weaponDetailed.js";
import AtlasRouter from "./routes/atlas.js";
import VideoRouter from "./routes/video.js";
import MusicRouter from "./routes/music.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";

import cors from "cors"; // 引入 CORS 中间件

// 1. 从 import.meta.url 中解析出当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 2. 从当前文件路径中解析出目录路径
const __dirname = dirname(__filename);

import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";

var app = express();

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/user", accountRouter);
app.use("/wordbanner", cacheDecorator(), wordBannerRouter);
app.use("/rolebase", cacheDecorator(), roleBaseRouter);
app.use("/weaponbase", cacheDecorator(), weaponBaseRouter);
app.use("/roledetailed", cacheDecorator(), RoleDetailedRouter);
app.use("/weapondetailed", cacheDecorator(), WeaponDetailedRouter);
app.use("/atlas", cacheDecorator(), AtlasRouter);
app.use("/video", cacheDecorator(), VideoRouter);
app.use("/music", cacheDecorator(), MusicRouter);

app.use("/graphql", express.json(), expressMiddleware(server));

app.get('/', (req, res) => {
  res.json({ code: '200', msg: 'Server is running', data: null });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  logError(err, req);

  if (err instanceof HttpError) {
    return res.status(err.status).json(err.toJSON())
  }

  return res.status(500).json({
    code: "500",
    msg: "服务器内部错误",
    data: null,
  });
});


export default app;
