import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit' 

interface stateInterface { 
  login: boolean,
  uid: string,
  favorites: string[]
} 
interface Iarg{
    uid: string,   
    favorite?: string[],
}

export const fetchUser = createAsyncThunk(
  'users/fetchByIdStatus',
  async (arg: Iarg) => {
    try {
      const data = {uuid: arg.uid}
      const fetchData = await fetch(`http://localhost:8000/login/${arg.uid}`)
      const json = await fetchData.json()
      return json
    } catch (error:any) {
      console.log(error.message)
    }
  }
)

export const createUser = createAsyncThunk(
  'users/createByIdStatus',
  async (arg: Iarg) => {
    
    try {
      const data = {uuid: arg.uid}
      const createData = await fetch(`http://localhost:8000/login/${arg.uid}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      const json = await createData.json()
      return json
    } catch (error:any) { 
      console.log(error.message)
    }
  }
)

export const setFavorite = createAsyncThunk(
  'users/updateFavorites',
  async (arg: Iarg) => {
    const data = arg.favorite;
    try {
      const createData = await fetch(`http://localhost:8000/favorite/${arg.uid}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log('createData', createData)
      const json = await createData.json()
      return json
    } catch (error:any) {
      console.log(error.message)
    }
  }
)

const initialState: stateInterface = { login: false, uid: '', favorites: [] }
export const loginSlice = createSlice({ 
  name: 'Login', 
  initialState, 
  reducers: {
    // favorite: (state, action) => {
    //   state.favorites.push(action.payload);
    // }, 
    // removeFavorite: (state, action) => {
    //   state.favorites = state.favorites.filter((id) => id !== action.payload);
    // },
    logoutUser: (state, action) => {
      state.login = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log('///actionpayload',action.payload);
        state.login = true
        state.uid = action.payload.uid
        state.favorites = action.payload.favorites
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        console.log('///actionpayload setFavorite',action.payload);
          state.favorites = action.payload.favorites
        })
      },
  }) 

  // GALLERY COMP update favorite(add, dlete) => setFavorite reducer => update mongo 
  // => return mongo => builder.addCase(setFavorite.fulfilled => state => 
  //   GALLERY COMP upidate favoreite (add delete ) => 

// export const {favorite, removeFavorite} = loginSlice.actions
export const loginActions = loginSlice.actions
export default loginSlice.reducer