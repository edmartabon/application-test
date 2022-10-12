import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  breeds: [],
  dogs: [],
};

export const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    setBreeds: (state, { payload }) => {
      state.breeds = payload;
    },
    setDogs: (state, { payload }) => {
      state.dogs = payload;
    },
    addLike: (state, { payload }) => {
      const newDogs = [...state.dogs];
      newDogs[payload].likes += 1;
      state.dogs = newDogs;
    },
  },
});

export const { setBreeds, setDogs, addLike } = animalSlice.actions;

export const getBreeds = (state) => state.animal.breeds;
export const getDogs = (state) => state.animal.dogs;

export default animalSlice.reducer;
