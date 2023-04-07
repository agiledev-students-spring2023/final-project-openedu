import express from 'express'
import CourseController from '../controllers/CourseController.mjs';

const router = express.Router();


router.get('/get_courses',CourseController.getCourses);
router.get('/get_Courses_with_subject',CourseController.getCoursesWithSubject);
router.get('/get_courses_with_id',CourseController.getCoursesWithID);


export default router;