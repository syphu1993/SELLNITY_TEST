import { getUser } from '@/libs/redux/thunks/authThunks';
import { ErrorCustom } from '@/types/error';
import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';
interface AuthState {
    token: string | null;
    user: User | null;
    error?: ErrorCustom;
    loading: boolean;
    authInitialized: boolean;
};

const initialState: AuthState = {
    token: null,
    user: null,
    error: undefined,
    loading: false,
    authInitialized: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.user = action.payload;
            state.token = action.payload.accessToken;
        },
        removeToken: (state) => {
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
                state.authInitialized = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = undefined;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload as ErrorCustom;
                state.authInitialized = true;
            })
    },
});

export const { setToken, setCurrentUser, removeToken } = authSlice.actions;
export default authSlice.reducer;
