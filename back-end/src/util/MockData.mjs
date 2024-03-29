import { faker } from "@faker-js/faker";
import * as Util from "./Util.mjs";

let courseList;
let subjectList;
let postList;
let feedbackList;

export function imageUrl() {
  return `https://picsum.photos/${1900 + (Util.randInt() % 100)}/${
    1000 + (Util.randInt() % 100)
  }`;
}

export function courses() {
    courseList ??= [...Array(500).keys()].map((index) => ({
        courseId: index,
        instructors: [
            faker.random.words(2),
            faker.random.words(2)
        ],
        name: faker.random.word(4),
        description: faker.random.words(10),
        university: faker.random.words(4),
        difficulty: faker.datatype.number({ min: 1, max: 5 }),
        language: faker.random.word(),
        url: faker.internet.url(),
        imageUrl: imageUrl(),

        prerequisites:
            [...Array(5).keys()]
            .map(_ => faker.random.words(2)
            ),

        completionRate: Util.randInt() % 101,
        courseHours: Util.randInt() % 100,
    }));

  return courseList;
}

export function course() {
    return courses()[Util.randInt() % courses().length];
}

export function subjects() {
  let cnt = 0;

  //We require courses so lets load courses first
  courses();

  subjectList ??= [...Array(20).keys()].map((subjectId) => {
    let nCourses = (Util.randInt() % 10) + 1;

    nCourses = Math.min(nCourses, courses().length - cnt);

    const courseArr = [];

    for (let i = 0; i < nCourses; ++i) {
      courseList[cnt].subjectId = subjectId;
      courseArr.push(courseList[cnt]);

      ++cnt;
    }

    return {
      subjectId: subjectId,
      name: faker.random.word(),
      description: faker.random.words((Util.randInt() % 20) + 1),
      courses: courseArr,
      imageUrl: `https://picsum.photos/${1900 + (Util.randInt() % 100)}/${
        1000 + (Util.randInt() % 100)
      }`,
      completionRate: Util.randInt() % 101,
    };
  });

  return subjectList;
}

export function subject() {
    return subjects()[Util.randInt() % subjects().length];
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

export function user() {
    return {
        userId: Util.randInt() % 10000,
        email: "foobar@nyu.edu",
        name: faker.name.fullName(),
        motto: faker.lorem.words(5),
        avatar: imageUrl(),
        isBanned: false
    };
}

export function recentCourses() {
  return [...Array(20).keys()].map((index) => {
    index = (index + (Util.randInt() % 10)) % courses().length;

    return courses()[index];
  });
}

export function suggestCourses() {
  return [...Array(20).keys()].map((index) => {
    index = (index + (Util.randInt() % 10)) % courses().length;
    return courses()[index];
  });
}

export function recentSubjects() {
  return [...Array(20).keys()].map((index) => {
    index = (index + (Util.randInt() % 10)) % subjects().length;

    return subjects()[index];
  });
}

export function suggestSubjects() {
  return [...Array(20).keys()].map((index) => {
    index = (index + (Util.randInt() % 10)) % subjects().length;
    return subjects()[index];
  });
}

export function feedback() {

  feedbackList ??= [...Array(100).keys()].map((index) => ({
    feedbackId: index,
    title: faker.random.words(5),
    content: faker.random.words(100),
    overview: faker.random.words(15),
    date: faker.date.past(),
  }));

  return feedbackList;
}

export function init() {
    subjects();
    courses();
}