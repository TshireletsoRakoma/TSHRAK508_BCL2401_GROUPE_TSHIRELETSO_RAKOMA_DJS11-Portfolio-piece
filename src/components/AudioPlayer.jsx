import { useRef, useEffect, useState } from 'react';

const AudioPlayer = ({ src, isPlaying, onPlay, onPause }) => {
  const audioRef = useRef(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Track currently playing audio source

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedData = () => {
      console.log('Audio loaded');
      if (isPlaying && currentlyPlaying === src) {
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error);
        });
      }
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
    };

    audioElement.addEventListener('loadeddata', handleLoadedData);
    audioElement.addEventListener('error', handleError);

    return () => {
      audioElement.removeEventListener('loadeddata', handleLoadedData);
      audioElement.removeEventListener('error', handleError);
    };
  }, [src, isPlaying, currentlyPlaying]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isPlaying && currentlyPlaying === src) {
      if (audioElement.paused) {
        audioElement.play().catch((error) => {
          console.error('Play interrupted:', error);
        });
      }
    } else {
      if (!audioElement.paused) {
        audioElement.pause();
      }
    }
  }, [isPlaying, currentlyPlaying, src]);

  const handlePlayClick = () => {
    if (currentlyPlaying === null) {
      setCurrentlyPlaying(src);
      onPlay();
    }
  };

  const handlePauseClick = () => {
    if (currentlyPlaying === src) {
      setCurrentlyPlaying(null);
      onPause();
    }
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} />
      {currentlyPlaying === src && isPlaying ? (
        <button onClick={handlePauseClick}>Pause</button>
      ) : (
        <button onClick={handlePlayClick}>Play</button>
      )}
    </div>
  );
};

export default AudioPlayer;
