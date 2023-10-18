const notesRouter = require('express').Router()
const Blog = require("../models/blog")

notesRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

notesRouter.post('/', async (request, response) => {
    const blog = await new Blog(request.body).save()
    response.status(201).json(blog)
})

notesRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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