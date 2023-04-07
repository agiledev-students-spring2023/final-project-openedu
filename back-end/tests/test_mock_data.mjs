import { courses,subjects } from '../src/util/MockData.mjs';
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
      assert.ok(course.hasOwnProperty('courseId'));
      assert.strictEqual(typeof course.courseId, 'number');
    });
  });

  it('should have a name property for each course', () => {
    result.forEach(course => {
      assert.ok(course.hasOwnProperty('name'));
      assert.strictEqual(typeof course.name, 'string');
    });
  });

  it('should have a description property for each course', () => {
    result.forEach(course => {
      assert.ok(course.hasOwnProperty('description'));
      assert.strictEqual(typeof course.description, 'string');
    });
  });

  it('should have a difficulty property for each course', () => {
    result.forEach(course => {
      assert.ok(course.hasOwnProperty('difficulty'));
      assert.strictEqual(typeof course.difficulty, 'number');
      assert.ok(course.difficulty >= 0 && course.difficulty <= 5);
    });
  });

  it('should have a language property for each course', () => {
    result.forEach(course => {
      assert.ok(course.hasOwnProperty('language'));
      assert.strictEqual(typeof course.language, 'string');
    });
  });

  it('should have a university property for each course', () => {
    result.forEach(course => {
      assert.ok(course.hasOwnProperty('university'));
      assert.strictEqual(typeof course.university, 'string');
    });
  });

  it('should have a url property for each course', () => {
    result.forEach(course => {
      assert.ok(course.hasOwnProperty('url'));
      assert.strictEqual(typeof course.url, 'string');
      assert.ok(/^https?:\/\//.test(course.url));
    });
  });

  it('should have a completionRate property for each course', () => {
    result.forEach(course => {
      assert.ok(course.hasOwnProperty('completionRate'));
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
      assert(subject.hasOwnProperty('subjectId'));
      assert(typeof subject.subjectId === 'number');
    });
  });

  it('should have a name property for each subject', () => {
    result.forEach(subject => {
      assert(subject.hasOwnProperty('name'));
      assert(typeof subject.name === 'string');
    });
  });

  it('should have a description property for each subject', () => {
    result.forEach(subject => {
      assert(subject.hasOwnProperty('description'));
      assert(typeof subject.description === 'string');
    });
  });

  it('should have a courses property for each subject', () => {
    result.forEach(subject => {
      assert(subject.hasOwnProperty('courses'));
      assert(Array.isArray(subject.courses));
      subject.courses.forEach(course => {
        assert(course.hasOwnProperty('courseId'));
        assert(typeof course.courseId === 'number');
      });
    });
  });


  it('should have a completionRate property for each subject', () => {
    result.forEach(subject => {
      assert(subject.hasOwnProperty('completionRate'));
      assert(typeof subject.completionRate === 'number');
      assert(subject.completionRate >= 0 && subject.completionRate <= 100);
    });
  });
});
