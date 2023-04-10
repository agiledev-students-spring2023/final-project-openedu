import {
  courses, subjects, recentCourses,
  suggestCourses, suggestSubjects, recentSubjects
} from '../src/util/MockData.mjs';
import * as Util from "../src/util/Util.mjs"
import * as Network from '../src/networking/NetworkCore.mjs';
describe('courses', () => {
  let result;
  beforeEach(() => {
    result = courses();
  });

  it('should return an array of 500 courses', () => {
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBe(500);
  });

  it('should have a courseId property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('courseId');
      expect(typeof course.courseId).toBe('number');
    });
  });

  it('should have a name property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('name');
      expect(typeof course.name).toBe('string');
    });
  });

  it('should have a description property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('description');
      expect(typeof course.description).toBe('string');
    });
  });

  it('should have a difficulty property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('difficulty');
      expect(typeof course.difficulty).toBe('number');
      expect(course.difficulty).toBeGreaterThanOrEqual(0);
      expect(course.difficulty).toBeLessThanOrEqual(5);
    });
  });

  it('should have a language property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('language');
      expect(typeof course.language).toBe('string');
    });
  });

  it('should have a university property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('university');
      expect(typeof course.university).toBe('string');
    });
  });

  it('should have a url property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('url');
      expect(typeof course.url).toBe('string');
      expect(course.url).toMatch(/^https?:\/\//);
    });
  });

  it('should have a completionRate property for each course', () => {
    result.forEach((course) => {
      expect(course).toHaveProperty('completionRate');
      expect(typeof course.completionRate).toBe('number');
      expect(course.completionRate).toBeGreaterThanOrEqual(0);
      expect(course.completionRate).toBeLessThanOrEqual(100);
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
      expect(subject).toHaveProperty('subjectId');
      expect(typeof subject.subjectId).toBe('number');
    });
  });

  it('should have a name property for each subject', () => {
    result.forEach(subject => {
      expect(subject).toHaveProperty('name');
      expect(typeof subject.name).toBe('string');
    });
  });

  it('should have a description property for each subject', () => {
    result.forEach(subject => {
      expect(subject).toHaveProperty('description');
      expect(typeof subject.description).toBe('string');
    });
  });

  it('should have a courses property for each subject', () => {
    result.forEach(subject => {
      expect(subject).toHaveProperty('courses');
      expect(Array.isArray(subject.courses)).toBe(true);
      subject.courses.forEach(course => {
        expect(course).toHaveProperty('courseId');
        expect(typeof course.courseId).toBe('number');
      });
    });
  });

  it('should have a completionRate property for each subject', () => {
    result.forEach(subject => {
      expect(subject).toHaveProperty('completionRate');
      expect(typeof subject.completionRate).toBe('number');
      expect(subject.completionRate >= 0 && subject.completionRate <= 100).toBe(true);
    });
  });
});


describe('recentCourses', () => {
  let result;
  beforeEach(() => {
    result = recentCourses();
  });

  test('should have a subjectId property for each recentCourses', () => {
    result.forEach(recentCourses => {
      expect(recentCourses).toHaveProperty('subjectId');
      expect(typeof recentCourses.subjectId).toBe('number');
    });
  });

  test('should have a name property for each recentCourses', () => {
    result.forEach(recentCourses => {
      expect(recentCourses).toHaveProperty('name');
      expect(typeof recentCourses.name).toBe('string');
    });
  });

  test('should have a description property for each recentCourses', () => {
    result.forEach(recentCourses => {
      expect(recentCourses).toHaveProperty('description');
      expect(typeof recentCourses.description).toBe('string');
    });
  });

  test('should have a completionRate property for each recentCourses', () => {
    result.forEach(recentCourses => {
      expect(recentCourses).toHaveProperty('completionRate');
      expect(typeof recentCourses.completionRate).toBe('number');
      expect(recentCourses.completionRate >= 0 && recentCourses.completionRate <= 100).toBe(true);
    });
  });
});


describe('suggestCourses', () => {
  let result;

  beforeEach(() => {
    result = suggestCourses();
  });

  it('should have a subjectId property for each suggestCourses', () => {
    result.forEach(suggestCourses => {
      expect(suggestCourses).toHaveProperty('subjectId');
      expect(typeof suggestCourses.subjectId).toBe('number');
    });
  });

  it('should have a name property for each suggestCourses', () => {
    result.forEach(suggestCourses => {
      expect(suggestCourses).toHaveProperty('name');
      expect(typeof suggestCourses.name).toBe('string');
    });
  });

  it('should have a description property for each suggestCourses', () => {
    result.forEach(suggestCourses => {
      expect(suggestCourses).toHaveProperty('description');
      expect(typeof suggestCourses.description).toBe('string');
    });
  });

  it('should have a completionRate property for each suggestCourses', () => {
    result.forEach(suggestCourses => {
      expect(suggestCourses).toHaveProperty('completionRate');
      expect(typeof suggestCourses.completionRate).toBe('number');
      expect(suggestCourses.completionRate).toBeGreaterThanOrEqual(0);
      expect(suggestCourses.completionRate).toBeLessThanOrEqual(100);
    });
  });
});

describe('recentSubject', () => {
  it('should have a subjectId property for each recentCourses', () => {
    recentSubjects().forEach((recentCourses) => {
      expect(recentCourses).toHaveProperty('subjectId');
      expect(typeof recentCourses.subjectId).toBe('number');
    });
  });

  it('should have a name property for each recentCourses', () => {
    recentSubjects().forEach((recentCourses) => {
      expect(recentCourses).toHaveProperty('name');
      expect(typeof recentCourses.name).toBe('string');
    });
  });

  it('should have a description property for each recentCourses', () => {
    recentSubjects().forEach((recentCourses) => {
      expect(recentCourses).toHaveProperty('description');
      expect(typeof recentCourses.description).toBe('string');
    });
  });

  it('should have a courses property for each recentCourses', () => {
    recentSubjects().forEach((entry) => {
      expect(entry).toHaveProperty('courses');
      expect(Array.isArray(entry.courses)).toBe(true);
      entry.courses.forEach((course) => {
        expect(course).toHaveProperty('courseId');
        expect(typeof course.courseId).toBe('number');
      });
    });
  });

  it('should have a completionRate property for each recentCourses', () => {
    recentSubjects().forEach((entry) => {
      expect(entry).toHaveProperty('completionRate');
      expect(typeof entry.completionRate).toBe('number');
      expect(entry.completionRate).toBeGreaterThanOrEqual(0);
      expect(entry.completionRate).toBeLessThanOrEqual(100);
    });
  });
});

describe('suggestSubjects', () => {
  let result;

  beforeEach(() => {
    result = suggestSubjects();
  });

  it('should have a subjectId property for each entry', () => {
    result.forEach((entry) => {
      expect(entry).toHaveProperty('subjectId');
      expect(typeof entry.subjectId).toBe('number');
    });
  });

  it('should have a name property for each entry', () => {
    result.forEach((entry) => {
      expect(entry).toHaveProperty('name');
      expect(typeof entry.name).toBe('string');
    });
  });

  it('should have a description property for each entry', () => {
    result.forEach((entry) => {
      expect(entry).toHaveProperty('description');
      expect(typeof entry.description).toBe('string');
    });
  });

  it('should have a courses property for each entry', () => {
    result.forEach((entry) => {
      expect(entry).toHaveProperty('courses');
      expect(Array.isArray(entry.courses)).toBe(true);
      entry.courses.forEach((course) => {
        expect(course).toHaveProperty('courseId');
        expect(typeof course.courseId).toBe('number');
      });
    });
  });

  it('should have a completionRate property for each entry', () => {
    result.forEach((entry) => {
      expect(entry).toHaveProperty('completionRate');
      expect(typeof entry.completionRate).toBe('number');
      expect(entry.completionRate).toBeGreaterThanOrEqual(0);
      expect(entry.completionRate).toBeLessThanOrEqual(100);
    });
  });
});


describe('util', () => {

  let original, callback, testArr;

  beforeEach(() => {
    original = { a: 'a', b: 'b', c: 'c' };
    callback = () => true;
    testArr = ["a", undefined, "haha", null, 3, 4, 5, 6, 7, 8, 9, 10];
  });

  it('randInt should generate a number less than MAX_SAFE_INTEGER', () => {
    expect(Util.randInt()).toBeLessThan(Number.MAX_SAFE_INTEGER);
  });

  it('addCallback should complete normally', () => {
    expect(Util.addCallback("abc", callback)).toBeUndefined();
  });

  it('removeCallback should complete normally', () => {
    expect(Util.removeCallback("abc", callback)).toBeUndefined();
  });

  it('cloneObject should be excluding property c as specified', () => {
    expect(Util.cloneObject(original, 'c')["c"]).toBeUndefined();
  });

  it("isPerfectArray should be able to detect nulls and undefined in an array", () => {
    expect(Util.isPerfectArray(...testArr)).toBe(false);
  });

});

