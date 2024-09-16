import React, { useState } from "react";
import Search from "./Search";

const SkillsSearch = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleSelect = (skill) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills((prev) => [...prev, skill]);
        }
    };

    return (
        <div>
            <div>
                <strong>Skills</strong>
                <div className="w-80 p-4 flex gap-2 flex-wrap">
                    {selectedSkills?.map((skill, index) => (
                        <div key={index} className="w-min p-0.5 border rounded-md">{skill}</div>
                    ))}
                </div>
            </div>
            <Search handleSelect={handleSelect} />
        </div>
    );
};

export default SkillsSearch;
