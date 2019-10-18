import { DefaultTheme, Theme } from 'react-native-paper';

export const appTheme: Theme = {
    ...DefaultTheme,
    roundness: 1,
    colors: {
        ...DefaultTheme.colors,
        primary: '#d81b60'
    },
    dark: false
};
