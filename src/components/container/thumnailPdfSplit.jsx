import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Spinner } from "@chakra-ui/react";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const PdfThumbnailSplit = ({ file }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        // Mengunduh file PDF dari URL
        const response = await fetch(file.Url);
        const arrayBuffer = await response.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        setThumbnail(canvas.toDataURL());
      } catch (err) {
        console.error("Gagal memuat PDF:", err);
        setError("Gagal memuat thumbnail PDF");
      }
    };

    generateThumbnail();
  }, [file]);

  return (
    <div className="pdf-thumbnail hover:bg-blend-lighten">
      {error ? (
        <div className="text-red-500"> {error} </div>
      ) : thumbnail ? (
        <img
          src={thumbnail}
          alt="PDF Thumbnail"
          className="w-36 h-auto object-cover"
        />
      ) : (
        <Spinner color="red.500" />
      )}
    </div>
  );
};

export default PdfThumbnailSplit;
