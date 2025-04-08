import { Brand } from "./brand";
import { Navbar } from "./navbar";

export function AppHeader() {
  return (
    <header className="bg-blue-950 flex flex-row items-center gap-2 px-4">
      <Brand />
      <Navbar />
    </header>
  )
}
