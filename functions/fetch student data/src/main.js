import fetch from 'node-fetch';

export default async ({ req, res, log, error }) => {
  try {
    log('Request Body: ', req.body);

    const { plateNumber } = JSON.parse(req.body);

    log('Plate Number: ', plateNumber);

    if (!plateNumber) {
      return res.json(
        {
          message: 'Plate number is required.',
        },
        400
      );
    }

    const url = `${process.env.GAS_BASE_URL}?plateNumber=${encodeURIComponent(plateNumber)}`;

    const response = await fetch(url); // Use await for the fetch request

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    const data = await response.json(); // Parse JSON if the response is in JSON format

    log('Student Data: ', data); // Handle the data from the API

    // Return the data back to the Flutter frontend
    return res.json(data, 200);
  } catch (err) {
    error('Error message: ', err.message);

    return res.json(
      {
        message: 'An error occurred while processing your request.',
      },
      500
    );
  }
};
