import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(25000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req, res) => {
// Crie o endpoint de users

const { firstName, lastName, email } = req.body;

const user = new User();
user.firstName = firstName;
user.lastName = lastName;
user.email = email;

try {
  const response = await AppDataSource.manager.save(user);
  res.status(201).json({ message: "User has been registered!", id: response.id });
} catch (err) {
  res.status(400).json({ message: err });
}

});

app.post('/posts', async (req, res) => {
// Crie o endpoint de posts

const { title, description, userId } = req.body;

const post = new Post();
post.title = title;
post.description = description;
post.user = userId;

try {
  const response = await AppDataSource.manager.save(post);
  res.status(201).json({ message: "Post has been published!", id: response.id });
} catch (err) {
  res.status(400).json({ message: err });
}

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
