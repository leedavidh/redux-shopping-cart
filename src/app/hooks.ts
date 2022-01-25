/*
    We will create root Defined Typed Hooks 
    so that we don't have to type our function each time we want 
    to select state or dispatch an action.

*/
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
    Redux provides useDispatch and useSelector hooks for React, 
    but in order to have them aware of the types that we've just defined 
    in our hooks.ts file, we have to re-export new functions that are type aware. 
*/
