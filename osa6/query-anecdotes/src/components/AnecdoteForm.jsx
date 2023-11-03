import { useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../notificationContext"

import { useQueryClient } from "@tanstack/react-query"

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: "NEW_NOTIFICATION", payload: `Created new anecdote: ${newAnecdote.content}` })
      setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 5000)
    },
    onError: (error) => {
      dispatch({ type: "NEW_NOTIFICATION", payload: "too short anecdote, must have length 5 or more" })
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" })
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const id = Math.floor(Math.random() * 10000)
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, id, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
