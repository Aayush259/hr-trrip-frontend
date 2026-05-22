/**
 * @module helperHooks
 * @description Provides typed versions of standard React-Redux hooks.
 * These hooks should be used throughout the application to ensure type safety
 * with the Redux store and dispatch.
 */

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '../store';

/**
 * Typed version of the `useDispatch` hook.
 * @function useAppDispatch
 * @returns {AppDispatch} The Typed dispatch function
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed version of the `useSelector` hook.
 * @function useAppSelector
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector.withTypes<RootState>();
