import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const Concerts = () => {
    const [concerts, setConcerts] = useState([]);
    const [filteredConcerts, setFilteredConcerts] = useState([]);
    const [filter, setFilter] = useState('TOUR_NAME');
    const URL = "http://localhost:8800"
    
    // getting all artist
    useEffect(()=>{
        const fetchAllConcerts = async ()=> {
            try {
                const res = await axios.get(URL + "/concerts");
                console.log(res.data);
                setConcerts(res.data);
                setFilteredConcerts(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllConcerts();
    }, []);


    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredConcerts(concerts);
          return;
        }
      
        const filterBySearch = concerts.filter((item) => {
          const searchValue = searchVal.toLowerCase();
      
          // Check if the filter property exists in the artist object
          if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
          }
      
          return false;
        });
      
        setFilteredConcerts(filterBySearch);
      };

    return (
        <div className='company'>
            <Heading size='4xl' color='teal'>Concerts</Heading>
            <br/>
            <Button>Add new concert</Button>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='TOUR_NAME'>Tour Name</Radio>
                    <Radio value='G_NAME'>Artist</Radio>
                    <Radio value='CITY'>City</Radio>
                    <Radio value='COUNTRY'>Country</Radio>
                    <Radio value='VENUE'>Venue</Radio>
                    <Radio value='PERFORM_DATE'>Perform Date</Radio>
                </Stack>
            </RadioGroup>
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredConcerts.map(concert=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading size='md'> {concert.TOUR_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Location: {concert.CITY} {concert.COUNTRY}
                            <br/>
                            Venue: {concert.VENUE}
                            <br/>
                            Artist: {concert.G_NAME}
                            <br/>
                            Perform Date: {concert.PERFORM_DATE}   
                            <br/>
                            Capacity: {concert.CAP_TICKETS}    
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Concerts;