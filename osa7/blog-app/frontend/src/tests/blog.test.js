/* eslint-env jest */
import Blog from "../components/Blog";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import BlogForm from "../components/BlogForm";

test("renders title and author, but not URL or number of likes by default", () => {
    const blog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://www.example.com",
        likes: 10,
    };

    render(<Blog blog={blog} />);

    const title_author = screen.getByText("Test Blog Test Author");
    const url = screen.queryByText("http://www.example.com");
    const likes = screen.queryByText("10");

    expect(title_author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
});

test("renders URL and number of likes when clicked", async () => {
    const blog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://www.example.com",
        likes: 10,
        user: {
            username: "testuser",
            name: "Test User",
        },
    };

    const mock_user = {
        name: "Test User",
    }

    render(<Blog blog={blog} user={mock_user}/>);
    
    const user = userEvent.setup()  
    const button = screen.getByText('view')  
    await user.click(button)


    const title_author = screen.getByText("Test Blog Test Author");
    const url = screen.queryByText("http://www.example.com");
    const likes = screen.queryByText("10");

    expect(title_author).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
});

test("calls like function twice", async () => {
    const blog = {
        title: "Test Blog",
        author: "Test Author",
        url: "http://www.example.com",
        likes: 10,
        user: {
            username: "testuser",
            name: "Test User",
        },
    };

    const mock_user = {
        name: "Test User",
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={mock_user} handleLike={mockHandler}/>);
    
    const user = userEvent.setup()  
    const button = screen.getByText('view')  
    await user.click(button)
    const like_button = screen.getByText('Like')
    await user.click(like_button)
    await user.click(like_button)

    expect(mockHandler.mock.calls).toHaveLength(2)
});

test("submit new form with correct data", async () => {

    const createBlog = jest.fn()
    const user = userEvent.setup()  


    render(<BlogForm createBlog={createBlog}/>);

    const title_input = screen.getByPlaceholderText('title')
    const author_input = screen.getByPlaceholderText('author')
    const url_input = screen.getByPlaceholderText('url')

    await user.type(title_input, 'Test Title')
    await user.type(author_input, 'Test Author')
    await user.type(url_input, 'http://www.example.com')
    
    const submit_button = screen.getByText('create')
    await user.click(submit_button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]['title']).toBe('Test Title')
    expect(createBlog.mock.calls[0][0]['author']).toBe('Test Author')
    expect(createBlog.mock.calls[0][0]['url']).toBe('http://www.example.com')
});

