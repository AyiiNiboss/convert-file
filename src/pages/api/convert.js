// pages/api/convert.js
import axios from 'axios';
import FormData from 'form-data';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const formData = new FormData();
  formData.append('file', req.files.file.data);

  try {
    const response = await axios.post(
      'https://v2.convertapi.com/convert/pdf/to/docx',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${YOUR_CONVERTAPI_SECRET}`
        },
      }
    );
    res.status(200).json({ url: response.data.Files[0].Url });
  } catch (error) {
    res.status(500).json({ message: 'Conversion failed', error: error.message });
  }
};
