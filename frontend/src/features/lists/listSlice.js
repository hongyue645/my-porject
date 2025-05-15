import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listService from './listService'

export const getLists = createAsyncThunk(
  'lists/getAll',
  async (_, thunkAPI) => {
    const {user} = thunkAPI.getState().auth
    return await listService.fetchLists(user.token)
  }
)

export const addNewList = createAsyncThunk(
  'lists/create',
  async (name, thunkAPI) => {
    const {user} = thunkAPI.getState().auth
    return await listService.createList(name, user.token)
  }
)

export const removeExistingList = createAsyncThunk(
  'lists/delete',
  async (listId, thunkAPI) => {
    const {user} = thunkAPI.getState().auth
    return await listService.deleteList(listId, user.token)
  }
)

export const addNewItem = createAsyncThunk(
  'lists/addItem',
  async ({ listId, name }, thunkAPI) => {
    const {user} = thunkAPI.getState().auth
    return await listService.addItem(listId, name, user.token)
  }
)

export const removeExistingItem = createAsyncThunk(
  'lists/removeItem',
  async ({ listId, itemId }, thunkAPI) => {
    const {user} = thunkAPI.getState().auth
    return await listService.removeItem(listId, itemId, user.token)
  }
)

export const toggleExistingItem = createAsyncThunk(
  'lists/toggleItem',
  async ({ listId, itemId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token
    return await listService.toggleItem(listId, itemId, token)
  }
)

const listSlice = createSlice({
  name: 'lists',
  initialState: { lists: [], isLoading: false },
  extraReducers: builder => {
    builder
      .addCase(getLists.pending, state => {
        state.isLoading = true
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoading = false
        state.lists = action.payload
      })
      .addCase(getLists.rejected, state => {
        state.isLoading = false
      })
      .addCase(addNewList.fulfilled, (state, action) => {
        state.lists.push(action.payload)
      })
      .addCase(removeExistingList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(l => l._id !== action.payload.id)
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        const idx = state.lists.findIndex(l => l._id === action.payload._id)
        state.lists[idx] = action.payload
      })
      .addCase(removeExistingItem.fulfilled, (state, action) => {
        const idx = state.lists.findIndex(l => l._id === action.payload._id)
        state.lists[idx] = action.payload
      })
      .addCase(toggleExistingItem.fulfilled, (state, action) => {
        const idx = state.lists.findIndex(l => l._id === action.payload._id)
        state.lists[idx] = action.payload
      })
  }
})

export default listSlice.reducer
