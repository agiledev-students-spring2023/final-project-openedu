const callbackMap = new Map<String,Set<Function>>();

export function setCallback(name : String, func : Function) {

    if(callbackMap.has(name)) {
        (callbackMap.get(name)??{}).add(func);
    }
    else {
        const arr = [];
        arr.push(func);
        callbackMap.set(name,func);
    }
}

export function removeCallback(name : String, func : Function) {

    if(!callbackMap.has(name))
        return;

    else {
        (callbackMap.get(name)??{}).remove(name);

        if(callbackMap.get(name).size() === 0)
            callbackMap.delete(name);
    }
}

export async function invokeCallback(name : String) : Promise<void> {

    if(!callbackMap.has(name))
        return;

    for(const func of (callbackMap.get(name)??{}).entries()) {
        (async () => func())();
        //func();
    }
}