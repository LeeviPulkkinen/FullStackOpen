const notesRouter = require('express').Router()
const Blog = require("../models/blog")
const middleware = require("../utils/middleware")

notesRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
    response.json(blogs)
})

notesRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user

    request.body.user = user.id

    const blog = await new Blog(request.body).save()

    user.blogs = user.blogs.concat(blog.id)
    await user.save()

    response.status(201).json(blog)
})

notesRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (!(blog && blog.user && user)) {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(401).json({ error: 'unauthorized for this blog' })
    }
})

notesRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        likes: body.likes
    }

    const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(res)

})

module.exports = notesRouter