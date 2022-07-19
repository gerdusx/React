//IMPORT MONGOOSE
import mongoose, { Model } from 'mongoose';
import { Directory } from "../models/Directory";
import { DirFile } from "../models/DirFile";
import { Project } from '../models/Project';
import { Todo } from "../models/Todo";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env;
const uri = 'mongodb://localhost:27017/code-database';

// connection function
export const connect = async () => {
	//const conn = await mongoose.connect(DATABASE_URL as string).catch((err) => console.log(err));
	const conn = await mongoose.connect(uri).catch((err) => console.log(err));
	console.log('Mongoose Connection Established');

	return { conn, Todo, Directory, Project, DirFile };
};
