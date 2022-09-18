// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url: any = process.env.API_PARTICIPANTES;
  /*
  const session = await getToken({
    req,
    secret: process.env.SECRET,
  });
  if (!session) {
    return res.status(401).json("Auth Required");
  }*/
  const response = await axios.get(url);
  const data = await response.data;

  return res.status(200).json({ data });
}
