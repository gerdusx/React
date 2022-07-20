import mongoose from 'mongoose';

export interface IProject {
	name: string;
	path: string;
	lastModified: number;
}

const ProjectSchema = new mongoose.Schema({
	name: String,
	path: String,
	lastModified: Number,
});

export const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);