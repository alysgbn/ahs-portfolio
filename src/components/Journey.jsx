import React, { useState } from "react";
import "../assets/css/journey.scss";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import WebDeveloper from "../assets/images/WebDeveloper.png";
import Internship from "../assets/images/Internship.png";
import Galago1 from "../assets/images/Galago1.png";
import Galago2 from "../assets/images/Galago2.png";
import Galago3 from "../assets/images/Galago3.png";
import Galago4 from "../assets/images/Galago4.png";
import { RightArrow } from "../assets/svg/Arrow";
const galagoImages = [Galago1, Galago2, Galago3, Galago4];
const Journey = () => {
  const [currImage, setCurrImage] = useState(0);

  const handleNextImage = () => {
    setCurrImage((prev) => (prev + 1) % galagoImages.length);
  };

  const handlePrevImage = () => {
    setCurrImage(
      (prev) => (prev - 1 + galagoImages.length) % galagoImages.length
    );
  };
  return (
    <div className="journey-page">
      <div className="journey-header">
        <p>PROFESSIONAL JOURNEY</p>
        <h1>Featured Projects</h1>
      </div>

      <div className="journey-projects">
        <Card className="py-4 card" isFooterBlurred>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start card-header">
            <p className="text-tiny uppercase font-bold">
              AIQUE Innovation Tech. Corp. • 2025
            </p>
            <small className="text-default-500">Junior Web Developer</small>
            <h4 className="font-bold text-large">Travel and Hotel Booking</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <img
              alt="Card background"
              className="object-cover rounded-xl"
              src={WebDeveloper}
              width={800}
            />
          </CardBody>
          <CardFooter className="card-footer justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
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

        <Card className="py-4 card" isFooterBlurred>
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
              Created 10+ front-end pages during my 200-hour internship, focused
              on design consistency and user experience.
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
    </div>
  );
};

export default Journey;
