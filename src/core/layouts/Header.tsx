import React, { Suspense } from 'react';
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const UserInfo = () => {
  const currentUser = useCurrentUser()

  return (
    <>
      <Link href={`/users/${currentUser?.id}`}>
        {currentUser?.name}
      </Link>/
    </>
  )
}

const Header = () => {
  const [logoutMutation] = useMutation(logout)

  const handleLogout = async () => {
      await logoutMutation();
  };

  return (
    <header>
      <Link href={Routes.Home()}>homepage</Link>/
      <Link href={Routes.PromotionsPage()}>PromotionsPage</Link>/
      <Link href={Routes.UsersPage()}>UsersPage</Link>/
      <button onClick={handleLogout} className="bg-green-300">
        Logout
      </button>/
      <Suspense fallback="">
        <UserInfo />
      </Suspense>
    </header>
  )
}
export default Header
