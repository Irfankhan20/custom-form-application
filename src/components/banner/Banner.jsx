import Typewriter from "typewriter-effect";

const Banner = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-center md:h-screen h-72 banner-image"
        style={{
          backgroundImage:
            'url("https://i.ibb.co/BPB1bfP/Banner-Acknowledging-AI.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="md:w-9/12 mx-auto text-2xl md:text-5xl text-white font-bold leading-tight mb-4 line-">
              Resolute AI Software Private Limited.{" "}
              <span className="text-[#1196f6] italic text-3xl md:text-6xl">
                RAS
              </span>{" "}
              is Awesome AI company{" "}
            </h1>
            <p className="text-sm md:text-xl text-white mb-8 md:w-8/12 w-10/12 mx-auto">
              <Typewriter
                options={{
                  strings: [
                    "RAS: Resolute AI Software Private Limited ✍️",
                    " Experience a World of AI. ✍️",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </p>
            <div className="flex justify-center md:mb-0 ">
              <button className="border border-[#1196f6] hover:bg-white hover:text-[#1196f6] text-white font-semibold btn-secondary py-2 px-4 rounded shadow mr-4 duration-300">
                View Details
              </button>
              <button className="border border-white hover:bg-white text-[#1196f6] font-semibold py-2 px-4 rounded shadow mr-4 duration-300">
                Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
