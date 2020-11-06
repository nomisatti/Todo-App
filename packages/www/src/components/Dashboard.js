import React, { useReducer, useRef, useState } from 'react'
import { Button, Container, Flex, Heading, NavLink, Input, Label, Checkbox } from 'theme-ui';
import { Link } from 'gatsby'
import { IdentityContext } from '../../identity-Context'


const todoReducer = (state, action) => {
    switch (action.type) {
        case "addTodo":
            return [...state ,{ done: false, value: action.payload }]
        case "toggleTodo":
            const newState = [...state];
            newState[action.payload] = {
                done: !state[action.payload].done,
                value: state[action.payload].value
            }
            return state
    }
}

export default function Dashboard(props) {
    console.log("todos  " , {todos})
    const { user, identity: netlifyIdentity } = React.useContext(IdentityContext)
    const inputRef = useRef();
    const [todos, dispatch] = useReducer(todoReducer, [])
    return (
        <Container>
            <Flex as='nav'>
                <NavLink as={Link} to='/' p={2}>
                    Home
            </NavLink>

                <NavLink p={2}>
                    {user ? ('Welcome ' + user.user_metadata.full_name) : ''}
                </NavLink>

            </Flex>
            <Flex sx={{ flexDirection: "column", padding: 3 }}>
                <Heading as='h1'> Helo World ! Todo App</Heading>
                <Button sx={{ marginTop: 2, color: 'black' }}
                    onClick={() => { netlifyIdentity.logout() }}
                > Logout </Button>
            </Flex>
            <Flex
                as='form'
                onSubmit={e => {
                    e.preventDefault();
                    dispatch({ type: "addTodo", payload: inputRef.current.value })
                }}

            >
                <Label sx={{ display: "flex" }}>
                    <span> Add&nbsp;Todo</span>
                    <Input ref={inputRef} sx={{ marginLeft: 1 }} ></Input>
                </Label>
                <Button sx={{ marginLeft: 1, color: 'black' }} >Submit</Button>
            </Flex>

            <Flex sx={{ flexDirection: "column" }}>
                <ul sx={{ listStyleType: "none" }}>
                    {todos.map((todo, i) => (
                        <Flex as='li' key={i}
                            onClick={() => {
                                dispatch({
                                    type: "toggleTodo",
                                    payload: i
                                })
                            }}
                        >
                            <Label>
                                <Checkbox defaultChecked={todo.done} />
                                <span>{todo.value}</span>
                            </Label>
                            
                            
                        </Flex>
                    ))}
                </ul>

            </Flex>


        </Container>
    )
}
