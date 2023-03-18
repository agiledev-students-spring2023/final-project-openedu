import axios from 'axios';

// Import this file whenever you need apis
import {mockDataApi, mockImageApi} from './apis.mjs';
import * as Logger from "../util/Logger.mjs";


// This is an exmaple file for how to use axios with mockaroo
axios({
    method: 'GET',
    // Change course to others for others' API
    url: mockDataApi("course")
}).then(res =>
    // Take the data out
    Logger.info(res.data)
);
