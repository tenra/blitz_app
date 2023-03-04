import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getUser from "src/users/queries/getUser";
import updateUser from "src/users/mutations/updateUser";
import { UserForm, FORM_ERROR } from "src/users/components/UserForm";

export const EditPromotion = () => {
  const router = useRouter();
  const userId = useParam("userId", "number");
  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: userId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateUserMutation] = useMutation(updateUser);

  return (
    <>
      <Head>
        <title>Edit user {user.id}</title>
      </Head>

      <div>
        <h1>Edit user {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <UserForm
          submitText="Update Promotion"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePromotion}
          initialValues={user}
          onSubmit={async (values) => {
            try {
              const updated = await updateUserMutation({
                id: user.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowUserPage({ userId: updated.id })
              );
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditUserPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPromotion />
      </Suspense>

      <p>
        <Link href={Routes.UsersPage()}>Users</Link>
      </p>
    </div>
  );
};

EditUserPage.authenticate = true;
EditUserPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditUserPage;
