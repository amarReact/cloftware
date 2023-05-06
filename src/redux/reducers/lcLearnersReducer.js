import {
    GET_LC_LEARNERS_LISTING_SUCCESS,
    GET_LC_LEARNERS_LISTING_ERROR
} from "../constants/constants";

const initialState = {

    lcLearnerListingResponse: {
        data: {},
        success: false
    }

};

const lcLearnersListingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LC_LEARNERS_LISTING_SUCCESS:
            return {
                ...state,
                lcLearnerListingResponse: {
                    ...state.lcLearnerListingResponse,
                    data: action.payload,
                    success: true
                },
            };
        case GET_LC_LEARNERS_LISTING_ERROR:
            return {
                ...state,
                lcLearnerListingResponse: {
                    ...state.lcLearnerListingResponse,
                    data: action.payload,
                    success: false
                },
            };

        default:
            return state;
    }
}

export default lcLearnersListingReducer;