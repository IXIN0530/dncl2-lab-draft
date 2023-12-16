import AppTitle from "@/components/home/AppTitle";
import CreatedPrograms from "@/components/home/CreatedPrograms";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4 min-h-[100svh] flex flex-col justify-between max-w-xl mx-auto">
      <AppTitle />
      <CreatedPrograms />
      <div className="">
        <Link href={"/introduction"} className="block w-full mb-4 py-2 text-center bg-2 rounded-xl">introduction(仮)</Link>
        <Link href={"/questions"} className="block w-full mb-4 py-2 text-center bg-2 rounded-xl">問題を解く</Link>
        <Link href={"/editor"} className="p-2 text-white rounded-xl text-center block mx-auto w-full bg-main hover:bg-main-hover">プログラムを作成</Link>
      </div>
    </div>
  );
}

export default Page;