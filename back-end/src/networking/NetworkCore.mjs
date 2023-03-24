import * as Http from "http";
import express from 'express';
import * as SocketIo from 'socket.io';
import * as Logger from "../util/Logger.mjs";
import path from "path";
import url from "url";

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
    restful.use(express.static(
            path.resolve(
                path.dirname(
                    url.fileURLToPath(import.meta.url)
                ),
                "public")
        )
    );
}

export async function initRestApis() {

    restful.get('/test', async (req, res) => {

        const name = req.query["name"] ?? "human";

        res.json({
            status: 0,
            message: `Hello ${name}!`
        });

    });
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
    bind(port ?? 3000);
}