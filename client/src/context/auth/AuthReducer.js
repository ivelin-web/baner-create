import { actionTypes } from "./AuthActions";

const AuthReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
            };

        case actionTypes.LOGIN_START:
            return {
                user: null,
                isFetching: true,
            };

        case actionTypes.LOGIN_SUCCESS:
            return {
                user: action.payload,
                isFetching: false,
            };

        case actionTypes.LOGIN_FAILED:
            return {
                user: null,
                isFetching: false,
            };

        case actionTypes.REGISTER_START:
            return {
                user: null,
                isFetching: true,
            };

        case actionTypes.REGISTER_SUCCESS:
            return {
                user: null,
                isFetching: false,
            };

        case actionTypes.REGISTER_FAILED:
            return {
                user: null,
                isFetching: false,
            };

        default:
            return state;
    }
};

export default AuthReducer;
