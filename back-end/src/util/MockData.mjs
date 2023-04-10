import { faker } from "@faker-js/faker";
import * as Util from "./Util.mjs";

let courseList;
let subjectList;
let postList;
let recentCourseList;
let suggestedCourseList;


export function courses() {
  courseList ??= [...Array(500).keys()].map((index) => ({
    courseId: index,
    name: faker.random.word(),
    description: faker.random.words(10),
    university: faker.random.words(5),
    difficulty: faker.datatype.number({ min: 0, max: 5 }),
    language: faker.random.word(),
    url: faker.internet.url(),
    imageUrl: "https://picsum.photos/1920/1080",
    completionRate: Util.randInt() % 101,
  }));

  return courseList;
}

export function recentCourses() {
  let cnt = 0;

  subjectList ??= [...Array(20).keys()].map((subjectId) => {
    let nCourses = (Util.randInt() % 10) + 1;

    nCourses = Math.min(nCourses, courses().length - cnt);

    const courseArr = [];

    for (let i = 0; i < nCourses; ++i) {
      courseArr.push(courses()[cnt]);
      ++cnt;
    }

    return {
      subjectId: subjectId,
      name: faker.random.word(),
      description: faker.random.words((Util.randInt() % 20) + 1),
      courses: courseArr,
      imageUrl: "https://picsum.photos/1920/1920",
      completionRate: Util.randInt() % 101,
    };
  });

  return recentCourseList;
}

export function suggestedCourses() {
  let cnt = 0;

  subjectList ??= [...Array(20).keys()].map((subjectId) => {
    let nCourses = (Util.randInt() % 10) + 1;

    nCourses = Math.min(nCourses, courses().length - cnt);

    const courseArr = [];

    for (let i = 0; i < nCourses; ++i) {
      courseArr.push(courses()[cnt]);
      ++cnt;
    }

    return {
      subjectId: subjectId,
      name: faker.random.word(),
      description: faker.random.words((Util.randInt() % 20) + 1),
      courses: courseArr,
      imageUrl: "https://picsum.photos/1920/1080",
      completionRate: Util.randInt() % 101,
    };
  });
}

export function subjects() {
  let cnt = 0;

  subjectList ??= [...Array(20).keys()].map((subjectId) => {
    let nCourses = (Util.randInt() % 10) + 1;

    nCourses = Math.min(nCourses, courses().length - cnt);

    const courseArr = [];

    for (let i = 0; i < nCourses; ++i) {
      courseArr.push(courses()[cnt]);
      ++cnt;
    }

    return {
      subjectId: subjectId,
      name: faker.random.word(),
      description: faker.random.words((Util.randInt() % 20) + 1),
      courses: courseArr,
      imageUrl: "https://picsum.photos/1920/1080",
      completionRate: Util.randInt() % 101,
    };
  });

  return subjectList;
}

export function posts() {
  postList ??= [...Array(100).keys()].map((index) => ({
    postId: index,
    title: faker.random.words(5),
    content: faker.random.words(100),
    overview: faker.random.words(15),
    likes: Util.randInt() % 100,
    date: faker.date.past(),
  }));

  return postList;
}
