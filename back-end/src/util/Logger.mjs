import * as Constants from "./Constants.mjs";
import * as FmtTime from "./FmtTime.mjs";

const MsgLevel = {
    critical : "critical",
    error : "error",
    warning : "warning",
    info : "info",
    verbose : "verbose"
};

function getProperMsg(msg) {
    const isError = msg instanceof Error;

    return isError ? `${msg.message} \n\tStack: ${msg.stack}` : msg?.toString();
}

function print(msg, msgLevel) {
    const isError = msg instanceof Error;

    if(msgLevel === undefined && isError) {
        msgLevel = MsgLevel.error;
    }
    else {
        msgLevel = msgLevel??MsgLevel.info;
    }

    console.log(`${FmtTime.getCurrentTimeString()}\t[${Constants.APP_NAME}][${MsgLevel[msgLevel]??MsgLevel.verbose}] ${getProperMsg(msg)}`);
}


export function error(msg) {
    print(msg,MsgLevel.error);
}

export function critical(msg) {
    print(msg,MsgLevel.critical);
}

export function warning(msg) {
    print(msg,MsgLevel.warning);
}

export function info(msg) {
    print(msg,MsgLevel.info);
}

export function verbose(msg) {
    print(msg,MsgLevel.verbose);
}
