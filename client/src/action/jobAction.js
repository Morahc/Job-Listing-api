import axios from 'axios';

export const listJobs =
  (keyword = '', location = '', category = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: 'JOB_LIST_REQUEST' });
      const { data } = await axios.get(
        `/job?keyword=${keyword}&location=${location}&category=${category}`
      );

      dispatch({ type: 'JOB_LIST_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'JOB_LIST_FAIL',
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.msg,
      });
    }
  };

export const jobDetails = (id) => async (dispatch) => {
  dispatch({ type: 'JOB_RESET' });
  try {
    dispatch({ type: 'SINGLE_JOB_REQUEST' });

    const { data } = await axios.get(`/job/${id}`);

    dispatch({ type: 'SINGLE_JOB_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'SINGLE_JOB_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const bookmarkJob = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: 'JOB_BOOKMARK_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/job/bookmark/${id}`, {}, config);

    dispatch({ type: 'JOB_BOOKMARK_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'JOB_BOOKMARK_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
  dispatch({ type: 'JOB_BOOKMARK_RESET' });
};

export const removeBookmark = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: 'BOOKMARK_REMOVE_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/job/bookmark/${id}`, config);

    dispatch({ type: 'BOOKMARK_REMOVE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'BOOKMARK_REMOVE_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
  // dispatch({ type: 'BOOKMARK_REMOVE_RESET' });
};

export const applyJob = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: 'JOB_APPLY_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`apply/${id}`, {}, config);

    dispatch({ type: 'JOB_APPLY_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'JOB_APPLY_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
  dispatch({ type: 'JOB_APPLY_RESET' });
};

export const postjob =
  (jobName, location, jobType, desc, deadline, category) =>
  async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();
    try {
      dispatch({ type: 'POST_JOB_REQUEST' });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/job`,
        { jobName, location, jobType, desc, deadline, category },
        config
      );

      dispatch({ type: 'POST_JOB_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'POST_JOB_FAIL',
        payload:
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.msg,
      });
    }
  };

export const deletejob = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    dispatch({ type: 'JOB_DELETE_REQUEST' });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/job/${id}`, config);

    dispatch({ type: 'JOB_DELETE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'JOB_DELETE_FAIL',
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
