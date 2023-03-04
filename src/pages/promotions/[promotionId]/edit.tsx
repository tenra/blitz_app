import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getPromotion from "src/promotions/queries/getPromotion";
import updatePromotion from "src/promotions/mutations/updatePromotion";
import {
  PromotionForm,
  FORM_ERROR,
} from "src/promotions/components/PromotionForm";

export const EditPromotion = () => {
  const router = useRouter();
  const promotionId = useParam("promotionId", "number");
  const [promotion, { setQueryData }] = useQuery(
    getPromotion,
    { id: promotionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updatePromotionMutation] = useMutation(updatePromotion);

  return (
    <>
      <Head>
        <title>Edit Promotion {promotion.id}</title>
      </Head>

      <div>
        <h1>Edit Promotion {promotion.id}</h1>
        <pre>{JSON.stringify(promotion, null, 2)}</pre>

        <PromotionForm
          submitText="Update Promotion"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePromotion}
          initialValues={promotion}
          onSubmit={async (values) => {
            try {
              const updated = await updatePromotionMutation({
                id: promotion.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowPromotionPage({ promotionId: updated.id })
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

const EditPromotionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPromotion />
      </Suspense>

      <p>
        <Link href={Routes.PromotionsPage()}>Promotions</Link>
      </p>
    </div>
  );
};

EditPromotionPage.authenticate = true;
EditPromotionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditPromotionPage;
