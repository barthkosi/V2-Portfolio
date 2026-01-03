import { motion, Variants } from "motion/react"
import { springTransition } from "../lib/transitions"
import { useEffect, useState } from "react";
import InfoBlock from "../components/InfoBlock";
import BookCard from "../components/BookCard";
import books from "../data/books.json";

export default function ReadingList() {
  const [areBooksVisible, setAreBooksVisible] = useState(false);

  useEffect(() => {
    document.title = "barthkosi - reading list";
  }, []);

  const bookCount = books.length;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      <div
        className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 h-auto lg:justify-left lg:row justify-center"
      >
        <InfoBlock
          title="Reading List"
          number={bookCount}
          description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"
          onComplete={() => setAreBooksVisible(true)}
        />

        <motion.div
          className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={areBooksVisible ? "visible" : "hidden"}
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
                link={book.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}