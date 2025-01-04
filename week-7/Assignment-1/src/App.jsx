import React from "react"
import background from "./assets/background.jpg"

function App() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center text-white">
      <Card name={"Deepak Tiwari"} avatar={"https://avatars.githubusercontent.com/u/77287267?v=4"} followers={81} likes={803} photos={1.4} />
    </div>
  )
}

const Card = React.memo((props) => {
  return <div className="bg-white w-96 h-[30rem] rounded-lg overflow-hidden">
    <div className="relative flex flex-col items-center justify-center">
      <img src={background} alt="Background image" className="aspect-auto w-full h-[12rem]" />
      <img src={props.avatar} alt="Avatar" loading="lazy" className="absolute top-[50%] left-[50%] transform -translate-x-1/2 translate-y-[-7rem] w-32 rounded-full border-4 border-white" />
      <div className="mt-16">
        <h1 className="text-black text-[2rem] font-bold">{props.name} <span className="text-gray-500 text-lg">25</span></h1>
        <p className="text-gray-500 text-lg text-center">India</p>
      </div>
      <div className="mt-10 w-full h-[2px] bg-gray-300"></div>
      <div className="flex items-center justify-between w-full px-12 py-4 mt-2">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-black text-xl">{props.followers}K</h1>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-black text-xl">{props.likes}K</h1>
          <p className="text-gray-500">Likes</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-black text-xl">{props.photos}K</h1>
          <p className="text-gray-500">Photos</p>
        </div>
      </div>
    </div>
  </div>
})

export default App
