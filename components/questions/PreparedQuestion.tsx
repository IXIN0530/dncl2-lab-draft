import Link from "next/link";

type Props = {
  href: string;
  title: string;
  children: React.ReactNode;
}

const PreparedQuestion = ({ href, title, children }: Props) => {
  return (
    <Link href={href} className="bg-3 rounded-xl p-2 hover:bg-gray-300 flex">
      {children}
      {title}
    </Link>
  )
}

export default PreparedQuestion;