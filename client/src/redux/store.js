import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice";
import themeReducer from "./features/theme/themeSlice";
import editorReducer from "./features/editor/editorSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    editor: editorReducer
  },
})