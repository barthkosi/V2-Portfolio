// /api/books.ts
import { Client } from "@notionhq/client"
import type { VercelRequest, VercelResponse } from "@vercel/node"

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})


export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  })

  const books = response.results.map((page: any) => ({
    id: page.id,
    title: page.properties?.Title?.title?.[0]?.plain_text ?? "Untitled",
    author: page.properties?.Author?.rich_text?.[0]?.plain_text ?? "Unknown",
    image:
      page.properties?.Cover?.files?.[0]?.file?.url ??
      page.properties?.Cover?.files?.[0]?.external?.url ??
      "",
  }))
  

  res.status(200).json(books)
}
