import {
  REACT_APP_API_V2_ENDPOINT,
  GET_COUNSELLOR_ACTIVATION_STATUS,
  SET_ACCOUNT_ACTIVATION_STATUS,
  REACT_APP_LC_API_ENDPOINT
} from '../constants/constants';
import { http } from '../../utils/httpClient';

const setAccountActivationAction = () => async dispatch => {
  try {
    await http
      .get(
        `${REACT_APP_LC_API_ENDPOINT}${GET_COUNSELLOR_ACTIVATION_STATUS}`,
        // {
        //   USERTYPE_ID: 'TCC'
        // },
        {
          setAuthHeader: true
        }
      )
      .then(res => {
        if (res.data.status === true) {
          dispatch({
            type: SET_ACCOUNT_ACTIVATION_STATUS,
            payload: res.data.data
          });
        }
      });
  } catch (error) {
  }
};
export { setAccountActivationAction };
