import * as MockData from '../../src/util/MockData.mjs'

const CourseModel = {
    getCourses: async (num) => {
        if (num) {
            return MockData.courses().slice(0, num);
        } else {
            // Return all the courses in DB
            return MockData.courses();
        }
    },
    getCoursesWithSubject: async (subject_num) => {
        return MockData.courses().slice(0, num);
    },
    getCoursesWithID: async (id) => {
        return MockData.courses().slice(0, 0);
    }

}

export default CourseModel;