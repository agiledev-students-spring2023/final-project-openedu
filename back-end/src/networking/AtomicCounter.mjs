import * as MongoMgr from "./MongoMgr.mjs";

const mutexMap = new Map();
import {Mutex} from "async-mutex";


const Counter = () => MongoMgr.getModel("counters");

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
    const counter = await Counter.findOne({key: key});
    const mutex = getCounterMutex(key ?? "");
    await mutex.acquire();

    if (counter !== null) {
        const ret = counter.count;
        ++counter.count;
        await counter.save();

        mutex.release();
        return ret;
    } else {
        const entry = new Counter(
            {
                key: key ?? "",
                count: 1
            }
        );

        await entry.save();
        mutex.release();
        return 0;
    }
}