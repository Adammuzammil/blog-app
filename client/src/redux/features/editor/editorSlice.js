import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blog: {
    title: '',
    content: '',
    image: '',
    author: '',
  },
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
    updateTitle: (state, action) => {
        state.blog.title = action.payload;
    }
  },
});

export const { setBlog,updateTitle } = editorSlice.actions;

export default editorSlice.reducer;
