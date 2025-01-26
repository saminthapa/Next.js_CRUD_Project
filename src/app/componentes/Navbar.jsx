import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between">
    <a className="font-bold text-xl tracking-tight" href="#">STK</a>
    <div className="flex items-center">
        <Link className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700" href="/">Home</Link>
        <Link className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700" href="#">About</Link>
        <Link className="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700" href="/create">Create</Link>
    </div>
</nav>
  )
}

export default Navbar

