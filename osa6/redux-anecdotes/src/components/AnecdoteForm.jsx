import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const getId = () => (100000 * Math.random()).toFixed(0)

    const addedNotification = (anecdote) => {
        const text = `Created anecdote: '${anecdote}'`
        dispatch(setNotification(text, 5))
    }

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""

        dispatch(createAnecdote({ content, id: getId()}, addedNotification))
    }


    const dispatch = useDispatch()

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input type='text' name='anecdote' />
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm