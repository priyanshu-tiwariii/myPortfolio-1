import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Resume() {
  const [myData, setMyData] = useState({});
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("/api/intro/getIntro", {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        setMyData(data.data);
        console.log(data.data);
      } catch (error) {
        setError("Something went wrong!!");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchInfo();
  }, []);

  const getDisplayedText = () => {
    const words = myData?.subHeading?.split(" ")||[]
    const wordLimit = showMore ? words.length : window.innerWidth < 768 ? 20 : 40;
    return words.slice(0, wordLimit).join(" ");
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12  transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-green-100 md:text-5xl">
          My Portfolio
        </h1>
      </div>

      {/* Profile Card */}
      <div className="flex justify-center py-12">
        <div className="max-w-5xl w-full flex flex-col md:flex-row p-5  dark:bg-black/50 shadow border rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row w-full">
            {myData?.image?.map((data, index) => {
              const fixedSizeUrl = `https://res.cloudinary.com/dqdmdo5an/image/upload/w_400,h_400,g_center,c_fill/${data.public_id}.jpg`;
              return (
                <div key={index} className="w-full  md:w-[300px] h-[300px]">
                  <img
                    src={fixedSizeUrl}
                    alt="Priyanshu"
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              );
            })}

            <div className="w-full md:w-2/3 md:p-6 py-6 px-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold  text-center md:text-left text-gray-800 dark:text-green-100">
                  {myData?.name}
                </h1>
                <p className="bg-clip-text text-center md:text-left text-transparent bg-gradient-to-r from-gray-700 via-teal-600 to-green-400  dark:from-yellow-400 dark:via-orange-500 dark:to-red-600 font-semibold mt-2">
                  {myData?.headlines}
                </p>
                <p className="text-gray-500  text-center md:text-left dark:text-gray-300 mt-1 text-sm">
                  {getDisplayedText()}
                  {myData?.subHeading?.split(" ").length > (window.innerWidth < 768 ? 20 : 40) && (
                    <span>
                      ...{" "}
                      <button
                        onClick={handleShowMore}
                        className="text-blue-500 underline"
                      >
                        {showMore ? "Show Less" : "Show More"}
                      </button>
                    </span>
                  )}
                </p>
                <p className="text-gray-500  text-center md:text-left font-bold dark:text-gray-400 mt-2 text-sm">{myData?.location}</p>

                <div className="flex mt-6 space-x-4">
                  {myData?.resumePdf?.map((pdf, index) => (
                    <Link key={index} to={pdf.url}>
                      <button
                        type="button"
                        className="rounded-md bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-yellow-600 hover:to-yellow-500 focus:outline-none"
                      >
                        Download Resume
                      </button>
                    </Link>
                  ))}
                  <a
                    href={`mailto:${myData.email}`}
                    className="rounded-md bg-gradient-to-r from-green-500 to-green-400 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-green-600 hover:to-green-500 focus:outline-none flex items-center space-x-2"
                  >
                    <MdEmail />
                    <span>Email Me</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;


//  font-semibold mt-