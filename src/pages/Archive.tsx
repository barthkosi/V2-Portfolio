import { useEffect } from "react";

export default function Archive() {
  useEffect(() => {
    document.title = "barthkosi - archive";
  }, []);

  return (
    <main>
      <div className="flex flex-col my-auto items-center w-full gap-7">

        <h3 className="my-auto h-full">Coming Soon!</h3>

      </div>
    </main>
  );
}