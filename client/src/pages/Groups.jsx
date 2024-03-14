import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'
import AddGroup from "../components/AddGroup"

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [filter, setFilter] = useState('G_NAME');

    const URL = "http://localhost:8800"
    
    useEffect(()=>{
        const fetchAllBooks = async ()=> {
            try {
                const res = await axios.get(URL + "/kgroups");
                console.log(res.data);
                setGroups(res.data);
                setFilteredGroups(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []);

    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
        setFilteredGroups(groups);
        return;
        }
    
        const filterBySearch = groups.filter((item) => {
        const searchValue = searchVal.toLowerCase();
    
        // Check if the filter property exists in the artist object
        if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
        }
    
        return false;
        });
    
        setFilteredGroups(filterBySearch);
    };

    return (
        <div className='company'>
            <Heading size='4xl' color='teal'>Groups</Heading>
            <br/>
            <AddGroup/>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='G_NAME'>Group Name</Radio>
                    <Radio value='G_COMPANY'>Company Name</Radio>
                    <Radio value='G_GEN'>Generation</Radio>
                    <Radio value='G_DEBUT'>Debut Date</Radio>
                </Stack>
            </RadioGroup>
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredGroups.map(group=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading size='md'> {group.G_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Generation: {group.G_GEN}
                            <br/>
                            Company: {group.G_COMPANY}
                            <br/>
                            Debut Date: {group.G_DEBUT}        
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Groups;