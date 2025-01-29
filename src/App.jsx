import "./App.scss";

import MyNavbar from "./components/Navbar";

import myAvatar from "./assets/images/avatar-laptop.png";
import myAvatarLike from "./assets/images/avatar-like.png";
import { Button } from "@heroui/button";
import MachineLearning from "./assets/svg/MachineLearning";
import DataScience from "./assets/svg/DataScience";
import SoftwareDevelopment from "./assets/svg/SoftwareDevelopment";
import Journey from "./components/Journey";
function App() {
  return (
    <>
      <MyNavbar className="w-100" />
      <div className="hero-page">
        <div className="img-container">
          <div className="floating-content">
            <div className="float-content">
              <div className="svg">
                <SoftwareDevelopment />
              </div>
              <p>Software Development</p>
            </div>
            <div className="float-content">
              <div className="svg">
                <DataScience />
              </div>
              <p>Data Science</p>
            </div>
            <div className="float-content">
              <div className="svg">
                <MachineLearning />
              </div>
              <p>Machine Learning</p>
            </div>
          </div>
        </div>
        <h1>
          <img src={myAvatar} alt="" />
        </h1>
        <div className="hero-content">
          <div className="content-header">
            <div>
              <p>HELLO! I'M</p>
            </div>
            <h1 className="available">
              <div></div>
              <p>Available for new projects</p>
            </h1>
          </div>
          <h1 className="font-bold">Aliyah Sagaban</h1>
          <h1>
            <p>
              I specialize in developing cutting-edge web applications that
              empower users and drive results. I’m ready to apply my skills and
              help bring your projects to life.
            </p>
          </h1>

          <div className="hero-buttons">
            <Button
              className=" text-white shadow-lg"
              radius="full"
              variant="bordered"
              fullWidth={true}
            >
              About Me
            </Button>

            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg!"
              fullWidth={true}
              radius="full"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
      <Journey />
    </>
  );
}

export default App;
