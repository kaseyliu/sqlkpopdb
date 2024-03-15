import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const Tours = () => {
    const [tours, setTours] = useState([]);
    const [filteredTours, setFilteredTours] = useState([]);
    const [filter, setFilter] = useState('TOUR_NAME');
    const URL = "http://localhost:8800"
    
    // getting all artist
    useEffect(()=>{
        const fetchAllTours = async ()=> {
            try {
                const res = await axios.get(URL + "/tours");
                console.log(res.data);
                setTours(res.data);
                setFilteredTours(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllTours();
    }, []);


    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredTours(tours);
          return;
        }
      
        const filterBySearch = tours.filter((item) => {
          const searchValue = searchVal.toLowerCase();
      
          // Check if the filter property exists in the artist object
          if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
          }
      
          return false;
        });
      
        setFilteredTours(filterBySearch);
      };

    return (
        <div className='company'>
            <Heading size='4xl' color='teal'>Tours</Heading>
            <br/>
            <Button>Add new tour</Button>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='TOUR_NAME'>Tour Name</Radio>
                    <Radio value='ALBUM_NAME'>Album Name</Radio>
                    <Radio value='CONCEPT'>Concept</Radio>
                    <Radio value='ARTIST'>Artist</Radio>
                    <Radio value='PERFORM_DATE'>Perform Date</Radio>
                </Stack>
            </RadioGroup>
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredTours.map(tour=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading size='md'> {tour.TOUR_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Album: {tour.ALBUM_NAME}
                            <br/>
                            Artist: {tour.ARTIST}
                            <br/>
                            Concept: {tour.CONCEPT}
                            <br/>
                            Perform Date: {tour.PERFORM_DATE}        
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Tours;