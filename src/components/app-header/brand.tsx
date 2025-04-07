import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <div className="border-r border-r-slate-700 p-2 pr-4">
      <Link href="/" className="flex flex-row gap-2">
        <Image src="/logo.svg" width={584} height={526} alt="" className="w-[40px]" />
        <h1 className="text-slate-50 text-2xl">DBBM</h1>
      </Link>
    </div>
  )
}
