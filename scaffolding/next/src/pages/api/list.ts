// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type ListType = { default: string[]; optional: string[] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListType>
) {
  res.status(200).json({
    default: [
      "nextjs pages router",
      "tailwindcss",
      "typescript",
      "react-query",
      "toast",
      "lucide",
    ],
    optional: ["framer motion", "sqlite"],
  });
}
