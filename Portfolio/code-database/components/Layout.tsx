import { Navbar } from "./Navbar";


export interface ILayoutProps {
    children: React.ReactNode
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({ children }: ILayoutProps) => {
    return (
        <>
            <Navbar />
            <div className="p-8">
                <main>{children}</main>
            </div>
        </>
    )
}