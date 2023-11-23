import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', UserRoutes)

const getAController = (req: Request, res: Response) => {
  res.send("Level 2 Assignment 2 - Advance CRUD");
};

app.get('/', getAController);

export default app
