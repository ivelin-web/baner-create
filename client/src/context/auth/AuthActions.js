export const actionTypes = {
    GET_USER: "GET_USER",
    LOGOUT: "LOGOUT",
    LOGIN_START: "LOGIN_START",
    LOGIN_FAILED: "LOGIN_FAILED",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    REGISTER_START: "REGISTER_START",
    REGISTER_FAILED: "REGISTER_FAILED",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
};

export const GetUser = (user) => ({
    type: actionTypes.GET_USER,
    payload: user,
});

export const Logout = () => ({
    type: actionTypes.LOGOUT,
});

export const LoginStart = () => ({
    type: actionTypes.LOGIN_START,
});

export const LoginSuccess = (user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user,
});

export const LoginFailed = () => ({
    type: actionTypes.LOGIN_FAILED,
});

export const RegisterStart = () => ({
    type: actionTypes.REGISTER_START,
});

export const RegisterSuccess = () => ({
    type: actionTypes.REGISTER_SUCCESS,
});

export const RegisterFailed = () => ({
    type: actionTypes.REGISTER_FAILED,
});
