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

const galagoImages = [Galago1, Galago2, Galago3, Galago4];
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
        initial={{ opacity: 0, y: 100 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: 0.2,
            ease: "easeInOut",
          },
        }}
      >
        <div className="journey-header">
          <p>PROFESSIONAL JOURNEY</p>
          <h1>Featured Projects</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.9,
            delay: 0.3,
            ease: "easeInOut",
          },
        }}
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
            <div className={`slider ${isLeftHovered ? 'visible' : 'invisible'}`}>
              <div className="slide-track">
                <div className="slide" key="l-postman-1">
                  {" "}
                  <img src={PostmanLogo} alt="" width={50} height={50} />
                  <p>Postman</p>
                </div>
                <div className="slide" key="l-gitlab-1">
                  {" "}
                  <img src={GitlabLogo} alt="" width={50} height={50} />
                  <p>GitLab</p>
                </div>
                <div className="slide" key="l-nextjs">
                  {" "}
                  <img src={NextJSLogo} alt="" width={50} height={50} />
                  <div>
                    <p>NextJS</p>
                  </div>
                </div>
                <div className="slide" key="l-tailwind">
                  {" "}
                  <img src={TailwindLogo} alt="" width={60} height={50} />
                  <p>Tailwind</p>
                </div>{" "}
                <div className="slide" key="l-sass">
                  {" "}
                  <img src={SassLogo} alt="" width={50} height={50} />
                  <p>SASS</p>
                </div>{" "}
                <div className="slide" key="l-typescript">
                  {" "}
                  <img src={TypeScriptLogo} alt="" width={50} height={50} />
                  <p>TypeScript</p>
                </div>{" "}
                <div className="slide" key="l-gitlab-2">
                  {" "}
                  <img src={GitlabLogo} alt="" width={50} height={50} />
                  <p>GitLab</p>
                </div>
                <div className="slide" key="l-postman-2">
                  {" "}
                  <img src={PostmanLogo} alt="" width={50} height={50} />
                  <p>Postman</p>
                </div>


              </div>
            </div>


            <div className={`slider ${isRightHovered ? 'visible' : 'invisible'}`}>
              <div className="slide-track">
                <div className="slide" key="r-react-1">
                  {" "}
                  <img src={ReactLogo} alt="" width={50} height={50} />
                  <p>REACT</p>
                </div>
                <div className="slide" key="r-sass-1">
                  {" "}
                  <img src={SassLogo} alt="" width={50} height={50} />
                  <p>SASS</p>
                </div>{" "}
                <div className="slide" key="r-tailwind-1">
                  {" "}
                  <img src={TailwindLogo} alt="" width={60} height={50} />
                  <p>Tailwind</p>
                </div>{" "}
                <div className="slide " key="r-github">
                  {" "}
                  <img src={GithubLogo} alt="" width={50} height={50} />
                  <p>Github</p>
                </div>
                <div className="slide" key="r-bootstrap">
                  {" "}
                  <img src={BootstrapLogo} alt="" width={50} height={50} />
                  <p>Bootstrap</p>
                </div>{" "}
                <div className="slide" key="r-react-2">
                  {" "}
                  <img src={ReactLogo} alt="" width={50} height={50} />
                  <p>REACT</p>
                </div>
                <div className="slide" key="r-sass-2">
                  {" "}
                  <img src={SassLogo} alt="" width={50} height={50} />
                  <p>SASS</p>
                </div>{" "}
                <div className="slide" key="r-tailwind-2">
                  {" "}
                  <img src={TailwindLogo} alt="" width={60} height={50} />
                  <p>Tailwind</p>
                </div>{" "}
              </div>
            </div>



          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Journey;
