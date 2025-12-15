import InfoBlock from "../components/InfoBlock";

    
const images = [
  {
    id: "1",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765758418/penguin-highway-cover.webp",
    
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765758418/penguin-highway-cover.webp",
    
  },
  {
    id: "3",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765758418/penguin-highway-cover.webp",
    
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765758418/penguin-highway-cover.webp",
    
  },
  {
    id: "5",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765758418/penguin-highway-cover.webp",
   
  },
] 
export default function illustrations() {
  const imageCount = images.length;
  
  return (
    <main>
      <div className="flex flex-col w-full gap-7 lg:gap-8 h-auto items-center justify-center">
          <div className="max-w-[480px]"><InfoBlock
            variant="centered"
            title="Illustrations"
            number={imageCount}
            description="Reading more is one of my biggest goals. This list shifts and grows as new titles find their way into my hands"
          />
          </div>
      <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {images.map((item) => (
    <div key={item.id} className="w-full">
      <img
          src={item.image}
          alt=""
          className="w-full h-auto object-cover rounded-lg"
      />
        </div>
          ))}
        </div>
      </div>
    </main>
  );
}