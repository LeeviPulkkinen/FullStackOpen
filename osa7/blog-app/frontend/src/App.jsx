import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import usersService from "./services/users";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notificiation from "./components/notification";
import Users from "./components/Users";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";
import { useMatch, Routes, Route, Link } from "react-router-dom";
import { Table, Navbar, Nav } from "react-bootstrap";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);

  const userMatch = useMatch("/users/:id");
  const selectedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const selectedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users));
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLike = async (blog) => {
    try {
      await blogService.like(blog.id);

      const new_blog = { ...blog, likes: blog.likes + 1 };

      setBlogs(blogs.map((b) => (b.id === blog.id ? new_blog : b)));
    } catch (e) {
      setMessage("Error liking blog");

      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const handleRemove = async (blog) => {
    try {
      if (!confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        return;
      }
      await blogService.remove(blog.id);

      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (e) {
      setMessage("Error removing blog");

      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  const createBlog = async ({ author, title, url }) => {
    try {
      const new_blog = await blogService.create({
        author,
        title,
        url,
      });

      const blogs = await blogService.getAll();

      setBlogs(blogs);

      setMessage(`New blog ${new_blog.title} by ${new_blog.author}`);

      blogFormRef.current.toggleVisibility();

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (e) {
      setMessage("Error creating blog");

      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  };

  const blogFormRef = useRef();

  if (user === null) {
    return (
      <div>
        <Login setUser={setUser} />
      </div>
    );
  }

  const padding = { padding: 5 };

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user.name} logged in
              <Link style={padding} to="/login">
                <button
                  onClick={() => {
                    window.localStorage.removeItem("loggedUser");
                    setUser(null);
                  }}
                >
                  Logout
                </button>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <h2>blogs</h2>

        <Notificiation message={message} />

        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                  <BlogForm createBlog={createBlog} />
                </Togglable>

                <br />
                <Table striped>
                  <tbody>
                    {blogs
                      .sort((a, b) => a.likes < b.likes)
                      .map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                      ))}
                  </tbody>
                </Table>
              </>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <BlogPage
                blog={selectedBlog}
                user={user}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            }
          />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/users/:id" element={<UserPage user={selectedUser} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
