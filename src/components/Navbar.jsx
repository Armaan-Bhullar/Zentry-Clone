import React, { use } from "react";
import Button from "./Button";
import { useRef, useState, useEffect } from "react";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";

const navItems = ["Home", "About", "Features", "Story", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavbarVisible(true);
      navContainerRef.current.classList.remove("floating-nav"); // Reset to initial position
    } else if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false);
      navContainerRef.current.classList.add("floating-nav"); // Add floating class
    } else if (currentScrollY < lastScrollY) {
      setIsNavbarVisible(true);
      navContainerRef.current.classList.add("floating-nav"); // Reset to initial position
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavbarVisible ? 0 : -100,
      opacity: isNavbarVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavbarVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-16"
    >
      <header className="absolute top-1/2 w-full translate-y-1/2"></header>

      <nav className="flex size-full items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <img src="/img/logo.png" alt="logo" className="w-10" />

          <Button
            id="product-button"
            title="Products"
            rightIcon={<TiLocationArrow />}
            containerClassName={
              "bg-blue-500 md:flex hidden items-center justify-center gap -1"
            }
          />
        </div>

        <div className="flex items-center h-full">
          <div className="hidden md:block">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            className="ml-10 flex items-center space-x-0.5 cursor-pointer"
            onClick={toggleAudioIndicator}
          >
            <audio
              ref={audioElementRef}
              className="hidden"
              src="/audio/loop.mp3"
              loop
            />
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`indicator-line ${
                  isIndicatorActive ? "active" : ""
                }`}
                style={{
                  animationDelay: `${bar * 0.1}s`,
                }}
              />
            ))}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
