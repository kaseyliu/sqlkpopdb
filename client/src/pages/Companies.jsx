import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Heading, SimpleGrid, Button } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
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

  const handleSearch = (searchVal) => {
    if (searchVal === '') {
      setFilteredCompanies(companies);
      return;
    }

    const filterBySearch = companies.filter((item) => {
      const companyName = item.COMPANY_NAME.toLowerCase();
      const searchValue = searchVal.toLowerCase();
      return companyName.includes(searchValue);
    });

    setFilteredCompanies(filterBySearch);
  };

  return (
    <div className="company">
      <Heading size="4xl">Companies</Heading>
      <br />
      <Button>Add new company</Button>
      <br />
      <br />
      <SearchBar onSearch={handleSearch} />
      <br />
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
        {filteredCompanies.map((company) => (
          <Card key={company.id} variant="outline">
            <CardHeader>
              <Heading>{company.COMPANY_NAME}</Heading>
            </CardHeader>
            <CardBody>
              Started in: {company.START_YEAR} <br />
              CEO: {company.CEO_LNAME} {company.CEO_FNAME}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Companies;