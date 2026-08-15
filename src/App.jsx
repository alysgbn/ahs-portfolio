import "./App.scss";

import { motion } from "framer-motion";

import MyNavbar from "./components/Navbar";

import myAvatar from "./assets/images/avatar-laptop.png";
import { Button } from "@heroui/button";
import MachineLearning from "./assets/svg/MachineLearning";
import DataScience from "./assets/svg/DataScience";
import SoftwareDevelopment from "./assets/svg/SoftwareDevelopment";
import Journey from "./components/Journey";
import Craft from "./components/Craft";
import AvailabilityBadge from "./components/AvailabilityBadge";
import RoleRotator from "./components/RoleRotator";
import MagneticButton from "./components/MagneticButton";

const ease = [0.23, 1, 0.32, 1];

function App() {
  return (
    <>
      <MyNavbar className="w-100" />
      <div className="hero-page">
        <div className="img-container">
          <div className="floating-content">
            {[
              { Icon: SoftwareDevelopment, label: "Software Development" },
              { Icon: DataScience, label: "Data Science" },
              { Icon: MachineLearning, label: "Machine Learning" },
            ].map(({ Icon, label }, i) => (
              <motion.div
                key={label}
                className="float-content"
                initial={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.55, delay: 0.25 + i * 0.1, ease },
                  x: { duration: 0.55, delay: 0.25 + i * 0.1, ease },
                  filter: { duration: 0.55, delay: 0.25 + i * 0.1, ease },
                  y: {
                    duration: 3.4 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5 + i * 0.4,
                  },
                }}
              >
                <div className="svg">
                  <Icon />
                </div>
                <p>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.img
          src={myAvatar}
          alt="Aliyah Sagaban"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        />
        <div className="hero-content">
          <motion.div
            className="content-header"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            <div>
              <p>HELLO! I'M</p>
            </div>
            <AvailabilityBadge />
          </motion.div>

          <div className="hero-name-block">
            <h1 className="font-bold hero-name">
              <motion.span
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                style={{ display: "inline-block", marginRight: "0.35em" }}
              >
                Aliyah
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
                style={{ display: "inline-block" }}
              >
                Sagaban
              </motion.span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease }}
            >
              <RoleRotator />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease }}
          >
            I specialize in developing cutting-edge web applications that
            empower users and drive results. I’m ready to apply my skills and
            help bring your projects to life.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease }}
          >
            <MagneticButton style={{ flex: 1, display: "inline-flex" }}>
              <Button
                className="text-white shadow-lg"
                radius="full"
                variant="bordered"
                fullWidth={true}
              >
                About Me
              </Button>
            </MagneticButton>

            <MagneticButton style={{ flex: 1, display: "inline-flex" }}>
              <Button
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg!"
                fullWidth={true}
                radius="full"
              >
                Contact Me
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
      <Journey />
      <Craft />
    </>
  );
}

export default App;
