import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const create = (e) => {
    e.preventDefault();
    createBlog({ author: author, title: title, url: url });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <>
      <h2>Create new</h2>
      <Form onSubmit={create}>
        <Form.Label>title</Form.Label>

        <Form.Control
          id="title"
          type="text"
          name="title"
          value={title}
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <Form.Label>author</Form.Label>

        <Form.Control
          id="author"
          type="text"
          name="author"
          value={author}
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Form.Label>url</Form.Label>
        <Form.Control
          id="url"
          type="text"
          name="url"
          value={url}
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button variant="primary" id="submit_blog" type="submit">
          create
        </Button>
      </Form>
    </>
  );
};

export default BlogForm;
