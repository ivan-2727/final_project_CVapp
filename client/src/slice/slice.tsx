import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit' 

interface stateInterface { 
  login: boolean,
  uid: string,
  loading: boolean,
  favorites: string[],
  saved: string[]
} 
interface Iarg{
    uid: string,   
    tid?: string,
    favorite?: string[],
    ogTempalte?: string,
    html?: string
}

export const fetchUser = createAsyncThunk(
  'users/fetchByIdStatus',
  async (arg: Iarg) => {
    try {
      const data = {uuid: arg.uid}
      const fetchData = await fetch(`https://boiling-temple-13996.herokuapp.com/login/${arg.uid}`)
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
      const data = {uuid: arg.tid}
      const createData = await fetch(`https://boiling-temple-13996.herokuapp.com/login/${arg.uid}`, {
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
      const createData = await fetch(`https://boiling-temple-13996.herokuapp.com/favorite/${arg.uid}`, {
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
export const saveTemplate = createAsyncThunk(
  'users/updateSaved',
  async (arg: Iarg) => {
    const data = {html: arg.html, tid: arg.tid, ogTempalte: arg.ogTempalte}
    console.log('data', data)
    console.log('uid', arg.uid)
    try {
      const createData = await fetch(`https://boiling-temple-13996.herokuapp.com/saved/${arg.uid}`, {
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

const initialState: stateInterface = { login: false, loading: false, uid: '', favorites: [], saved: [] }
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
    login_logout: (state, action) => {
      state.login = action.payload; 
    },
    setloading: (state, action) => {
      state.loading = action.payload 
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.login = true
        state.uid = action.payload.uid
        state.favorites = action.payload.favorites
        state.saved = action.payload.saved
      })
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        // console.log('action.payload.', action.payload.favorites)
          state.favorites = action.payload.favorites
        })
      .addCase(saveTemplate.fulfilled, (state, action) => {
          console.log('saved, saved', action.payload)
          state.saved = action.payload.saved
        })
      }
  }) 

  // GALLERY COMP update favorite(add, dlete) => setFavorite reducer => update mongo 
  // => return mongo => builder.addCase(setFavorite.fulfilled => state => 
  //   GALLERY COMP upidate favoreite (add delete ) => 

// export const {favorite, removeFavorite} = loginSlice.actions
export const {login_logout, setloading } = loginSlice.actions
export default loginSlice.reducer