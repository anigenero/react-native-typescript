import AsyncStorage from '@react-native-community/async-storage';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { localizeReducer } from 'react-localize-redux';
import { applyMiddleware, combineReducers, compose, createStore, Reducer } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { PersistConfig } from 'redux-persist/es/types';
import { async as rxjsAsync } from 'rxjs/internal/scheduler/async';
import { IAppState } from './app.state';
import { IDependencies } from './epic.def';

export const memoryHistory = createMemoryHistory();

const dependencies: IDependencies = {
    scheduler: rxjsAsync
};

export const epicMiddleware = createEpicMiddleware({
    dependencies
});

export const epics: Epic[] = [];

const rootEpic = combineEpics(...epics);

epicMiddleware.run(rootEpic);

export const reducer: Reducer<IAppState> = combineReducers({
    localize: localizeReducer,
    router: connectRouter(memoryHistory)
});

const persistConfig: PersistConfig<IAppState> = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage: AsyncStorage,
    transforms: [],
    whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const reduxStore = createStore(
    persistedReducer,
    {},
    compose(
        applyMiddleware(
            epicMiddleware,
            routerMiddleware(memoryHistory)
        )
    )
);

epicMiddleware.run(rootEpic);

export const persistor = persistStore(reduxStore);
