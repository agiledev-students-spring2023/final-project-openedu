import axios from "axios";
import CourseModel from "../models/CourseModel.mjs";
import { YTBPlayListAPI } from "../util/ThirdPartyAPIs.mjs";

const getYTBThumbnail = (id) => {
  return axios({
    method: "GET",
    url: `${YTBPlayListAPI(id, 1)}`,
  });
};

const getCourseInfo = (id) => {
  return axios({
    method: "GET",
    url: `${YTBPlayListAPI(id, 50)}`,
  });
};
const CourseController = {
  // get courses with a number
  getCourses: async (req, res) => {
    const { num } = req.query;
    const courses = (await CourseModel.getCourses(num))[0];
    const tbnArr = [];
    const tbnArrResolution = [
      "maxres",
      "standard",
      "high",
      "medium",
      "default",
    ];
    courses.map((ele) => {
      tbnArr.push(getYTBThumbnail(ele.youtube_url));
    });
    Promise.all(tbnArr).then((values) => {
      let index = 0;
      values.forEach((ele) => {
        for (let i = 0; i < tbnArrResolution.length; i++) {
          if (ele.data.items[0].snippet.thumbnails[tbnArrResolution[i]]) {
            courses[index].img_url =
              ele.data.items[0].snippet.thumbnails[tbnArrResolution[i]].url;
            index += 1;
            break;
          }
        }
      });
      res.send({ ok: 1, courses });
    });
  },
  getCoursesWithSubject: async (req, res) => {
    const { subject_num: subjectNum } = req.query;
    const courses = (await CourseModel.getCoursesWithSubject(subjectNum))[0];
    const tbnArr = [];
    const tbnArrResolution = [
      "maxres",
      "standard",
      "high",
      "medium",
      "default",
    ];
    courses.map((ele) => {
      tbnArr.push(getYTBThumbnail(ele.youtube_url));
    });
    Promise.all(tbnArr).then((values) => {
      let index = 0;
      values.forEach((ele) => {
        for (let i = 0; i < tbnArrResolution.length; i++) {
          if (ele.data.items[0].snippet.thumbnails[tbnArrResolution[i]]) {
            courses[index].img_url =
              ele.data.items[0].snippet.thumbnails[tbnArrResolution[i]].url;
            index += 1;
            break;
          }
        }
      });
      res.send({ ok: 1, courses });
    });
  },
  getCoursesWithID: async (req, res) => {
    const { courseId } = req.query;
    const course = (await CourseModel.getCoursesWithID(courseId))[0][0];
    const tbnArrResolution = [
      "maxres",
      "standard",
      "high",
      "medium",
      "default",
    ];
    if (course) {
      course.info = (await getCourseInfo(course.youtube_url)).data;
      for (let i = 0; i < tbnArrResolution.length; i++) {
        if (course.info.items[0].snippet.thumbnails[tbnArrResolution[i]]) {
          course.img_url =
            course.info.items[0].snippet.thumbnails[tbnArrResolution[i]].url;
          break;
        }
      }
      res.send({ ok: 1, course });
    } else res.send({ ok: 0, message: "No Such Course Exist" });
  },
};

export default CourseController;
