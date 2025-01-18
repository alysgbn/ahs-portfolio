import "./App.scss";
import MyNavbar from "./components/Navbar";

import myAvatar from "./assets/images/avatar-laptop.png";
import myAvatarLike from "./assets/images/avatar-like.png";
import { Button } from "@heroui/button";
function App() {
  return (
    <>
      <MyNavbar className="w-100" />
      <div className="hero-page">
        <img src={myAvatar} alt="" />
        <div className="hero-content">
          <h1>Aliyah Sagaban</h1>
          <p>
            A Computer Science graduate, major in Data Science. I am an aspiring
            Data Engineer
          </p>

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
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              fullWidth={true}
              radius="full"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
