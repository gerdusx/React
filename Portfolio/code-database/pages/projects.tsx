import type { NextPage } from 'next'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Header, Input, List, Menu } from "semantic-ui-react"
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
        <Grid divided='vertically' padded>
            <Grid.Row columns={2}>
                <Grid.Column width={8}>
                    <Header as='h4'>Projects</Header>
                    <Input placeholder='Project name' style={{ width: "30%" }} />
                    <Input action='Add' placeholder='Add directory path...' style={{ width: "70%" }} />
                    <List divided relaxed >
                        {projects.map((project, index) => {
                            return (
                                <List.Item key={index}>
                                    <List.Content>
                                        <List.Header as='a'>{project.name}</List.Header>
                                        <List.Description as='a'>{project.path}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Header as='h4'>Directories excluded</Header>
                    <Input action='Add' placeholder='Add directory path...' style={{ width: "50%" }} />
                    <List divided relaxed >
                        {directories.map((directory, index) => {
                            return (
                                <List.Item key={index}>
                                    <List.Content>
                                        <List.Header as='a'>{directory.name}</List.Header>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    )
}

export default Directories
