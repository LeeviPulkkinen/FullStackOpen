const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0
    }
]

const blogList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'kirja elämästä',
        author: 'make meikäläinen',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('test empty list', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(12)
    })
    test('check like sum for many blogs', () => {
        const result = listHelper.totalLikes(blogList)
        expect(result).toBe(18)
    })
})

describe('favorite blog', () => {
    test('test empty list', () => {
        expect(listHelper.favoriteBlog([])).toEqual({})
    })
    test('when list has only one blog, its favorite', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        })
    })
    test('find favorite blog', () => {
        const result = listHelper.favoriteBlog(blogList)
        expect(result).toEqual({
            title: 'Go To',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        })
    })
})

describe('most blogs', () => {
    test('test empty list', () => {
        expect(listHelper.mostBlogs([])).toEqual({})
    })
    test('when list has only one blog, the author has most', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })
    test('many blogs', () => {
        const result = listHelper.mostBlogs(blogList)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2,
        })
    })
})

describe('most likes', () => {
    test('test empty list', () => {
        expect(listHelper.mostLikes([])).toEqual({})
    })
    test('when list has only one blog, the author has most', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 12,
        })
    })
    test('many blogs', () => {
        const result = listHelper.mostLikes(blogList)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        })
    })
})