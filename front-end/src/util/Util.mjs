import { colors, createTheme } from '@mui/material';
import { Outlet } from "react-router-dom";
import React from 'react';

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
    },
    background: {
        default: '#1b1b1f',
        paper: '#282830'
    },
    text: {
        primary: '#fff',
        secondary: '#b5b5b9'
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
                            backgroundColor: '',
                            '& .MuiFilledInput-root': {
                                borderRadius: '8px', // Set your desired border radius value here
                                backgroundColor: '#fff',
                                opacity: '0.8',
                            },
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
                            "&.Mui-selected": {
                                "color": "#dee0fc",
                                '& .MuiSvgIcon-root': {
                                    borderRadius: '16px',
                                    width: '100%',
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

export function asChildPage(component) {

    return <div>
        {component}
        <Outlet />
    </div>;
}