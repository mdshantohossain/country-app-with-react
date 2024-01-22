import {useState, useEffect} from "react";

import Countries from "./components/Countries";
import Search from "./components/Search";
import './App.css'


const url = 'https://restcountries.com/v3.1/all';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [countries, setCountries] = useState([]);

    const fetchData = async (url) => {
        setIsLoading(true);

        try{
            const response = await fetch(url);
            const data = await response.json();
            setCountries(data);
            setIsLoading(false);
            setError(null);

            console.log(countries);
        }catch (error){
            setIsLoading(false)
            setError(error.message);
        }
    }

    useEffect(()=> {
        fetchData(url);
    }, []);

    const handleRemoveCountry = (name) => {
        const filterCountry= countries.filter((country) =>
            country.name.common !== name);

        setCountries(filterCountry);
    }

    const handleSearch = (value) => {
        let lowerValue = value.toLowerCase();

        const searchCountry = countries.filter((country) =>{
           let name =  country.name.common.toLowerCase();
           return name.startsWith(lowerValue);
        });

        setCountries(searchCountry);
    }

    return (
        <div>
            <h1>Country App</h1>
            <Search onSearch={handleSearch} />
            {isLoading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {countries && <Countries countries={countries} onRemoveCountry={handleRemoveCountry} />}
        </div>
    );
}

export default App;
