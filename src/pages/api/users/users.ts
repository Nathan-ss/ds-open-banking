import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const body = JSON.parse(req.body);

    if (!body.name || !body.email || !body.password) {
      res.status(400).json({ error: "Não existe parâmetros para registro" });
    }

    switch (method) {
      case "POST":
        const client = await MongoClient.connect(process.env.MONGODB_URI, {});

        const db = client.db(process.env.MONGODB_DB);
        const users = await db.collection("users");
        const result = await users.findOne({
          email: body.email,
        });
        // acesso ao mongodb e obter os usuarios do meu banco
        if (result == null) {
          const response = await db.collection("users").insertOne({
            name: body.name,
            email: body.email,
            password: body.password,
            img: "",
          });
          res.status(200).json("registro feito com sucesso");
        }
        if (result) {
          res.status(400).json("Email existente");
        }
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
