export const jobListReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case 'JOB_LIST_REQUEST':
      return { loading: true, jobs: [] };
    case 'JOB_LIST_SUCCESS':
      return { loading: false, jobs: action.payload };
    case 'JOB_LIST_FAIL':
      return { loading: false, error: action.payload, jobs: [] };
    default:
      return state;
  }
};

export const jobDetailsReducer = (
  state = { job: { user: {},  desc: { qualification: [], requirements: [] } } },
  action
) => {
  switch (action.type) {
    case 'SINGLE_JOB_REQUEST':
      return { ...state, loading: true };
    case 'SINGLE_JOB_SUCCESS':
      return { loading: false, job: action.payload };
    case 'SINGLE_JOB_FAIL':
      return { ...state,loading: false, error: action.payload };
    case 'JOB_RESET':
      return {
        loading: false,
        job: { user: {},  desc: { qualification: [], requirements: [] } }
      };
    default:
      return state;
  }
};

export const jobDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'JOB_DELETE_REQUEST':
      return { loading: true };
    case 'JOB_DELETE_SUCCESS':
      return { loading: false, success: true };
    case 'JOB_DELETE_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const jobApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'JOB_APPLY_REQUEST':
      return { loading: true };
    case 'JOB_APPLY_SUCCESS':
      return { loading: false, data: action.payload, success: true };
    case 'JOB_APPLY_FAIL':
      return { loading: false, error: action.payload };
    case 'JOB_APPLY_RESET':
      return { loading: false };
    default:
      return state;
  }
};

export const jobBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case 'JOB_BOOKMARK_REQUEST':
      return { loading: true };
    case 'JOB_BOOKMARK_SUCCESS':
      return { loading: false, data: action.payload, success: true };
    case 'JOB_BOOKMARK_FAIL':
      return { loading: false, error: action.payload };
    case 'JOB_BOOKMARK_RESET':
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const removeBookmarkReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BOOKMARK_REMOVE_REQUEST':
      return { loading: true };
    case 'BOOKMARK_REMOVE_SUCCESS':
      return { loading: false, data: action.payload, success: true };
    case 'BOOKMARK_REMOVE_FAIL':
      return { loading: false, error: action.payload };
    case 'BOOKMARK_REMOVE_RESET':
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const postjobReducer = (state = { data: {}}, action) => {
  switch(action.type){
    case 'POST_JOB_REQUEST':
      return { loading: true }
    case 'POST_JOB_SUCCESS':
      return {
        loading: false,
        success: true,
        data: action.payload
      }
    case 'POST_JOB_FAIL':
      return {
        loading: false,
        success: false
      }
    default:
      return state
  }
}
