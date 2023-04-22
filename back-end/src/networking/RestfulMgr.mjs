import * as Util from "../util/Util.mjs";
import {cloneObject} from "../util/Util.mjs";
import * as Logger from "../util/Logger.mjs";
import * as MockData from "../util/MockData.mjs";
import * as MongoMgr from "./db/MongoMgr.mjs";
import {subjects} from "../util/MockData.mjs";
import {faker} from "@faker-js/faker";
import {restful} from "./NetworkCore.mjs";

export async function initRestApis() {

    MockData.init();

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

            Logger.info(`Request ${req.path} with params ${req.query.toLocaleString()} is invalid!`);
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
        const {width, height} = req.query;
        const image = `https://picsum.photos/${width}/${height}`;
        Util.onWebResponse(res, image);
    });

    restful.get("/profile/info", async (req, res) => {

        if (!Util.isValidGetRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        Util.onWebResponse(res, {
            "name": faker.name.fullName(),
            "userId": Util.randInt() % 2000,
            "motto": faker.random.words(10),
            "avatar": MockData.imageUrl()
        });
    });

    restful.get("/subject/previous", async (req, res) => {
        if (!Util.isValidGetRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        Util.onWebResponse(res, MockData.recentSubjects());
    });

    restful.get("/subject/recommend", async (req, res) => {
        if (!Util.isValidGetRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        Util.onWebResponse(res, MockData.suggestSubjects());
    });

    restful.get("/login/info", async(req, res) => {

       if(!Util.isValidGetRequest(req.query,"email")) {
           Util.onWebMissingParam(req,res);
           return;
       }

       const entry = await MongoMgr.getUserInfo(req.query["email"]);
       const isUserValid = entry !== null && entry !== undefined;

       Logger.info(entry);

       Util.onWebResponse(
           res,
           isUserValid ? entry : "user_invalid",
           isUserValid);

    });

    restful.post("/login/validate", async (req, res) => {

        if (!Util.isValidPostRequest(req.body, "email", "pwd")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            Logger.info(`Begin user validation of ${req.body["email"]}`);

            const userEntry = await MongoMgr.validateUser(req.body["email"], req.body["pwd"]);

            Logger.info(`Validation Complete`);

            userEntry["token"] = (await MongoMgr.grantToken(
                userEntry["userId"]??0
            ))["token"];

            Logger.info(`Token Granted`);

            Util.onWebResponse(res,Util.cloneObject(userEntry,"pwd"));
        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res,e.message,false);
        }
    });

    restful.get("/login/token/validate", async (req, res) => {

        if (!Util.isValidPostRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        const isValid = MongoMgr.isTokenValid(req.query["token"]);

        Util.onWebResponse(res, isValid ? "valid" : "invalid", isValid);

    });
}