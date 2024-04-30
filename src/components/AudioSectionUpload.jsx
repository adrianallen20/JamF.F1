import React from "react";

const AudioSectionUpload = ({
  trackOneFile,
  handleTrackOneFileChange,
  handleMp3Upload,
  trackOneLabel,
  setTrackOneLabel,
  updateTrackOneLabel,
  trackTwoFile,
  handleTrackTwoFileChange,
  trackTwoLabel,
  setTrackTwoLabel,
  updateTrackTwoLabel,
  trackThreeFile,
  handleTrackThreeFileChange,
  trackThreeLabel,
  setTrackThreeLabel,
  updateTrackThreeLabel,
}) => {
  return (
    <div>
      <p>Add your music here!</p>
      <input
        type="file"
        className="music-upload"
        onChange={handleTrackOneFileChange}
      />
      <div>
        <button
          className="music-submit"
          onClick={() => handleMp3Upload("trackOne", trackOneFile)}
        >
          Upload Track 1
        </button>
        <input
          className="TrackOneLabelButton"
          type="text"
          value={trackOneLabel}
          onChange={(e) => setTrackOneLabel(e.target.value)}
        />
        <button className="TrackOneLabelsubmit" onClick={updateTrackOneLabel}>
          Name Track One
        </button>
      </div>
      <input
        type="file"
        className="music-upload"
        onChange={handleTrackTwoFileChange}
      />
      <div>
        <button
          className="music-submit"
          onClick={() => handleMp3Upload("trackTwo", trackTwoFile)}
        >
          Upload Track 2
        </button>
        <input
          className="TrackOneLabelButton"
          type="text"
          value={trackTwoLabel}
          onChange={(e) => setTrackTwoLabel(e.target.value)}
        />
        <button className="TrackOneLabelsubmit" onClick={updateTrackTwoLabel}>
          Name Track Two
        </button>
      </div>
      <input
        type="file"
        className="music-upload"
        onChange={handleTrackThreeFileChange}
      />
      <div>
        <button
          className="music-submit"
          onClick={() => handleMp3Upload("trackThree", trackThreeFile)}
        >
          Upload Track 3
        </button>
        <input
          className="TrackOneLabelButton"
          type="text"
          value={trackThreeLabel}
          onChange={(e) => setTrackThreeLabel(e.target.value)}
        />
        <button className="TrackOneLabelsubmit" onClick={updateTrackThreeLabel}>
          Name Track Three
        </button>
      </div>
    </div>
  );
};

export default AudioSectionUpload;
