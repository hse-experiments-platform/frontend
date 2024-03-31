const checkAuth = (): boolean => {
    const token = localStorage.getItem('accessToken');
    return token !== null;
}

export default checkAuth;