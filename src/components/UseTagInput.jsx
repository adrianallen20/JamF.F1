import { useState } from "react";

const useTagInput = (maxTags = 10) => {
  const [tags, setTags] = useState([]);

  const handleAddTag = (newTag) => {
    if (newTag && !tags.includes(newTag) && tags.length < maxTags) {
      setTags((prevTags) => [...prevTags, newTag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return { tags, handleAddTag, handleRemoveTag };
};

export default useTagInput;
