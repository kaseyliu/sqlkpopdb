import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Heading, SimpleGrid, Button } from '@chakra-ui/react'

const Companies = () => {
    const [companies, setCompanies] = useState([])
    const URL = "http://localhost:8800"
    
    useEffect(()=>{
        const fetchAllBooks = async ()=> {
            try {
                const res = await axios.get(URL + "/companies");
                console.log(res.data);
                setCompanies(res.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []);

    return (
        <div className='company'>
            <Heading size='4xl'>Companies</Heading>
            <br/>
            <Button>Add new company</Button>
            <br/>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {companies.map(company=>(
                    <Card variant='outline'>
                        <CardHeader>
                            <Heading> {company.COMPANY_NAME}</Heading>
                        </CardHeader>
                        <CardBody>
                            Started in: {company.START_YEAR}
                            <br/>
                            CEO: {company.CEO_LNAME} {company.CEO_FNAME}
                        
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Companies