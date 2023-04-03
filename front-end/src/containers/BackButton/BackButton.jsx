import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as Util from "../../util/Util.mjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

let onEnable;

// This button is not incorporated into header, TBD
export function BackButton() {

    const [isEnabled, setEnabled] = useState(true);
    const navigate = useNavigate();

    onEnable ??= async (newState) => {
        setEnabled(newState);
    };

    const handleClick = () => {
        navigate(-1);
        //setEnabled(false);
    };

    Util.addCallback("onBackEnable", onEnable);

    return (
        <Box sx={{marginTop: 10}}>
            <Button disableRipple variant="plain" size="small"
                    sx={{
                        display: isEnabled ? 'flex' : 'none',
                        width: "10px",
                        height: "40px",
                    }}
                    onClick={isEnabled ? handleClick : undefined}

            > <ChevronLeftIcon
                sx={{
                    fontSize: "40px"
                }}/>
            </Button>
        </Box>
    );
}
