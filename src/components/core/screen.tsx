import Head from 'next/head'
import React from 'react'

type Props = {
  children?: React.ReactNode
  title?: string
  pageTitle?: string
}

const Screen = ({
  children,
  title = 'Manager Dashboard',
  pageTitle
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {pageTitle && <h2 className="font-bold text-2xl mb-4">{pageTitle}</h2>}
      {children}
    </>
  )
}

export default Screen
