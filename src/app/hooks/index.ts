import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {useWindowDimensions} from 'react-native';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useViewportUnits = () => {
	const {width, height} = useWindowDimensions();

	const vh = height / 100;
	const vw = width / 100;

	return {vh, vw};
};
