// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import locateData from './data';

export default function handler({ query: { id } }, res) {
  const informations = locateData(id);
  res.status(200).json({ informations });
}
