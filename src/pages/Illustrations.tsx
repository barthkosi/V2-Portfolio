import { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Masonry, RenderComponentProps } from "masonic";
import Head from "../components/Head";
import { springBouncy } from "../lib/transitions";
import InfoBlock from "../components/InfoBlock";
import Card from "../components/Card";
import illustrations from "../data/illustrations.json";

type IllustrationItem = {
  id: string;
  image: string;
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

// Masonry card component - accepts isVisible prop to control animation
const IllustrationCard = ({
  data,
  index,
  isVisible,
}: RenderComponentProps<IllustrationItem> & { isVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ ...springBouncy, delay: index * 0.05 }}
  >
    <Card image={data.image} aspectRatio="auto" />
  </motion.div>
);

export default function Illustrations() {
  const [areImagesVisible, setAreImagesVisible] = useState(false);
  const { columnCount, gutter } = useResponsiveLayout();

  const imageCount = illustrations.length;

  const renderCard = useCallback(
    (props: RenderComponentProps<IllustrationItem>) => (
      <IllustrationCard {...props} isVisible={areImagesVisible} />
    ),
    [areImagesVisible]
  );

  return (
    <main>
      <div className="flex flex-col w-full gap-7 lg:gap-8 h-auto items-center justify-center">
        <Head
          title="barthkosi - illustrations"
          description="A visual diary of forms. I believe only in continued iteration."
        />
        <div className="max-w-[480px]">
          <InfoBlock
            variant="centered"
            title="Illustrations"
            number={imageCount}
            description="A visual diary of forms. I believe only in continued iteration. This page is a snapshot of my ever growing dialogue with color, light, and composition."
            onComplete={() => setAreImagesVisible(true)}
          />
        </div>
        <div className="w-full">
          <Masonry
            key={`${columnCount}-${gutter}`}
            items={illustrations}
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
