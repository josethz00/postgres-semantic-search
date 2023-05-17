import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const search = api.example.getAll.useMutation();
  const [searchText, setSearchText] = useState("");

  return (
    <>
      {/* Rest of the code... */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {/* Add the search bar */}
          <div className="max-w-lg w-full bg-white/20 rounded-md overflow-hidden">
            <div className="flex items-center h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-4 text-white opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.873-4.873"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.525 10.818A5.25 5.25 0 116.475 10.818a5.25 5.25 0 0110.05 0z"
                />
              </svg>
              <input
                type="text"
                className="flex-grow px-4 py-2 text-white bg-transparent outline-none"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="text-white px-4 py-2 mr-1 bg-[#065fd4] hover:bg-[#0a5ebe] rounded-md"
                onClick={() => {
                  console.log("Perform search:", searchText);
                  console.log(search.mutate({
                    title: searchText,
                  }));
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Rest of the code... */}
        </div>
      </main>
    </>
  );
};

export default Home;
