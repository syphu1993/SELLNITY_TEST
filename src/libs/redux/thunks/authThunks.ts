// src/redux/thunks/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout, profile } from '@/features/auth/authService';
import { User } from '@/types/user';
import { ErrorCustom } from '@/types/error';

export const getUser = createAsyncThunk<User>(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await profile();
            return res;
        } catch (error) {
            const axiosError = error as ErrorCustom;
            return rejectWithValue(axiosError);
        }
    }
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () => {
    logout();
});