import { ConnectedRouter, goBack } from 'connected-react-router';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { LocalizeProvider } from 'react-localize-redux';
import { BackHandler } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { PersistGate } from 'redux-persist/integration/react';
import { memoryHistory, persistor, reduxStore } from '../../redux/redux.store';
import { appTheme } from '../../theme';
import Main from '../Main/Main';

export const App: FunctionComponent = () => (
    <PaperProvider theme={appTheme}>
        <Provider store={reduxStore}>
            <NativeRouter>
                <PersistGate loading={null} persistor={persistor}>
                    <ConnectedRouter history={memoryHistory}>
                        <LocalizeProvider store={reduxStore}>
                            <Main/>
                        </LocalizeProvider>
                    </ConnectedRouter>
                </PersistGate>
            </NativeRouter>
        </Provider>
    </PaperProvider>
);

BackHandler.addEventListener('hardwareBackPress', () => {

    if (memoryHistory.canGo(-1)) {
        reduxStore.dispatch(goBack());
        return true;
    } else {
        return false;
    }

});
