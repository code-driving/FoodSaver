import { React, useState, useEffect } from 'react'
import "./ScrollToTop.scss";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        setShow(false)
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };
  return (
    <div>
      {show && (
      <div>
        <button className="scroll" onClick={() => scrollToTop()} >
          <KeyboardArrowUpIcon className="icon" />
        </button>
      </div>
      )}
    </div>
  );
};