import React, { useRef } from "react";

const Button = ({ title, leftIcon, containerClassName, id, rightIcon }) => {
  const audioRef = useRef(null);

  return (
    <>
      <button
        id={id}
        className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClassName}`}
      >
        {leftIcon}
        <span className="relative inline-block uppercase text-xs font-general after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
          {title}
        </span>
        {rightIcon}
      </button>
    </>
  );
};

export default Button;
