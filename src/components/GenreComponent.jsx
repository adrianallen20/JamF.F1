import React from "react";

const GenreComponent = ({
  selectedGenre,
  genrecheckboxHandler,
  genreToFirebase,
}) => {
  return (
    <div className="genres">
      <p>Genres</p>
      <label className="container">
        {" "}
        Pop
        <input
          type="checkbox"
          name="Pop"
          checked={selectedGenre["Pop"]}
          onChange={() => genrecheckboxHandler("Pop")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Rock
        <input
          type="checkbox"
          name="Rock "
          checked={selectedGenre["Rock"]}
          onChange={() => genrecheckboxHandler("Rock")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        Hip-Hop
        <input
          type="checkbox"
          name="HipHop"
          checked={selectedGenre["HipHop"]}
          onChange={() => genrecheckboxHandler("HipHop")}
        />
        <span className="checkmark"></span>
      </label>
      <label className="container">
        EDM
        <input
          type="checkbox"
          name="EDM "
          checked={selectedGenre["EDM "]}
          onChange={() => genrecheckboxHandler("EDM ")}
        />
        <span className="checkmark"></span>
      </label>
      <button
        className="genre-check-button"
        onClick={genreToFirebase}
        id="submit"
      >
        Add Genre{" "}
      </button>
    </div>
  );
};

export default GenreComponent;
