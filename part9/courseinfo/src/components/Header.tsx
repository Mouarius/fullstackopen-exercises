import React from 'react';

interface HeaderProps{
  courseName: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.courseName}</h1>
    </header>
  );
};

export default Header;