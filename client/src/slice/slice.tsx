import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit' 

interface LoginState { 
  login: boolean,
  username: string
} 
interface Iarg{
    username: string, 
    password: string
}
export const fetchUser = createAsyncThunk(
  'users/fetchByIdStatus',
  async (arg: Iarg) => {
    const data = {username: arg.username, password: arg.password}
    const fetchData = await fetch(`http://localhost:8000/login`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
    console.log(fetchData);
    if (fetchData.status !== 200) { throw new Error(fetchData.statusText) }
    const json = await fetchData.json()
    return json
  }
)

const initialState = { login: false, username: '' } as LoginState 
export const loginSlice = createSlice({ 
  name: 'Login', 
  initialState, 
  reducers: {},
      extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
          console.log('///actionpayload',action.payload);
            state.login = !state.login;
            state.username = action.payload.username
         })
      },
    }) 

export const loginActions = loginSlice.actions
export default loginSlice.reducer