"use client";
import {PropsWithChildren, ReactNode} from "react";
import { Provider } from "react-redux";
import { initStore } from "@/store/store";

interface Props{
    children: ReactNode
}

export default function Providers({ children}: PropsWithChildren) {
    const store = initStore()

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}