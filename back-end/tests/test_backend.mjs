// This is the mocha testing file for the backend.

import dotenv from "dotenv";
import {
  courses,
  recentSubjects,
  subjects,
  suggestSubjects,
  suggestCourses,
  recentCourses
} from "../src/util/MockData.mjs";
import assert from "assert";
import * as Util from "../src/util/Util.mjs";
import {
  getCurrentTime,
  getElapsedTime,
  getCurrentTimeString,
  toTimeString,
} from "../src/util/FmtTime.mjs";



describe("courses", () => {
  let result;
  beforeEach(() => {
    result = courses();
  });

  it("should return an array of 500 courses", () => {
    assert.ok(Array.isArray(result));
    assert.strictEqual(result.length, 500);
  });

  it("should have a courseId property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "courseId"));
      assert.strictEqual(typeof course.courseId, "number");
    });
  });

  it("should have a name property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "name"));
      assert.strictEqual(typeof course.name, "string");
    });
  });

  it("should have a description property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "description"));
      assert.strictEqual(typeof course.description, "string");
    });
  });

  it("should have a difficulty property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "difficulty"));
      assert.strictEqual(typeof course.difficulty, "number");
      assert.ok(course.difficulty >= 0 && course.difficulty <= 5);
    });
  });

  it("should have a language property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "language"));
      assert.strictEqual(typeof course.language, "string");
    });
  });

  it("should have a university property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "university"));
      assert.strictEqual(typeof course.university, "string");
    });
  });

  it("should have a url property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "url"));
      assert.strictEqual(typeof course.url, "string");
      assert.ok(/^https?:\/\//.test(course.url));
    });
  });

  it("should have a completionRate property for each course", () => {
    result.forEach((course) => {
      assert.ok(Object.prototype.hasOwnProperty.call(course, "completionRate"));
      assert.strictEqual(typeof course.completionRate, "number");
      assert.ok(course.completionRate >= 0 && course.completionRate <= 100);
    });
  });
});

describe("subjects", () => {
  let result;
  beforeEach(() => {
    result = subjects();
  });

  it("should have a subjectId property for each subject", () => {
    result.forEach((subject) => {
      assert.ok(Object.prototype.hasOwnProperty.call(subject, "subjectId"));
      assert(typeof subject.subjectId === "number");
    });
  });

  it("should have a name property for each subject", () => {
    result.forEach((subject) => {
      assert.ok(Object.prototype.hasOwnProperty.call(subject, "name"));
      assert(typeof subject.name === "string");
    });
  });

  it("should have a description property for each subject", () => {
    result.forEach((subject) => {
      assert.ok(Object.prototype.hasOwnProperty.call(subject, "description"));
      assert(typeof subject.description === "string");
    });
  });

  it("should have a courses property for each subject", () => {
    result.forEach((subject) => {
      assert.ok(Object.prototype.hasOwnProperty.call(subject, "courses"));
      assert(Array.isArray(subject.courses));
      subject.courses.forEach((course) => {
        assert.ok(Object.prototype.hasOwnProperty.call(course, "courseId"));
        assert(typeof course.courseId === "number");
      });
    });
  });

  it("should have a completionRate property for each subject", () => {
    result.forEach((subject) => {
      assert.ok(
        Object.prototype.hasOwnProperty.call(subject, "completionRate")
      );
      assert(typeof subject.completionRate === "number");
      assert(subject.completionRate >= 0 && subject.completionRate <= 100);
    });
  });
});

describe("util", () => {
  let original, callback, testArr;

  before(() => {
    original = { a: "a", b: "b", c: "c" };
    callback = () => true;
    testArr = ["a", undefined, "haha", null, 3, 4, 5, 6, 7, 8, 9, 10];
  });

  it("randInt should generate a number less than MAX_SAFE_INTEGER", () => {
    assert.equal(Util.randInt() < Number.MAX_SAFE_INTEGER, true);
  });

  it("addCallback should complete normally", () => {
    assert.equal(Util.addCallback("abc", callback), undefined);
  });

  it("removeCallback should complete normally", () => {
    assert.equal(Util.removeCallback("abc", callback), undefined);
  });

  it("cloneObject should be excluding property c as specified", () => {
    assert.equal(Util.cloneObject(original, "c")["c"], undefined);
  });

  it("isPerfectArray should be able to detect nulls and undefined in an array", () => {
    assert.equal(Util.isPerfectArray(...testArr), false);
  });
});

describe("recentSubject", () => {
  it("should have a subjectId property for each recentCourses", () => {
    recentSubjects().forEach((recentCourses) => {
      assert.ok(
        Object.prototype.hasOwnProperty.call(recentCourses, "subjectId")
      );
      assert(typeof recentCourses.subjectId === "number");
    });
  });

  it("should have a name property for each recentCourses", () => {
    recentSubjects().forEach((recentCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, "name"));
      assert(typeof recentCourses.name === "string");
    });
  });

  it("should have a description property for each recentCourses", () => {
    recentSubjects().forEach((recentCourses) => {
      assert.ok(
        Object.prototype.hasOwnProperty.call(recentCourses, "description")
      );
      assert(typeof recentCourses.description === "string");
    });
  });

  it("should have a courses property for each recentCourses", () => {
    recentSubjects().forEach((entry) => {
      assert.ok(Object.prototype.hasOwnProperty.call(entry, "courses"));
      assert(Array.isArray(entry.courses));
      entry.courses.forEach((course) => {
        assert.ok(Object.prototype.hasOwnProperty.call(course, "courseId"));
        assert(typeof course.courseId === "number");
      });
    });
  });

  it("should have a completionRate property for each recentCourses", () => {
    recentSubjects().forEach((entry) => {
      assert.ok(Object.prototype.hasOwnProperty.call(entry, "completionRate"));
      assert(typeof entry.completionRate === "number");
      assert(entry.completionRate >= 0 && entry.completionRate <= 100);
    });
  });
});

describe("suggestSubjects", () => {
  let result;
  beforeEach(() => {
    result = suggestSubjects();
  });

  it("should have a subjectId property for each entry", () => {
    result.forEach((entry) => {
      assert.ok(Object.prototype.hasOwnProperty.call(entry, "subjectId"));
      assert(typeof entry.subjectId === "number");
    });
  });

  it("should have a name property for each entry", () => {
    result.forEach((entry) => {
      assert.ok(Object.prototype.hasOwnProperty.call(entry, "name"));
      assert(typeof entry.name === "string");
    });
  });

  it("should have a description property for each entry", () => {
    result.forEach((entry) => {
      assert.ok(Object.prototype.hasOwnProperty.call(entry, "description"));
      assert(typeof entry.description === "string");
    });
  });

  it("should have a courses property for each entry", () => {
    result.forEach((entry) => {
      assert.ok(Object.prototype.hasOwnProperty.call(entry, "courses"));
      assert(Array.isArray(entry.courses));
      entry.courses.forEach((course) => {
        assert.ok(Object.prototype.hasOwnProperty.call(course, "courseId"));
        assert(typeof course.courseId === "number");
      });
    });
  });

  it("should have a completionRate property for each entry", () => {
    result.forEach((entry) => {
      assert.ok(Object.prototype.hasOwnProperty.call(entry, "completionRate"));
      assert(typeof entry.completionRate === "number");
      assert(entry.completionRate >= 0 && entry.completionRate <= 100);
    });
  });
});



describe('getCurrentTime', () => {
  it('should return the current time', () => {
    const currentTime = getCurrentTime();
    assert(currentTime instanceof Date);
  });
});

describe('getElapsedTime', () => {
  it('should return the elapsed time', () => {
    const startTime = new Date();
    // Delay for 1 second
    setTimeout(() => {
      const elapsedTime = getElapsedTime(startTime);
      assert(elapsedTime instanceof Date);
      assert(elapsedTime.getTime() >= 1000);
    }, 1000);
  });
});

describe('getCurrentTimeString', () => {
  it('should return the current time string in ISO format', () => {
    const currentTimeString = getCurrentTimeString();
    assert(typeof currentTimeString === 'string');
    assert(new Date(currentTimeString) !== 'Invalid Date');
  });
});

describe('toTimeString', () => {
  it('should return the given date object in ISO format', () => {
    const dateObj = new Date();
    const timeString = toTimeString(dateObj);
    assert(typeof timeString === 'string');
    assert(new Date(timeString) !== 'Invalid Date');
  });
});




describe('getConfigParam', () => {
  before(() => {
    // Load the environment variables from .env file
    dotenv.config();
  });

  it('should return the value of a valid config key', () => {
    const configKey = 'API_KEY';
    const expectedValue = 'your-api-key';

    process.env[configKey] = expectedValue;

    const actualValue = Util.getConfigParam(configKey);

    assert.strictEqual(actualValue, expectedValue);
  });

  it('should return undefined for an invalid config key', () => {
    const configKey = 'INVALID_KEY';

    process.env[configKey] = undefined;

    const actualValue = Util.getConfigParam(configKey);

    assert.strictEqual(actualValue, 'undefined');
  });

  it('should log a message for an invalid config key', () => {
    const consoleLogStub = {
      logs: [],
      log(message) {
        this.logs.push(message);
      },
    };

    const configKey = 'INVALID_KEY';
    const expectedLogMessage = [];
    console.log = consoleLogStub.log.bind(consoleLogStub);

    Util.getConfigParam(configKey);

    assert.deepStrictEqual(consoleLogStub.logs, expectedLogMessage);
  });
});




describe('isValidWebRequest', () => {
  it('should return true if all required params are present in the request query', () => {
    const req = {
      method: 'GET',
      query: {
        param1: 'value1',
        param2: 'value2',
      },
    };
    const requiredParams = ['param1', 'param2'];

    const isValid = Util.isValidWebRequest(req, ...requiredParams);

    assert.strictEqual(isValid, true);
  });

  it('should return true if all required params are present in the request body', () => {
    const req = {
      method: 'POST',
      body: {
        param1: 'value1',
        param2: 'value2',
      },
    };
    const requiredParams = ['param1', 'param2'];

    const isValid = Util.isValidWebRequest(req, ...requiredParams);

    assert.strictEqual(isValid, true);
  });

  it('should return false if any required param is missing from the request query', () => {
    const req = {
      method: 'GET',
      query: {
        param1: 'value1',
      },
    };
    const requiredParams = ['param1', 'param2'];

    const isValid = Util.isValidWebRequest(req, ...requiredParams);

    assert.strictEqual(isValid, false);
  });

  it('should return false if any required param is missing from the request body', () => {
    const req = {
      method: 'POST',
      body: {
        param1: 'value1',
      },
    };
    const requiredParams = ['param1', 'param2'];

    const isValid = Util.isValidWebRequest(req, ...requiredParams);

    assert.strictEqual(isValid, false);
  });

  it('should return false if the request igit ps null', () => {
    const req = null;
    const requiredParams = ['param1', 'param2'];

    const isValid = Util.isValidWebRequest(req, ...requiredParams);

    assert.strictEqual(isValid, false);
  });
});

describe("suggestCourses", () => {
  let result;

  beforeEach(() => {
    result = suggestCourses();
  });

  it("should have a subjectId property for each suggestCourses", () => {
    result.forEach((suggestCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(suggestCourses, "subjectId"));
      assert.strictEqual(typeof suggestCourses.subjectId, "number");
    });
  });

  it("should have a name property for each suggestCourses", () => {
    result.forEach((suggestCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(suggestCourses, "name"));
      assert.strictEqual(typeof suggestCourses.name, "string");
    });
  });

  it("should have a description property for each suggestCourses", () => {
    result.forEach((suggestCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(suggestCourses, "description"));
      assert.strictEqual(typeof suggestCourses.description, "string");
    });
  });

  it("should have a completionRate property for each suggestCourses", () => {
    result.forEach((suggestCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(suggestCourses, "completionRate"));
      assert.strictEqual(typeof suggestCourses.completionRate, "number");
      assert.strictEqual(suggestCourses.completionRate >= 0, true);
      assert.strictEqual(suggestCourses.completionRate <= 100, true);
    });
  });
});

describe("recentCourses", () => {
  let result;

  beforeEach(() => {
    result = recentCourses();
  });

  it("should have a subjectId property for each recentCourses", () => {
    result.forEach((recentCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, "subjectId"));
      assert.strictEqual(typeof recentCourses.subjectId, "number");
    });
  });

  it("should have a name property for each recentCourses", () => {
    result.forEach((recentCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, "name"));
      assert.strictEqual(typeof recentCourses.name, "string");
    });
  });

  it("should have a description property for each recentCourses", () => {
    result.forEach((recentCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, "description"));
      assert.strictEqual(typeof recentCourses.description, "string");
    });
  });

  it("should have a completionRate property for each recentCourses", () => {
    result.forEach((recentCourses) => {
      assert.ok(Object.prototype.hasOwnProperty.call(recentCourses, "completionRate"));
      assert.strictEqual(typeof recentCourses.completionRate, "number");
      assert.strictEqual(recentCourses.completionRate >= 0 && recentCourses.completionRate <= 100, true);
    });
  });
});
