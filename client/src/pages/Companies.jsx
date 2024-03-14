import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Heading, SimpleGrid, Button } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import { Stack, Radio, RadioGroup } from '@chakra-ui/react'

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filter, setFilter] = useState('COMPANY_NAME');
  const URL = 'http://localhost:8800';

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(URL + '/companies');
        console.log(res.data);
        setCompanies(res.data);
        setFilteredCompanies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

    // search bar
    const handleSearch = (searchVal) => {
        if (searchVal === '') {
          setFilteredCompanies(companies);
          return;
        }
      
        const filterBySearch = companies.filter((item) => {
          const searchValue = searchVal.toLowerCase();
      
          // Check if the filter property exists in the artist object
          if (item[filter]) {
            const itemValue = item[filter].toString().toLowerCase();
            return itemValue.includes(searchValue);
          }
      
          return false;
        });
      
        setFilteredCompanies(filterBySearch);
      };

  return (
    <div className="company">
      <Heading size="4xl" color='teal'>Companies</Heading>
      <br />
      <Button>Add new company</Button>
      <br />
      <br />
      <SearchBar onSearch={handleSearch} />
      <RadioGroup onChange={setFilter} value={filter} isExclusive>
                <Stack direction='row'>
                    <Radio value='COMPANY_NAME'>Company Name</Radio>
                    <Radio value='FOUNDER_FNAME'>Founder First Name</Radio>
                    <Radio value='FOUNDER_LNAME'>Founder Last Name</Radio>
                    <Radio value='START_YEAR'>Start Year</Radio>
                </Stack>
    </RadioGroup>
      <br />
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
        {filteredCompanies.map((company) => (
          <Card key={company.id} variant="outline">
            <CardHeader>
              <Heading size='md'>{company.COMPANY_NAME}</Heading>
            </CardHeader>
            <CardBody>
              Started in: {company.START_YEAR} <br />
              CEO: {company.FOUNDER_LNAME} {company.FOUNDER_FNAME}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Companies;