export const storageMiddleware = store => next => action => {
    let result = next(action);
    localStorage.setItem('user', JSON.stringify(store.getState().user));
    localStorage.setItem('session', JSON.stringify(store.getState().session));
    localStorage.setItem('darkmode', JSON.stringify(store.getState().darkMode));
    return result;
};