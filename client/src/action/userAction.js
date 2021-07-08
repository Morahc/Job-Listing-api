import axios from 'axios';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/user/login',
      { email, password },
      config
    );

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const userRegister =
  (email, password, name, isEmployer, phone) => async (dispatch) => {
    try {
      dispatch({ type: 'USER_REGISTER_REQUEST' });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/user',
        { email, password, name, isEmployer, phone },
        config
      );

      dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.msg,
      });
    }
  };

export const userProfile = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: 'USER_PROFILE_REQUEST' });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/user/profile`, config);

    dispatch({ type: 'USER_PROFILE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_PROFILE_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: 'USER_UPDATE_REQUEST' });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/user/profile`, user, config);

    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const userJobs = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: 'USER_JOB_REQUEST' });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/user/jobs`, config);

    dispatch({ type: 'USER_JOB_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_JOB_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const acceptUser = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: 'ACCEPT_USER_REQUEST' });

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/user/accept/${id}`, {}, config);

    dispatch({ type: 'ACCEPT_USER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'ACCEPT_USER_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_PROFILE_RESET' });
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'USER_JOB_RESET' });
  dispatch({ type: 'JOB_RESET' });
};
