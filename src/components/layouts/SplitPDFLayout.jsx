import { Progress, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import PdfThumbnailSplit from "../container/thumnailPdfSplit";

const SplitPDFLayout = () => {
  const [file, setFile] = useState(null);
  const [loadingSplitFile, setLoadingSplitFile] = useState(false);
  const [hasilFile, setHasilFile] = useState([]);
  const successAudioRef = useRef(null);
  const toast = useToast();

  const handleDrop = (e) => {
    e.preventDefault();
    const dropFile = e.dataTransfer.files[0];
    if (dropFile && dropFile.type === "application/pdf") {
      setFile(dropFile);
    } else {
      setFile(null);
      handleErrorUpload();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      setFile(null);
      handleErrorUpload();
    }
  };

  const handleConvertPdfToWord = async (e) => {
    setLoadingSplitFile(true);
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("StoreFile", true);

    try {
      const response = await axios.post(
        "https://v2.convertapi.com/convert/pdf/to/split?Secret=1S95roLYF5Hdfy0R",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      console.log("Response:", response.data.Files);
      setHasilFile(response.data.Files);
      if (successAudioRef.current) {
        successAudioRef.current.play(); // Mainkan suara sukses
      }
      setLoadingSplitFile(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleRemoveFile = () => {
    setFile(null);
  };
  const handleConvertClick = () => {
    const form = document.getElementById("convert-form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const handleErrorUpload = () => {
    toast({
      title: "Error",
      description: "Only supports pdf files",
      position: "top-right",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = true;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="bg-slate-200 text-slate-800 font-mono w-full min-h-screen flex flex-col items-center justify-center gap-5">
      <audio ref={successAudioRef} src="/sound/success.mp3" preload="auto" />{" "}
      {/* Tambahkan elemen audio */}
      <div
        className="bg-slate-200 rounded-lg shadow-lg border-2 border-slate-500 border-dashed p-1"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label
          htmlFor="upload"
          className="w-[50vw] h-[30vh] text-slate-800 bg-white hover:bg-slate-100 px-3 py-2 rounded-lg block cursor-pointer"
        >
          <form
            id="convert-form"
            className="w-full h-full flex items-center justify-center"
            action=""
            onSubmit={handleConvertPdfToWord}
          >
            <div className="flex flex-col gap-2 items-center">
              <div className="flex flex-col items-center">
                <IoCloudUploadOutline size={60} />
                <p>Drag and drop or click to upload</p>
                <p className="text-sm">Only PDF files are supported</p>
              </div>
              <input
                id="upload"
                type="file"
                className="text-slate-800 w-full hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>
          </form>
        </label>
      </div>
      {file && (
        <>
          <div className="bg-white w-[50.5vw] flex flex-col rounded-sm">
            <div className="flex items-center border-b px-2 py-3">
              <p>{file.name}</p>
              <button
                className="bg-rose-600 text-white px-1 py-1 rounded-lg ml-auto"
                onClick={handleRemoveFile}
              >
                <IoClose />
              </button>
            </div>
            <div className="flex justify-between items-center px-4 py-2 bg-slate-100">
              <div>
                <button
                  className={`text-white bg-rose-500 hover:bg-rose-600 w-36 px-2 py-2 rounded-lg shadow-lg uppercase block ${
                    !file ? "cursor-not-allowed hidden" : ""
                  }`}
                  onClick={handleConvertClick}
                >
                  Split
                </button>
              </div>
            </div>
          </div>
          <div className="w-[50.5vw] flex flex-wrap gap-4">
            {hasilFile &&
              hasilFile.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white flex flex-col rounded-sm cursor-context-menu relative"
                  title={item.FileName}
                >
                  <div className="relative flex items-center border-b px-2 py-3">
                    <p className="text-[12px] truncate max-w-[150px]">
                      {item.FileName}
                    </p>
                  </div>
                  <div className="flex justify-center items-center px-4 py-2 bg-slate-100 relative overflow-hidden">
                    <PdfThumbnailSplit key={index} file={item} />
                    {/* Overlay Gelap */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                      {/* Tombol Unduh */}
                      <button
                        className="bg-sky-500 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleDownload(item.Url)}
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default SplitPDFLayout;
