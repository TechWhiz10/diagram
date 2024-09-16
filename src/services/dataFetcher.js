import { setFolders, setProjects } from '../store/slices/dataSlice';
import folders from '../data/folders.json';
import projects from '../data/projects.json';

export const fetchData = async (dispatch) => {
  await dispatch(setFolders(folders));
  await dispatch(setProjects(projects));
};
