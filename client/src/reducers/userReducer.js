export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        userInfo: action.payload,
      };
    case 'USER_LOGIN_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_LOGOUT':
      return {
        userInfo: {},
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return {
        loading: true,
      };
    case 'USER_REGISTER_SUCCESS':
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case 'USER_REGISTER_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'USER_REGISTER_RESET':
      return {}
    default:
      return state;
  }
};

export const userProfileReducer = (
  state = { user: { bookmarks: [], pendingJobs: [] } },
  action
) => {
  switch (action.type) {
    case 'USER_PROFILE_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'USER_PROFILE_SUCCESS':
      return {
        loading: false,
        user: action.payload,
      };
    case 'USER_PROFILE_FAIL':
      return {
        loading: false,
        error: action.payload,
        user: { bookmarks: [], pendingJobs: [] }
      };
    case 'USER_PROFILE_RESET':
      return {
        user: { bookmarks: [], pendingJobs: [] },
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return {
        loading: true,
      };
    case 'USER_UPDATE_SUCCESS':
      return {
        loading: false,
        user: action.payload,
        success: true,
      };
    case 'USER_UPDATE_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case 'USER_JOB_REQUEST':
      return {
        loading: true,
        ...state,
      };
    case 'USER_JOB_SUCCESS':
      return {
        loading: false,
        jobs: action.payload,
      };
    case 'USER_JOB_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'USER_JOB_RESET':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const userAcceptReducer = (state ={}, action) => {
  switch(action.type){
    case 'ACCEPT_USER_REQUEST':
      return { loading: true, success: false }
      case 'ACCEPT_USER_SUCCESS':
        return {
          loading: false,
          success: true,
          data: action.payload
        }
      case 'ACCEPT_USER_FAIL':
        return {
          loading: false,
          success: false,
          error: action.payload
        }
      default:
        return state
  }
}