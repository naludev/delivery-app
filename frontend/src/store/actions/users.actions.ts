import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersAPI, fetchUserByIdAPI, createUserAPI, updateUserAPI, deleteUserAPI } from '@api/users.api';
import { IUser } from '@interfaces/user.interface';
import { showToastWithTimeout } from '@slices/toast.slice';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return await fetchUsersAPI();
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (id: string) => {
    return await fetchUserByIdAPI(id);
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: Partial<IUser>, { dispatch }) => {
    dispatch(showToastWithTimeout('Cuenta creada'));
    return await createUserAPI(user);
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, user }: { id: string, user: Partial<IUser> }) => {
    return await updateUserAPI(id, user);
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string) => {
    await deleteUserAPI(id);
    return id;
  }
);
