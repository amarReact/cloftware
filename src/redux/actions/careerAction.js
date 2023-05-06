import {
    REACT_APP_DIAGNOSTIC_API_ENDPOINT,
    REACT_APP_CAREER_API_ENDPOINT,

    GET_USER_DIAGNOSTIC_RESULT_URL,
    GET_USER_DIAGNOSTIC_RESULT_SUCCESS,
    GET_USER_DIAGNOSTIC_RESULT_ERROR,

    GET_CAREERS_URL,
    GET_CAREERS_SUCCESS,
    GET_CAREERS_ERROR,

    GET_CAREER_DATA_URL,
    GET_CAREER_DATA_SUCCESS,
    GET_CAREER_DATA_ERROR,
    GET_CAREER_REMOVE_DATA,

    GET_CAREER_LIMITED_DATA_SUCCESS,
    GET_CAREER_LIMITED_DATA_ERROR,

    SET_INITIAL_CARRIER_DATA,
    SET_CARRIER_DATA_BY_FILTER,
    UPDATE_LOADING_STATE,

    GET_IMMERSIVE_CAREER_URL,
    GET_IMMERSIVE_CAREER_SUCCESS,
    GET_IMMERSIVE_CAREER_ERROR,

    GET_EMERGING_CAREER_URL,
    GET_EMERGING_CAREER_SUCCESS,
    GET_EMERGING_CAREER_ERROR,

    GET_CAREER_TASK_URL,
    GET_CAREER_TASK_SUCCESS,
    GET_CAREER_TASK_ERROR,
    GET_CAREER_TASK_REMOVE_DATA,

    GET_CAREER_REL_URL,
    GET_CAREER_REL_SUCCESS,
    GET_CAREER_REL_ERROR,
    GET_CAREER_REL_REMOVE_DATA,

    GET_FAVOURITE_CAREER_URL,
    GET_FAVOURITE_CAREER_SUCCESS,
    GET_FAVOURITE_CAREER_ERROR,
    GET_FAVOURITE_CAREER_REMOVE_DATA,

    FAVOURITE_CAREER_ACTION_URL,
    FAVOURITE_CAREER_ACTION_SUCCESS,
    FAVOURITE_CAREER_ACTION_ERROR,

    GET_CAREER_VIDEO_URL,
    GET_CAREER_VIDEO_SUCCESS,
    GET_CAREER_VIDEO_ERROR,
    GET_CAREER_VIDEO_REMOVE_DATA,

    GET_CAREER_TITLE_URL,
    GET_CAREER_TITLE_SUCCESS,
    GET_CAREER_TITLE_ERROR,
    GET_CAREER_TITLE_REMOVE_DATA,

    GET_CAREER_AVERAGE_WORKING_HOURS_URL,
    GET_CAREER_AVERAGE_WORKING_HOURS_SUCCESS,
    GET_CAREER_AVERAGE_WORKING_HOURS_ERROR,
    GET_CAREER_AVERAGE_WORKING_HOURS_REMOVE_DATA,

    GET_CAREER_AVERAGE_COST_URL,
    GET_CAREER_AVERAGE_COST_SUCCESS,
    GET_CAREER_AVERAGE_COST_ERROR,
    GET_CAREER_AVERAGE_COST_REMOVE_DATA,

    GET_CAREER_EMPLOYMENT_STATUS_URL,
    GET_CAREER_EMPLOYMENT_STATUS_SUCCESS,
    GET_CAREER_EMPLOYMENT_STATUS_ERROR,
    GET_CAREER_EMPLOYMENT_STATUS_REMOVE_DATA,

    GET_CAREER_SALARY_URL,
    GET_CAREER_SALARY_SUCCESS,
    GET_CAREER_SALARY_ERROR,
    GET_CAREER_SALARY_REMOVE_DATA,

    GET_CAREER_PROGRESSION_ROUTES_URL,
    GET_CAREER_PROGRESSION_ROUTES_SUCCESS,
    GET_CAREER_PROGRESSION_ROUTES_ERROR,
    GET_CAREER_PROGRESSION_ROUTES_REMOVE_DATA,

    GET_CAREER_QUALIFICATION_URL,
    GET_CAREER_QUALIFICATION_SUCCESS,
    GET_CAREER_QUALIFICATION_ERROR,
    GET_CAREER_QUALIFICATION_REMOVE_DATA,

    GET_CAREER_STUDY_ROUTES_URL,
    GET_CAREER_STUDY_ROUTES_SUCCESS,
    GET_CAREER_STUDY_ROUTES_ERROR,
    GET_CAREER_STUDY_ROUTES_REMOVE_DATA,

    GET_CAREER_SUGGESTER_URL,
    GET_CAREER_SUGGESTER_SUCCESS,
    GET_CAREER_SUGGESTER_ERROR,
    GET_CAREER_SUGGESTER_REMOVE_DATA,
    COMPETITIVE_EXAM_LIST_URL,
    GET_CAREER_COMPETITIVE_EXAMS_SUCCESS,
    GET_CAREER_COMPETITIVE_EXAMS_ERROR,
    SET_CAREER_EXAMS_LOADING_STATE,
    COLLEGE_LIST_URL,
    SET_COLLEGE_LIST_LOADING_STATE,
    GET_COLLEGE_LIST_SUCCESS,
    GET_COLLEGE_LIST_ERROR,
    GET_MORE_COLLEGE_DATA,
    GET_MORE_COLLEGE_DATA_ERROR,
    GET_COLLEGE_SUGGESTER_URL,
    GET_COLLEGE_DETAIL_URL,
    COLLEGE_DEATIL_SUCCESS,
    COLLEGE_DEATIL_ERROR,
    SET_COLLEGE_DETAIL_LOADING_STATE,
    GET_COLLEGE_EVENTS_URL,
    COLLEGE_EVENTS_SUCCESS,
    COLLEGE_EVENTS_ERROR,
    SET_COLLEGE_EVENTS_LOADING_STATE,
    GET_COLLEGE_COURSES_URL,
    COLLEGE_COURSES_SUCCESS,
    COLLEGE_COURSES_ERROR,
    SET_COLLEGE_COURSES_LOADING_STATE,
    GET_MORE_COURSE_DATA,
    GET_MORE_COURSE_DATA_ERROR,
    GET_COURSES_SUGGESTER_URL,
    GET_COURSE_FACETS_LIST_URL,
    GET_COURSE_FACET_SUCCESS,
    GET_COURSE_FACET_ERROR,
    GET_COLLEGE_FACETS_LIST_URL,
    GET_COLLEGE_FACET_SUCCESS,
    GET_COLLEGE_FACET_ERROR,
    GET_COLLEGE_STREAM_URL,
    GET_COLLEGE_STREAM_SUCCESS,
    GET_COLLEGE_STREAM_ERROR,
    SET_COLLEGE_STREAM_LOADING_STATE,
    GET_COURSE_BY_STREAM_URL,
    GET_COURSE_BY_STREAM_SUCCESS,
    GET_COURSE_BY_STREAM_ERROR,
    SET_COURSE_BY_STREAM_LOADING_STATE,
    GET_MORE_COURSE_BY_COURSE_DATA,
    GET_MORE_COURSE_BY_COURSE_DATA_ERROR,
    GET_COURSE_DETAIL_URL,
    GET_COURSE_SUCCESS,
    GET_COURSE_ERROR,
    SET_COURSE_LOADING_STATE,
    GET_CAREER_HOME_URL,
    GET_IMMERSIVE_HOME_URL,
    GET_CAREER_SUCCESS,
    GET_CAREER_ERROR
} from "../constants/constants";
import { http } from "../../utils/httpClient";
import queryString from 'query-string';

const getUserDiagnosticResultAction = (userSid="") => async (dispatch) => {
    let userSidVal;
    if(userSid){
      userSidVal = userSid;
    } else {
      userSidVal = "";
    }
    try {
        dispatch({
            type: GET_USER_DIAGNOSTIC_RESULT_ERROR,
            payload: {},
        });
        const res = await http.get(`${REACT_APP_DIAGNOSTIC_API_ENDPOINT}${GET_USER_DIAGNOSTIC_RESULT_URL}${userSidVal}`, { setAuthHeader: true });
        if (res.data.type === "Success") {
            dispatch({
                type: GET_USER_DIAGNOSTIC_RESULT_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_USER_DIAGNOSTIC_RESULT_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerListAction = (data) => (dispatch) => {
    const query = queryString.stringify(data)
    dispatch({ type: UPDATE_LOADING_STATE, payload: true });
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREERS_URL}?${query}`)
        .then((res) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            if (res.data.type === "Success") {
                dispatch({
                    type: GET_CAREERS_SUCCESS,
                    payload: { ...res.data, loadMore: !!data?.offset },
                });
            } else {
                dispatch({
                    type: GET_CAREERS_ERROR,
                    payload: res.data,
                });
            }
            return res;
        })
        .catch((error) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            dispatch({
                type: GET_CAREERS_ERROR,
                payload: error.message,
            });
            console.log("error", error);
            return error
        });
};

const getCareerDataAction = (data) => (dispatch) => {
    dispatch({ type: UPDATE_LOADING_STATE, payload: true });
    return http.post(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_DATA_URL}`, data, { setAuthHeader: true })
        .then((res) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            if (res.data.type === "Success") {
                dispatch({
                    type: GET_CAREER_DATA_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_CAREER_DATA_ERROR,
                    payload: res.data,
                });
            }
            return res;
        })
        .catch((error) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            dispatch({
                type: GET_CAREER_DATA_ERROR,
                payload: error.message,
            });
            console.log("error", error);
            return error
        });
};

const getCareerLimitedDataAction = (data) => (dispatch) => {
    dispatch({ type: UPDATE_LOADING_STATE, payload: true });
    return http.post(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_DATA_URL}`, data, { setAuthHeader: true })
        .then((res) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            if (res.data.type === "Success") {
                dispatch({
                    type: GET_CAREER_LIMITED_DATA_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_CAREER_LIMITED_DATA_ERROR,
                    payload: res.data,
                });
            }
            return res;
        })
        .catch((error) => {
            console.log("error", error);
        });
};

const resetGetCareerDataAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_REMOVE_DATA,
        payload: {}
    })
}


const setInitialData = () => (dispatch) => {
    dispatch({ type: SET_INITIAL_CARRIER_DATA })
}

const getCareerByFilters = (data) => (dispatch) => {
    dispatch({ type: UPDATE_LOADING_STATE, payload: true });
    return http.post(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_DATA_URL}`, data, { setAuthHeader: true })
        .then((res) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            if (res.data.type === "Success") {
                dispatch({
                    type: SET_CARRIER_DATA_BY_FILTER,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_CAREER_DATA_ERROR,
                    payload: res.data,
                });
            }
            return res;
        })
        .catch((error) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            dispatch({
                type: GET_CAREER_DATA_ERROR,
                payload: error.message,
            });
            console.log("error", error);
            return error
        });
};

const getImmersiveCareerAction = (data) => (dispatch) => {
    dispatch({ type: UPDATE_LOADING_STATE, payload: true });
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_IMMERSIVE_CAREER_URL}${data}`, { setAuthHeader: true })
        .then((res) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            if (res.data.type === "Success") {
                dispatch({
                    type: GET_IMMERSIVE_CAREER_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_IMMERSIVE_CAREER_ERROR,
                    payload: res.data,
                });
            }
            return res.data;
        })
        .catch((error) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            dispatch({
                type: GET_IMMERSIVE_CAREER_ERROR,
                payload: error.message,
            });
            console.log("getImmersiveCareersAction", error);
            return error
        });
};

const getEmergingCareerAction = (data) => (dispatch) => {
    dispatch({ type: UPDATE_LOADING_STATE, payload: true });
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_EMERGING_CAREER_URL}${data}`, { setAuthHeader: true })
        .then((res) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            if (res.data.type === "Success") {
                dispatch({
                    type: GET_EMERGING_CAREER_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_EMERGING_CAREER_ERROR,
                    payload: res.data,
                });
            }
            return res.data;
        })
        .catch((error) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            dispatch({
                type: GET_EMERGING_CAREER_ERROR,
                payload: error.message,
            });
            console.log("getEmergingCareersAction", error);
            return error
        });
};

const getCareerTaskAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_TASK_URL}${REGCAR_CODE}`);
        if (res?.data?.type === "Success") {
            dispatch({
                type: GET_CAREER_TASK_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_TASK_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerRelAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_REL_URL}${REGCAR_CODE}`);
        if (res?.data?.type === "Success") {
            dispatch({
                type: GET_CAREER_REL_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_REL_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const resetGetCareerTaskAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_TASK_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerRelAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_REL_REMOVE_DATA,
        payload: {}
    })
}

const getFavouriteCareerAction = (ONETSOC_CODE) => async (dispatch) => {
    try {
        const URL = ONETSOC_CODE ? `${REACT_APP_CAREER_API_ENDPOINT}${GET_FAVOURITE_CAREER_URL}${ONETSOC_CODE}` : `${REACT_APP_CAREER_API_ENDPOINT}${GET_FAVOURITE_CAREER_URL}`;
        const res = await http.get(URL, { setAuthHeader: true });
        if (res.data.type === "Success") {
            dispatch({
                type: GET_FAVOURITE_CAREER_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_FAVOURITE_CAREER_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const favouriteCareerAction = (data) => (dispatch) => {

    dispatch({ type: UPDATE_LOADING_STATE, payload: true });
    return http.post(`${REACT_APP_CAREER_API_ENDPOINT}${FAVOURITE_CAREER_ACTION_URL}`, data, { setAuthHeader: true })
        .then((res) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            if (res.data.type === "Success") {
                dispatch({
                    type: FAVOURITE_CAREER_ACTION_SUCCESS,
                    payload: res.data.detail.data,
                });
            } else {
                dispatch({
                    type: FAVOURITE_CAREER_ACTION_ERROR,
                    payload: res.data,
                });
            }
            return res;
        })
        .catch((error) => {
            dispatch({ type: UPDATE_LOADING_STATE, payload: false });
            console.log("error", error);
            return error
        });
};

const resetGetFavouriteCareerAction = (data) => (dispatch) => {
    dispatch({
        type: GET_FAVOURITE_CAREER_REMOVE_DATA,
        payload: data
    })
}

const getCareerVideoAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_VIDEO_URL}${REGCAR_CODE}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_VIDEO_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_VIDEO_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerTitleAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_TITLE_URL}${REGCAR_CODE}`);
        if (res.data && res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_TITLE_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_TITLE_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerAverageWorkingHoursAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_AVERAGE_WORKING_HOURS_URL}${REGCAR_CODE}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_AVERAGE_WORKING_HOURS_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_AVERAGE_WORKING_HOURS_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerAverageCostAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_AVERAGE_COST_URL}${REGCAR_CODE}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_AVERAGE_COST_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_AVERAGE_COST_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerEmploymentStatusAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_EMPLOYMENT_STATUS_URL}${REGCAR_CODE}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_EMPLOYMENT_STATUS_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_EMPLOYMENT_STATUS_ERROR,
                payload: res.data,
            });
            console.log("error", res.data);
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerSalaryAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_SALARY_URL}${REGCAR_CODE}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_SALARY_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_SALARY_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerProgressionRoutesAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_PROGRESSION_ROUTES_URL}${REGCAR_CODE}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_PROGRESSION_ROUTES_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_PROGRESSION_ROUTES_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerQualificationAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_QUALIFICATION_URL}${REGCAR_CODE}`);
        if (res.data && res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_QUALIFICATION_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_QUALIFICATION_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerStudyRoutesAction = (REGCAR_CODE) => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_STUDY_ROUTES_URL}${REGCAR_CODE}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_STUDY_ROUTES_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_STUDY_ROUTES_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
    }
};

const getCareerSuggesterAction = () => async (dispatch) => {
    try {
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_SUGGESTER_URL}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_SUGGESTER_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: GET_CAREER_SUGGESTER_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
    }
};

const resetGetCareerVideoAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_VIDEO_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerTitleAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_TITLE_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerAverageWorkingHoursAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_AVERAGE_WORKING_HOURS_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerAverageCostAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_AVERAGE_COST_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerEmploymentStatusAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_EMPLOYMENT_STATUS_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerSalaryAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_SALARY_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerProgressionRoutesAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_PROGRESSION_ROUTES_REMOVE_DATA,
        payload: {}
    })
}

const resetGetCareerQualificationAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_QUALIFICATION_REMOVE_DATA,
        payload: {}
    })
}

const resetCareerStudyRoutesAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_STUDY_ROUTES_REMOVE_DATA,
        payload: {}
    })
}

const resetCareerSuggesterAction = () => (dispatch) => {
    dispatch({
        type: GET_CAREER_SUGGESTER_REMOVE_DATA,
        payload: {}
    })
}

const getCareerCompetitiveExamListAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SET_CAREER_EXAMS_LOADING_STATE,
            payload: true,
        });
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${COMPETITIVE_EXAM_LIST_URL}`, {params: { ...data } });
        if (res.data.type === "Success") {
            dispatch({
                type: GET_CAREER_COMPETITIVE_EXAMS_SUCCESS,
                payload: res.data.detail,
            });
        } else {
            dispatch({
                type: GET_CAREER_COMPETITIVE_EXAMS_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: GET_CAREER_COMPETITIVE_EXAMS_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCareerCollegeListAction = (data) => async (dispatch) => {
    const { actionType, ...postData } = data;
    try {
        dispatch({
            type: SET_COLLEGE_LIST_LOADING_STATE,
            payload: true,
        });
        const res = await http.post(`${REACT_APP_CAREER_API_ENDPOINT}${COLLEGE_LIST_URL}`, postData);
        if (res.data.type === "Success") {
            dispatch({
                type: actionType === 'loadMore' ? GET_MORE_COLLEGE_DATA : GET_COLLEGE_LIST_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: actionType === 'loadMore' ? GET_MORE_COLLEGE_DATA_ERROR : GET_COLLEGE_LIST_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: actionType === 'loadMore' ? GET_MORE_COLLEGE_DATA_ERROR : GET_COLLEGE_LIST_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCollegeSuggesterListAction = (data) => (dispatch) => {
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COLLEGE_SUGGESTER_URL}`, {params: { ...data } });
}
const getCollegeDetailAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SET_COLLEGE_DETAIL_LOADING_STATE,
            payload: true,
        });
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COLLEGE_DETAIL_URL}`, { setAuthHeader: true, params: { ...data } });
        if (res.data.type === "Success") {
            dispatch({
                type: COLLEGE_DEATIL_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: COLLEGE_DEATIL_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: COLLEGE_DEATIL_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCollegeEventsAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SET_COLLEGE_EVENTS_LOADING_STATE,
            payload: true,
        });
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COLLEGE_EVENTS_URL}`, { setAuthHeader: true, params: { ...data } });
        if (res.data.type === "Success") {
            dispatch({
                type: COLLEGE_EVENTS_SUCCESS,
                payload: res.data.detail,
            });
        } else {
            dispatch({
                type: COLLEGE_EVENTS_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: COLLEGE_EVENTS_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCoursesAction = (data) => async (dispatch) => {
    const { actionType, ...postData } = data;
    try {
        dispatch({
            type: SET_COLLEGE_COURSES_LOADING_STATE,
            payload: true,
        });
        const res = await http.post(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COLLEGE_COURSES_URL}`, postData);
        if (res.data.type === "Success") {
            dispatch({
                type: actionType === 'loadMore' ? GET_MORE_COURSE_DATA : COLLEGE_COURSES_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: actionType === 'loadMore' ? GET_MORE_COURSE_DATA_ERROR : COLLEGE_COURSES_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: actionType === 'loadMore' ? GET_MORE_COURSE_DATA_ERROR : COLLEGE_COURSES_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCourseSuggesterAction = (data) => (dispatch) => {
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COURSES_SUGGESTER_URL}`, {params: { ...data } });
}

const getCourseFacetsAction = () => async (dispatch) => {
    try {

        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COURSE_FACETS_LIST_URL}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_COURSE_FACET_SUCCESS,
                payload: res.data.detail.data.facets,
            });
        } else {
            dispatch({
                type: GET_COURSE_FACET_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: GET_COURSE_FACET_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCollegeFacetsAction = () => async (dispatch) => {
    try {

        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COLLEGE_FACETS_LIST_URL}`);
        if (res.data.type === "Success") {
            dispatch({
                type: GET_COLLEGE_FACET_SUCCESS,
                payload: res.data.detail.data.facets,
            });
        } else {
            dispatch({
                type: GET_COLLEGE_FACET_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: GET_COLLEGE_FACET_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCollegeStreamsAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SET_COURSE_BY_STREAM_LOADING_STATE,
            payload: true,
        });
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COLLEGE_STREAM_URL}`, { setAuthHeader: true, params: { ...data } });
        if (res.data.type === "Success") {
            dispatch({
                type: GET_COLLEGE_STREAM_SUCCESS,
                payload: res.data.detail,
            });
        } else {
            dispatch({
                type: GET_COLLEGE_STREAM_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        dispatch({
            type: GET_COLLEGE_STREAM_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCourseByStreamAction = (data) => async (dispatch) => {
    const { actionType, ...restData } = data;
    try {
        dispatch({
            type: SET_COLLEGE_STREAM_LOADING_STATE,
            payload: true,
        });
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COURSE_BY_STREAM_URL}`, { setAuthHeader: true, params: { ...restData } });
        if (res.data.type === "Success") {
            dispatch({
                type: actionType === 'loadMore' ? GET_MORE_COURSE_BY_COURSE_DATA : GET_COURSE_BY_STREAM_SUCCESS,
                payload: res.data.detail,
            });
        } else {
            dispatch({
                type: actionType === 'loadMore' ? GET_MORE_COURSE_BY_COURSE_DATA_ERROR : GET_COURSE_BY_STREAM_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        dispatch({
            type: actionType === 'loadMore' ? GET_MORE_COURSE_BY_COURSE_DATA_ERROR : GET_COURSE_BY_STREAM_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCourseDetailAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: SET_COURSE_LOADING_STATE,
            payload: true,
        });
        const res = await http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_COURSE_DETAIL_URL}`, { setAuthHeader: true, params: { ...data } });
        if (res.data.type === "Success") {
            dispatch({
                type: GET_COURSE_SUCCESS,
                payload: res.data.detail.data,
            });
        } else {
            dispatch({
                type: GET_COURSE_ERROR,
                payload: res.data,
            });
        }

    } catch (error) {
        console.log("error", error);
        dispatch({
            type: GET_COURSE_ERROR,
            payload: { message: error.message },
        });
    }
}

const getCareerHomeAction = (params) => (dispatch) => {
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_HOME_URL}`, { params })
        .then((res) => {
            if (res.data.type === "Success") {
                return res.data;
            }
        })
        .catch((error) => {
            console.log("getCareerHomeAction", error);
        });
};

const getImmersiveHomeAction = (params) => (dispatch) => {
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_IMMERSIVE_HOME_URL}`, { params })
        .then((res) => {
            if (res.data.type === "Success") {
                return res.data;
            }
        })
        .catch((error) => {
            console.log("getImmersiveHomeAction", error);
        });
};

const getTrendingPopularCareerAction = (is_popular = null, is_trending = null, size=20) => (dispatch) => {
    return http.get(`${REACT_APP_CAREER_API_ENDPOINT}${GET_CAREER_HOME_URL}?is_popular=${is_popular}&is_trending=${is_trending}&size=${size}`, { setAuthHeader: true })
        .then((res) => {
            if (res.data.type === "Success") {
                dispatch({
                    type:GET_CAREER_SUCCESS,
                    payload: res.data.detail.data
                })
            }
            else {
                dispatch({
                    type: GET_CAREER_ERROR,
                    payload: res.data,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: GET_CAREER_ERROR,
                payload: error,
            });
            console.log("getTrendingPopularCareerAction", error);
        });
};

export {
    getUserDiagnosticResultAction,
    getCareerListAction,
    getCareerDataAction,
    getCareerLimitedDataAction,
    resetGetCareerDataAction,
    setInitialData,
    getImmersiveCareerAction,
    getEmergingCareerAction,
    getCareerByFilters,
    getCareerTaskAction,
    getCareerRelAction,
    resetGetCareerTaskAction,
    resetGetCareerRelAction,
    getFavouriteCareerAction,
    favouriteCareerAction,
    resetGetFavouriteCareerAction,
    getCareerVideoAction,
    getCareerTitleAction,
    resetGetCareerVideoAction,
    resetGetCareerTitleAction,
    getCareerAverageWorkingHoursAction,
    getCareerAverageCostAction,
    getCareerEmploymentStatusAction,
    resetGetCareerAverageWorkingHoursAction,
    resetGetCareerAverageCostAction,
    resetGetCareerEmploymentStatusAction,
    getCareerSalaryAction,
    resetGetCareerSalaryAction,
    getCareerProgressionRoutesAction,
    resetGetCareerProgressionRoutesAction,
    getCareerQualificationAction,
    resetGetCareerQualificationAction,
    getCareerStudyRoutesAction,
    resetCareerStudyRoutesAction,
    getCareerSuggesterAction,
    resetCareerSuggesterAction,
    getCareerCompetitiveExamListAction,
    getCareerCollegeListAction,
    getCollegeSuggesterListAction,
    getCollegeDetailAction,
    getCollegeEventsAction,
    getCoursesAction,
    getCourseSuggesterAction,
    getCourseFacetsAction,
    getCollegeFacetsAction,
    getCollegeStreamsAction,
    getCourseByStreamAction,
    getCourseDetailAction,
    getCareerHomeAction,
    getImmersiveHomeAction,
    getTrendingPopularCareerAction
};