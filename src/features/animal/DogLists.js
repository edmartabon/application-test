import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  setDogs,
  getDogs,
  addLike,
  getBreeds,
} from './animalSlice';
import styles from './Animal.module.css';

export function DogLists() {
  const dispatch = useDispatch();
  const breeds = useSelector(getBreeds);
  const dogs = useSelector(getDogs);

  const setDogBreeds = (dogItems, images) => {
    for(let i=0;i<images.length;i++) {
      dogItems[i].image = images[i].data.message;
    }
    dispatch(setDogs(dogItems));
  }

  const addDogLike = index => {
    dispatch(addLike(index));
  }

  useEffect(() => {
    let dogItems = [];
    let dogImages = [];

    if (!breeds.length) {
      return;
    }

    for(let i=1;i<101;i++) {
      const dogBreed = breeds[Math.floor(Math.random() * (breeds.length - 1))];
      dogItems.push({
        id: i,
        breed: dogBreed,
        likes: 0,
      });


      dogImages.push(axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`))
    }

    Promise.all(dogImages).then(results => setDogBreeds(dogItems, results));
  }, [breeds]);

  return (
    <div className={styles.container}>
      {
        dogs.map((dog, index) => (
          <div key={index} className={styles.item}>
            <div 
              className={styles.dogImage} 
              style={{ backgroundImage: `url("${dog.image}")` }}
              onClick={() => addDogLike(index)}
            >
              <h3 className={styles.dogTitle}>{ dog.breed }</h3>
              <div className={styles.like}>
                <span className={styles.badge}>Likes { dog.likes }</span>
              </div>
            </div>
          </div>  
        ))
      }
    </div>
  )
}
