import * as MongoMgr from "./MongoMgr.mjs";

const mutexMap = new Map();
import {Mutex} from "async-mutex";



function getCounterMutex(key) {
    if (mutexMap.get(key ?? "") !== undefined)
        return mutexMap.get(key ?? "");
    else {
        const newMutex = new Mutex();
        mutexMap.set(key ?? "", newMutex);
        return newMutex;
    }
}

export async function getIncrementCount(key) {
    const counter = await MongoMgr.getModel("counters").findOne({key: key});
    const mutex = getCounterMutex(key ?? "");
    await mutex.acquire();

    if (counter !== null) {
        const ret = counter.count;
        ++counter.count;
        await counter.save();

        mutex.release();

        //Logger.info("New count: " + ret);

        return ret;
    } else {
        const entry = new MongoMgr.getModel("counters")(
            {
                key: key ?? "",
                count: 1
            }
        );

        await entry.save();
        mutex.release();

        //Logger.info("New Count: " + 0);


        return 0;
    }
}