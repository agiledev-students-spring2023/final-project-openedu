import { courses, subjects, recentCourses, suggestedCourses } from '../src/util/MockData.mjs';
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

  test('should have a courses property for each recentCourses', () => {
    result.forEach(recentCourses => {
      expect(recentCourses).toHaveProperty('courses');
      expect(Array.isArray(recentCourses.courses)).toBe(true);
      recentCourses.courses.forEach(course => {
        expect(course).toHaveProperty('courseId');
        expect(typeof course.courseId).toBe('number');
      });
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


describe('suggestedCourses', () => {
  let result;

  beforeEach(() => {
    result = suggestedCourses();
  });

  it('should have a subjectId property for each suggestedCourses', () => {
    result.forEach(suggestedCourses => {
      expect(suggestedCourses).toHaveProperty('subjectId');
      expect(typeof suggestedCourses.subjectId).toBe('number');
    });
  });

  it('should have a name property for each suggestedCourses', () => {
    result.forEach(suggestedCourses => {
      expect(suggestedCourses).toHaveProperty('name');
      expect(typeof suggestedCourses.name).toBe('string');
    });
  });

  it('should have a description property for each suggestedCourses', () => {
    result.forEach(suggestedCourses => {
      expect(suggestedCourses).toHaveProperty('description');
      expect(typeof suggestedCourses.description).toBe('string');
    });
  });

  it('should have a courses property for each suggestedCourses', () => {
    result.forEach(suggestedCourses => {
      expect(suggestedCourses).toHaveProperty('courses');
      expect(Array.isArray(suggestedCourses.courses)).toBe(true);
      suggestedCourses.courses.forEach(course => {
        expect(course).toHaveProperty('courseId');
        expect(typeof course.courseId).toBe('number');
      });
    });
  });

  it('should have a completionRate property for each suggestedCourses', () => {
    result.forEach(suggestedCourses => {
      expect(suggestedCourses).toHaveProperty('completionRate');
      expect(typeof suggestedCourses.completionRate).toBe('number');
      expect(suggestedCourses.completionRate).toBeGreaterThanOrEqual(0);
      expect(suggestedCourses.completionRate).toBeLessThanOrEqual(100);
    });
  });
});
