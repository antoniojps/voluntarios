import { errSchema, resSchema } from '../../utils/schemas';
import fetch from 'isomorphic-unfetch';
import queryString from 'query-string'

const { GOOGLE_PLACES_API_KEY } = process.env;

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const {
        query: { search },
      } = req;

      if (!search) {
        res.status(400).json(errSchema('Invalid parameters', 401));
      }
      const params = {
        key: GOOGLE_PLACES_API_KEY,
        input: search,
        inputtype: 'textquery',
        language: 'pt-PT',
        fields: 'name,geometry',
      }
      const query = queryString.stringify(params, { encode: false })
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${query}`

      try {
        const placesRes = await fetch(url)
        const data = await placesRes.json()
        const { candidates } = data
        let location = {
          name: null,
          geolocation: {
            lat: null,
            lng: null,
          },
        }
        if (candidates.length > 0) {
          const candidate = candidates[0]
          location.name = candidate.name
          location.geolocation = candidate.geometry.location
        }
        res.status(200).json(
          resSchema(
            location,
            200,
          ),
        );
      } catch (err) {
        res
          .status(500)
          .json(errSchema(err.message || 'error searching place', 500));
      }
      break;
    }
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
