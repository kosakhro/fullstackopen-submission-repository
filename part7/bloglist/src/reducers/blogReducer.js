import blogService from "../services/blogs";
export const createBlog = (blog,token) => {
  return async dispatch => {
    const newblog = await blogService.postBlog(blog, token);
    return dispatch({ type: "NEW_BLOG", data: newblog });
  };
};
export const upBlog = (blog,token) => {
  return async dispatch => {
    const upBlog = await blogService.updateBlog(blog, token);
    return dispatch({ type: "UP_BLOG", data: upBlog });
  };
};
export const initBlogs = () => {
  return async dispatch => {
    const blogsFromsv = await blogService.getAll();
    blogsFromsv.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1;
      } else if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    });
    return dispatch({ type: "INIT", data: blogsFromsv });
  };
};
export const delBlog=(id) => {
  return async dispatch => {
    return dispatch({ type: "DEL_BLOG", data: id });
  };
};
const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "NEW_BLOG":
    return state.concat(action.data);
  case "UP_BLOG":
    var updatedBlogs = state
      .map((b) => {
        if (b.id === action.data.id) {
          return action.data;
        }
        return b;
      })
      .sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        } else if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      });
    return updatedBlogs;
  case "DEL_BLOG":
    var withoutDel = state.filter((blog) => blog.id !== action.data.id);
    withoutDel.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1;
      } else if (a.likes > b.likes) {
        return -1;
      }
      return 0;
    });
    return withoutDel;
  case "INIT":
    return action.data;
  default:
    return state;
  }
};
export default blogReducer;