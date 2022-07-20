import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../utils/connection';
import { ResponseFuncs } from '../../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

	//function for catch errors
	const catcher = (error: Error) => res.status(400).json({ error });

	const handleCase: ResponseFuncs = {
		GET: async (req: NextApiRequest, res: NextApiResponse) => {
			console.log('req', req.query);
			const searchValue = req.query.search;

			const { DirFileLine } = await connect();
			if (searchValue) {
				res.json(await DirFileLine.find({ search: { $in: searchValue } }).catch(catcher));
			} else {
                res.json(await DirFileLine.find({}).catch(catcher));
            }
		},

		// POST: async (req: NextApiRequest, res: NextApiResponse) => {
		// 	const { Project } = await connect();
		// 	res.json(await DirFileLine.create(req.body).catch(catcher));
		// },
	};

	const response = handleCase[method];
	if (response) response(req, res);
	else res.status(400).json({ error: 'No Response for This Request' });
};

export default handler;
