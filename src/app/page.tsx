"use client"
import React, {useEffect} from 'react';
import MainPage from "@components/UI/MainPage/MainPage";
import {useLazyGetLoginQuery} from "@/services/CozyEveningLocal";
const Page = () => {
    let [getLogin] = useLazyGetLoginQuery();
    useEffect(() => {
        getLogin()
    }, []);
  return (
      <MainPage/>
  );
}

export default Page;
