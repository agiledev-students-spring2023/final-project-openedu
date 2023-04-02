import {faker} from "@faker-js/faker";

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

    if(subjectList !== null)
        return subjectList;

}
