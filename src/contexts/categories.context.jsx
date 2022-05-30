import { createContext, useState, useEffect } from 'react'
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
// import SHOP_DATA from './../shop-data.js';
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children})=>{
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    },[]);
    // useEffect(()=>{
    //     addCollectionAndDocuments( 'categories', SHOP_DATA);
    // })
    const value = {categoriesMap};

    // useEffect(()=>{
    //     setProducts(SHOP_DATA);
    // }, [])

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}