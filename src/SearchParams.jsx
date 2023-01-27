import { useState, useEffect } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "reptile", "rabbit"]

const SearchParams = () => {
    const [pets, setPets] = useState([]);
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [breeds] = useBreedList(animal);

    useEffect(() => {
        //  Function to requests pets
        requestPets();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
        const json = await res.json();

        setPets(json.pets)
    }

    /* This is what is happening with the line above:
        const locationHook = useState("")
        const location = locationHook[0];
        const setLocation = locationHook[1];
    */

    return (
        <div className="search-params">
            <form onSubmit={e => { e.preventDefault(); requestPets() }}>
                <label htmlFor="location">
                    Location
                    <input onChange={e => setLocation(e.target.value)} placeholder="Location" value={location} id="location" />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select id="animal" value={animal} onChange={e => {
                        setAnimal(e.target.value);
                        setBreed("");
                    }} onBlur={(e) => {
                        setAnimal(e.target.value);
                        setBreed("");
                    }}>
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>{animal}</option>
                        )
                        )}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select disabled={!breeds.length} id="breed" value={breed} onChange={e => {
                        setBreed(e.target.value);
                    }} onBlur={(e) => setBreed(e.target.value)}>
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>{breed}</option>
                        )
                        )}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams;