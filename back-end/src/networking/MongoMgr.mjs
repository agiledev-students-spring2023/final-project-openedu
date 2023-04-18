import * as Models from './MongoModels.mjs';
import * as Mongo from "mongoose";
import * as Util from "../util/Util.mjs";
import * as Logger from "../util/Logger.mjs";

const modelMap = new Map();

export const registerModels = () => {

    const modelList = {

        "courses" : Models.Course,
        "subjects" : Models.Subject,
        "users" : Models.User,
        "comments" : Models.Comment,
        "tokens" : Models.Token
    };

    //const modelList = ["courses","subjects","users","comments","tokens"];

    for(const collection in modelList) {

        Mongo.model(collection, modelList[collection]);
        modelMap.set(collection, Mongo.model(collection));
    }

    // Mongo.model("users",Models.User);
    // Mongo.model("subjects",Models.Subject);
    // Mongo.model("courses",Models.Course);
    // Mongo.model("comments",Models.Comment);
    // Mongo.model("tokens",Models.Token);
    //
    //
    // modelList.forEach(async (model) => {
    //     modelMap.set(model, Mongo.model(model));
    // });

};

export const init = async () => {

    const url = Util.getConfigParam("DB_URL") ?? "";

    registerModels();
    try {
        await Mongo.connect(url, {
            tls: true
        });
        Logger.verbose(`Connected to MongoDB on ${url}.`);
    } catch(e) {
        Logger.error(e);
        Logger.error(`Cannot connect to MongoDB on ${url}`);
    }
};

export {
    Mongo
};

export function getModel(model) {

    if(modelMap.has(model))
        return modelMap.get(model);

    else {
        Logger.error(`No such MongoDB Model: ${model}.`);
        return undefined;
    }

}