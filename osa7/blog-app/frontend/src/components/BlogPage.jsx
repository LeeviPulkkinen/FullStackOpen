import { useNavigate } from "react-router-dom";

const BlogPage = ({ blog, user, handleLike, handleRemove }) => {
  const navigate = useNavigate();

  if (!blog) return null;

  return (
    <div>
      <h2>
        {blog.title} {blog.author}{" "}
      </h2>
      <br />
      <a href={`${blog.url}`}>{blog.url}</a>
      <br />
      Likes {blog.likes} <button onClick={() => handleLike(blog)}>Like</button>
      <br />
      {blog.user.name}
      <br />
      {user.name === blog.user.name && (
        <button
          onClick={() => {
            handleRemove(blog);
            navigate("/");
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default BlogPage;
