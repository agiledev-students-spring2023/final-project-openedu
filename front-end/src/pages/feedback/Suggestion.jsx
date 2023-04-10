import { React, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Box,Typography,FormGroup,Checkbox,FormControlLabel} from "@mui/material";
import { useParams } from "react-router-dom";
import { BackButton } from "../../containers/BackButton/BackButton";
import Loading from "../../containers/Loading/Loading";
import * as Util from "../../util/Util.mjs";
import * as Logger from "../../util/Logger.mjs";
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    TextField, InputAdornment, Grid, Button, Container,
} from '@mui/material';
import { Add, Logout, Create, Remove } from '@mui/icons-material';
import StyledAvater from '../../containers/StyledAvatar';
import { mockImageApi } from '../../mockApi/apis.mjs';
import FeedbackCard from '../../containers/FeedbackCard/FeedbackCard';
import ComposePost from '../posts/ComposePost';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';