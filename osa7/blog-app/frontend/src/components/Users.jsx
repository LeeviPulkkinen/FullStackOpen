import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = ({ users }) => {
  if (!users) {
    return <div>Error fetching users</div>;
  }

  return (
    <>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>
              <b>Blogs created</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
