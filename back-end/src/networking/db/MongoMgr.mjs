import * as Models from "./MongoModels.mjs";
import * as Mongo from "mongoose";
import * as Util from "../../util/Util.mjs";
import {cloneObject, trimMongoDocument} from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";
import * as Bcrypt from "bcrypt";
import * as FmtTime from "../../util/FmtTime.mjs";
import * as AtomicCounter from "./AtomicCounter.mjs";
import JWT from "jsonwebtoken";

const modelMap = new Map();

export const registerModels = () => {
    const modelList = {
        courses: Models.Course,
        subjects: Models.Subject,
        users: Models.User,
        comments: Models.Comment,
        counters: Models.Counter,
        posts: Models.Post,
        feedbacks: Models.Feedback,
    };

    for (const collection in modelList) {
        Mongo.model(collection, modelList[collection]);
        modelMap.set(collection, Mongo.model(collection));
    }
};

export const init = async () => {
    const url = Util.getConfigParam("DB_URL") ?? "";

    registerModels();
    try {
        await Mongo.connect(url, {
            tls: true,
        });
        Logger.verbose(`Connected to MongoDB on ${url}.`);
    } catch (e) {
        Logger.error(e);
        Logger.error(`Cannot connect to MongoDB on ${url}`);
    }
};

export {Mongo};

export function getModel(model) {
    if (!modelMap.has(model)) Logger.error(`No such MongoDB Model: ${model}.`);

    return modelMap.get(model);
}

export async function isExistingUser(email) {
    if (email === undefined) return false;

    return getModel("users").findOne({email: email}) !== null;
}

export async function validateUser(email, pwd) {
    if (email === undefined || pwd === undefined) return undefined;

    const res = await getModel("users").findOne({
        email: email,
    });

    Logger.info("Done Locating user");

    //Existing User
    if (res !== null && !(await Bcrypt.compare(pwd, res["pwd"] ?? ""))) {
        throw new Error(`invalid_credentials`);
    }

    //New User
    else if (res === null) {
        const newUser = new getModel("users")({
            email: email,
            pwd: await Bcrypt.hash(
                pwd,
                Number(Util.getConfigParam("HASH_SALT")) ?? 6
            ),
            createTime: FmtTime.getCurrentTimeString(),
            userId: await AtomicCounter.getIncrementCount("user_id"),
            isBanned: false,
        });

        await newUser.save();

        return Util.trimMongoDocument(newUser, "pwd");
    }

    return Util.trimMongoDocument(res, "pwd");
}

export async function getUserInfo(email) {
    if (email === undefined) return undefined;

    return Util.trimMongoDocument(
        await getModel("users").findOne({email: email}),
        "pwd"
    );
}

export async function getValidUser(token) {
    if (token === undefined) return undefined;

    try {

        const payload = JWT.verify(token,
            Util.getConfigParam("jwt_secret") ?? 12345,
            {
                expiresIn: Number(Util.getConfigParam("jwt_expire_time")) ?? 100000,
                algorithm: Util.getConfigParam("jwt_algo") ?? "HS256"
            }
        );

        const user = await getModel("users").findOne({userId: payload["userId"]});

        if (user === null) {
            Logger.info(`User not found with userId: ${payload["userId"]}`);
            return undefined;
        } else if (user.isBanned === true) {
            Logger.info(`User with email ${user["email"]} BANNED!`);
            return undefined;
        }

        return user;
    } catch (e) {
        Logger.error(e);
        return undefined;
    }
}

export async function grantToken(userId) {

    const token = JWT.sign({userId: userId},
        Util.getConfigParam("jwt_secret") ?? 12345,
        {
            expiresIn: Number(Util.getConfigParam("jwt_expire_time")) ?? 100000,
            algorithm: Util.getConfigParam("jwt_algo") ?? "HS256"
        }
    );

    return {
        token: token,
        userId: userId,
        timestamp: FmtTime.getCurrentTimeString()
    };
}

export async function updateProfile(token, newParams) {

    const user = await getValidUser(token);

    if(user === null || user === undefined) {
        throw new Error("invalid_credential");
    }

    //Prevent things like password or userId from getting updated by the user
    const cleanedParams = cloneObject(newParams, "pwd","userId","mock","token");

    for (const [key,value] of Object.entries(cleanedParams)) {
        //Logger.info(`Processing pair ${key}, ${value}`);
        user[key] = value ?? user[key];
    }

    return await user.save();
}

export async function isTokenValid(token) {

    return (await getValidUser(token)) !== undefined;
}

export async function getPosts(userId) {

    return await getModel("posts")
        .find({userId: userId})
        .sort({createTime: -1});

}

export async function getAllPosts() {

    return await getModel("posts")
        .find({})
        .sort({createTime: -1});

}

export async function getOnePost(postId) {

    return trimMongoDocument(
        await getModel("posts").findOne({"postId": postId})
    );
}

export async function createPost(userId, params) {

    params["postId"] = await AtomicCounter.getIncrementCount("post_id");
    params["userId"] = userId;
    params["createTime"] = FmtTime.getCurrentTimeString();

    Logger.info(JSON.stringify(params));

    return await (new getModel("posts")(params)).save();
}

export async function getFeeds(userId) {
    return await getModel("feedbacks")
        .find({userId: userId})
        .sort({createTime: -1});
}

export async function getOneFeed(userId, feedId) {
    return await getModel("feedbacks").findOne({userId: userId, feedId: feedId});
}

export async function createFeed(userId,params) {

    params["feedId"] = await AtomicCounter.getIncrementCount("feed_id");
    params["userId"] = userId;
    params["createTime"] = FmtTime.getCurrentTimeString();

    Logger.info(JSON.stringify(params));

    return await (new getModel("feedbacks")(params)).save();
}
