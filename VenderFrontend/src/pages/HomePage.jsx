import React from "react";
import NavBar from "../components/NavBar";
import Box from "../components/Box";

function HomePage() {
  return (
    <>
      <NavBar />
      <div>
        <div className=" flex flex-row">
          <div className="border-1 w-90 h-37 ml-2 rounded-md"> 
            <div className="justify-center flex mt-15 text-2xl ">Pending</div>
          </div>
          <div className="border-1 w-90 h-37 rouded-md">
              <div className="justify-center flex mt-15 text-2xl">Total Target : 3</div>
          </div>
        </div>
      </div>

      <Box/>

    </>
  );
}

export default HomePage;
