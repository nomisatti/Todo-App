import React, { useEffect, useState, useContext } from 'react'
import { Button, Container, Flex, Heading, NavLink } from 'theme-ui';
import { Link } from 'gatsby'
import netlifyIdentity from 'netlify-identity-widget'
import { Router} from "@reach/router"

import { IdentityContext } from '../../identity-Context'

let Signin = props => {
    const { user, identity: netlifyIdentity } = useContext(IdentityContext)

    return (
        <Container>
            <Flex as='nav'>
                <NavLink as={Link} to='/' p={2}>
                    Home
        </NavLink>
                <NavLink as={Link} to="/app" p={2}>
                    Dashboard
        </NavLink>
                <NavLink p={2}>
                    {user ? ('Welcome ' + user.user_metadata.full_name) : ''}
                </NavLink>

            </Flex>
            <Flex sx={{ flexDirection: "column", padding: 3 }}>
                <Heading as='h1'> Helo World ! Todo App</Heading>
                <Button sx={{ marginTop: 2, color: 'black' }}
                    onClick={() => { netlifyIdentity.logout() }}
                > logout </Button>
            </Flex>

        </Container>
    )

}

let SignOut = props => {
    const { identity: netlifyIdentity } = useContext(IdentityContext)

    return (
        <Container>
            <Flex as='nav'>
                <NavLink as={Link} to='/' p={2}>
                    Home
            </NavLink>

            </Flex>
            <Flex sx={{ flexDirection: "column", padding: 3 }}>
                <Heading as='h1'> Helo World ! Todo App</Heading>
                <Button sx={{ marginTop: 2, color: 'black' }}
                    onClick={() => { netlifyIdentity.open() }}
                > Login </Button>
            </Flex>

        </Container>
    )
}

export default () => {

    const { user } = React.useContext(IdentityContext)

    if (!user) {
        return (
            <Router>
                <SignOut path="/" />
            </Router>

        )
    }
    return (
        <Router>
            <Signin path="/">
            </Signin>
        </Router>
    )
}
