import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const email = req.query.mail;
		const user = await new Promise((resolve, reject) => {
			db.query('SELECT * FROM e_commerce.users WHERE email = ?', [email], (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
			});
		});



		// Successful login
		res.status(200).json((user as any)[0]);

	} catch (err) {
		console.error('Error during fetching data: ', err);
		res.status(500).json({success: false, message: 'Error during login' });
	}
}
