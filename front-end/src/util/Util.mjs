import { colors, createTheme } from '@mui/material';

const callbackMap = new Map();

export function addCallback(name, func) {

    if (callbackMap.has(name)) {
        callbackMap.get(name)?.add(func);
    }
    else {
        const newSet = new Set();
        newSet.add(func);
        callbackMap.set(name, newSet);
    }
}

export function removeCallback(name, func) {

    if (callbackMap.has(name)) {
        (callbackMap.get(name) ?? new Set()).remove(func);

        if (callbackMap.get(name).size() === 0) {
            callbackMap.delete(name);
        }
    }
}

export async function invokeCallback(name, ...args) {

    if (!callbackMap.has(name)) {
        return;
    }

    for (const func of (callbackMap.get(name) ?? new Set())) {
        (async () => func(...args))();
    }
}

const LIGHT_SCHEME = {
    primary: {

    },
    secondary: {

    },
    teriary: {

    },
    error: {

    },
    background: {

    },
    surface_variant: {

    },
}

const DARK_SCHEME = {
    primary: {

    },
    secondary: {

    },
    teriary: {

    },
    error: {

    },
    background: {

    },
    surface_variant: {

    },
}

export function getTheme() {
    // Reminder: in newer versions of MUI, the color dose not seem to be calculated
    return createTheme(
        {
            palette: {

                primary: {
                    main: '#4659A9',
                    dark: '#B8C3FF'
                },
                secondary: {
                    main: '#4A58A9',
                    dark: '#BBC3FF'
                },
                teriary: {
                    main: ''
                },
                error: {
                    main: '#BA1A1A',
                    dark: 'FFB4AB'
                },
                success: {
                    main: 'rgb(88,229,82)',
                    dark: 'rgb(136,204,134)'
                },
                warning: {
                    main: '#974812',
                    dark: '#FFB68F'
                },
                neutral:{
                    main:'#303034',
                    contrastText:"#fff"
                },
                background: {
                    default: colors.grey[100],
                    paper: colors.common.white
                },
            },
            components: {

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
            },
            typography: {
                button: {
                    textTransform: 'none'
                }
            }
        }
    );
}