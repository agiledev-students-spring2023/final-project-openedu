import {
    courses,
    recentCourses,
    recentSubjects,
    subjects,
    suggestCourses,
    suggestSubjects
} from '../src/util/MockData.mjs';
import assert from 'assert';
import * as Util from "../src/util/Util.mjs";

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

describe('util', () => {

    let original, callback, testArr;

    before(() => {
        original = {a: 'a', b: 'b', c: 'c'};
        callback = () => true;
        testArr = ["a", undefined, "haha", null, 3, 4, 5, 6, 7, 8, 9, 10];
    });

    it('randInt should generate a number less than MAX_SAFE_INTEGER', () => {
        assert.equal(Util.randInt() < Number.MAX_SAFE_INTEGER, true);
    });

    it('addCallback should complete normally', () => {
        assert.equal(Util.addCallback("abc", callback), undefined);
    });

    it('removeCallback should complete normally', () => {
        assert.equal(Util.removeCallback("abc", callback), undefined);
    });

    it('cloneObject should be excluding property c as specified', () => {
        assert.equal(Util.cloneObject(original, 'c')["c"], undefined);
    });

    it("isPerfectArray should be able to detect nulls and undefined in an array", () => {
        assert.equal(Util.isPerfectArray(...testArr), false);
    });

});

describe('recentSubject', () => {
    

    it('should have a subjectId property for each recentCourses', () => {
        recentSubjects().forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'subjectId'));
            assert(typeof recentCourses.subjectId === 'number');
        });
    });

    it('should have a name property for each recentCourses', () => {
        recentSubjects().forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'name'));
            assert(typeof recentCourses.name === 'string');
        });
    });

    it('should have a description property for each recentCourses', () => {
        recentSubjects().forEach(recentCourses => {
            assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, 'description'));
            assert(typeof recentCourses.description === 'string');
        });
    });

    it('should have a courses property for each recentCourses', () => {
        recentSubjects().forEach(entry => {
            assert.ok(Object.prototype.hasOwnProperty.call(entry, 'courses'));
            assert(Array.isArray(entry.courses));
            entry.courses.forEach(course => {
                assert.ok(Object.prototype.hasOwnProperty.call(course, 'courseId'));
                assert(typeof course.courseId === 'number');
            });
        });
    });


    it('should have a completionRate property for each recentCourses', () => {
        recentSubjects().forEach(entry => {
            assert.ok(Object.prototype.hasOwnProperty.call(entry, 'completionRate'));
            assert(typeof entry.completionRate === 'number');
            assert(entry.completionRate >= 0 && entry.completionRate <= 100);
        });
    });
});

describe('suggestSubjects', () => {
    let result;
    beforeEach(() => {
        result = suggestSubjects();
    });

    it('should have a subjectId property for each entry', () => {
        result.forEach(entry => {
            assert.ok(Object.prototype.hasOwnProperty.call(entry, 'subjectId'));
            assert(typeof entry.subjectId === 'number');
        });
    });

    it('should have a name property for each entry', () => {
        result.forEach(entry => {
            assert.ok(Object.prototype.hasOwnProperty.call(entry, 'name'));
            assert(typeof entry.name === 'string');
        });
    });

    it('should have a description property for each entry', () => {
        result.forEach(entry => {
            assert.ok(Object.prototype.hasOwnProperty.call(entry, 'description'));
            assert(typeof entry.description === 'string');
        });
    });

    it('should have a courses property for each entry', () => {
        result.forEach(entry => {
            assert.ok(Object.prototype.hasOwnProperty.call(entry, 'courses'));
            assert(Array.isArray(entry.courses));
            entry.courses.forEach(course => {
                assert.ok(Object.prototype.hasOwnProperty.call(course, 'courseId'));
                assert(typeof course.courseId === 'number');
            });
        });
    });


    it('should have a completionRate property for each entry', () => {
        result.forEach(entry => {
            assert.ok(Object.prototype.hasOwnProperty.call(entry, 'completionRate'));
            assert(typeof entry.completionRate === 'number');
            assert(entry.completionRate >= 0 && entry.completionRate <= 100);
        });
    });
});