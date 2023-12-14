import MyLink from "@/components/MyLink";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold my-8">Title</h1>
      <p>共通テスト情報受験生のためのプログラミングツール</p>
      <div className="mt-8 p-4 grid grid-cols-2 gap-4 bg-white rounded-xl">
        <MyLink href={"/create"} text="作成" />
        <MyLink href={"/create"} text="作成" />
        <MyLink href={"/create"} text="作成" />
        <MyLink href={"/create"} text="作成" />
      </div>
    </div>
  )
}
