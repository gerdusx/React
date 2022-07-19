import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'semantic-ui-css/semantic.min.css'
import { Grid, Input, List, Menu } from "semantic-ui-react"
import React from "react"

const Search: NextPage = () => {


    return (
        <Grid divided='vertically'>
            <Grid.Row columns={2}>
                <Grid.Column width={8}>
                    <List divided relaxed >
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                                <List.Description as='a'>Updated 10 mins ago</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                                <List.Description as='a'>Updated 22 mins ago</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='github' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                                <List.Description as='a'>Updated 34 mins ago</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={8}>
                    <div>Preview</div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Search
