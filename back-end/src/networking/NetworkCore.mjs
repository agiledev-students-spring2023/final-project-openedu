import * as Http from "http";
import express from "express";
import * as SocketIo from "socket.io";
import * as Logger from "../util/Logger.mjs";
import path from "path";
import url from "url";
import * as Util from "../util/Util.mjs";
import { cloneObject } from "../util/Util.mjs";
import * as MockData from "../util/MockData.mjs";
import { subjects } from "../util/MockData.mjs";
import cors from "cors";
import { faker } from "@faker-js/faker";

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
    origin: `http://localhost:${process.env.PORT || 3000}`,
  };

  restful.use(cors(corsOptions));
}

export async function initRestApis() {
  restful.get("/test", async (req, res) => {
    const name = req.query["name"] ?? "human";
    Util.onWebResponse(res, `Hello ${name}!`, 1);
  });

  restful.get("/course/list", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }
    const courses = MockData.courses();

    Util.onWebResponse(res, courses);
  });

  restful.get("/course/recommend", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    const nCourses = Util.randInt() % 200;
    const courses = MockData.courses();

    const ret = [];

    for (let i = 0; i < nCourses; ++i) {
      const ind = Util.randInt() % courses.length;

      ret.push(courses[ind]);
    }

    Util.onWebResponse(res, ret);
  });

  restful.get("/course/recent", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    const nCourses = Util.randInt() % 200;
    const courses = MockData.courses();

    const ret = [];

    for (let i = 0; i < nCourses; ++i) {
      const ind = Util.randInt() % courses.length;

      ret.push(courses[ind]);
    }

    Util.onWebResponse(res, ret);
  });

  restful.get("/course/previous", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    const nCourses = Util.randInt() % 20;
    const courses = MockData.courses();

    const ret = [];

    for (let i = 0; i < nCourses; ++i) {
      const ind = Util.randInt() % courses.length;

      ret.push(courses[ind]);
    }

    Util.onWebResponse(res, ret);
  });

  restful.get("/course/detail", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token", "courseId")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    const courses = MockData.courses();
    const courseId = req.query["courseId"] ?? 0;

    if (courseId >= courses.length)
      Util.onWebResponse(res, "invalid_course_id", false);
    else Util.onWebResponse(res, courses[courseId]);
  });

  restful.get("/subject/list", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    //Mask the course lists of subjects out since that should be queried separately via /subject/detail
    const subjects = MockData.subjects().map((element) => {
      return cloneObject(element, "courses");
    });

    Util.onWebResponse(res, subjects);
  });

  restful.get("/subject/detail", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token", "subjectId")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    const subjectId = req.query["subjectId"] ?? 0;

    if (subjectId >= subjects().length)
      Util.onWebResponse(res, "invalid_subject_id", false);
    else Util.onWebResponse(res, subjects()[subjectId]);
  });

  restful.get("/post", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token", "postId")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    const postId = req.query["postId"] ?? 0;

    if (postId >= MockData.posts().length)
      Util.onWebResponse(res, "invalid_post_id", false);
    else Util.onWebResponse(res, MockData.posts()[postId]);
  });

  restful.get("/post/list", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    const nPosts = Util.randInt() % 20;
    const posts = MockData.posts();

    const ret = [];

    const postSet = new Set();

    for (let i = 0; i < nPosts; ++i) {
      let ind = Util.randInt() % posts.length;
      while (postSet.has(ind)) {
        ind = Util.randInt() % posts.length;
      }
      postSet.add(ind);
      ret.push(posts[ind]);
    }

    Util.onWebResponse(res, ret);
  });

  //this api currently responses with an image url
  restful.get("/background-image", async (req, res) => {
    const { width, height } = req.query;
    const image = `https://picsum.photos/${width}/${height}`;
    Util.onWebResponse(res, image);
  });

  restful.get("/profile/info", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    Util.onWebResponse(res, {
      name: faker.name.fullName(),
      userId: Util.randInt() % 2000,
      motto: faker.random.words(10),
      avatar: MockData.imageUrl(),
    });
  });

  restful.get("/subject/previous", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    Util.onWebResponse(res, MockData.recentSubjects());
  });

  restful.get("/subject/recommend", async (req, res) => {
    if (!Util.isValidGetRequest(req.query, "token")) {
      Logger.info(
        `Request ${
          req.path
        } with params ${req.query.toLocaleString()} is invalid!`
      );
      //Logger.info(`${req.params} does not have enough parameter!`);
      Util.onWebMissingParam(req, res);
      return;
    }

    Util.onWebResponse(res, MockData.suggestSubjects());
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
