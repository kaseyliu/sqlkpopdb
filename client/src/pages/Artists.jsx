import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'
import SearchBar from "../components/SearchBar"

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [filter, setFilter] = useState('');
    const URL = "http://localhost:8800"
    
    // getting all artist
    useEffect(()=>{
        const fetchAllBooks = async ()=> {
            try {
                const res = await axios.get(URL + "/artists");
                console.log(res.data);
                setArtists(res.data);
                setFilteredArtists(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []);

    // select filter
    function RadioExample() {
        const [value, setValue] = React.useState('1')
        return (
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row'>
              <Radio value='1'>First</Radio>
              <Radio value='2'>Second</Radio>
              <Radio value='3'>Third</Radio>
            </Stack>
          </RadioGroup>
        )
      }

    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredArtists(artists);
          return;
        }
    
        const filterBySearch = artists.filter((item) => {
          const groupName = item.A_STAGENAME.toLowerCase();
          const searchValue = searchVal.toLowerCase();
          return groupName.includes(searchValue);
        });
    
        setFilteredArtists(filterBySearch);
      };

    return (
        <div className='company'>
            <Heading size='4xl'>Artists</Heading>
            <br/>
            <Button>Add new artist</Button>
            <br />
            <br />
            <SearchBar onSearch={handleSearch} />
            <br />
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {filteredArtists.map(artist=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading> {artist.A_STAGENAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Full Name: {artist.A_LNAME} {artist.A_FNAME} 
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