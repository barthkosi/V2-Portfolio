export default function Home() {
  return (
    <>
      <main>
        <div className="flex flex-row gap-8">
          <div className="w-full flex flex-col gap-2 justify-center text-left">
            <h1>Barth creates visual systems and digital experiences</h1>
            <p className= "body-l-medium text-[var(--content-secondary)]">Explore my portfolio of web interactions, engineered solutions, and dynamic motion design that aims to inject joy into the digital world.</p>
          </div>
          <div className="w-full aspect-square ">
             <div className= "w-full aspect-square bg-[var(--background-secondary)] transform [transform:perspective(500px)_skewX(-24deg)]"></div>
          </div>
        </div>
      </main>
    </>
  );
}
