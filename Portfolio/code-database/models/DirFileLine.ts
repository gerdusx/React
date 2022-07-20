import mongoose from 'mongoose';

export interface IDirFileLine {
	content: string;
	lineNr: number;
	file: IIDirFileLine_File;
	project: IIDirFileLine_Project;
	search: string[];
}

interface IIDirFileLine_Project {
	data: string;
	name: string;
}

interface IIDirFileLine_File {
	data: string;
	name: string;
	path: string;
}

const DirFileLineSchema = new mongoose.Schema({
	content: String,
	lineNr: Number,
	file: {
		data: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'DirFile',
		},
		name: String,
		path: String,
	},
	project: {
		data: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
		name: String,
	},
	search: Array
});

export const DirFileLine = mongoose.models.DirFileLine || mongoose.model('DirFileLine', DirFileLineSchema);
