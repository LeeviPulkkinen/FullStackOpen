import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: "",
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            if (state === action.payload) {
                return ""
            }

            if (action.payload === "") {
                return ""
            }

            return state
        }
    }
})

export const { addNotification, removeNotification } = notificationReducer.actions

export const setNotification = (message, duration) => {
    return dispatch => {
        dispatch(addNotification(message))

        setTimeout(() => {
            dispatch(removeNotification(message))
        }, duration * 1000);
    }
}

export default notificationReducer.reducer