import { useEffect, useState } from "react"
import InfoBlock from "../components/InfoBlock"
import BookCard from "../components/BookCard"

type Book = {
  id: string
  title: string
  author: string
  image: string
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetch("/api/books")
      .then(res => res.json())
      .then(setBooks)
  }, [])

  const bookCount = books.length

  return (
    <div className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 justify-center">
      <div className="self-start">
        <InfoBlock
          title="Reading List"
          number={bookCount}
          description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"
        />
      </div>

      <div className="w-full gap-4 grid grid-cols-2 lg:grid-cols-3">
        {books.map(book => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  )
}
