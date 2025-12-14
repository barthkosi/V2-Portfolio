import InfoBlock from "../components/InfoBlock";
import BookCard from "../components/BookCard";

const books = [
  {
    id: "penguin-highway",
    image: "https://image.tmdb.org/t/p/original/1VVQLpTkabrjRvQOuEpRxz9pVe5.jpg",
    title: "Penguin Highway",
    author: "Brad Frost",
  },
  {
    id: "another-book",
    image: "https://image.tmdb.org/t/p/original/1VVQLpTkabrjRvQOuEpRxz9pVe5.jpg",
    title: "Another Book",
    author: "Someone Else",
  },
  {
    id: "a-another-book",
    image: "https://image.tmdb.org/t/p/original/1VVQLpTkabrjRvQOuEpRxz9pVe5.jpg",
    title: "a-Another Book",
    author: "Someone Else",
  },
  {
    id: "third-book",
    image: "https://image.tmdb.org/t/p/original/1VVQLpTkabrjRvQOuEpRxz9pVe5.jpg",
    title: "Third Book",
    author: "Another Author",
  },
]

export default function Home() {
  const bookCount = books.length
    return (
      <div className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 h-auto lg:justify-left lg:row justify-center">
        <div>
          <InfoBlock
          title="Reading List"
          number={bookCount}
          description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"></InfoBlock>
        </div>
        
        <div className="w-full gap-4 grid grid-cols-2 lg:grid-cols-3">
      {books.map(book => (
        <BookCard
          key={book.id}
          image={book.image}
          title={book.title}
          author={book.author}
        />
      ))}
    </div>
       </div>
    );
  }
  