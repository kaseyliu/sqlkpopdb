import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const Songs = () => {
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [filter, setFilter] = useState('SONG_NAME');
    const URL = "http://localhost:8800"
    
    // getting all artist
    useEffect(()=>{
        const fetchAllSongs = async ()=> {
            try {
                const res = await axios.get(URL + "/songs");
                console.log(res.data);
                setSongs(res.data);
                setFilteredSongs(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllSongs();
    }, []);


    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredSongs(songs);
          return;
        }
      
        const filterBySearch = songs.filter((item) => {
          const searchValue = searchVal.toLowerCase();
      
          // Check if the filter property exists in the artist object
          if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
          }
      
          return false;
        });
      
        setFilteredSongs(filterBySearch);
      };

    return (
        <div className='company'>
            <Heading size='4xl' color='teal'>Songs</Heading>
            <br/>
            <Button>Add new song</Button>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='SONG_NAME'>Song Name</Radio>
                    <Radio value='ALBUM_NAME'>Album Name</Radio>
                    <Radio value='CONCEPT'>Concept</Radio>
                    <Radio value='ARTIST'>Artist</Radio>
                    <Radio value='RELEASE_DATE'>Release Date</Radio>
                </Stack>
            </RadioGroup>
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredSongs.map(song=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading size='md'> {song.SONG_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Album: {song.ALBUM_NAME}
                            <br/>
                            Artist: {song.ARTIST}
                            <br/>
                            Concept: {song.CONCEPT}
                            <br/>
                            Release Date: {song.RELEASE_DATE}        
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Songs;