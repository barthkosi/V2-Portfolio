import { motion, Variants } from "motion/react"
import { springBouncy } from "../lib/transitions"
import { useState, useMemo } from "react";
import Head from "../components/Head";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import books from "../data/books.json";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ReadingList() {
  const [areBooksVisible, setAreBooksVisible] = useState(false);

  // Shuffle books once when component mounts
  const shuffledBooks = useMemo(() => shuffleArray(books), []);

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
      transition: springBouncy,
    },
  }

  return (
    <main>
      <div
        className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 h-auto lg:justify-left lg:row justify-center"
      >
        <Head title="barthkosi - reading list" description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands" />
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
          {shuffledBooks.map(book => (
            <motion.div
              key={book.id}
              variants={cardVariants}
            >
              <Card
                image={book.image}
                title={book.title}
                description={book.author}
                link={book.link}
                aspectRatio="aspect-[2/3]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}