import {faker} from "@faker-js/faker";
import * as Util from "./Util.mjs";

let courseList;
let subjectList;

export function courses() {

    courseList ??= [...Array(500).keys()].map((index) => ({
            courseId: index,
            name: faker.random.word(),
            description: faker.random.words(10),
            difficulty: faker.datatype.number({min: 0,max: 10}),
            language: faker.random.word(),
            url: faker.internet.url(),
            imageUrl: "https://picsum.photos/1920/1080"
        }
    ));

    return courseList;
}

export function subjects() {

    let cnt = 0;

    subjectList ??= [...Array(20).keys()].map((subjectId) => {

        let nCourses = Util.randInt() % 10 + 1;

        nCourses = Math.min(nCourses, courses().length - cnt);

        const courseArr = [];

        for(let i = 0; i < nCourses; ++i) {
            courseArr.push(courses()[cnt]);
            ++cnt;
        }

        return {
            'subjectId' : subjectId,
            'name' : faker.random.word(),
            'description' : faker.random.words(Util.randInt() % 20 + 1),
            'courses' : courseArr,
            'imageUrl' : "https://picsum.photos/1920/1080"
        };
    });

    return subjectList;
}
