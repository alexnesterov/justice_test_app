import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { RootState } from '@/store'

interface IFilterState {
  productType: string | null
}

const initialState: IFilterState = {
  productType: null,
}

export const setProductType = createAsyncThunk(
  'filter/setProductType',
  async (productType: string) => {
    await localforage.setItem('productType', productType)
    return productType
  }
)

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setProductType.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.productType = action.payload
      }
    )
  },
})

export const {} = filterSlice.actions

export const selectFilterProductType = (state: RootState) =>
  state.filter.productType

export default filterSlice.reducer
