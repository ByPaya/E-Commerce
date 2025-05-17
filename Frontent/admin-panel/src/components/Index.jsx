import Header from "./Header";

const Index = () => {   
    return (
<>
            <Header />
            <div className="w-full h-[400px]  m-0 bg-orange-500 text-white flex flex-col  justify-center p-5   ">
  <h1 className="text-6xl md:text-3xl font-bold mt-4   mb-3  " style={{ fontSize: '40px' }}>
    Your One-Stop
  </h1>
  <h2 className="text-[40px] md:text-2xl mt-2   mb-3 font-bold  !important" style={{ fontSize: '40px' }}>
    Construction Materials
  </h2>
  <h3 className="text-3xl md:text-xl font-bold   mb-3 mt-2" style={{ fontSize: '40px' }}>
    Marketplace
  </h3>
  
  <p className="mt-4  text-sm md:text-base">
    Explore the best deals on construction materials and tools, all in one place. Find everything you need for your next project.
  </p>

  <div className="flex space-x-4 mt-4">
    <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded">
      Browse Categories
    </button>
    <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded">
      Become a Vendor
    </button>
  </div>
</div>

</>
    );
}

export default Index;