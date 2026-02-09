import { createSlice } from "@reduxjs/toolkit"

const mediaSlice = createSlice({
  name: "media",
  initialState: { items: [] as any[] },
  reducers: {
    setMedia(state, action) {
      state.items = action.payload
    },
  },
})

export const { setMedia } = mediaSlice.actions
export default mediaSlice.reducer
