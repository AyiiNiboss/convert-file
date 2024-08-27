import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuTriangle } from "react-icons/lu";
import { IoMdArrowDropdown } from "react-icons/io";

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
          <ul className="flex space-x-5 font-semibold h-full items-center uppercase text-[15px]">
            <li
              className="relative h-full flex items-center"
              onMouseEnter={() => setDropDownOpen(true)}
              onMouseLeave={() => setDropDownOpen(false)}
            >
              <span className="text-white hover:text-gray-300 cursor-pointer flex items-center gap-1">
                Alat
                <IoMdArrowDropdown size={20} />
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
                          KONVERSI KE PDF
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/jpg-ke-pdf"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          JPG ke PDF
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/word-ke-pdf"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          WORD ke PDF
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/powerpoint-ke-pdf"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          POWERPOINT ke PDF
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/html-ke-pdf"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          HTML ke PDF 
                        </Link>
                      </li>
                    </ul>
                    <ul className="bg-gray-700 w-full text-sm">
                      <li>
                        <Link
                          href="/convert-file"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          KONVERSI DARI PDF
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pdf-ke-jpg"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          PDF ke JPG
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pdf-ke-word"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          PDF ke WORD
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pdf-ke-powerpoint"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          PDF ke POWERPOINT
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/pdf-ke-html"
                          className="block px-4 py-2 text-white hover:bg-gray-600"
                        >
                          PDF ke HTML
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link href={"/convert"}>Kompres PDF</Link>
            </li>
            <li>
              <Link href={"/merge_pdf"}>Gabungkan PDF</Link>
            </li>
            <li>
              <Link href={"/split_pdf"}>Pisahkan PDF</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
