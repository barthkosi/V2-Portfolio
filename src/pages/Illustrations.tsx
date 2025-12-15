import InfoBlock from "../components/InfoBlock";

    
const images = [
  {
    id: "1",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765758418/penguin-highway-cover.webp",
    
  },
  {
    id: "2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdKXCM1YMg14hIsVmmu5JOlCKLr8VT3Cvaw&s",
    
  },
  {
    id: "3",
    image: "https://d2vbr83hnyiux1.cloudfront.net/image/975050285728/image_4lqdtu00bd17l6jlamum1t4v73/-FWEBP"
  },
  {
    id: "4",
    image: "https://res.cloudinary.com/barthkosi/image/upload/v1765758418/penguin-highway-cover.webp",
    
  },
  {
    id: "5",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdKXCM1YMg14hIsVmmu5JOlCKLr8VT3Cvaw&s",
   
  },
  {
    id: "6",
    image: "https://d2vbr83hnyiux1.cloudfront.net/image/975050285728/image_4lqdtu00bd17l6jlamum1t4v73/-FWEBP"
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
          <div className="w-full columns-2 lg:columns-3 gap-4">
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