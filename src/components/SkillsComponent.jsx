import React from "react";

const SkillsComponent = ({
  selectedSkills,
  checkboxHandler,
  skillsToFirebase,
}) => {
  return (
    <div className="skills">
      <p>Skills</p>
      <label className="container">
        {" "}
        Guitar
        <input
          type="checkbox"
          name="Guitar"
          checked={selectedSkills["Guitar"]}
          onChange={() => checkboxHandler("Guitar")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Bass Guitar
        <input
          type="checkbox"
          name="BassGuitar"
          checked={selectedSkills["BassGuitar"]}
          onChange={() => checkboxHandler("BassGuitar")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Piano
        <input
          type="checkbox"
          name="Piano"
          checked={selectedSkills["Piano"]}
          onChange={() => checkboxHandler("Piano")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Drums
        <input
          type="checkbox"
          name="Drums"
          checked={selectedSkills["Drums"]}
          onChange={() => checkboxHandler("Drums")}
        />
        <span className="checkmark"></span>
      </label>
      <button
        className="skill-check-button"
        onClick={skillsToFirebase}
        id="submit"
      >
        Add Skill{" "}
      </button>
    </div>
  );
};

export default SkillsComponent;
