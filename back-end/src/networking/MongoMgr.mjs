import * as Models from './MongoModels.mjs';
import * as Mongo from "mongoose";
import * as Util from "../util/Util.mjs";
import * as Logger from "../util/Logger.mjs";

const modelMap = new Map();

export const registerModels = () => {

    const modelList = ["courses","subjects","users","comments"];

    Mongo.model("users",Models.User);
    Mongo.model("subjects",Models.Subject);
    Mongo.model("courses",Models.Course);
    Mongo.model("comments",Models.Comment);

    modelList.forEach(async (model) => {
        modelMap.set(model, Mongo.model(model));
    });

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