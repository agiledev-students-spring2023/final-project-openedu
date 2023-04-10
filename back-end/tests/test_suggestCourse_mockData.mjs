import {suggestedCourses} from "../src/util/MockData.mjs";
import assert from "assert";

describe('suggestedCourses', () => {
    let result;
    beforeEach(() => {
        result = suggestedCourses();
    });

    it('should have a subjectId property for each suggestedCourses', () => {
        result.forEach(suggestedCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(suggestedCourses, 'subjectId'));
            assert(typeof suggestedCourses.subjectId === 'number');
        });
    });

    it('should have a name property for each suggestedCourses', () => {
        result.forEach(suggestedCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(suggestedCourses, 'name'));
            assert(typeof suggestedCourses.name === 'string');
        });
    });

    it('should have a description property for each suggestedCourses', () => {
        result.forEach(suggestedCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(suggestedCourses, 'description'));
            assert(typeof suggestedCourses.description === 'string');
        });
    });

    it('should have a courses property for each suggestedCourses', () => {
        result.forEach(suggestedCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(suggestedCourses, 'courses'));
            assert(Array.isArray(suggestedCourses.courses));
            suggestedCourses.courses.forEach(course => {
                assert.ok(Object.prototype.hasOwnProperty.call(course, 'courseId'));
                assert(typeof course.courseId === 'number');
            });
        });
    });


    it('should have a completionRate property for each suggestedCourses', () => {
        result.forEach(suggestedCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(suggestedCourses, 'completionRate'));
            assert(typeof suggestedCourses.completionRate === 'number');
            assert(suggestedCourses.completionRate >= 0 && suggestedCourses.completionRate <= 100);
        });
    });
});