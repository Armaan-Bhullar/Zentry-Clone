import React from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect,useRef,useState } from "react";

const BentoTilt = ({ children, className="" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (e) => {
      if (!itemRef.current) return;

      const {left,top, width,height} = itemRef.current.getBoundingClientRect();

      const relativeX = (e.clientX - left) / width;
      const relativeY = (e.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 5; // Adjust the multiplier for tilt strength
      const tiltY = (relativeX - 0.5) * -5; //

      const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;
      setTransformStyle(newTransform);
  }

  const handleMouseLeave = () => {
    setTransformStyle("");
  };
  return (  
      <div className={`bento-tilt ${className}`} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transform: transformStyle }}>
        {children}
      </div>
  );
};  

const BentoCard = ({ src, title, description }) => {
      const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current.currentTime = 0; // optional: reset to start
  };

  return (
    <div className="relative size-full">
      <video
        ref={videoRef}
        src={src}
        loop
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        muted
        className="absolute left-0 top-0 size-full object-cover object-center hover:autoPlay"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <div>
            <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
              Immerse yourself in an IP-rich product universe where players,
              agentic AI and blockchain lead the new economic paradigm.
            </p>
          </div>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={<>Radia<b>n</b>t</>}
            description="The game of the games transforming moments across Web2 and Web3"
          />
        </BentoTilt>

        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
            <BentoTilt className="bento-tilt_1 row-span-1 col-span-2 md:col-span-1 md:row-span-2">
              <BentoCard
              src="videos/feature-2.mp4"
              title={<>Zig<b>m</b>a</>}
              description="The NFT collection merging Zentry's IP,AI and gaming-pushing boundaries of NFT innovation"
            />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 row-span-1 col-span-2 ms-32 md:col-span-1 md:ms-0">
              <BentoCard
                src="videos/feature-3.mp4"
                title={<>N<b>e</b>xus</>}
                description="The metagame portal uniting human and AI to play,compete and earn"
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 me-14 row-span-1 col-span-2 md:col-span-1 md:me-0">
              <BentoCard
                src="videos/feature-4.mp4"
                title={<>az<b>u</b>l</>}
                description="The metagame portal uniting human and AI to play,compete and earn"
              />
            </BentoTilt>

            <div className="bento-tilt_2 ">
              <div className="flex size-full bg-violet-300 justify-between flex-col">
                <h1 className="bento-title special-font max-w-64 text-black p-2">More Coming Soon</h1>

                <TiLocationArrow className="m-5 scale-[5] self-end" />
              </div>
            </div>

            <BentoTilt className="bento-tilt_2">
              <video src="videos/feature-5.mp4" loop muted autoPlay playsInline className="absolute size-full object-cover object-center" />
            </BentoTilt>

        </div>
      </div>
    </section>
  );
};

export default Features;
