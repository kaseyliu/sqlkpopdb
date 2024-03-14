import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { format } from "date-fns";
import { Input } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react'

const AddGroup = () => {
    const [group, setGroup] = useState({
        name: "",
        generation: null,
        company: "",
        debut: new Date()
    })
    const [companies, setCompanies] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const URL = "http://localhost:8800"

    //get companies from database for the dropdown
    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const res = await axios.get(URL + "/companies");
          setCompanies(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchCompanies();
    }, []);

    const handleChange = (e) => {
      if (e.target.name == 'generation'){
        setGroup((prev)=>({...prev, [e.target.name]: parseInt(e.target.value)}))
      }
      else if(e.target.name == 'date') {
        setGroup((prev)=>({...prev, [e.target.name]: format(e.target.value, "MMMM do, yyyy H:mma")}))
      }
      else {
        setGroup((prev)=>({...prev, [e.target.name]: e.target.value}))
      }
    }
    console.log(group)
    
    //post request to sql database
    const handleClick = async e => {
      e.preventDefault()
      try {
        await axios.post(URL + '/groups', group)
        onClose()
      }catch(err) {
        console.log(err)
      }
    }

    return (
        <>
        <Button onClick={onOpen}>Add new group</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new group</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Group Name:
                <Input 
                  placeholder='Group name...' 
                  name="name"
                  onChange={handleChange}
                />
                Generation:
                <Input 
                  placeholder='Generation...' 
                  name="generation"
                  onChange={handleChange}
                />
                {/* since company needs to be an existing company, we use dropdown instead of free input */}
                Company: 
                <Select
                  placeholder="Select company..."
                  name="company"
                  onChange={(e) => handleChange({ target: { name: "company", value: e.target.value } })}
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.COMPANY_NAME}>
                      {company.COMPANY_NAME}
                    </option>
                  ))}
                </Select>
                Debut Date:
                <Input
                    placeholder="Debut Date"
                    size="md"
                    type="date"
                    name="debut"
                    onChange={handleChange}
                />
            </ModalBody>
  
            <ModalFooter>
                <Button colorScheme='blue' onClick={handleClick}>Add</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default AddGroup