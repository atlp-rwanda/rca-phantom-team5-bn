import { Sequelize } from "sequelize-typescript";
import {User} from "../model/User";
import dotenv from 'dotenv'

dotenv.config()
const connection = new Sequelize(`${process.env.DB_URL}`, {
  dialect: 'postgres',
  models: [User],
})

export default connection;