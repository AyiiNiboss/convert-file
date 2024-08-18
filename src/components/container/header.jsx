import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuTriangle } from "react-icons/lu";

const Header = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <>
      <div className="w-full h-20 bg-indigo-500 flex items-center gap-5 px-20 text-lg">
        <div>
          <Image
            src="/image/Logo-convert-file.png"
            width={100}
            height={50}
            alt="convert file"
          />
        </div>
        <div className="h-full flex items-center justify-center">
          <ul className="flex space-x-5 font-semibold h-full items-center">
            <li
              className="relative h-full flex items-center"
              onMouseEnter={() => setDropDownOpen(true)}
              onMouseLeave={() => setDropDownOpen(false)}
            >
              <span className="text-white hover:text-gray-300 cursor-pointer">
                Tools
              </span>
              {dropDownOpen && (
                <div
                  className="absolute w-[500px] pt-3 mx-auto top-full left-0 bg-slate-200"
                  onMouseEnter={() => setDropDownOpen(true)}
                  onMouseLeave={() => setDropDownOpen(false)}
                >
                  <LuTriangle
                    className="absolute top-1 left-3"
                    color="#be123c"
                    fill="#be123c"
                  />
                  <div className="bg-rose-700 p-5 flex items-center justify-center gap-5 rounded-lg">
                    <ul className="bg-gray-700 w-full text-sm">
                      <li>
                        <Link
                          href="/convert-file"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Convert File
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/tool-2"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Tool 2
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/tool-3"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Tool 3
                        </Link>
                      </li>
                    </ul>
                    <ul className="bg-gray-700 w-full text-sm">
                      <li>
                        <Link
                          href="/convert-file"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Convert File
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/tool-2"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Tool 2
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/tool-3"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          Tool 3
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link href={"/convert"}>Convert</Link>
            </li>
            <li>
              <Link href={"/merge_pdf"}>Merge</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
