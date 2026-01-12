import { motion } from "motion/react";
import { Masonry, RenderComponentProps } from "masonic";
import { springBouncy } from "../lib/transitions";
import { useState, useMemo, useCallback, useEffect } from "react";
import Head from "../components/Head";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import books from "../data/books.json";

type BookItem = {
  id: string;
  image: string;
  title: string;
  author: string;
  link: string;
};

// Hook to get responsive column count and gutter
function useResponsiveLayout() {
  const [layout, setLayout] = useState({ columnCount: 3, gutter: 16 });

  useEffect(() => {
    const updateLayout = () => {
      // lg breakpoint is 1024px, md breakpoint is 768px
      if (window.innerWidth >= 1024) {
        setLayout({ columnCount: 3, gutter: 16 });
      } else if (window.innerWidth >= 768) {
        setLayout({ columnCount: 2, gutter: 16 });
      } else {
        setLayout({ columnCount: 2, gutter: 12 });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return layout;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Masonry card component for books
const BookCard = ({
  data,
  index,
  isVisible,
}: RenderComponentProps<BookItem> & { isVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ ...springBouncy, delay: index * 0.08 }}
  >
    <Card
      image={data.image}
      title={data.title}
      description={data.author}
      link={data.link}
      aspectRatio="aspect-[2/3]"
    />
  </motion.div>
);

export default function ReadingList() {
  const [areBooksVisible, setAreBooksVisible] = useState(false);
  const { columnCount, gutter } = useResponsiveLayout();

  // Shuffle books once when component mounts
  const shuffledBooks = useMemo(() => shuffleArray(books), []);

  const bookCount = books.length;

  const renderCard = useCallback(
    (props: RenderComponentProps<BookItem>) => (
      <BookCard {...props} isVisible={areBooksVisible} />
    ),
    [areBooksVisible]
  );

  return (
    <main>
      <div className="flex flex-col lg:flex-row w-full gap-7 lg:gap-8 h-auto lg:justify-left lg:row justify-center">
        <Head
          title="barthkosi - reading list"
          description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"
        />
        <InfoBlock
          title="Reading List"
          number={bookCount}
          description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"
          onComplete={() => setAreBooksVisible(true)}
        />

        <div className="w-full">
          <Masonry
            key={`${columnCount}-${gutter}`}
            items={shuffledBooks}
            columnGutter={gutter}
            columnCount={columnCount}
            overscanBy={5}
            render={renderCard}
          />
        </div>
      </div>
    </main>
  );
}