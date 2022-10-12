import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { uniq } from 'lodash';
import {
  getDogs,
  getBreeds,
} from './animalSlice';
import styles from './Animal.module.css';

export function Breeds() {
	const dogs = useSelector(getDogs);
  const breeds = useSelector(getBreeds);
  const [uniqueBreeds, setUniqueBreeds] = useState([]);

  useEffect(() => {
    let items = [];
    let uniqueDogBreeds = uniq(breeds, e => (e));

    uniqueDogBreeds.forEach(value => {
      const dogBreed = dogs.filter(dog => dog.breed === value);
      const totalLike = dogBreed.reduce((a, b) => a + b.likes, 0);

      items.push({
        breed: value,
        totalDogs: dogBreed.length,
        totalLikes: totalLike,
      });
    });
    
    setUniqueBreeds(items.filter(item => item.totalDogs > 0));
  }, [breeds, dogs]);
  
  return (
    <ul className={styles.dogBreeds}>
      {   
        uniqueBreeds.map((uniqueBreed, index) => (
          <li key={index}>
            <h4>{ uniqueBreed.breed }</h4>
            <div className={styles.breedInfo}>
              <div>Likes: { uniqueBreed.totalLikes }</div>
              <span>Count: { uniqueBreed.totalDogs }</span>
            </div>
          </li>
        ))
      }
      
    </ul>
  )
}