// api/get-records.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // ENV Vars from Vercel's dashboard or .env file
    const API_KEY  = process.env.GRIST_API_KEY;
    const DOC_ID   = process.env.GRIST_DOC_ID;
    const TABLE_ID = process.env.GRIST_TABLE_ID;
    const BASE_URL = process.env.GRIST_BASE_URL; 
    // e.g. "https://docs.getgrist.com/api/docs"

    const url = `${BASE_URL}/${DOC_ID}/tables/${TABLE_ID}/records`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    // data.records -> array of { id, fields: {...} }
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error GET /api/get-records:', err);
    return res.status(500).send(err.message);
  }
}

