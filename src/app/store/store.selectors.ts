import { getSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppToastOptions } from '../models/app.models';
import { StoreState } from './store.state';

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
  selectTitle, // Select the title if available
} = getSelectors();

export const appState = createFeatureSelector<StoreState>('store');

export const getToastOptions = createSelector(
  appState,
  (state: StoreState): AppToastOptions => state?.toastOptions
);
