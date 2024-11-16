import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import './Home.css';

const Home = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Function to toggle mute/unmute audio
  const handleMute = () => {
    if (webcamRef.current?.stream) {
      const audioTrack = webcamRef.current.stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  // Function to toggle video on/off
  const handleVideoToggle = () => {
    if (webcamRef.current?.stream) {
      const videoTrack = webcamRef.current.stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  // Navigate to the meeting page
  const handleJoinMeeting = () => {
    navigate('/meeting');
  };

  return (
    <div className="home-container">
      <h2>Sasta Zoom</h2>
      <Webcam
        ref={webcamRef}
        audio={true}
        videoConstraints={{
          width: 320,
          height: 240,
          facingMode: 'user',
        }}
        className="webcam"
      />

      <div className="button-container">
        <button onClick={handleJoinMeeting} className="button join-meeting">
          Join Meeting
        </button>
        <button onClick={handleMute} className="button mute-unmute">
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={handleVideoToggle} className="button video-toggle">
          {isVideoOn ? 'Video Off' : 'Video On'}
        </button>
        <button className="button more-options">More</button>
        <button className="button show-members">Show Members</button>
      </div>
    </div>
  );
};

export default Home;
