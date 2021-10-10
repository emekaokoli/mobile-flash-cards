import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {_getDecks, _saveDeck, _getDeckByTitle, _deleteDeck, _addCard} from "../utils/api";


export const initializeDeckData = createAsyncThunk(
  'initialize/initializeDeckData',
  async (thunkAPI) => {
    const data = await _getDecks();
    return data;
  }
);

export const receiveDeck = createAsyncThunk(
  'receiveDeck/receiveDeck',
  async (title, thunkAPI) => {
   const data = await _getDeckByTitle(title);
    return thunkAPI.dispatch(receiveDecks(data))
  },
);

export const addDeck = createAsyncThunk(
  'addDeck/addDeck',
  async (title, thunkAPI) => {
    return await _saveDeck(title);
  },
);


export const removeDeck = createAsyncThunk(
  'title/removeDeck', async(title, thunkAPI)=>{
  return  _deleteDeck(title)
}
  
)

export const addCard = createAsyncThunk('addCard/addCard', 
  async(card, thunkAPI)=>{
  return _addCard(card)
})



const decks = createSlice({

 name: 'DECKS',
  initialState:{}

  reducers: {
    receiveDecks:(state, action)=>{
      state[action.payload] = action.payload
      //state.questions = []
    }
    reset: (state) => {
      return { ...initialState };
    },
    removeCard: (state, action)=>{
      state.loading = false
      state.error = null
      state =  state.filter((card) => card.id !== action.payload.id)
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(initializeDeckData.pending,(state, action)=>{
      state.loading = true
      state.error = null
      state = null
    })
    .addCase(initializeDeckData.fulfilled, (state,action)=>{
      state.loading = true
      state.error = null
      state = action.payload
    })
     .addCase(initializeDeckData.rejected, (state,action)=>{
      state.loading = true
      state.error = action.error.message
      state = null
    })
    .addCase(removeDeck.fulfilled, (state, action)=>{
      state.loading = false
      state.error = null
     state[action.payload.id] =  action.payload 
    })
    .addCase(removeDeck.rejected, (state, action)=>{
     state.loading = false
     state = null
     state.error = action.error.message
    })
     .addCase(addCard.fulfilled, (state, action)=>{
      state.loading = false
      state.error = null
      state[action.payload] =  action.payload ;
    })
    .addCase(addCard.rejected, (state, action)=>{
     state.loading = false
     state = null
     state.error = action.error.message
    })
    
    // .addCase(removeCard.rejected, (state, action)=>{
    //  state.loading = false
    //  state = null
    //  state.error = action.error.message
    // })
  }

});
export const {
  receiveDecks,
  removeCard
  reset,
} = questionSlice.actions;
export default decks.reducer;
