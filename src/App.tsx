import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SimpleList, TodoList} from "./List/ListController";


export default function App(){
    return (
        <div>
        <TodoList></TodoList>
        <SimpleList></SimpleList>
        </div>
    )
}
