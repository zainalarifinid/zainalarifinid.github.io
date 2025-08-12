import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg
      className="NextLogo"
      width="245"
      height="180"
      viewBox="0 0 245 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M173.898 60.5H245V120H173.898L120 60.5L173.898 0H245V120H173.898L120 60.5Z"
        fill="url(#next-logo-gradient)"
      />
      <defs>
        <linearGradient
          id="next-logo-gradient"
          x1="120"
          y1="0"
          x2="120"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#87CEEB" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
