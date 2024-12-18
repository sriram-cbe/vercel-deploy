import React, { useEffect, useRef, useState } from "react";
type Posts = {
  id: number;
  title: string;
  body: string;
};
const ExampleComponent = () => {
  const [data, setData] = useState<Posts[]>([]);
  const BASE_URL = "https://jsonplaceholder.typicode.com";
  const [page, setPage] = useState(1);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    (async () => {
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const res = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current.signal,
        });
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [page]);

  return (
    <div>
      <button
        onClick={() => setPage(page + 1)}
        className="m-2 p-2 bg-purple-500 text-white rounded-md"
      >
        Increase Page ({page})
      </button>
      {data ? (
        <div>
          {data.map((post) => (
            <div key={post.id} className="flex flex-col items-center text-left">
              <div className=" border-gray-100 border-spacing-1 w-2/3 bg-slate-200 rounded-md p-2 mt-4 mb-4 hover:shadow-md hover:shadow-slate-500 hover:bg-slate-300">
                <p className="text-lg text-red-800">{`ID - ${post.id}`}</p>
                <p className="text-lg text-purple-800 italic">
                  {post.title.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="bg-lime-300">Loading...</p>
      )}
    </div>
  );
};

export default ExampleComponent;
