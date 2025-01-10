// api/update-record.js
export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // get recordId from query string: /api/update-record?recordId=123
    // (or you can parse from the body, your choice)
    const { recordId } = req.query; 
    if (!recordId) {
      return res.status(400).send('Missing recordId in query');
    }

    const fieldsToUpdate = req.body; // e.g. { Es_regalo_: "Si", Estado: "Comprado", Nota: "Alice" }
    const recordIdNum = parseInt(recordId, 10);

    // ENV Vars from Vercel's dashboard or .env file
    const API_KEY  = process.env.GRIST_API_KEY;
    const DOC_ID   = process.env.GRIST_DOC_ID;
    const TABLE_ID = process.env.GRIST_TABLE_ID;
    const BASE_URL = process.env.GRIST_BASE_URL;

    const patchBody = {
      records: [
        {
          id: recordIdNum,
          fields: fieldsToUpdate
        }
      ]
    };

    const url = `${BASE_URL}/${DOC_ID}/tables/${TABLE_ID}/records`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patchBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error PATCH /api/update-record:', err);
    return res.status(500).send(err.message);
  }
}

