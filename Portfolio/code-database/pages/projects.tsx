import type { NextPage } from 'next'
import React from "react"

const Directories: NextPage = () => {

    const [projects, setProjects] = React.useState<any[]>([])
    const [directories, setDirectories] = React.useState<any[]>([])

    React.useEffect(() => {
        fetch('/api/directories')
            .then((res) => res.json())
            .then((data) => {
                setDirectories(data);
            })
    }, []);

    React.useEffect(() => {
        fetch('/api/projects')
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
            })
    }, []);


    return (
        <>
            <h1>Projects</h1>
        </>

    )
}

export default Directories
