import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionRequested: (state) => {
            state.isLoading = true;
        },
        professionReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});
const { reducer: professionReducer, actions } = professionSlice;
const { professionRequested, professionReceived, professionRequestFailed } =
    actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        console.log(lastFetch);
        dispatch(professionRequested());
        try {
            const { content } = await professionService.get();
            console.log("content", content);
            dispatch(professionReceived(content));
        } catch (error) {
            dispatch(professionRequestFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (professionsId) => (state) => {
    if (state.professions.entities) {
        console.log(professionsId);
        return state.professions.entities.find((p) => p._id === professionsId);
    }
};

export default professionReducer;
