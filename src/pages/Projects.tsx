import { useEffect } from "react";

export default function Projects() {
  useEffect(() => {
    document.title = "barthkosi - projects";
  }, []);

  return (
    <main className="flex flex-col items-center">

      <h3 className="flex-1">Coming Soon!</h3>

    </main>
  );
}