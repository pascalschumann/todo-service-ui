import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button, TextField} from "@material-ui/core";


interface Todo{
    id: string;
    name: string;
}

interface MyState {
    error: any;
    isLoaded: boolean;
    items: Todo[];
}

interface MyListElementProperties {
    isEditable: boolean;
    todo: Todo;
}

export class MyListElement extends React.Component<MyListElementProperties> {
    isEditable: boolean;
    todo: Todo;

    constructor(props: MyListElementProperties) {
        super(props);
        this.isEditable = props.isEditable;
        this.todo = props.todo;
    }

    render() {
        if(this.isEditable){
            return <TextField value={this.todo.name} variant="outlined" onKeyUp={
                event=>{
                    if (event.keyCode === 13) {
                        this.isEditable = false
                    }
            }
            } />
        }
        else{
            return <button onClick={()=>{}}>{this.isEditable = true}</button>
        }
    }
}

export class TodoList extends React.Component {
    state: MyState;

    constructor(props: any[]) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    // executed after a component is inserted into react DOM
    componentDidMount() {
        fetch("http://localhost:3000/v1/todos")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <List component="nav" aria-label="main">
                    {items.map(item => (
                        // item.name
                                 <MyListElement key={item.id} isEditable={false} todo={item}></MyListElement>
                            ))}
                </List>
            );
        }
    }
}

export function SimpleList() {

    return (
        <div>
            <List component="nav" aria-label="main">
                <ListItem button>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Drafts" />
                </ListItem>
            </List>
        </div>
    );
}

