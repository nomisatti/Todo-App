import React from "react"
import { render } from "react-dom"
import { Router, Link } from "@reach/router"
import { Button, Container, Flex, Heading, NavLink } from 'theme-ui';
import Dashboard from '../components/Dashboard'
import netlifyIdentity from 'netlify-identity-widget'
import { IdentityContext } from '../../identity-Context'

let Dash = props => {
    return (
        <Dashboard />
    )
}


export default app => {
    const { user } = React.useContext(IdentityContext)
    if (!user) {
        return (
            <Router path="/" >
            
            </Router>

        )
    }
   return (

        <Router>
            <Dash path="/app">
            </Dash>
        </Router>

    )

}
