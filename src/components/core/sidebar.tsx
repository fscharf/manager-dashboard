import { useRoutes } from 'hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const routes = useRoutes()
  const router = useRouter()

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return
    event.preventDefault()
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }

  const handleMouseEnter = () => {
    if (isMobile) return
    setIsVisible(true)
  }

  return (
    <nav
      className={`fixed left-0 h-screen flex flex-col items-center gap-2 p-4 z-[999] bg-neutral-800 transition-all`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href="/"
        className="transition-all bg-indigo-700 p-2 rounded flex items-center w-full justify-center"
      >
        <span className="font-bold">
          {isVisible ? 'Manager Dashboard' : 'M'}
        </span>
      </Link>
      <span className="border border-neutral-700 w-full my-4"></span>
      {routes.map(({ Icon, target, label }, key) => {
        return (
          <Link
            key={key}
            href={target}
            onClick={() => setIsVisible(false)}
            className={`transition-all hover:bg-neutral-700 p-2 rounded flex items-center gap-2 ${
              router.pathname === target ? 'bg-neutral-700' : ''
            } ${isVisible ? 'w-full' : 'w-max'}`}
          >
            <Icon className="w-[24px]" />
            {isVisible ? label : null}
          </Link>
        )
      })}
    </nav>
  )
}
export default Sidebar
