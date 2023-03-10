import React, { Suspense } from 'react';
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { useRecoilValue } from "recoil";
import { currentUserState } from "src/users/hooks/currentUserState";

export const Header: React.FC = () => {
  const [logoutMutation] = useMutation(logout)

  const handleLogout = async () => {
      await logoutMutation();
  };

  const currentUser = useRecoilValue<any | null>(currentUserState);
  console.log("Header:currentUserState", currentUser);

  return (
    <header>
      <Link href={Routes.Home()}>homepage</Link>/
      <Link href={Routes.PromotionsPage()}>PromotionsPage</Link>/
      <Link href={Routes.UsersPage()}>UsersPage</Link>/
      <button onClick={handleLogout} className="bg-green-300">
        Logout
      </button>/
      <Link href={`/users/${currentUser?.id}`}>
        {currentUser?.name}
      </Link>/
    </header>
  )
}
