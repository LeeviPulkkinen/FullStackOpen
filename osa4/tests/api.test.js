const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require("../models/blog")
const helper = require("./test_helper")

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})
describe("get", () => {
    test('get all blogs', async () => {
        const response = await api.get("/api/blogs")

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('get all blogs as json', async () => {
        await api.get("/api/blogs").expect(200).expect('Content-Type', /application\/json/)
    })

    test("id not _id", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body[0].id).toBeDefined()
    })
})

describe("post", () => {
    test("new blog", async () => {
        const new_blog = {
            title: 'test post',
            author: 'unit tester',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        }
        await api.post("/api/blogs").send(new_blog).expect(201).expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    })

    test("new blog without likes", async () => {
        const new_blog = {
            title: 'no likes',
            author: 'unit tester',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }

        await api.post("/api/blogs").send(new_blog).expect(201).expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const blog = blogs.find(blog => blog.title === 'no likes')

        expect(blog.likes).toBe(0)
    })

    test("new blog without title", async () => {
        const new_blog = {
            author: 'unit tester',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1
        }

        await api.post("/api/blogs").send(new_blog).expect(400)
    })

    test("new blog without url", async () => {
        const new_blog = {
            title: 'no likes',
            author: 'unit tester',
            likes: 1
        }

        await api.post("/api/blogs").send(new_blog).expect(400)
    })
})

describe("delete", () => {
    test("delete existing id", async () => {
        const blogs = await helper.blogsInDb()
        const id_to_delete = blogs[0].id

        await api.delete(`/api/blogs/${id_to_delete}`).expect(204)

        const new_blogs = await helper.blogsInDb()
        expect(new_blogs).toHaveLength(helper.initialBlogs.length - 1)
    })
    test("delete not existing id", async () => {
        const id_to_delete = 1243

        await api.delete(`/api/blogs/${id_to_delete}`).expect(400)

        const new_blogs = await helper.blogsInDb()
        expect(new_blogs).toHaveLength(helper.initialBlogs.length)
    })
})

describe('put', () => {
    test('modify', async () => {
        const blogs = await helper.blogsInDb()
        const id_to_modify = blogs[0].id

        const response = await api.put(`/api/blogs/${id_to_modify}`).send({likes: 1234}).expect(200)

        expect(response.body.likes).toBe(1234)
    })
    test('modify not existing', async () => {
        await api.put(`/api/blogs/1231`).send({likes: 1234}).expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})