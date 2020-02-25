import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SimpleList, TodoList} from "./List/TodoList";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import {TodoDetail} from "./List/TodoDetail";

export default function App() {
    return (
        <Router>
            <div>
                <div>

                    <SimpleList></SimpleList>



                </div>

                <Switch>
                    <Route path="/todos/:id" children={<Child />} />
                    <Route path="/todos" children={
                        <Grid container spacing={3}>

                            <Grid item xs={3}>
                                <Paper></Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper >
                                    <TodoList></TodoList>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper></Paper>
                            </Grid>
                        </Grid>
                    } />
                </Switch>
            </div>
        </Router>

    )
}

interface bla{

    id: string
}

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const params = useParams<{id: string}>();
    return (
            <TodoDetail todoId={params.id}></TodoDetail>
    );
}
