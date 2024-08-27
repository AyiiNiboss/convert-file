import { Progress, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoCloudUploadOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import PdfThumbnailSplit from "../container/thumnailPdfSplit";
import Image from "next/image";

const PdfToJpgLayout = () => {
  const [file, setFile] = useState(null);
  const [loadingSplitFile, setLoadingSplitFile] = useState(false);
  const [downloadZip, setDownloadZip] = useState(null);
  const [nameFileZip, setNameFileZip] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
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
        "https://v2.convertapi.com/convert/pdf/to/jpg?Secret=1S95roLYF5Hdfy0R",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      console.log("Response:", response.data.Files);

      const newImageUrls = response.data.Files.map((file) => file.Url);
      setImageUrl((prevImageUrl) => [...prevImageUrl, ...newImageUrls]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleConvertZip = async () => {
    setLoadingSplitFile(true);
    if (imageUrl.length === 0) return;

    const formData = new FormData();
    imageUrl.forEach((url, index) => {
      formData.append(`files[${index}]`, url); // Tambahkan semua URL gambar
    });
    formData.append("StoreFile", true);

    try {
      const response = await axios.post(
        "https://v2.convertapi.com/convert/jpg/to/zip?Secret=1S95roLYF5Hdfy0R", // Menggunakan URL yang benar untuk ZIP
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      console.log("Response:", response.data.Files);
      setDownloadZip(response.data.Files[0].Url);
      setNameFileZip(response.data.Files[0].FileName);
      setLoadingSplitFile(false);
      if (successAudioRef.current) {
        successAudioRef.current.play(); // Mainkan suara sukses
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (imageUrl.length > 0) {
      handleConvertZip();
    }
  }, [imageUrl]);
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
      <div>
        <h5 className="text-4xl font-semibold">Konversi PDF ke JPG</h5>
      </div>
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
              {nameFileZip ? (
                <p>{nameFileZip}</p>
              ) : (
                loadingSplitFile && <Spinner color="red.500" />
              )}
            </div>
            <div>
              {!downloadZip ? (
                <button
                  className={`text-white bg-rose-500 hover:bg-rose-600 w-36 px-2 py-2 rounded-lg shadow-lg uppercase block ${
                    !file ? "cursor-not-allowed hidden" : ""
                  }`}
                  onClick={handleConvertClick}
                >
                  Convert
                </button>
              ) : (
                <Link
                  href={downloadZip}
                  className="text-white bg-rose-500 hover:bg-rose-600 px-3 py-2 rounded-lg shadow-lg uppercase block mt-3"
                >
                  <FaDownload />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PdfToJpgLayout;
