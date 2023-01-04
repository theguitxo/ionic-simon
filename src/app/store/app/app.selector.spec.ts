import { StateLanguages } from "src/app/models/app/app.models";
import { getActionSheetOptions, getAlertOptions, getItemsAreReady, getLanguages, getRedirectTo, getToastOptions, getUserLanguage } from "./app.selectors";
import { AppState, initialState } from "./app.state";

describe('AppSelectors', () => {
  const mockInitialState: AppState = initialState;

  it('should select the toast options', () => {
    const result = getToastOptions.projector(mockInitialState);

    expect(result).toEqual(initialState.toastOptions);
  });

  it('should select the app languages', () => {
    mockInitialState.userLanguage = 'es';
    mockInitialState.deviceLanguage = 'es';

    const expected: StateLanguages = {
      user: 'es',
      device: 'es'
    };

    const result = getLanguages.projector(mockInitialState);

    expect(result).toEqual(expected);
  });

  it('should select the user language', () => {
    mockInitialState.userLanguage = 'es';

    const expected = 'es';

    const result = getUserLanguage.projector(mockInitialState);

    expect(result).toBe(expected);
  });

  it('should select the user language', () => {
    const result = getItemsAreReady.projector(mockInitialState);

    expect(result).toBeFalsy();
  });

  it('should select the redirect to value', () => {
    mockInitialState.redirectTo = 'home';

    const expected = 'home';

    const result = getRedirectTo.projector(mockInitialState);

    expect(result).toBe(expected);
  });

  it('should select the alert options', () => {
    const result = getAlertOptions.projector(mockInitialState);

    expect(result).toEqual(initialState.alertOptions);
  });

  it('should select the action sheet options', () => {
    const result = getActionSheetOptions.projector(mockInitialState);

    expect(result).toEqual(initialState.actionSheetOptions);
  });
});
