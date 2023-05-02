import * as Http from "http";
import express from "express";
import * as Logger from "../util/Logger.mjs";
import path from "path";
import url from "url";
import cors from "cors";
import * as MongoMgr from "./db/MongoMgr.mjs";
import {initRestApis} from "./RestfulMgr.mjs";
import * as Util from "../util/Util.mjs";
import * as fs from "fs";
import * as Https from "https";

export const restful = express();
export let isHttps = false;

//TODO: Replace this with the following in production
// const server = Https.createServer({
//     key: fs.readFileSync("/path/to/cert/privkey.pem"),
//     cert: fs.readFileSync("/path/to/cert/fullchain.pem")
// },restful);

/**
 * The root HTTP(S) server instance. I don't really know who needs it outside this file but whatever.
 */
let server;

export async function initMiddleware() {
  restful.use(express.urlencoded({ extended: false }));

  //Parse application/json POST requests
  restful.use(express.json());

  //Static file serving
  restful.use(
    express.static(
      path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "public")
    )
  );

  const corsOptions = {
    origin: (isHttps ? "https://" : "http://") + Util.getConfigParam("FRONT_END_CORS") //`http://localhost:${process.env.PORT || 3000}`,
  };

  restful.use(cors(corsOptions));
}

export async function init() {
  try {

    const privKey = fs.readFileSync(Util.getConfigParam("privkey_pem_path") ?? ""),
        fullchainKey = fs.readFileSync(Util.getConfigParam("fullchain_pem_path") ?? "");

    server = Https.createServer({
      key: privKey,
      cert: fullchainKey
    }, restful);

    isHttps = true;

  } catch (e) {
    Logger.error("Failed to start the server in HTTPS mode, falling back to HTTP mode...");
    server = Http.createServer(restful);

  } finally {
    /**
     * Socket.IO server instance for the chat server.
     */
    Logger.info("SocketIO Instance created!");

  }
}

/**
 * Binds the server instance to network interface. Should be called after all Express middlewares are initialized.
 * @param port port number.
 */
export function bind(port) {
  server.listen(port, () => {
    Logger.info(`server started listening at port ${port}`);
  });
}
export async function startServer(port) {
  await init();
  await initMiddleware();
  await MongoMgr.init();
  await initRestApis();
  bind(port ?? 3000);
}

