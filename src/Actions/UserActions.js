export const setUserAccount = (data) => {
    return {
        type: 'HANDLE_LOGGIN',
        payload: data
    }
}

export const handleLogout = () => {
    return {
        type: 'HANDLE_LOGOUT'
    }
}