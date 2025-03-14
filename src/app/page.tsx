"use client"
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from "@/store/store";
import Main_page from "@components/Main_page";
import Providers from "./providers";
import getLogin from "@api/getLogin";
import {Router} from "next/router";

const Page = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLogin())
    }, []);
  return (
      <Providers>
          <style jsx global>{`
              :root {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
              }
          `}</style>
          <Main_page/>
      </Providers>
  );
}

export default Page;
