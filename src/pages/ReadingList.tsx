import { motion, Variants } from "motion/react"
import { springTransition } from "../lib/transitions"
import { useEffect } from "react";
import InfoBlock from "../components/InfoBlock";
import BookCard from "../components/BookCard";

const books = [
  {
    id: "the-brand-gap",
    image: "https://res.cloudinary.com/barthkosi/image/upload/the-brand-gap.webp",
    title: "The Brand Gap",
    author: "Marty Neumeier",
  },
  {
    id: "steal-like-an-artist",
    image: "https://res.cloudinary.com/barthkosi/image/upload/steal-like-an-artist.webp",
    title: "Steal Like an Artist",
    author: "Austin Kleon",
  },
  {
    id: "the-alchemist",
    image: "https://res.cloudinary.com/barthkosi/image/upload/the-alchemist.avif",
    title: "The Alchemist",
    author: "Paulo Coelho",
  },
  {
    id: "drtcw",
    image: "https://res.cloudinary.com/barthkosi/image/upload/dieter-rams-the-complete-works.avif",
    title: "Dieter Rams: The Complete Works",
    author: "Klaus Klemp",
  },
  {
    id: "tdoet",
    image: "https://res.cloudinary.com/barthkosi/image/upload/the-design-of-everyday-things.jpg",
    title: "The Design of Everyday Things",
    author: "Don Norman",
  },
  {
    id: "ph",
    image: "https://res.cloudinary.com/barthkosi/image/upload/penguin-highway-cover.webp",
    title: "Penguin Highway",
    author: "Tomihiko Morimi",
  },
  {
    id: "native-son",
    image: "https://res.cloudinary.com/barthkosi/image/upload/native-son.png",
    title: "Native Son",
    author: "Richard Wright",
  },
]

export default function ReadingList() {
  useEffect(() => {
    document.title = "barthkosi - reading list";
  }, []);

  const bookCount = books.length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 3.4,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: springTransition,
    },
  }

  return (
    <main>
      <motion.div
        className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 h-auto lg:justify-left lg:row justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <InfoBlock
          title="Reading List"
          number={bookCount}
          description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"
        />

        <motion.div
          className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {books.map(book => (
            <motion.div
              key={book.id}
              variants={cardVariants}
            >
              <BookCard
                image={book.image}
                title={book.title}
                author={book.author}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}