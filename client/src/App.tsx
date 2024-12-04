import React from 'react';
import { gql, useQuery } from '@apollo/client';
import './App.css';

const GET_LOCATIONS = gql`
  query GetTodos {
    getTodos {
      id,
      title,
      userId,
      user {
        email
      }
    },
  }
`;

function DisplayTodos() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <div style={{ flexDirection: "row", justifyItems: "center", alignItems: "center" }}>
    <table style={{ borderCollapse: "collapse", textAlign: "center", width: "80%" }}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Todo Name</th>
          <th>User Email</th>
        </tr>
      </thead>
      <tbody>
        {data.getTodos.map(({ id, title, user }: any) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>

            <td>{user?.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

function App() {
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayTodos />
    </div>
  );
}

export default App;
