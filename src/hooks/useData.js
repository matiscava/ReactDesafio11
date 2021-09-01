import { useState,useEffect } from "react";
import { getFirestore } from '../firebase';

export const useData = (categoryName) => {
    const [item, setItem] = useState([]);


    useEffect(() => {
      const unsub = getFirestore().collection(categoryName)
      .onSnapshot(snap => {
        const documents = [];
        snap.forEach(doc => {
            documents.push({id: doc.id,...doc.data()})
        })
        setItem(documents);
    });

    //Limpiar el componenete
    return () => unsub();
    }, [categoryName]);
    return { item }
}
