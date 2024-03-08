import { useState, useEffect, useRef } from "react";
import NavigationBar from "./components/NavigationBar";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import blogService from "./services/blogs";
import usersService from "./services/users";
import Notificiation from "./components/notification";
import Users from "./components/Users";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";
import { useMatch, Routes, Route } from "react-router-dom";

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

  const createMessage = (message, duration = 4000) => {
    setMessage(message);

    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  const handleLike = async (blog) => {
    try {
      await blogService.like(blog.id);

      const new_blog = { ...blog, likes: blog.likes + 1 };

      setBlogs(blogs.map((b) => (b.id === blog.id ? new_blog : b)));
    } catch (e) {
      createMessage("Error liking blog");
    }
  };

  const handleRemove = async (blog) => {
    try {
      if (!confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        return;
      }
      await blogService.remove(blog.id);

      setBlogs(blogs.filter((b) => b.id !== blog.id));
      createMessage("Blog removed");
    } catch (e) {
      createMessage("Error removing blog");
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

      createMessage(
        `New blog ${new_blog.title} by ${new_blog.author} created!`
      );

      blogFormRef.current.toggleVisibility();
    } catch (e) {
      createMessage("Error creating blog");
    }
  };

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const blogFormRef = useRef();

  if (user === null) {
    return (
      <div className="container">
        <Login setUser={setUser} />
      </div>
    );
  }

  return (
    <div className="container">
      <NavigationBar user={user} handleClick={logout} />
      <Notificiation message={message} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              handleCreateBlog={createBlog}
              blogFormRef={blogFormRef}
            />
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
  );
};

export default App;
