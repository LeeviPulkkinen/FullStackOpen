const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    let sum = 0
    if (blogList.length === 0) {
        return sum;
    }

    blogList.forEach(element => {
        sum += element.likes
    });

    return sum
}

const favoriteBlog = (blogList) => {
    let favorite = {}
    let most_likes = 0
    if (blogList.length === 0) {
        return favorite;
    }

    blogList.forEach(blog => {
        if (blog.likes > most_likes) {
            favorite = {
                "title": blog.title,
                "author": blog.author,
                "likes": blog.likes
            }

            most_likes = blog.likes
        }
    })

    return favorite
}

const mostBlogs = (blogList) => {
    let bloggers = {}

    if (blogList.length === 0) {
        return bloggers;
    }

    blogList.forEach(blog => {
        if (bloggers.hasOwnProperty(blog.author)) {
            bloggers[blog.author] += 1
        } else {
            bloggers[blog.author] = 1
        }
    })

    let most_blogs = 0
    let author = ""

    Object.keys(bloggers).forEach(key => {
        if (bloggers[key] > most_blogs) {
            author = key
            most_blogs = bloggers[key]
        }
    })

    return { "author": author, "blogs": most_blogs }

}

const mostLikes = (blogList) => {
    let bloggers = {}

    if (blogList.length === 0) {
        return bloggers;
    }

    blogList.forEach(blog => {
        if (bloggers.hasOwnProperty(blog.author)) {
            bloggers[blog.author] += blog.likes
        } else {
            bloggers[blog.author] = blog.likes
        }
    })

    let most_likes = 0
    let author = ""

    Object.keys(bloggers).forEach(key => {
        if (bloggers[key] > most_likes) {
            author = key
            most_likes = bloggers[key]
        }
    })

    return { "author": author, "likes": most_likes }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}