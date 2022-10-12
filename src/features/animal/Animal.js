import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Breeds } from './Breeds';
import { DogLists } from './DogLists';
import { setBreeds } from './animalSlice';
import styles from './Animal.module.css';

export function Animal() {
  const dispatch = useDispatch();

  const addBreed = ({ data }) => {
		dispatch(setBreeds(Object.keys(data.message)))
	};

	useEffect(() => {
		axios.get('https://dog.ceo/api/breeds/list/all')
			.then(addBreed)
	}, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.breed}>
        <Breeds />
      </div>
      <div className={styles.dogLists}>
        <DogLists />
      </div>
    </div>
  );
}
