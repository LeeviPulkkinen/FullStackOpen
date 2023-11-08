import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <tr>
      <td>
        <div className="blog">
          <p>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}{" "}
            </Link>
          </p>
        </div>
      </td>
    </tr>
  );
};

Blog.prototype = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
