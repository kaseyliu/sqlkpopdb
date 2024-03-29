import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [filter, setFilter] = useState('A_STAGENAME');
    const URL = "http://localhost:8800"
    
    // getting all artist
    useEffect(()=>{
        const fetchAllArtists = async ()=> {
            try {
                const res = await axios.get(URL + "/artists");
                console.log(res.data);
                setArtists(res.data);
                setFilteredArtists(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllArtists();
    }, []);

    // select filter
    // const selectFilter = () => {
    //     const [value, setValue] = useState('');
    //   }

    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredArtists(artists);
          return;
        }
      
        const filterBySearch = artists.filter((item) => {
          const searchValue = searchVal.toLowerCase();
      
          // Check if the filter property exists in the artist object
          if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
          }
      
          return false;
        });
      
        setFilteredArtists(filterBySearch);
      };

    return (
        <div className='company'>
            <Heading size='4xl' color='teal'>Artists</Heading>
            <br/>
            <Button>Add new artist</Button>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='A_STAGENAME'>Stage Name</Radio>
                    <Radio value='A_LNAME'>Last Name</Radio>
                    <Radio value='A_FNAME'>First Name</Radio>
                    <Radio value='G_NAME'>Group Name</Radio>
                    <Radio value='G_DEBUT'>Debut Year</Radio>
                </Stack>
            </RadioGroup>
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredArtists.map(artist=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading size='md'> {artist.A_STAGENAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Full Name: {artist.A_LNAME} {artist.A_FNAME} 
                            <br/>
                            Group: {artist.G_NAME}
                            <br/>
                            Birth Year: {artist.A_BIRTHYEAR}
                            <br/>
                            Debut Date: {artist.G_DEBUT}        
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Artists;