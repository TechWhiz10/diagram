import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folders: [],
  projects: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
  },
});

export const { setFolders, setProjects, addFolder, addProject } = dataSlice.actions;
export default dataSlice.reducer;
