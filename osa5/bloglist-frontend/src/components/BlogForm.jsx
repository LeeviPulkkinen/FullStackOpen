import { useState } from 'react'
const BlogForm = ({ createBlog }) => {

    const create = (e) => {
        e.preventDefault();
        createBlog({ author: author, title: title, url: url });
        setAuthor('');
        setTitle('');
        setUrl('');
    }

    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    return <>
        <h2>Create new</h2>
        <form onSubmit={create}>
            <div>
                title
                <input id="title" type="text" name="title" value={title} placeholder='title' onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div>
                author
                <input id='author' type="text" name="author" value={author} placeholder='author' onChange={({ target }) => setAuthor(target.value)} />
            </div>
            <div>
                url
                <input id='url' type="text" name="url" value={url} placeholder='url' onChange={({ target }) => setUrl(target.value)} />
            </div>
            <button id="submit_blog" type="submit">create</button>
        </form >
    </>
}

export default BlogForm