import { useRoutes } from 'hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const routes = useRoutes()
  const router = useRouter()

  return (
    <nav
      className={`fixed left-0 h-screen flex flex-col items-center gap-2 p-4 z-[999] bg-neutral-800 transition-all`}
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
      <article className="h-full flex flex-col justify-between">
        <section className="flex flex-col gap-2">
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
        </section>
        <section className="justify-self-end self-end">
          <button
            className="transition-all hover:bg-neutral-700 p-2 rounded flex items-center gap-2"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <ArrowLeft /> : <ArrowRight />}
          </button>
        </section>
      </article>
    </nav>
  )
}
export default Sidebar
