import Link from "next/link";
import React from "react";
import { Input, Menu } from "semantic-ui-react";

export const Navbar: React.FunctionComponent = () => {

    const [activeItem, setActiveItem] = React.useState<string>("home");
    
    return (
        <Menu inverted>
            <Link href="/">
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={() => { setActiveItem("home") }}
                />
            </Link>
            <Link href="/projects">
                <Menu.Item
                    name='projects'
                    active={activeItem === 'projects'}
                    onClick={() => { setActiveItem("projects") }}
                />
            </Link>
            <Link href="/search">
                <Menu.Item
                    name='search'
                    active={activeItem === 'search'}
                    onClick={() => { setActiveItem("search") }}
                />
            </Link>


            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={() => { setActiveItem("logout") }}
                />
            </Menu.Menu>
        </Menu>
    )
}