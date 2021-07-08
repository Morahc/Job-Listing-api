import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  jobListReducer,
  jobDetailsReducer,
  jobApplyReducer,
  jobBookmarkReducer,
  jobDeleteReducer,
  postjobReducer,
  removeBookmarkReducer,
} from './reducers/jobReducer';
import {
  userAcceptReducer,
  userJobReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  jobList: jobListReducer,
  jobDetails: jobDetailsReducer,
  jobApply: jobApplyReducer,
  jobBookmark: jobBookmarkReducer,
  removeBookmark: removeBookmarkReducer,
  jobDelete: jobDeleteReducer,
  postJob: postjobReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userJob: userJobReducer,
  userAccept: userAcceptReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
