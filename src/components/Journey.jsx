import React, { useState } from "react";
import "../assets/css/journey.scss";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import WebDeveloper from "../assets/images/WebDeveloper.png";

import Galago1 from "../assets/images/Galago1.png";
import Galago2 from "../assets/images/Galago2.png";
import Galago3 from "../assets/images/Galago3.png";
import Galago4 from "../assets/images/Galago4.png";

import ReactLogo from "../assets/logos/ReactLogo.png";
import SassLogo from "../assets/logos/SassLogo.png";
import BootstrapLogo from "../assets/logos/BootstrapLogo.png";
import TailwindLogo from '../assets/logos/TailwindLogo.png'
import GithubLogo from '../assets/logos/GithubLogo.png'
import GitlabLogo from '../assets/logos/GitlabLogo.png'
import NextJSLogo from '../assets/logos/NextJSLogo.png'
import PostmanLogo from '../assets/logos/PostmanLogo.png'
import TypeScriptLogo from '../assets/logos/TypeScriptLogo.png'

import { RightArrow } from "../assets/svg/Arrow";

import { motion } from "framer-motion";
import Marquee from "./Marquee";

const galagoImages = [Galago1, Galago2, Galago3, Galago4];

const leftStack = [
  { name: "Postman", src: PostmanLogo },
  { name: "GitLab", src: GitlabLogo },
  { name: "NextJS", src: NextJSLogo },
  { name: "Tailwind", src: TailwindLogo, width: 60 },
  { name: "SASS", src: SassLogo },
  { name: "TypeScript", src: TypeScriptLogo },
];

const rightStack = [
  { name: "React", src: ReactLogo },
  { name: "SASS", src: SassLogo },
  { name: "Tailwind", src: TailwindLogo, width: 60 },
  { name: "Github", src: GithubLogo },
  { name: "Bootstrap", src: BootstrapLogo },
];

const TechLogo = ({ src, name, width = 50 }) => (
  <div className="slide">
    <img src={src} alt="" width={width} height={50} />
    <p>{name}</p>
  </div>
);
const Journey = () => {
  // Handling next and previous internship images
  const [currImage, setCurrImage] = useState(0);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const handleNextImage = () => {
    setCurrImage((prev) => (prev + 1) % galagoImages.length);
  };

  const handlePrevImage = () => {
    setCurrImage(
      (prev) => (prev - 1 + galagoImages.length) % galagoImages.length
    );
  };

  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div id="journey" className="journey-page">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            delay: 0.1,
            ease: [0.23, 1, 0.32, 1],
          },
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="journey-header">
          <p>PROFESSIONAL JOURNEY</p>
          <h1>Featured Projects</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: 0.2,
            ease: [0.23, 1, 0.32, 1],
          },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="journey-projects">
          <div className="containers">
            {/* Left Container */}
            <Card
              className="py-4 card"
              isFooterBlurred
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
              onMouseMove={handleSpotlight}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start card-header">
                <p className="text-tiny uppercase font-bold">
                  AIQUE Innovation Tech. Corp. • 2025
                </p>
                <small className="text-default-500">Junior Web Developer</small>
                <h4 className="font-bold text-large">
                  Travel and Hotel Booking
                </h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <img
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={WebDeveloper}
                  width={800}
                />
              </CardBody>
              <CardFooter className=" card-footer justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">Available soon.</p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  color="default"
                  radius="lg"
                  size="sm"
                  variant="flat"
                >
                  Notify me
                </Button>
              </CardFooter>
            </Card>

            {/* Right Container  */}

            <Card
              className="py-4 card"
              isFooterBlurred
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => setIsRightHovered(false)}
              onMouseMove={handleSpotlight}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start card-header">
                <p className="text-tiny uppercase font-bold">
                  AIQUE Innovation Tech. Corp. • 2024
                </p>
                <small className="text-default-500">
                  Front-end Developer Intern
                </small>
                <h4 className="font-bold text-large">GalaGO! V2</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2 card-body">
                <div>
                  <img
                    alt="Card background"
                    className="object-cover rounded-xl mt-[70px]"
                    src={galagoImages[currImage]}
                    width={800}
                  />
                  <div className="arrows">
                    <Button
                      isIconOnly
                      aria-label="left arrow"
                      className="left"
                      onPress={handlePrevImage}
                      radius="full"
                    >
                      <RightArrow />
                    </Button>
                    <Button
                      isIconOnly
                      aria-label="left arrow"
                      className="right"
                      onPress={handleNextImage}
                      radius="full"
                      variant="flat"
                    >
                      <RightArrow />
                    </Button>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="card-footer justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">
                  Created 10+ front-end pages during my 200-hour internship,
                  focused on design consistency and user experience.
                </p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  color="default"
                  radius="lg"
                  size="sm"
                  variant="flat"
                >
                  Visit App
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="tech-stack">
            <div className={`slider ${isLeftHovered ? "slider--active" : ""}`}>
              <Marquee className="[--duration:18s] [--gap:1rem]">
                {leftStack.map((tech) => (
                  <TechLogo key={tech.name} {...tech} />
                ))}
              </Marquee>
            </div>

            <div className={`slider ${isRightHovered ? "slider--active" : ""}`}>
              <Marquee reverse className="[--duration:18s] [--gap:1rem]">
                {rightStack.map((tech) => (
                  <TechLogo key={tech.name} {...tech} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Journey;
