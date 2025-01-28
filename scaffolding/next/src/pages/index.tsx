import localFont from "next/font/local";

import { cn } from "@/utils";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { ListType } from "@/pages/api/list";

const akira = localFont({
  src: "../fonts/Akira.otf",
});

const getListItems = async (): Promise<ListType> => {
  const res = await fetch("/api/list");
  if (!res.ok) {
    throw new Error(`Failed to fetch list items`);
  }
  return res.json();
};

export default function Home() {
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: getListItems,
  });

  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center p-20 bg-slate-900/90 text-slate-200">
      <h1 className={cn(akira.className, "font-semibold text-4xl")}>
        Haes Boiler Plate
      </h1>
      <div className="flex sm:flex-row flex-col gap-10 sm:gap-40">
        <ul>
          <h3 className="text-xl gap-2 font-semibold mb-1">Default:</h3>
          {data?.default.map((item) => {
            return (
              <li className="text-xl gap-2" key={item}>
                - {item}
              </li>
            );
          })}
        </ul>
        <ul>
          <h3 className="text-xl gap-2 font-semibold mb-1">Optional:</h3>
          {data?.optional.map((item) => {
            return (
              <li className="text-xl gap-2" key={item}>
                - {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["list"],
    queryFn: getListItems,
  });
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
