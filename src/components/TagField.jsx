import React, { useState } from "react";

const TagField = ({ tags, addTag, removeTag, maxTags }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && input.trim() !== "" && tags.length < maxTags) {
      event.preventDefault();
      addTag(input);
      setInput("");
    }
  };

  return (
    <div>
      <input
        className="tag-input"
        type="text"
        placeholder={tags.length < maxTags ? "Add a tag" : "Tag limit reached"}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        disabled={tags.length >= maxTags}
      />
      <div>
        {tags.map((tag, index) => (
          <span className="tag-span" key={index}>
            {tag}
            <button className="tag-button " onClick={() => removeTag(tag)}>
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagField;
