import React from "react"
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { Image } from '@chakra-ui/react'

const Home = () => {
    return (
        <div>
            <Heading size='4xl' color='teal'>Kpop Database</Heading>
            <Image
                objectFit='cover'
                src='https://www.udiscovermusic.com/wp-content/uploads/2022/12/LE-SSERAFIM-%E2%80%93-FEARLESS.jpg'
                alt='Dan Abramov'
            />
        </div>
    )
}

export default Home