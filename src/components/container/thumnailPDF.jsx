import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const PdfThumbnail = ({ file }) => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      setThumbnail(canvas.toDataURL());
    };

    generateThumbnail();
  }, [file]);

  return (
    <div className="pdf-thumbnail">
      {thumbnail ? (
        <img src={thumbnail} alt="PDF Thumbnail" style={{ width: '150px', height: 'auto', objectFit: 'cover' }} />
      ) : (
        <p>Loading thumbnail...</p>
      )}
    </div>
  );
};

export default PdfThumbnail;
