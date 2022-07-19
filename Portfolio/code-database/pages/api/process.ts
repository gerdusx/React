// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { connect } from '../../utils/connection';
import { IDirFile, IDirFileLine } from '../../models/DirFile';

type Data = {
	files: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { Project, DirFile } = await connect(); // connect to database
	const projects = await Project.find({});

	console.log('projects', projects);

	projects.forEach(async (project) => {
		let files = getAllFiles(project, []);

		const [updatedFiles] = await Promise.all(files.map(async (file, index) => {
            const newFile = {...file}
			const fileLines: IDirFileLine[] = [];
			const allFileContents = readFileSync(file.filepath, 'utf-8');
			allFileContents.split(/\r?\n/).forEach((line, index) => {
				const newLine: IDirFileLine = {
					content: line,
					lineNr: index,
				};
				fileLines.push(newLine);
			});
			newFile.lines = [...fileLines];

            await DirFile.create(newFile);
            //return newFile;

            
		}));

        console.log('updatedFiles', updatedFiles);
		//await DirFile.insertMany(updatedFiles);
	});

    
    
	res.status(200).json({ files: [] });
}

const getAllFiles = function (project: any, arrayOfFiles: IDirFile[]) {
	const files = readdirSync(project.path);
	//console.log('currentTimeStamp', new Date().getTime());

	arrayOfFiles = arrayOfFiles || [];

	files.forEach(function (file) {
		const currentFileStats = statSync(project.path + '/' + file);
		console.log('currentFileStats', currentFileStats);

		if (currentFileStats.isDirectory()) {
			arrayOfFiles = getAllFiles(project.path + '/' + file, arrayOfFiles);
		} else {
			let newDirFile: IDirFile = {
				filename: file,
				filepath: path.join(project.path, '/', file),
				lastModified: currentFileStats.mtimeMs,
				project: {
					data: project._id,
					name: project.name,
				},
				lines: [{content: "sdfsdf", lineNr: 0}],
			};
			arrayOfFiles.push({...newDirFile});
		}
	});

	return arrayOfFiles;
};
