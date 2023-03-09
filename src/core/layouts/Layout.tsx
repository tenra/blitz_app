import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import Header from "src/core/layouts/Header"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "blitz_app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  )
}

export default Layout
