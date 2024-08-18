import { Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import PdfThumbnail from "../container/thumnailPDF";

const MergePDFLayout = () => {
  const successAudioRef = useRef(null);
  const [file, setFile] = useState([]);
  const [convertFile, setConvertFile] = useState(null);
  const [loadingConvertFile, setLoadingConvertFile] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleDrop = (e) => {
    e.preventDefault();
    const dropFile = Array.from(e.dataTransfer.files);
    // const validFiles = dropFile.filter((file) => file.type === "application/pdf");
    const validFiles = [];
    const invalidFiles = [];
    dropFile.forEach((file) => {
      if (file.type === "application/pdf") {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });
    if (validFiles.length > 0) {
      setFile((prevFile) => [...prevFile, ...validFiles]);
    }
    if (invalidFiles.length > 0) {
      handleErrorUpload();
    }
  };
  console.log(file);
  const handleFileChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    setFile((prev) => [...prev, ...selectedFile]);
    setConvertFile(null);
  };
  const handleRemoveFile = (index) => {
    const newFile = file.filter((_, i) => i !== index);
    setFile(newFile);
    setConvertFile(null);
  };

  const handleMergePdf = async (e) => {
    setLoadingConvertFile(true);
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    file.forEach((file, index) => {
      formData.append(`files[${index}]`, file); // Tambahkan semua file yang dipilih
    });
    formData.append("StoreFile", true);

    try {
      const response = await axios.post(
        "https://v2.convertapi.com/convert/pdf/to/merge?Secret=1S95roLYF5Hdfy0R",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      setConvertFile(response.data.Files[0].Url);
      if (successAudioRef.current) {
        successAudioRef.current.play(); // Mainkan suara sukses
      }
      setLoadingConvertFile(false);
    } catch (error) {
      console.error("Error:", error);
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
  const handleConvertClick = () => {
    const form = document.getElementById("convert-form");
    if (form) {
      form.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
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
            onSubmit={handleMergePdf}
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
                multiple
                onChange={handleFileChange}
              />
            </div>
          </form>
        </label>
      </div>
      <div className="w-[50.5vw] flex flex-wrap rounded-sm gap-3">
        {file &&
          file.map((item, index) => (
            <div
              key={item.name}
              className="bg-white flex flex-col rounded-sm relative cursor-context-menu"
              title={item.name}
            >
              <button
                className="absolute -right-2 -top-3 bg-rose-600 text-white px-1 py-1 rounded-lg ml-auto"
                onClick={() => handleRemoveFile(index)}
              >
                <IoClose />
              </button>
              <div className="relative flex items-center border-b px-2 py-3">
                <p className="text-[12px] truncate max-w-[150px]">
                  {item.name}
                </p>
              </div>
              <div className="flex justify-between items-center px-4 py-2 bg-slate-100">
                <PdfThumbnail file={item} />
              </div>
            </div>
          ))}
      </div>
      {convertFile ? (
        <Link
          href={convertFile}
          className="text-white bg-rose-500 hover:bg-rose-600 px-3 py-2 rounded-lg shadow-lg uppercase block mt-3"
        >
          <FaDownload />
        </Link>
      ) : null}
      {loadingConvertFile && <Spinner color="red.500" />}
      {file.length > 1 && (
        <button
          className={`text-white bg-rose-500 hover:bg-rose-600 w-36 px-2 py-2 rounded-lg shadow-lg uppercase block ${
            !file ? "cursor-not-allowed hidden" : ""
          }`}
          onClick={handleConvertClick}
        >
          Convert
        </button>
      )}
    </div>
  );
};

export default MergePDFLayout;
