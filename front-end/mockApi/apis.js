// Do not change this file!
const KEY = 33866960
const COURSES_MOCK = `courses`
const POSTS_MOCK = `posts`
const SUBJECTS_MOCK = `subjects`
const COMMENTS_MOCK = `comments`


let mockApi = (op) => {
    let option = COURSES_MOCK
    switch (op) {
        case 'courses':
            option = COURSES_MOCK
            break
        case 'posts':
            option = POSTS_MOCK
            break
        case 'subjects':
            option = SUBJECTS_MOCK
            break
        case 'comments':
            option = COMMENTS_MOCK
            break
    }
    return `https://my.api.mockaroo.com/${option}?key=${KEY}`
}
export default mockApi
