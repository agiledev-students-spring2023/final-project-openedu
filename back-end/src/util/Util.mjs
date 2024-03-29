import * as Logger from "../util/Logger.mjs";
import * as dotenv from "dotenv";

let isEnvReady = false;
const callbackMap = new Map();

export function addCallback(name, func) {
    if (callbackMap.has(name)) {
        callbackMap.get(name)?.add(func);
    } else {
        const newSet = new Set();
        newSet.add(func);
        callbackMap.set(name, newSet);
    }
}

export function getConfigParam(key) {
    if (!isEnvReady) {
        Logger.info("Initializing DOTENV");
        dotenv.config();
        isEnvReady = true;
    }

    // Logger.info("available keys: " + JSON.stringify(process..env))

    if (process.env[key.toUpperCase()] === undefined) {
        // noinspection ExceptionCaughtLocallyJS
        Logger.info(`Config key "${key}" not present!`);
    }

    return process.env[key.toUpperCase()];
}

export function removeCallback(name, func) {
    if (callbackMap.has(name)) {
        (callbackMap.get(name) ?? new Set()).delete(func);

        if (callbackMap.get(name).size === 0) {
            callbackMap.delete(name);
        }
    }
}

export async function invokeCallback(name, ...args) {
    if (!callbackMap.has(name)) {
        return undefined;
    }

    for (const func of callbackMap.get(name) ?? new Set()) {
        (async () => func(...args))();
    }

    return undefined;
}

/**
 * Generates a random integer that ranges from 0 to Number.MAX_SAFE_INTEGER.
 *
 * @returns {number}
 */
export function randInt() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function onWebResponse(res, content, isGood, statusCode) {
    res.status(statusCode ?? 200);

    //Yeah, I would not rely on HTTP status codes as I don't want any web framework complain
    res.json({
        status: isGood ?? true ? 0 : 1,
        content: content,
    });

    return res;
}

export function onWebMissingParam(req, res) {
    // Logger.info(
    //   `Request ${req.path} with params ${req.query.toLocaleString()} is invalid!`
    // );

    Logger.info(`Request ${req.path} with params ${JSON.stringify(req.method === "POST" ? req.body : req.query)} is invalid!`);

    return onWebResponse(res, {msg: "missing_param"}, false, 422); //HTTP 422: Unprocessable Entity
}

export function isPerfectArray(...arr) {
    return (
        arr.filter((entry) => entry === undefined || entry === null).length === 0
    );
}

export function cloneObject(obj, ...excludeProps) {

    if (obj === null || obj === undefined) return obj;

    return Object.fromEntries(
        Object.entries(obj)
            .filter(([key]) => !excludeProps.includes(key))
    );
}

export function trimMongoDocument(document, ...excludeProps) {
    if (document === null)
        return document;

    return cloneObject(
        document.toObject(),
        "_id", "__v",
        ...excludeProps
    );
}

export function isMockApi(req) {

    if (req === null) return false;

    const queryObject = req.method === "POST" ? req.body : req.query;

    return ((queryObject ?? {})["mock"] ?? "true") === "true";
}

export function isValidWebRequest(req, ...requiredParams) {

    if (req === null) return false;

    const queryObject = req.method === "POST" ? req.body : req.query;

    for (const param of requiredParams) {
        if (queryObject[param] === undefined) return false;
    }

    return true;
}
