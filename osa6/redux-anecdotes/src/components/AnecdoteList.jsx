import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const likeNotification = (content) => {
        const text = `you voted '${content}'`
        dispatch(setNotification(text, 5))
    }

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    
    const dispatch = useDispatch()

    return (
    <>
        {
            anecdotes
            .toSorted((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => dispatch(voteAnecdote(anecdote, likeNotification))}>vote</button>
                        </div>
                    </div>
                )
        }
    </>
    )

}

export default AnecdoteList