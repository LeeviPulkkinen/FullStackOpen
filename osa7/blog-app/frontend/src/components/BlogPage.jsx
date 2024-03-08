import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
      Likes {blog.likes} <Button onClick={() => handleLike(blog)}>Like</Button>
      <br />
      {blog.user.name}
      <br />
      {user.name === blog.user.name && (
        <Button
          onClick={() => {
            handleRemove(blog);
            navigate("/");
          }}
        >
          Remove
        </Button>
      )}
    </div>
  );
};

export default BlogPage;
