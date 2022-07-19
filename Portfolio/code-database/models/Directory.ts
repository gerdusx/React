import mongoose from 'mongoose';

const DirectorySchema = new mongoose.Schema({
	name: String
});

export const Directory = mongoose.models.Directory || mongoose.model('Directory', DirectorySchema);
