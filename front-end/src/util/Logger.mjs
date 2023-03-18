import * as Constants from "./Constants.mjs";
import * as FmtTime from "./FmtTime.mjs";

export const MsgLevel = {
    critical : "critical",
    error : "error",
    warning : "warning",
    info : "info",
    verbose : "verbose"
};

function getProperMsg(msg) {
    const isError = msg instanceof Error;

    return isError ? `${msg.message} \n\tStack: ${msg.stack}` : msg.toString();
}

export function print(msg : any, msgLevel?) {
    const isError = msg instanceof Error;

    if(msgLevel === undefined && isError) {
        msgLevel = MsgLevel.error;
    }
    else {
        msgLevel = msgLevel??MsgLevel.info;
    }

    console.log(`${FmtTime.getCurrentTimeString()}\t[${Constants.APP_NAME}][${MsgLevel[msgLevel]??MsgLevel.verbose}] ${getProperMsg(msg)}`);
}


export function error(msg : any) {
    print(msg,MsgLevel.error);
}

export function critical(msg : any) {
    print(msg,MsgLevel.critical);
}

export function warning(msg : any) {
    print(msg,MsgLevel.warning);
}

export function info(msg : any) {
    print(msg,MsgLevel.info);
}

export function verbose(msg : any) {
    print(msg,MsgLevel.verbose);
}
