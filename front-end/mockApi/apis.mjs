// Do not change this file!
const KEY = '1aa7ed40'
const COURSES_MOCK = `courses`
const POSTS_MOCK = `posts`
const SUBJECTS_MOCK = `subjects`
const COMMENTS_MOCK = `comments`
// Remainder, I only provided mock urls in the data. 
// in order to use images, please use 


let mockDataApi = (op) => {
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


// Just add your desired image size (width & height) after our URL, and you'll get a random image.
// To get a square image, just add the width.
let mockImageApi=(width, height)=>{
    return `https://picsum.photos/${width}/${(!height)?width:height}`;
}
