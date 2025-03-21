"use client"
import React, {useEffect} from 'react';
import Main_page from "@components/Main_page";
import {useLazyGetLoginQuery} from "@/services/CozyEveningLocal";
const Page = () => {
    let [getLogin] = useLazyGetLoginQuery();
    useEffect(() => {
        getLogin()
    }, []);
  return (
      <Main_page/>
  );
}

export default Page;
