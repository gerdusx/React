// import Navbar from './navbar'
// import Footer from './footer'

import { Container } from "semantic-ui-react"
import { Navbar } from "./Navbar";
import styles from '../styles/Layout.module.css';

// export const Layout({ children }) {

export interface ILayoutProps {
    children: React.ReactNode
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({ children }: ILayoutProps) => {
    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <main>{children}</main>
            </div>
        </>
    )
}