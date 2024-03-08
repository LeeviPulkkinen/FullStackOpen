import { Table } from "react-bootstrap";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

const BlogList = ({ blogs, handleCreateBlog, blogFormRef }) => {
  return (
    <>
      <br />
      <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
        <br />
      </Togglable>
      <br />
      <h2><b>Blogs!</b></h2>
      <Table striped>
        <tbody>
          {blogs
            .sort((a, b) => a.likes < b.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </tbody>
      </Table>
      <br />
    </>
  );
};

export default BlogList;
