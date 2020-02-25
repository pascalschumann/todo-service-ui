import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Todo} from "./TodoList";
import {TextField} from "@material-ui/core";



interface TodoDetailState {
    error?: any;
    isLoaded?: boolean;
    todo?: Todo;
    todoId: string
}

export class TodoDetail extends React.Component<TodoDetailState> {
    state: TodoDetailState;

    constructor(props: TodoDetailState) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            todo: props.todo,
            todoId: props.todoId
        };
    }

    // executed after a component is inserted into react DOM
    componentDidMount() {
        fetch(`http://localhost:3000/v1/todos/${this.state.todoId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        todo: result
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
        const { error, isLoaded, todo } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <form noValidate autoComplete="off">
                    <TextField
                        label="Id"
                        defaultValue={this.state.todoId}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    if(this.state.todo){
                    <TextField label="Name" variant="outlined" value={this.state.todo?.name} />
                }

                </form>
            );
        }
    }
}