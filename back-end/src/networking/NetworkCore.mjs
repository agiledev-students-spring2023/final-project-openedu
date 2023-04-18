import * as Http from "http";
import express from "express";
import * as SocketIo from "socket.io";
import * as Logger from "../util/Logger.mjs";
import path from "path";
import url from "url";
import cors from "cors";
import * as MongoMgr from "./MongoMgr.mjs";
import {initRestApis} from "./RestfulMgr.mjs";

export const restful = express();

//TODO: Replace this with the following in production
//
// const server = Https.createServer({
//     key: fs.readFileSync("/path/to/cert/privkey.pem"),
//     cert: fs.readFileSync("/path/to/cert/fullchain.pem")
// },restful);

/**
 * The root HTTP(S) server instance. I don't really know who needs it outside this file but whatever.
 */
const server = Http.createServer(restful);

/**
 * Socket.IO server instance for the chat server.
 */
export const socketIoServer = new SocketIo.Server(server);

export async function initMiddleware() {
    restful.use(express.urlencoded({extended: false}));

    //Parse application/json POST requests
    restful.use(express.json());

    //Static file serving
    restful.use(
        express.static(
            path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "public")
        )
    );

    const corsOptions = {
        origin: `http://localhost:${process.env.PORT || 3000}`,
    };

    restful.use(cors(corsOptions));
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
    await initMiddleware();
    await initRestApis();
    await MongoMgr.init();
    bind(port ?? 3000);
}
