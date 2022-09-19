import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "../../../database/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /* const session = await getToken({
    req,
    secret: process.env.SECRET,
  });
  if (!session) {
    return res.status(401).json("Auth Required");
  }*/
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        // acesso ao mongodb e obter os usuarios do meu banco
        const { db } = await connectToDatabase();
        const data = await db.collection("users").find().toArray();

        res.status(200).json(data);
        break;

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
