import * as Http from "http";
import express from 'express';
import * as SocketIo from 'socket.io';
import * as Logger from "../util/Logger.mjs";
import path from "path";
import url from "url";
import * as Util from "../util/Util.mjs";
import * as MockData from "../util/MockData.mjs";
import {faker} from "@faker-js/faker";
import {onWebResponse} from "../util/Util.mjs";

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

        Util.onWebResponse(res,`Hello ${name}!`,1);
    });

    restful.get('/course/recommend', async (req,res) => {

        if(!Util.isValidGetRequest(req.query,"token")) {

            Logger.info(`Request ${req.path} with params ${req.query.toLocaleString()} is invalid!`);
            //Logger.info(`${req.params} does not have enough parameter!`);
            Util.onWebMissingParam(res);
            return;
        }

        const nCourses = Util.randInt() % 200;
        const courses = MockData.courses();

        const ret = [];

        for(let i = 0; i < nCourses; ++i) {
            const ind = Util.randInt() % courses.length;

            ret.push(courses[ind]);
        }

        Util.onWebResponse(res,ret);
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