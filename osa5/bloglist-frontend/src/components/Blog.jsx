import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (showDetails) {
    return <div className="blog" style={blogStyle}>
      <p>{blog.title} {blog.author} <button className="view" onClick={() => setShowDetails(false)}>hide</button></p>
      <br />
      {blog.url} 
      <br />
      Likes {blog.likes} <button onClick={() => handleLike(blog)}>Like</button> 
      <br />
      {blog.user.name}
      <br />
      {user.name === blog.user.name && <button onClick={() => handleRemove(blog)}>Remove</button>}
    </div>
  }

  return <div className="blog" style={blogStyle}>
    <p>{blog.title} {blog.author} <button className="view" onClick={() => setShowDetails(true)}>view</button></p>
  </div>
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateParent: PropTypes.func.isRequired
}


export default Blog