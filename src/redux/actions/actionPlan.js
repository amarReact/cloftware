import {
  GET_ACTION_PLAN,
  GET_ACTION_PLAN_SUCCESS,
  REACT_APP_LC_API_ENDPOINT
} from '../constants/constants';
import { http } from '../../utils/httpClient';
const getActionPlan = (scheduleId, counselor=true, latest='no') => async dispatch => {
    try {
    await http
      .get(`${REACT_APP_LC_API_ENDPOINT}${GET_ACTION_PLAN}/${scheduleId}?counselor=${counselor}&latest=${latest}`, {
        setAuthHeader: true
      })
      .then(res => {
        if (res.data.status === true) {
          dispatch({
            type: GET_ACTION_PLAN_SUCCESS,
            payload: res.data.data.response
          });
        }
      });
  } catch (error) {
  }
};
export { getActionPlan };
