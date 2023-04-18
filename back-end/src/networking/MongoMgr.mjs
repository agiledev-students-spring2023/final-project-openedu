import * as Models from './MongoModels.mjs';
import * as Mongo from "mongoose";
import * as Util from "../util/Util.mjs";
import * as Logger from "../util/Logger.mjs";
import * as Bcrypt from "bcrypt";
import * as FmtTime from "../util/FmtTime.mjs";
import * as AtomicCounter from "./AtomicCounter.mjs";
import {v4 as uuidv4} from 'uuid';

const modelMap = new Map();

export const registerModels = () => {

    const modelList = {
        "courses": Models.Course,
        "subjects": Models.Subject,
        "users": Models.User,
        "comments": Models.Comment,
        "tokens": Models.Token,
        "counters" : Models.Counter,
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
            tls: true
        });
        Logger.verbose(`Connected to MongoDB on ${url}.`);
    } catch (e) {
        Logger.error(e);
        Logger.error(`Cannot connect to MongoDB on ${url}`);
    }
};

export {
    Mongo
};

export function getModel(model) {

    if (!modelMap.has(model))
        Logger.error(`No such MongoDB Model: ${model}.`);

    return modelMap.get(model);
}

export async function isExistingUser(email) {
    if(email === undefined)
        return false;

    return getModel("users").findOne({"email" : email}) !== null;
}

export async function validateUser(email,pwd) {

    if(email === undefined || pwd === undefined)
        return undefined;


    const res = await getModel("user").findOne({
        "email": email
    });

    //Existing User
    if(res !== null && !await Bcrypt.compare(pwd,res["pwd"]??"")) {
        throw new Error(`invalid_credentials`);
    }

    //New User
    else if(res === null) {
        const newUser = getModel("users")({
            "email" : email,
            "pwd" : await Bcrypt.hash(pwd,Util.getConfigParam("HASH_SALT")??1919),
            "createTime" : FmtTime.getCurrentTimeString(),
            "userId": AtomicCounter.getIncrementCount("user_id"),
            "isBanned" : false
        });

        return Util.cloneObject(await newUser.save(),"pwd");
    }

    return Util.cloneObject(res,"pwd");
}

export async function getUserInfo(email) {

    if(email === undefined) return undefined;

    return Util.cloneObject(
        await getModel("users")
            .findOne({"email" : email}),
        "pwd"
    );
}

export async function getValidUser(token) {

    if(token === undefined)
        return undefined;

    const User = getModel("users");
    const Token = getModel("tokens");

    if(User === undefined || Token === undefined) {
        Logger.error("collections not registered in MongoDB!");
        return undefined;
    }

    try {
        const tokenEntry = await Token.findOne({'token': token});

        if(tokenEntry === null) {
            Logger.info(`Token not found: ${token}`);
            return undefined;
        }

        const user = await User.findOne({"email" : tokenEntry["email"]});

        if(user === null) {
            Logger.info(`User not found with email: ${tokenEntry["email"]}`);
            return undefined;
        }
        else if(user.isBanned === true) {
            Logger.info(`User with email ${tokenEntry["email"]} BANNED!`);
            return undefined;
        }

        return user;

    } catch (e) {

        Logger.error(e);
        return undefined;

    }
    //Unreachable code
    //return undefined;
}

export async function grantToken(userId) {
    return await getModel("tokens")({
        token: uuidv4(),
        userId: userId,
        createTime: FmtTime.getCurrentTimeString()
    }).save();
}

export async function invalidToken(token) {
    if(token === undefined || token === "") return;

    await getModel("tokens").deleteMany({"token" : token});
}

export async function isTokenValid(token) {
    return (await getValidUser(token)) !== undefined;
}