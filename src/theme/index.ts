import colors from './colors';
export interface Theme {
	PRIMARY_COLOR: string;
	SECONDARY_COLOR: string;
	TITLE_COLOR: string;
	BACKGROUND_COLOR: string;
	BUTTON_COLOR: string;
}
const defaultTheme: Theme = {
	PRIMARY_COLOR: colors.primary.blue,
	SECONDARY_COLOR: colors.status.success,
	TITLE_COLOR: '#fff',
	BACKGROUND_COLOR: '#111216',
	BUTTON_COLOR: '#fff',
};

export {defaultTheme};
