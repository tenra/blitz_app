import React, { Suspense, useState } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getUser from "src/users/queries/getUser";
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
//import deleteUser from "src/users/mutations/deleteUser";
import { UserEditModal } from "src/users/components/UserEditModal";

export const User = () => {
  const router = useRouter();
  const userId = useParam("userId", "number");
  //const [deleteUserMutation] = useMutation(deleteUser);
  const [user] = useQuery(getUser, { id: userId });
  const currentUser = useCurrentUser()
  //console.log(currentUser)

  return (
    <>
      <Head>
        <title>user {user.id}</title>
      </Head>

      <div>
        <h1>{user.name}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        {currentUser?.id === user.id ?
          <>
            <UserEditModal />
            <Link href={Routes.EditUserPage({ userId: user.id })}>
              edit
            </Link>
          </>
        : null}

        {/*<button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserMutation({ id: user.id });
              await router.push(Routes.UsersPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>*/}
      </div>
    </>
  );
};

const ShowUserPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.UsersPage()}>Users</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  );
};

ShowUserPage.authenticate = { redirectTo: "/" }
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowUserPage;
