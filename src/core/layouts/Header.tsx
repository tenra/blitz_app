import React from 'react';
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"

export const Header: React.FC = () => {
  const [logoutMutation] = useMutation(logout)

  const handleLogout = async () => {
      await logoutMutation();
  };

  return (
    <header>
      <Link href={Routes.Home()}>homepage</Link>/
      <Link href={Routes.UsersPage()}>UsersPage</Link>/
      <Link href={Routes.PromotionsPage()}>PromotionsPage</Link>/
      <button onClick={handleLogout} className="bg-green-300">
        Logout
      </button>
    </header>
  )
}
