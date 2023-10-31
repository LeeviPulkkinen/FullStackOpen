import { add } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(add(content))
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