import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notificiation from './components/notification'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    ).catch(e => console.log(e))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLike = async (blog) => {
    try {
      await blogService.like(blog.id)

      const new_blog = { ...blog, likes: blog.likes + 1 }

      setBlogs(blogs.map(b => b.id === blog.id ? new_blog : b))

    } catch (e) {
      setMessage("Error liking blog")

      setTimeout(() => {
        setMessage(null)
      }, 4000);
    }
  }

  const handleRemove = async (blog) => {
    try {
      if (!confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        return
      }
      await blogService.remove(blog.id)

      setBlogs(blogs.filter(b => b.id !== blog.id))

    } catch (e) {
      setMessage("Error removing blog")

      setTimeout(() => {
        setMessage(null)
      }, 4000);
    }
  }

  const createBlog = async ({author, title, url}) => {

    try {
      const new_blog = await blogService.create({
        author,
        title,
        url
      })

      const blogs = await blogService.getAll()

      setBlogs(blogs)

      setMessage(`New blog ${new_blog.title} by ${new_blog.author}`)

      blogFormRef.current.toggleVisibility()

      setTimeout(() => {
        setMessage('')
      }, 4000);

    } catch (e) {
      setMessage('Error creating blog')

      setTimeout(() => {
        setMessage('')
      }, 4000);
    }
  }

  const blogFormRef = useRef()

  if (user === null) {
    return <div>
      <Login setUser={setUser} />
    </div>
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notificiation message={message} />

      <p>{user.name} logged in <button onClick={() => { window.localStorage.removeItem('loggedUser'); setUser(null) }}>Logout</button></p>
      <Togglable buttonLabel="New Blog" ref={blogFormRef} >
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <br />

      {blogs.sort((a, b) => (a.likes < b.likes)).
        map(blog =>
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove} />
        )}
    </div>
  )
}

export default App