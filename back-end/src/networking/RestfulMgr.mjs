// noinspection ExceptionCaughtLocallyJS

import * as Util from "../util/Util.mjs";
import {trimMongoDocument} from "../util/Util.mjs";
import * as Logger from "../util/Logger.mjs";
import * as MockData from "../util/MockData.mjs";
import * as MongoMgr from "./db/MongoMgr.mjs";
import { subjects } from "../util/MockData.mjs";
import { restful } from "./NetworkCore.mjs";
import {getModel} from "./db/MongoMgr.mjs";
import * as ThirdParty from "../util/ThirdPartyAPIs.mjs";

function courseApis() {

    restful.get("/course/list", async (req, res) => {
        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.courses());
                return;
            }

            let ret = await MongoMgr.getModel("courses").find({})
                .sort({'courseId': 1});

            ret = ret.map(element => Util.trimMongoDocument(element));
            Util.onWebResponse(res, ret);


        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }

    });

    restful.get("/course/recommend", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "token")) {
            Util.onWebMissingParam(req, req.query, res);
            return;
        }

        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.suggestCourses());
                return;
            }

            if(!await MongoMgr.isTokenValid(req.query["token"])){
                throw new Error("token_invalid");
            }

            //Fetch a list of courses (still kinda mocky but ok)
            let ret = await MongoMgr.getModel("courses").find({})
                .sort({'courseId': 1})
                .skip(Util.randInt() % 3)
                .limit(20);

            ret = ret.map(element => Util.trimMongoDocument(element));

            Util.onWebResponse(res, ret);

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });

    restful.get("/course/recent", async (req, res) => {

        if (!Util.isValidWebRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.recentCourses());
                return;
            }

            if(!await MongoMgr.isTokenValid(req.query["token"])){
                throw new Error("token_invalid");
            }

            //Fetch a random list of courses (still kinda mocky but ok)
            let ret = await MongoMgr.getModel("courses").find({})
                .sort({'courseId': 1})
                .skip(Util.randInt() % 10)
                .limit(20);

            ret = ret.map(element => Util.trimMongoDocument(element));

            Util.onWebResponse(res, ret);

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });

    restful.get("/course/play", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "courseId")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        const courseId = req.query["courseId"] ?? 0;
        try {
            const course = await MongoMgr.getModel("courses").findOne({ "courseId": courseId });

            Logger.info(JSON.stringify(course));

            const lectures = await ThirdParty.GetLecturesWithID(course["youtubeUrl"]??"PLSE8ODhjZXjbohkNBWQs_otTrBTrjyohi");
            Util.onWebResponse(res, lectures);

        } catch (err) {
            Logger.error(err);
            Util.onWebResponse(res, err, false);
        }
    });

    restful.get("/course/detail", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "courseId")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.course());
                return;
            }

            const ret = trimMongoDocument(await MongoMgr.getModel("courses").findOne({
                courseId : req.query["courseId"]
            }));

            if(ret === null)
                throw new Error("invalid_course_id");

            Util.onWebResponse(res, ret);

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });

    restful.get("/subject/recommend", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.suggestSubjects());
                return;
            }

            //Validate token
            if(!await MongoMgr.isTokenValid(req.query["token"])){
                throw new Error("token_invalid");
            }

            //Fetch a list of subjects (still kinda mocky but ok)
            let ret = await MongoMgr.getModel("subjects").find({})
                .sort({'courseId': 1})
                .skip(Util.randInt() % 3)
                .limit(20);

            ret = ret.map(element => Util.trimMongoDocument(element));

            Util.onWebResponse(res, ret);

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });

    restful.get("/subject/recent", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.recentSubjects());
                return;
            }

            //Validate token
            if(!await MongoMgr.isTokenValid(req.query["token"])){
                throw new Error("token_invalid");
            }

            //Fetch a list of subjects (still kinda mocky but ok)
            let ret = await MongoMgr.getModel("subjects").find({})
                .sort({'courseId': 1})
                .skip(Util.randInt() % 3)
                .limit(20);

            ret = ret.map(element => Util.trimMongoDocument(element));

            Util.onWebResponse(res, ret);

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });

    restful.get("/subject/list", async (req, res) => {
        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.suggestSubjects());
                return;
            }
            //Fetch a list of subjects (still kinda mocky but ok)
            let ret = await MongoMgr.getModel("subjects").find({});
            ret = ret.map(element => Util.trimMongoDocument(element));

            Util.onWebResponse(res, ret);

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }

    });

    restful.get("/subject/detail", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "subjectId")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.subject());
                return;
            }

            const ret = trimMongoDocument(await MongoMgr.getModel("subjects").findOne({
                subjectId : req.query["subjectId"]
            }));

            if(ret === null)
                throw new Error("invalid_subject_id");

            let courses = await MongoMgr.getModel("courses").find({
                subjectId : req.query["subjectId"]
            });

            courses = courses.map(element => trimMongoDocument(element));
            ret["courses"] = courses;

            Util.onWebResponse(res, ret);

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });
}

export async function initRestApis() {
  MockData.init();

  courseApis();

    restful.post("/post", async (req, res) => {
        if (!Util.isValidWebRequest(req.body, "token", "title", "content")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        const userId = req.body["userId"] ?? 0;
        const title = req.body["title"] ?? "(no title)";
        const content = req.body["content"] ?? "(no content)";

        const overview = content.length > 50 ? content.substring(0, 50) : content;

        try {
            const post = await MongoMgr.createPost(userId, title, content, overview);
            Util.onWebResponse(res, post);
        } catch (err) {
            Logger.error(err);
            Util.onWebResponse(res, err.message, false);
        }
    });

    restful.get("/post/list", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {

            //Validate token
            if(!await MongoMgr.isTokenValid(req.query["token"])){
                throw new Error("token_invalid");
            }

            //TODO: Make the userId variant as soon as possible
            let posts = await MongoMgr.getPosts(0);

            posts = posts.map(entry => trimMongoDocument(entry));

            Logger.info(posts);
            Util.onWebResponse(res, posts);
        } catch (err) {

            Logger.error(err);
            Util.onWebResponse(res, err.message, false);
        }

        // const nPosts = Util.randInt() % 20;
        // const posts = MockData.posts();

        // const ret = [];

        // const postSet = new Set();

        // for (let i = 0; i < nPosts; ++i) {
        //   let ind = Util.randInt() % posts.length;
        //   while (postSet.has(ind)) {
        //     ind = Util.randInt() % posts.length;
        //   }
        //   postSet.add(ind);
        //   ret.push(posts[ind]);
        // }

        // Util.onWebResponse(res, ret);
    });

    //this api currently responses with an image url
    restful.get("/background-image", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "width", "height")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        const image = `https://picsum.photos/${req.query["width"]}/${req.query["height"]}`;

        Logger.info("Image URL: " + image);

        Util.onWebResponse(res, image);
    });

    restful.get("/profile/info", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            if (Util.isMockApi(req.query)) {
                Util.onWebResponse(res, MockData.user());
                return;
            }
            const user = await MongoMgr.getValidUser(req.query["token"]);

            if(user === undefined) {
                throw new Error("token_invalid");
            }

            Util.onWebResponse(res,trimMongoDocument(user, "pwd"));

        } catch(e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });


    restful.get("/login/info", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "email")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        const entry = await MongoMgr.getUserInfo(req.query["email"]);
        const isUserValid = entry !== null && entry !== undefined;

        Logger.info("Queried User: " + JSON.stringify(entry));

        Util.onWebResponse(res, isUserValid ? entry : "user_invalid", isUserValid);
    });

    restful.post("/login/validate", async (req, res) => {
        if (!Util.isValidWebRequest(req.body, "email", "pwd")) {
            Util.onWebMissingParam(req, res);
            return;
        }

        try {
            Logger.info(`Begin user validation of ${req.body["email"]}`);

            const userEntry = await MongoMgr.validateUser(
                req.body["email"],
                req.body["pwd"]
            );

            Logger.info(`Validation Complete`);

            userEntry["token"] = (
                await MongoMgr.grantToken(userEntry["userId"] ?? 0)
            )["token"];

            Logger.info(`Token Granted`);

            Util.onWebResponse(res, Util.cloneObject(userEntry, "pwd"));
        } catch (e) {
            Logger.error(e);
            Util.onWebResponse(res, e.message, false);
        }
    });

    restful.get("/login/token/validate", async (req, res) => {
        if (!Util.isValidWebRequest(req.query, "token")) {
            Util.onWebMissingParam(req, res);
            return;
        }
        const isValid = await MongoMgr.isTokenValid(req.query["token"]);

        Util.onWebResponse(res, isValid ? "valid" : "invalid", isValid);
    });
}
