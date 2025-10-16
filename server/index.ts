import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import UserModel, { IUser } from './models/User';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/momo-dukan');

app.get('/', (req: Request, res: Response) => {
  res.send(
    `Welcome to the server! Here's the request body: ${JSON.stringify(
      req.body
    )}`
  );
});

interface LoginRequest {
  email: string;
  password: string;
}

app.post('/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user: IUser | null) => {
    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.json('Password is incorrect');
      }
    } else {
      res.json('User not found');
    }
  });
});

interface RegisterRequest {
  email: string;
  password: string;
}

app.post('/register', (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  UserModel.create(req.body)
    .then((user: IUser) => res.json(user))
    .catch((err: any) => {
      console.error(err);
      res
        .status(500)
        .json({ error: 'An error occurred while saving the user' });
    });
});

const port = 5000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});