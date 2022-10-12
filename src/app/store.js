import { configureStore } from '@reduxjs/toolkit';
import animalSlice from '../features/animal/animalSlice';

export const store = configureStore({
  reducer: {
    animal: animalSlice,
  },
});
