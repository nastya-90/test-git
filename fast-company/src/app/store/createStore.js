import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionReducer from "./profession";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
