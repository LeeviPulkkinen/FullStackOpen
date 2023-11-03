import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const reducer = createSlice({
  name: 'anecdotes',
  initialState: [],

  reducers: {
    like(state, action) {
      const id = action.payload

      const anecdoteToChange = state.find(n => Number(n.id) === Number(id))
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    add(state, action) {
      const content = action.payload.content
      const id = action.payload.id
      const newAnecdote = {
        content: content,
        id: id,
        votes: 0
      }

      return [ ...state, newAnecdote ]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { like, add, setAnecdotes } = reducer.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = ({id, content}, addedNotification) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({id, content})
    dispatch(add(newAnecdote))
    addedNotification(newAnecdote.content)
  }
}

export const voteAnecdote = (anecdote, votedNotification) => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(like(modifiedAnecdote.id))
    votedNotification(modifiedAnecdote.content)
  }
}


export default reducer.reducer