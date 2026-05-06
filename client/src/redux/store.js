import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import pickupsReducer from './pickupsSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    pickups: pickupsReducer,
  },
})

export default store
