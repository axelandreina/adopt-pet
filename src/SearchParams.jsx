import { useState } from "react";

const SearchParams = () => {
    const [location, setLocation] = useState("")

    /* This is what is happening with the line above:
        const locationHook = useState("")
        const location = locationHook[0];
        const setLocation = locationHook[1];
    */

    return (
        <div className="search-params">
            <form action="">
                <label htmlFor="location">
                    Location
                    <input onChange={e => setLocation(e.target.value)} placeholder="Location" value={location} id="location" />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams;