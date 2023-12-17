import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/helpers/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password, repeatPassword, secretKey, repeatSecretKey } = req.body;

    // Validate email, password, secret key, and their repeats
    if (!email || !password || !repeatPassword || !secretKey || !repeatSecretKey) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    if (password !== repeatPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    if (secretKey !== repeatSecretKey) {
      res.status(400).json({ message: 'Secret keys do not match' });
      return;
    }

    // Check if the email is already registered
    const existingUser = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if ((existingUser as any).length > 0) {
      res.status(409).json({ success: false, message: 'Email is already registered' });
      return;
    }

    // Insert the new user into the database
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO e_commerce.users (email, `password`, `key`, balance) VALUES (?, ?, ?, 0)', [email, password, secretKey], (err) => {
        if (err) {
          reject(err);
        } else {
            res.status(201).json({ success: true, message: 'Registration successful' });
        }
      });
    });


  } catch (err) {
    console.error('Error during registration: ', err);
    res.status(500).json({ success: false, message: 'Error during registration' });
  }
}
