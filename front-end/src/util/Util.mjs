import {colors, createTheme} from '@mui/material';

const callbackMap = new Map();

export function addCallback(name, func) {

    if(callbackMap.has(name)) {
        callbackMap.get(name)?.add(func);
    }
    else {
        const newSet = new Set();
        newSet.add(func);
        callbackMap.set(name,newSet);
    }
}

export function removeCallback(name, func) {

    if(callbackMap.has(name)) {
        (callbackMap.get(name)??new Set()).remove(func);

        if(callbackMap.get(name).size() === 0) {
            callbackMap.delete(name);
        }
    }
}

export async function invokeCallback(name, ...args) {

    if(!callbackMap.has(name)) {
        return;
    }

    for(const func of (callbackMap.get(name)??new Set())) {
        (async () => func(...args))();
    }
}

export function getTheme() {

    return createTheme(
        {
            palette:{
                
                primary: {
                    main: '#4659A9',
                    dark: '#B8C3FF'
                },
                secondary: {
                    main: '#4A58A9',
                    dark: '#BBC3FF'
                },
                error: {
                    main: '#BA1A1A',
                    dark: 'FFB4AB'
                },
                success: {
                    main :'rgb(88,229,82)',
                    dark :'rgb(136,204,134)'
                },
                warning: {
                    main: '#974812',
                    dark: '#FFB68F'
                },

                // shadow: {
                //     main: colors.grey[10]
                // },

                background: {
                    default: colors.grey[100],
                    paper: colors.common.white
                }

            },
            components:{

                // MuiButton:{
                //     variants:[
                //         {
                //             props:{variant:"bold"},
                //             style:{
                //                 font:"bold",
                //                 border:`4px solid white`,
                //                 color:'white'
                //             }
                //         }
                //     ]
                // }
            }
        }
    );
}