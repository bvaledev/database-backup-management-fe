'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const pages = [
  {
    href: '/datasources',
    label: 'Datasources'
  },
]
export function Navbar() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <nav className="flex">
      {pages.map((page) => {
        const isCurrentPage = pathname === page.href
        return (
          <Link
            key={page.href}
            href={page.href}
            className={cn(isCurrentPage && 'brightness-110', 'px-4 py-4 text-slate-50 uppercase text-sm font-semibold bg-blue-950 hover:brightness-125 transition-colors ease-in-out')}>
            {page.label}
          </Link>
        )
      })}
    </nav>
  )
}
