import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [filter, setFilter] = useState('ALBUM_NAME');
    const URL = "http://localhost:8800"
    
    // getting all artist
    useEffect(()=>{
        const fetchAllAlbums = async ()=> {
            try {
                const res = await axios.get(URL + "/albums");
                console.log(res.data);
                setAlbums(res.data);
                setFilteredAlbums(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllAlbums();
    }, []);


    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredAlbums(albums);
          return;
        }
      
        const filterBySearch = albums.filter((item) => {
          const searchValue = searchVal.toLowerCase();
      
          // Check if the filter property exists in the artist object
          if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
          }
      
          return false;
        });
      
        setFilteredAlbums(filterBySearch);
      };

    return (
        <div className='company'>
            <Heading size='4xl' color='teal'>Albums</Heading>
            <br/>
            <Button>Add new album</Button>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='ALBUM_NAME'>Album Name</Radio>
                    <Radio value='CONCEPT'>Concept</Radio>
                    <Radio value='ARTIST'>Artist</Radio>
                    <Radio value='RELEASE_DATE'>Release Date</Radio>
                </Stack>
            </RadioGroup>
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredAlbums.map(album=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading size='md'> {album.ALBUM_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Artist: {album.ARTIST}
                            <br/>
                            Concept: {album.CONCEPT}
                            <br/>
                            Release Date: {album.RELEASE_DATE}        
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Albums;