import React, { useState } from "react";
import { data } from "./utils/data";

const Search = ({ handleSelect }) => {
    const [searchItem, setSearchItem] = useState(""); //selected
    const [filteredSkills, setFilteredSkills] = useState([]);

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchItem(value);

        if (value && value.length > 0) {
            const filter = data.skills.filter((skill) =>
                skill.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredSkills(filter);
        } else {
            setFilteredSkills([]);
        }
    };

    const handleClick = (skill) => {
        handleSelect(skill);
        setSearchItem("");
        setFilteredSkills([]);
    };

    return (
        <div>
            <input
                className="w-80 h-10 p-2 outline-none border border-gray-400 rounded-md"
                type="text"
                value={searchItem}
                placeholder="Add Skills"
                onChange={handleSearch}
                autoFocus
            />
            {filteredSkills.length > 0 && (
                <ul className="w-80 mt-2 bg-slate-200 rounded-md border">
                    {filteredSkills.map((skill, index) => (
                        <li
                            key={index}
                            className="py-0.5  cursor-pointer"
                            onClick={() => handleClick(skill)}
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
