import { APP_LANGUAGE_KEY, APP_PLAYERS_AVATARS_LIST, DEFAULT_TOAST_DURATION } from '../../models/app/app.constants';
import { avatarsListOk, initItemReady, resetActionSheet, resetAlert, resetToast, setLanguage, setRedirectTo, showActionSheet, showAlert, showToast } from './app.actions';
import { appReducer } from './app.reducer';
import { AppState, initialState } from './app.state';

const mockInitialState = initialState;

describe('AppReducer', () => {
  it('should return the default state', () => {
    const action = {
      type: 'Unknown',
    };
    const state = appReducer(mockInitialState, action);

    expect(state).toBe(initialState);
  });

  it('should return the new state to show toast', () => {
    const newState: AppState = {
      ...mockInitialState,
      toastOptions: {
        showToast: true,
        toastDuration: 1000,
        toastMessage: 'message'
      }
    };
    const action = showToast({
      message: 'message',
      duration: 1000
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state to show toast with default duration value', () => {
    const newState: AppState = {
      ...mockInitialState,
      toastOptions: {
        showToast: true,
        toastDuration: DEFAULT_TOAST_DURATION,
        toastMessage: 'message'
      }
    };
    const action = showToast({
      message: 'message'
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on reset toast options', () => {
    const newState: AppState = {
      ...mockInitialState,
      toastOptions: {
        showToast: false,
        toastDuration: DEFAULT_TOAST_DURATION,
        toastMessage: ''
      }
    };
    const initialState: AppState = {
      ...mockInitialState,
      toastOptions: {
        showToast: true,
        toastDuration: 1000,
        toastMessage: 'message'
      }
    };
    const action = resetToast();
    const state = appReducer(initialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initialState);
  });

  it('should return the new state on show alert', () => {
    const newState: AppState = {
      ...mockInitialState,
      alertOptions: {
        ...mockInitialState.alertOptions,
        showAlert: true,
        text: 'test'
      }
    };
    const action = showAlert({
      options: {
        showAlert: true,
        text: 'test'
      }
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on reset alert options', () => {
    const newState: AppState = {
      ...mockInitialState,
      alertOptions: {
        ...mockInitialState.alertOptions,
        showAlert: false,
        text: ''
      }
    };
    const initialState: AppState = {
      ...mockInitialState,
      alertOptions: {
        ...mockInitialState.alertOptions,
        showAlert: true,
        text: 'test'
      }
    };
    const action = resetAlert();
    const state = appReducer(initialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initialState);
  });
  
  it('should return the new state on set the device and user language', () => {
    const newState: AppState = {
      ...mockInitialState,
      deviceLanguage: 'es',
      userLanguage: 'es'
    };
    const action = setLanguage({
      infoType: 'both',
      value: 'es'
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on set the user language', () => {
    mockInitialState.userLanguage = undefined;
    mockInitialState.deviceLanguage = undefined;

    const newState: AppState = {
      ...mockInitialState,
      deviceLanguage: 'es',
      userLanguage: undefined
    };
    const action = setLanguage({
      infoType: 'device',
      value: 'es'
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on set the device language', () => {
    mockInitialState.userLanguage = undefined;
    mockInitialState.deviceLanguage = undefined;

    const newState: AppState = {
      ...mockInitialState,
      deviceLanguage: undefined,
      userLanguage: 'es'
    };
    const action = setLanguage({
      infoType: 'user',
      value: 'es'
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on set one init item ready', () => {
    const newState: AppState = {
      ...mockInitialState,
      itemsReady: mockInitialState.itemsReady.set(APP_LANGUAGE_KEY, true)
    };
    const action = initItemReady({
      key: APP_LANGUAGE_KEY
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on set the redirect to value', () => {
    const newState: AppState = {
      ...mockInitialState,
      redirectTo: 'home'
    };
    const action = setRedirectTo({
      route: 'home'
    });
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on show action sheet', () => {
    const newState: AppState = {
      ...mockInitialState,
      actionSheetOptions: {
        ...mockInitialState.actionSheetOptions,
        header: 'header',
        showActionSheet: true
      }
    };
    const action = showActionSheet({
      options: {
        header: 'header'
      }
    })
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });

  it('should return the new state on reset alert options', () => {
    const newState: AppState = {
      ...mockInitialState,
      actionSheetOptions: {
        ...mockInitialState.actionSheetOptions,
        showActionSheet: false,
        header: '',
        subHeader: '',
        buttons: []
      }
    };
    const initialState: AppState = {
      ...mockInitialState,
      actionSheetOptions: {
        ...mockInitialState.actionSheetOptions,
        showActionSheet: true,
        header: 'header'
      }
    };
    const action = resetActionSheet();
    const state = appReducer(initialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(initialState);
  });

  it('should return the new state on set the avatars list ok', () => {
    const newState: AppState = {
      ...mockInitialState,
      itemsReady: mockInitialState.itemsReady.set(APP_PLAYERS_AVATARS_LIST, true)
    };
    const action = avatarsListOk();
    const state = appReducer(mockInitialState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(mockInitialState);
  });  
});
