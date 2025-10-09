import React, { useEffect, useRef, useState } from 'react';

import sparksVideo from '@/assets/videos/sparks_3.mp4';

const FireCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Video playback speed */
    video.playbackRate = 1;

    const drawFrame = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };

    const handleLoaded = () => {
      video.play();
      drawFrame();
    };

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    video.addEventListener('loadeddata', handleLoaded);
    window.addEventListener('resize', handleResize);

    return () => {
      video.removeEventListener('loadeddata', handleLoaded);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
      />
      <video
        ref={videoRef}
        src={sparksVideo}
        style={{ display: 'none' }}
        autoPlay
        loop
        muted
        playsInline
      />
    </>
  );
};

export default FireCanvas;
