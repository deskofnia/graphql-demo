import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import axios from "axios";
import cors from "cors";

const schema = buildSchema(`
    type User {
        username: String!
        email: String!
        phone: String!
        website: String!
    }
    type Todo {
        id: ID!
        title: String!
        completed: Boolean
        userId: ID!
        user: User
    }
    type Query {
        getTodos: [Todo]
        getTodoById(id: ID!): Todo
    }
`);

const root = {
  getTodos: async () => {
    const todos = (
      await axios.get("https://jsonplaceholder.typicode.com/todos")
    ).data;
    const users = (
      await axios.get("https://jsonplaceholder.typicode.com/users")
    ).data;

    // Map over todos to embed the user object
    return todos.map((todo) => ({
      ...todo,
      user: users.find((user) => user.id === todo.userId),
    }));
  },
  getTodoById: async ({ id }) => {
    const todo = (
      await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    ).data;
    const user = (
      await axios.get(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}`
      )
    ).data;

    // Add the user object to the todo
    return { ...todo, user };
  },
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/health-check", () =>  console.log("Hello there..."));


app.listen(4000, () =>  console.log("Running at port 4000"));

console.log("GraphQL API server available at http://localhost:4000/graphql");
