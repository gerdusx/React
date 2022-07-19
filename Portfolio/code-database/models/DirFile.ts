import mongoose from 'mongoose';

export interface IDirFile {
	filename: string;
	filepath: string;
	lastModified: number;
	project: IDirFileProject;
	lines: IDirFileLine[];
}

interface IDirFileProject {
	data: string;
	name: string;
}

export interface IDirFileLine {
	content: string;
	lineNr: number;
}

const DirFileSchema = new mongoose.Schema({
	filename: String,
	filepath: String,
	lastModified: Number,
	project: {
		data: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
		name: String,
	},
	lines: {
		content: String,
		lineNr: Number,
	},
});

export const DirFile = mongoose.models.DirFile || mongoose.model('DirFile', DirFileSchema);
