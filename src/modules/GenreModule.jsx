import { useState } from 'react';
import firebase from '../firebase';

export const useGenre = (user) => {
    const [selectedGenre, setSelectedGenre] = useState({
        Pop: false,
        Rock: false,
        HipHop: false,
        EDM: false,
    });

    const genrecheckboxHandler = (GenreName) => {
        setSelectedGenre(prevGenre => ({
            ...prevGenre,
            [GenreName]: !prevGenre[GenreName],
        }));
    };

    const arrayofSelectedGenre = () => {
        return Object.keys(selectedGenre).filter(genre => selectedGenre[genre]);
    };

    const genreToFirebase = async () => {
        const selectedGenreArray = arrayofSelectedGenre();
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        await userDocRef.update({ genre: selectedGenreArray });
        alert("genre added from button checkbox");
    };

    return {
        selectedGenre,
        genrecheckboxHandler,
        genreToFirebase,
        arrayofSelectedGenre
    };
};
