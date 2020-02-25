import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Button, TextField} from "@material-ui/core";
import {
    Redirect,
} from "react-router-dom";

export interface Todo{
    id: string;
    name: string;
}

interface TodoListState {
    error: any;
    isLoaded: boolean;
    items: Todo[];
}

interface TodoListElementState {
    isEditable: boolean;
    todo: Todo;
}

// Somehow one cannot type into dialog
export class TodoListElement extends React.Component<TodoListElementState> {
    state: TodoListElementState;

    /*constructor(props: MyListElementProperties) {
        super(props);
        this.isEditable = props.isEditable;
        this.todo = props.todo;
    }*/

    constructor(props: TodoListElementState) {
        super(props);
        this.state = {isEditable: props.isEditable, todo: props.todo};
    }

    render() {
        if(this.state.isEditable){
            return <TextField value={this.state.todo.name} variant="outlined" onKeyPress={
                event=>{
                    // if (event.keyCode === 13) {
                    if(event.key === 'Enter'){
                        console.log('Enter pressed.')
                        // this.state.isEditable = false
                        this.setState((state: TodoListElementState) => {
                            return {isEditable: false, todo: state.todo};
                        })
                    }
            }} />
        }
        else{
            /*return <button variant="contained" onMouseUp={
                ()=>{this.isEditable = true}
            }>{this.todo.name}</button>*/
            return  <Button variant="contained" onMouseUp={
                ()=>{
                    // this.state.isEditable = true
                    this.setState((state: TodoListElementState) => {
                        return {isEditable: true, todo: state.todo};
                    })
                }
            }>{this.state.todo.name}</Button>
        }
    }
}

export class TodoList extends React.Component {
    state: TodoListState;

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
                                 // <TodoListElement key={item.id} isEditable={false} todo={item}></TodoListElement>
                        <ListItem  key={item.id} button>
                            <ListItemText onClick={
                                ()=>{
                                    // return <Redirect to="/todos" />
                                    return <Redirect to={"/todos/" + item.id} />
                                }
                            } primary={item.name} />
                        </ListItem>
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

