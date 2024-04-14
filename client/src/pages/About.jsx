import React, { useEffect } from 'react';
import Typed from 'typed.js';
import "../Styles.css";

export default function About() {
  useEffect(() => {
    // Initialize Typed when the component mounts
    const typeData = new Typed(".role", {
      strings: [
        "Full Stack Developer",
        "And An",
        "Animator",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });

    const typedata = new Typed(".vivek", {
      strings: [
        "Full Stack Developer",
        "And An",
        "Animator",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });
   
    const typeSri = new Typed(".Sri", {
      strings: [
        "Ui-Ux Designer",
        "And An",
        "Animator",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });
    // Cleanup function to destroy Typed instance when component unmounts
    return () => {
      typeData.destroy();
      typeSri.destroy();
      typedata.destroy();
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div className="text-slate-600 font-bold text-3xl lg:text-6xl mx-auto my-7">
        Our Founders ...
      </div>

      <div className="hero-section">
        <div className="faded">Shray Rathore</div>
        <div className="hero-left">
          <div className="hero-heading">Hi I am Shray Rathore</div>
          <div className="hero-heading hero-subheading">
            {" "}
            I am <span className="role"></span>
          </div>
          <div className="hero-description">
            I am a software developer and here is my portfolio website. Here you
            will learn about my journey as a software developer.
          </div>
        </div>
        <div className="hero-right">
         
        </div>
      </div>

      <div className="hero-section">
        <div className="faded">Srishti Ajmera</div>
        <div className="hero-left">
          <div className="hero-heading">Hi I am Srishti Ajmera</div>
          <div className="hero-heading hero-subheading">
            {" "}
            I am <span className="Sri"></span>
          </div>
          <div className="hero-description">
            I am a software developer and here is my portfolio website. Here you
            will learn about my journey as a software developer.
          </div>
        </div>
        <div className="hero-right">
          
        </div>
      </div>

      <div className="hero-section">
        <div className="faded">Vivek kumar</div>
        <div className="hero-left">
          <div className="hero-heading">Hi I am vivek kumar</div>
          <div className="hero-heading hero-subheading">
            {" "}
            I am <span className="vivek"></span>
          </div>
          <div className="hero-description">
            I am a software developer and here is my portfolio website. Here you
            will learn about my journey as a software developer.
          </div>
        </div>
        <div className="hero-right">
         
        </div>
      </div>

    </div>
  );
}
