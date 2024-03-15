import React from "react"
import { Grid, Heading, Divider, SimpleGrid, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navBar'>
            <Grid bg='purple.50' templateColumns='repeat(9, 1fr)' gap={6}>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/">Home</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/companies">Companies</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/groups">Groups</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/artists">Artists</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/songs">Songs</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/albums">Albums</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/tours">Tours</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/concerts">Concerts</RouterLink>
                </Button>
                <Button colorScheme='teal' variant='ghost'>
                    <RouterLink to="/awards">Awards</RouterLink>
                </Button>
            </Grid>
            <Divider orientation='horizontal' />
        </div>
    )
}

export default Navbar