import React from 'react'
import Sidebar from './sidebar'

type Props = {
  children?: React.ReactNode
}

const PageWrapper = ({ children }: Props) => {
  return (
    <>
      <aside>
        <Sidebar />
      </aside>
      <main className={`ml-auto w-[calc(100%_-_74px)] base:p-4 xl:p-6`}>
        {children}
      </main>
    </>
  )
}

export default PageWrapper
