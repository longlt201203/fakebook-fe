import { PropsWithChildren } from "react"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

export const MainLayout = (props: PropsWithChildren) => {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
}