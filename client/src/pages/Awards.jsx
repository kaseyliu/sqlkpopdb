import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const Awards = () => {
    const [awards, setAwards] = useState([]);
    const [filteredAwards, setFilteredAwards] = useState([]);
    const [filter, setFilter] = useState('AWARD_NAME');
    const URL = "http://localhost:8800"
    
    // getting all artist
    useEffect(()=>{
        const fetchAllTours = async ()=> {
            try {
                const res = await axios.get(URL + "/awards");
                console.log(res.data);
                setAwards(res.data);
                setFilteredAwards(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllTours();
    }, []);


    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredAwards(awards);
          return;
        }
      
        const filterBySearch = awards.filter((item) => {
          const searchValue = searchVal.toLowerCase();
      
          // Check if the filter property exists in the artist object
          if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
          }
      
          return false;
        });
      
        setFilteredAwards(filterBySearch);
      };

    return (
        <div className='company'>
            <Heading size='4xl' color='teal'>Awards</Heading>
            <br/>
            <Button>Add new award</Button>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='AWARD_NAME'>Award Name</Radio>
                    <Radio value='G_NAME'>Winner Name</Radio>
                    <Radio value='EVENT_NAME'>Event Name</Radio>
                    <Radio value='ARTIST'>Artist</Radio>
                    <Radio value='WIN_YEAR'>Year</Radio>
                </Stack>
            </RadioGroup>
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredAwards.map(award=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading size='md'> {award.AWARD_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Artist: {award.G_NAME}
                            <br/>
                            Event Name: {award.EVENT_NAME}
                            <br/>
                            Year: {award.WIN_YEAR}
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Awards;