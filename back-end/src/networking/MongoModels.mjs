import * as Mongo from "mongoose";

export const Course = Mongo.Schema({
    courseId: Number,
    instructors: [String],
    name: String,
    description: String,
    university: String,
    difficulty: {type: Number, min: 0, max: 5},
    language: String,
    url: String,
    imageUrl: String,
    prerequisites: [String],
    //completionRate: {type: Number, min: 0, max: 100},
    courseHours: Number,
    subjectId: Number
});

export const User = Mongo.Schema({
    userId: Number,
    name: String,
    motto: String,
    avatar: String
});

export const Subject = Mongo.Schema({
    subjectId: Number,
    name: String,
    description: String,
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

export {Mongo};

