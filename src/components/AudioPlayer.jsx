import { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ src, isPlaying, onPlay, onPause }) => {
  const audioRef = useRef(null); // Reference to the <audio> element
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // State to track currently playing audio source

  useEffect(() => {
    const audioElement = audioRef.current; // Reference to the <audio> DOM element

    const handleLoadedData = () => {
      console.log('Audio loaded');
      // Play the audio if it's currently playing and matches the current source
      if (isPlaying && currentlyPlaying === src) {
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error); // Handle play interruption errors
        });
      }
    };

    const handleError = (e) => {
      console.error('Audio error:', e); // Handle audio loading error
    };

    // Add event listeners for audio element events
    audioElement.addEventListener('loadeddata', handleLoadedData); // Event when audio data is loaded
    audioElement.addEventListener('error', handleError); // Event when there's an error loading the audio

    // Clean up event listeners when component unmounts or dependencies change
    return () => {
      audioElement.removeEventListener('loadeddata', handleLoadedData); // Remove loadeddata event listener
      audioElement.removeEventListener('error', handleError); // Remove error event listener
    };
  }, [src, isPlaying, currentlyPlaying]); // Dependency array for useEffect dependencies

  useEffect(() => {
    const audioElement = audioRef.current; // Reference to the <audio> DOM element

    // Handle play/pause logic based on isPlaying and currentlyPlaying states
    if (isPlaying && currentlyPlaying === src) {
      if (audioElement.paused) {
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error); // Handle play interruption errors
        });
      }
    } else {
      if (!audioElement.paused) {
        audioElement.pause(); // Pause the audio if it's not playing
      }
    }
  }, [isPlaying, currentlyPlaying, src]); // Dependency array for useEffect dependencies

  // Handle play button click event
  const handlePlayClick = () => {
    if (currentlyPlaying === null) {
      setCurrentlyPlaying(src); // Set currentlyPlaying state to src (audio source)
      onPlay(); // Call onPlay callback
    }
  };

  // Handle pause button click event
  const handlePauseClick = () => {
    if (currentlyPlaying === src) {
      setCurrentlyPlaying(null); // Reset currentlyPlaying state to null
      onPause(); // Call onPause callback
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} /> {/* Audio element with ref and src attributes */}
      {currentlyPlaying === src && isPlaying ? ( // Conditional rendering based on currentlyPlaying and isPlaying states
        <button onClick={handlePauseClick}>Pause</button> // Render Pause button if currentlyPlaying matches src and isPlaying is true
      ) : (
        <button onClick={handlePlayClick}>Play</button> // Render Play button otherwise
      )}
    </div>
  );
};

export default AudioPlayer; // Export AudioPlayer component
