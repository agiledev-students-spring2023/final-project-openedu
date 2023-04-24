import { colors, createTheme } from '@mui/material';
import { Outlet } from "react-router-dom";
import React,{useEffect, useRef} from 'react';
// import * as dotenv from "dotenv";
import * as Logger from "./Logger.mjs";

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
};

const DARK_SCHEME = {
    primary: {
        main: '#30418b',
        contrastText: "#fff"
    },
    secondary: {
        main: '#4A58A9',
        dark: '#BBC3FF'
    },
    teriary: {
        main: ''
    },
    error: {
        main: '#600f0c',
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
    neutral: {
        main: '#303034',
    },
    background: {
        default: '#1b1b1f',
        paper: '#282830'
    },
    text: {
        primary: '#fff',
        secondary: '#dde1fc',
    },
};


const BACK_UP = {
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
    neutral: {
        main: '#303034',
        contrastText: "#fff"
    },
    background: {
        default: colors.grey[100],
        paper: colors.common.white
    },
};
export function getTheme() {
    // Reminder: in newer versions of MUI, the color does not seem to be calculated
    return createTheme(
        {
            palette: DARK_SCHEME,
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            borderRadius: "8px",
                            opacity: '0.8',
                            color: '#000',
                            '& .MuiInputBase-input': {
                                color: '#fff',
                            },
                            '& 	.MuiFilledInput-underline': {
                                // TBD for filled background color
                            },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                        },
                    }
                },
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            '& .MuiInputBase-input': {
                                color: '#000',
                            },
                        },
                        '& MiuInputLabel-root': {
                            color: '#000',
                        },
                    }
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            borderRadius: "8px",
                        },
                        input: {
                            color: '#fff',
                        },
                    }
                },
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            color: '#3d4575',
                        },
                    }
                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            borderRadius: "12px", // specify your desired border radius value here

                        },
                    },
                },
                MuiToggleButton: {
                    styleOverrides: {
                        root: {
                            color: '#4A58A9',
                            border: '1px solid #fff', // ?
                        },
                        "&.Mui-selected": {
                            background: '#33408b',
                            color: '#fff',
                            // https://mui.com/material-ui/api/toggle-button/#css
                        }
                    },
                },
                MuiBottomNavigationAction: {
                    styleOverrides: {
                        label: {
                            color: '#dee0fc',
                            "&.Mui-selected": {
                                color: "#dee0fc",
                            }
                        },
                        root: {
                            color: '#dee0fc',
                            height: '4vh',
                            "&.Mui-selected": {
                                "color": "#dee0fc",
                                '& .MuiSvgIcon-root': {
                                    borderRadius: '16px',
                                    width: '100%',
                                    height: '4vh',
                                    padding: '0.5vh',
                                    backgroundColor: '#33408b',
                                },
                            },

                        },
                    }
                }
            },

            typography: {
                fontFamily: [
                    'Raleway',
                    '-apple-system',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                ].join(','),
                button: {
                    textTransform: 'none'
                }
            }
        }
    );
}


//NOTE: React.js env keys shall be defined with the REACT_APP_ prefix, otherwise I cannot read it in
export function getConfigParam(key) {
    // if(!isEnvReady) {
    //     //dotenv.config();
    //     isEnvReady = true;
    // }

    //key = key.toUpperCase();
    key = "REACT_APP_" + key.toUpperCase();

    if(process.env[key] === undefined) {
        // noinspection ExceptionCaughtLocallyJS
        Logger.info(`Config Key "${key}" not present!`);
    }

    return process.env[key];
}

export function getServerAddr() {
    return getConfigParam("server_addr_debug")??"http://localhost:3001";
}

export function asChildPage(component) {

    return <div>
        {component}
        <Outlet />
    </div>;
}

export async function readLocalValue(key){
    if(localStorage.getItem(key) === undefined) {
        Logger.error(`LocalStorage key "${key}" not present!`);
    }

    return localStorage.getItem(key);
}

export async function writeLocalValue(key,value) {
    if(key === undefined || key === null || key === "")
        return;

    localStorage.setItem(key,value);
}


export function useUpdateEffect(effect, dependencies) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!isInitialMount.current) {
      effect();
    }
    isInitialMount.current = false;
  }, dependencies);
}

