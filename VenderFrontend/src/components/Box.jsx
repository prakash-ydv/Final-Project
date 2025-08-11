import React from 'react'

function Box() {
  return (
    <div>
        <div className='border-1 mt-9 w-130 h-49 ml-3 rounded-md flex flex-row'>
            <div className='border-1 w-44 h-7 ml-4 mt-5 rounded-md'><img src="https://th.bing.com/th/id/OIP.el6_3fVuqw_0WIxydpah7AHaGX?w=200&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Garbage" /></div>
           
           <div>
            <div className='font-bold text-red-500 mt-3 ml-30 text-3xl '>Garbage</div>
            <div className='ml-1 gap-2 mt-10 flex-row flex'>
            <div><button className='bg-yellow-500 text-white w-40 h-10 text-2xl rounded-2xl'>Show History</button></div>
            <div><button className='bg-green-500 text-white w-40 h-10 text-2xl rounded-2xl'>Remove History</button></div>
            </div>
</div>
        </div>

        {/*  */}
           <div className='border-1 mt-9 w-130 h-49 ml-3 rounded-md flex flex-row'>
            <div className='border-1 w-42 h-28 ml-4 mt-12 rounded-md'><img src="https://th.bing.com/th/id/OIP.OrraZmRp4owjkWsL3G1hwAHaE7?w=305&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Electricity" /></div>
           
           <div>
            <div className='font-bold text-pink-500 mt-6 ml-30 text-3xl '>Electricity</div>
            <div className='ml-1 gap-2 mt-10 flex-row flex'>
            <div><button className='bg-yellow-500 text-white w-40 h-10 text-2xl rounded-2xl'>Show History</button></div>
            <div><button className='bg-green-500 text-white w-40 h-10 text-2xl rounded-2xl'>Remove History</button></div>
            </div>
</div>
        </div>

        {/*  */}

           <div className='border-1 mt-9 w-130 h-49 ml-3 rounded-md flex flex-row'>
            <div className='border-1 w-42 h-25 ml-4 mt-9 rounded-md'><img src="https://th.bing.com/th/id/OIP.p5ebT5X9ITBta3yn4U7OBgHaE8?w=280&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="Road" /></div>
           
           <div>
            <div className='font-bold text-sky-500 mt-3 ml-30 text-3xl '>Potholes</div>
            <div className='ml-1 gap-2 mt-10 flex-row flex'>
            <div><button className='bg-yellow-500 text-white w-40 h-10 text-2xl rounded-2xl'>Show History</button></div>
            <div><button className='bg-green-500 text-white w-40 h-10 text-2xl rounded-2xl'>Remove History</button></div>
            </div>
</div>
        </div>

        {/*  */}

           <div className='border-1 mt-9 w-130 h-49 ml-3 rounded-md flex flex-row'>
            <div className='border-1 w-42 h-25 ml-4 mt-9 rounded-md'><img src="https://th.bing.com/th/id/OIF.W2t2AOcWOik8uv06MdaecQ?w=267&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="safety" /></div>
           
           <div>
            <div className='font-bold text-yellow-500 mt-3 ml-30 text-3xl '>Safety</div>
            <div className='ml-1 gap-2 mt-10 flex-row flex'>
            <div><button className='bg-yellow-500 text-white w-40 h-10 text-2xl rounded-2xl'>Show History</button></div>
            <div><button className='bg-green-500 text-white w-40 h-10 text-2xl rounded-2xl'>Remove History</button></div>
            </div>
</div>
        </div>

    </div>
  )
}

export default Box