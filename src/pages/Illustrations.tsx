import InfoBlock from "../components/InfoBlock";

    
const images = [
  {
    id: "1",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899901/Tennis_Illustration_lb6fgp.png",
    
  },
  {
    id: "2",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899899/Jake_illustration_welkzu.png",
    
  },
  {
    id: "3",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899894/illustration_f5fi66.png"
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899899/illustration-1_esjizz.png",
    
  },
  {
    id: "5",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765899893/Cassette_illustration_Isometriic_kkvkn8.png",
   
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
            description=""
          />
          </div>
          <div className="w-full columns-2 lg:columns-3 gap-2 md:gap-4">
         {images.map((item) => (
           <div key={item.id} className="mb-4 break-inside-avoid">
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