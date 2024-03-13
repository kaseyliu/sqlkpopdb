import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'

const Groups = () => {
    const [groups, setGroups] = useState([])
    const URL = "http://localhost:8800"
    
    useEffect(()=>{
        const fetchAllBooks = async ()=> {
            try {
                const res = await axios.get(URL + "/kgroups");
                console.log(res.data);
                setGroups(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []);

    return (
        <div className='company'>
            <Heading size='4xl'>Groups</Heading>
            <br/>
            <Button>Add new group</Button>
            <br/>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {groups.map(group=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading> {group.G_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Generation: {group.G_GEN}
                            <br/>
                            Company: {group.G_COMPANY}
                            <br/>
                            Debut Year: {group.G_DEBUT}        
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Groups;