import { courses, subjects } from '../src/util/MockData.mjs';
import assert from 'assert';

describe('courses', () => {
    let result;
    beforeEach(() => {
        result = courses();
    });

    it('should return an array of 500 courses', () => {
        assert.ok(Array.isArray(result));
        assert.strictEqual(result.length, 500);
    });

    it('should have a courseId property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'courseId'));
            assert.strictEqual(typeof course.courseId, 'number');
        });
    });

    it('should have a name property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'name'));
            assert.strictEqual(typeof course.name, 'string');
        });
    });

    it('should have a description property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'description'));
            assert.strictEqual(typeof course.description, 'string');
        });
    });

    it('should have a difficulty property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'difficulty'));
            assert.strictEqual(typeof course.difficulty, 'number');
            assert.ok(course.difficulty >= 0 && course.difficulty <= 5);
        });
    });

    it('should have a language property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'language'));
            assert.strictEqual(typeof course.language, 'string');
        });
    });

    it('should have a university property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'university'));
            assert.strictEqual(typeof course.university, 'string');
        });
    });

    it('should have a url property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'url'));
            assert.strictEqual(typeof course.url, 'string');
            assert.ok(/^https?:\/\//.test(course.url));
        });
    });

    it('should have a completionRate property for each course', () => {
        result.forEach(course => {
            assert.ok(Object.prototype.hasOwnProperty.call(course, 'completionRate'));
            assert.strictEqual(typeof course.completionRate, 'number');
            assert.ok(course.completionRate >= 0 && course.completionRate <= 100);
        });
    });
});



describe('subjects', () => {
    let result;
    beforeEach(() => {
        result = subjects();
    });

    it('should have a subjectId property for each subject', () => {
        result.forEach(subject => {
            assert.ok(Object.prototype.hasOwnProperty.call(subject, 'subjectId'));
            assert(typeof subject.subjectId === 'number');
        });
    });

    it('should have a name property for each subject', () => {
        result.forEach(subject => {
            assert.ok(Object.prototype.hasOwnProperty.call(subject, 'name'));
            assert(typeof subject.name === 'string');
        });
    });

    it('should have a description property for each subject', () => {
        result.forEach(subject => {
            assert.ok(Object.prototype.hasOwnProperty.call(subject, 'description'));
            assert(typeof subject.description === 'string');
        });
    });

    it('should have a courses property for each subject', () => {
        result.forEach(subject => {
            assert.ok(Object.prototype.hasOwnProperty.call(subject, 'courses'));
            assert(Array.isArray(subject.courses));
            subject.courses.forEach(course => {
                assert.ok(Object.prototype.hasOwnProperty.call(course, 'courseId'));
                assert(typeof course.courseId === 'number');
            });
        });
    });


    it('should have a completionRate property for each subject', () => {
        result.forEach(subject => {
            assert.ok(Object.prototype.hasOwnProperty.call(subject, 'completionRate'));
            assert(typeof subject.completionRate === 'number');
            assert(subject.completionRate >= 0 && subject.completionRate <= 100);
        });
    });
});

