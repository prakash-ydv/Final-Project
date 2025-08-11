import React from "react";

function Card() {
  return (
    <div>
      {/* First RsolveCard */}
      <div className="md:w-[400px] w-[380px] ml-[5px] h-[320px] mt-[10px] border-2 rounded-lg  px-[30px] py-[20px] md:ml-[5px] md:mt-[10px]">
        <div className="overflow-hidden rounded-lg w-full h-[150px]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd_Fc0nmhSZT7pCYM_N30b5PoThMg7hmSNFg&s"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h1 className="font-bold">
            Department :<span className="font-normal">Garbage</span>
          </h1>
          <h1 className="font-bold">
            Location :<span className="font-normal">Panjab</span>
          </h1>
          <h1 className="font-bold">
            Date :<span className="font-normal">2023-10-01</span>
          </h1>
          <h1 className="font-bold">
            Description :
            <span className="font-normal">This is a garbage item</span>
          </h1>
        </div>
      </div>
      {/* END: resolve history */}

      {/* Update resolve by department */}
      <div className="  border-2 rounded-lg px-[10px] md:px-[30px] py-[10px] pb-[40px] mt-6 w-[380px] ml-[5px] md:w-[400px]">
        {" "}
        <div className="mt-6">
          <label htmlFor="department" className="block mb-2 font-semibold">
            Status
          </label>
          <select
            id="department"
            name="department"
            className="border rounded-lg px-3 py-2 md:w-[320px] w-[280px]"
          >
            <option value="department1">Pending</option>
            <option value="department2">In-Progress</option>
            <option value="department3">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Card;
