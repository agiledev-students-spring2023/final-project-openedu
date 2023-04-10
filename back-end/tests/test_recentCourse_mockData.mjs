import {recentCourses} from "../src/util/MockData.mjs";
import assert from "assert";

describe('recentCourses', () => {
    let result;
    beforeEach(() => {
        result = recentCourses();
    });

    it('should have a subjectId property for each recentCourses', () => {
        result.forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'subjectId'));
            assert(typeof recentCourses.subjectId === 'number');
        });
    });

    it('should have a name property for each recentCourses', () => {
        result.forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'name'));
            assert(typeof recentCourses.name === 'string');
        });
    });

    it('should have a description property for each recentCourses', () => {
        result.forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'description'));
            assert(typeof recentCourses.description === 'string');
        });
    });

    it('should have a courses property for each recentCourses', () => {
        result.forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'courses'));
            assert(Array.isArray(recentCourses.courses));
            recentCourses.courses.forEach(course => {
                assert.ok(Object.prototype.hasOwnProperty.call(course, 'courseId'));
                assert(typeof course.courseId === 'number');
            });
        });
    });


    it('should have a completionRate property for each recentCourses', () => {
        result.forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'completionRate'));
            assert(typeof recentCourses.completionRate === 'number');
            assert(recentCourses.completionRate >= 0 && recentCourses.completionRate <= 100);
        });
    });
});