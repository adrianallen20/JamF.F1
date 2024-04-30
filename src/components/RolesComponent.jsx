import React from "react";

const RolesComponent = ({
  selectedRoles,
  rolecheckboxHandler,
  rolesToFirebase,
}) => {
  return (
    <div className="roles">
      <p>Roles</p>

      <label className="container">
        {" "}
        Singer
        <input
          type="checkbox"
          name="Singer"
          checked={selectedRoles["Singer"]}
          onChange={() => rolecheckboxHandler("Singer")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Rapper
        <input
          type="checkbox"
          name="Rapper"
          checked={selectedRoles["Rapper"]}
          onChange={() => rolecheckboxHandler("Rapper")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Producer
        <input
          type="checkbox"
          name="Producer"
          checked={selectedRoles["Producer"]}
          onChange={() => rolecheckboxHandler("Producer")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Instrumentalist
        <input
          type="checkbox"
          name="Instrumentalist"
          checked={selectedRoles["Instrumentalist"]}
          onChange={() => rolecheckboxHandler("Instrumentalist")}
        />
        <span className="checkmark"></span>
      </label>
      <button
        className="role-check-button"
        id="submit"
        onClick={rolesToFirebase}
      >
        Add Role{" "}
      </button>
    </div>
  );
};

export default RolesComponent;
