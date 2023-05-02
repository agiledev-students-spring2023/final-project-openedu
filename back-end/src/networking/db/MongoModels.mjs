import * as Mongo from "mongoose";
export const Course = Mongo.Schema({
  courseId: { type: Number, required: true, min: 1 },
  name: { type: String, required: true, maxlength: 255 },
  instructor1: { type: String, maxlength: 255 },
  instructor2: { type: String, maxlength: 255 },
  instructor3: { type: String, maxlength: 255 },
  description: { type: String, maxlength: 1024 },
  university: String,
  difficulty: { type: Number, min: 0, max: 5 },
  language: String,
  url: String,
  youtubeUrl: String,
  prerequisites: String,
  courseSite: String,
  //completionRate: {type: Number, min: 0, max: 100},
  courseHours: Number,
  imageUrl: String,
  subjectId: { type: Number, required: true, min: 1 },
});

export const User = Mongo.Schema({
  userId: Number,
  email: String,
  name: String,
  pwd: String,
  motto: String,
  avatar: String,
  isBanned: Boolean,
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
  msg: String,
});

export const Counter = new Mongo.Schema({
  key: String,
  count: Number,
});

export const Post = Mongo.Schema({
  postId: Number,
  userId: Number,
  title: String,
  content: String,
  overview: String,
  likes: Number,
  isSaved: Boolean,
  createTime: String,
});

export const Feedback = Mongo.Schema({
  feedId: Number,
  userId: Number,
  title: String,
  content: String,
  overview: String,
  createTime: String,
});
