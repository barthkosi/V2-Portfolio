import InfoBlock from "../components/InfoBlock";

export default function Home() {
    return (
      <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 h-auto lg:justify-left lg:row justify-center">
        <div>
          <InfoBlock
          title="Reading List"
          number={12}
          description="Completed interactive projects and experiments."></InfoBlock>
        </div>
          <div className= "w-full aspect-square bg-[var(--background-secondary)] transform [transform:perspective(500px)_skewX(-24deg)]"></div>
      </div>
    );
  }
  