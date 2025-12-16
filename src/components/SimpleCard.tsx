type SimpleCardProps = {
    image: string
  }
  
  export default function SimpleCard({ image }: SimpleCardProps) {
    return (
      <div className="w-full p-2 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
        <div className="relative w-full aspect-video overflow-hidden rounded-xl">
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    )
  }
  