const UserPage = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      Added blogs
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
