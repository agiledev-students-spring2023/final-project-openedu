import * as Mongo from "mongoose";
export const Course = Mongo.Schema({
    courseId: { type: Number, required: true, min: 1 },
    instructors: [String],
    name: { type: String, required: true, maxlength: 255 },
    instructor1: { type: String, maxlength: 255 },
    instructor2: { type: String, maxlength: 255 },
    instructor3: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 1024 },
    university: String,
    difficulty: { type: Number, min: 0, max: 5 },
    language: String,
    url: String,
    imageUrl: String,
    prerequisites: [String],
    //completionRate: {type: Number, min: 0, max: 100},
    courseHours: Number,
    subjectId: { type: Number, required: true, min: 1 }
});



export const User = Mongo.Schema({
    userId: Number,
    email: String,
    name: String,
    pwd: String,
    motto: String,
    avatar: String,
    isBanned: Boolean
});

export const Token = Mongo.Schema({
    userId: Number,
    token: String,
    createTime: String
});

export const Subject = Mongo.Schema({
    subjectId: { type: Number, required: true, min: 1 },
    name: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true, maxlength: 1024 },
    wikiUrl: { type: String, maxlength: 255 },
    imageUrl: String,
    //completionRate: {type: Number, min: 0, max: 100},
});

export const Comment = Mongo.Schema({
    postTime: String,
    courseId: Number,
    userId: Number,
    rating: Number, //-1 if not present, [0,5] if present
    msg: String
});

export const Counter = new Mongo.Schema({
    key: String,
    count: Number
});


