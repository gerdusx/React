// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { connect } from '../../utils/connection';
import { IDirFile } from '../../models/DirFile';
import { IDirFileLine } from '../../models/DirFileLine';

type Data = {
	files: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { Project, DirFile, DirFileLine, Directory } = await connect(); // connect to database

	const currentTime = new Date().getTime();

	const projects = await Project.find({});
	const excludeDirectories = (await Directory.find({})).map(dir => dir.name);

	console.log('excludeDirectories', excludeDirectories);
	console.log('projects', projects);
	

	projects.map(async (project) => {
		let files = getModifiedFiles(project, [], excludeDirectories);

		console.log('files', files);
		

		if (files?.length > 0) {
			await Promise.all(
				files.map(async (file, index) => {
					let dbFile = await DirFile.findOne({ filepath: file.filepath });

					if (!dbFile) {
						dbFile = await DirFile.create(file);
					}

					//Delete existing lines of code
					if (dbFile.lines?.length > 0) {
						await DirFileLine.deleteMany({ 'file.data': dbFile._id });
					}

					const fileLines: IDirFileLine[] = [];
					const allFileContents = readFileSync(file.filepath, 'utf-8');
					allFileContents.split(/\r?\n/).map(async (line, index) => {
						try {
							const newLine: IDirFileLine = {
								content: line,
								lineNr: index+1,
								file: {
									data: dbFile._id,
									name: dbFile.filename,
									path: dbFile.filepath,
								},
								project: {
									data: project._id,
									name: project.name,
								},
								search: generateSearchArray(line),
							};
							fileLines.push(newLine);

						} catch (error) {
							console.log(error);
						}
					});

					await DirFileLine.insertMany(fileLines);
					dbFile.lines = [...fileLines];
					//await DirFile.findByIdAndUpdate(savedFile._id, { lines: [{ content: 'dfdsf', lineNr: 0 }] });
					await DirFile.findByIdAndUpdate(dbFile._id, dbFile);
					//return newFile;
					console.log('update file');
				})
			);
		} else {
			console.log('No files no modify');
		}

		project.lastModified = currentTime;
		await Project.findByIdAndUpdate(project._id, project);
		console.log('update project');
	});

	res.status(200).json({ files: [] });
}

const getModifiedFiles = function (project: any, arrayOfFiles: IDirFile[], excludeDirectories: string[]) {
	const files = readdirSync(project.path);

	arrayOfFiles = arrayOfFiles || [];

	files.forEach(function (file) {
		console.log('file', file);
		
		const currentFileStats = statSync(project.path + '/' + file);

		if (currentFileStats.isDirectory() && !excludeDirectories.includes(file)) {
			console.log('if');
			
			arrayOfFiles = getModifiedFiles(project.path + '/' + file, arrayOfFiles, excludeDirectories);
		} else if (!currentFileStats.isDirectory() && (!project.lastModified || project.lastModified <= currentFileStats.mtimeMs)) {
			console.log('else if');

			let modifiedDirFile: IDirFile = {
				filename: file,
				filepath: path.join(project.path, '/', file),
				project: {
					data: project._id,
					name: project.name,
				},
				lines: [],
			};
			arrayOfFiles.push({ ...modifiedDirFile });
		}
		else {
			console.log('else');
		}
	});

	return arrayOfFiles;
};

const generateSearchArray = (content: string) => {
	const searchArray: string[] = [];

	if (content) {
		let parts = content.split(' ');
		parts = [...new Set(parts)];
		parts.forEach((part) => {
			if (part) {
				const partToCapture = part.toLowerCase();
				let current = "";
				for (let i = 0; i < partToCapture.length; i++) {
					current = current + partToCapture.charAt(i);
					searchArray.push(current);
				}

				current = "";
				for (let i = partToCapture.length - 1; i >= 0; i--) {
					current = partToCapture.charAt(i) + current;
					searchArray.push(current);
				}
			}
		});
	} 
	return searchArray;
}
