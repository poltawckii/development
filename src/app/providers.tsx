"use client";
import {PropsWithChildren} from "react";
import { Provider } from "react-redux";
import { initStore } from "@/store/store";
export default function Providers({ children}: PropsWithChildren) {
    const store = initStore()
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}