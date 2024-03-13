import React, { useEffect, useState } from "react"
import axios from "axios"

const Companies = () => {
    const [companies, setCompanies] = useState([])
    const URL = "http://localhost:8800"
    
    useEffect(()=>{
        const fetchAllBooks = async ()=> {
            try {
                const res = await axios.get(URL + "/companies")
                console.log(res)
            } catch(err){
                console.log(err)
            }
        }
        fetchAllBooks();
    }, [])

    return (
        <div>Companies</div>
    )
}

export default Companies