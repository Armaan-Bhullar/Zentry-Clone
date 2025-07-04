import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "./useGSAP";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalVideos = 4;
  const currentVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  };

  const handleVideoLoad = () => {
    setIsLoading(false)
    setLoadedVideos((prev) => prev + 1);
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Click animation
  useGSAP(() => {
    if (!hasClicked) return;

    const current = currentVideoRef.current;
    const next = nextVideoRef.current;
    if (!current || !next) return;

    gsap.set(next, { visibility: "visible" });

    gsap.to(next, {
      transformOrigin: "center center",
      scale: 1,
      width: "100%",
      height: "100%",
      duration: 1,
      ease: "power1.inOut",
      onStart: () => next.play(),
    });

    gsap.from(current, {
      transformOrigin: "center center",
      scale: 0,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, [currentIndex]);

  // Scroll-triggered animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  return (
    <div id='home' className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] bg-violet-50 h-dvh w-screen overflow-hidden">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in-out hover:scale-100 hover:opacity-100"
            >
              <video
                ref={currentVideoRef}
                src={getVideoSrc(
                  currentIndex === totalVideos ? 1 : currentIndex + 1
                )}
                loop
                muted
                className="size-84 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            className="absolute-center invisible z-20 size-64 object-center object-cover"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Stacked perfectly aligned headings */}
        <div className="absolute bottom-5 right-5 z-40">
          <h1 className="special-font hero-heading text-blue-75 z-40 absolute bottom-5 right-5">
            <b>Gaming</b>
          </h1>
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              <b>Redefine</b>
            </h1>
            <p className="mb-5 max-w-64 text-blue-100 font-robert-regular">
              This is made for self-development and is a clone of the award winning website zentry.com <br /> This not intended to copy their work
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClassName="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading text-shadow-black absolute bottom-10 right-10">
        <b>Gaming</b>
      </h1>
    </div>
  );
};

export default Hero;
