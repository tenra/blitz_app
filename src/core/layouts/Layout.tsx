import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import Link from "next/link"

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
      <header>
        <Link href={Routes.Home()}>homepage</Link>
      </header>
      {children}
    </>
  )
}

export default Layout
