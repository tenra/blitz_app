import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getPromotion from "src/promotions/queries/getPromotion";
import deletePromotion from "src/promotions/mutations/deletePromotion";

export const Promotion = () => {
  const router = useRouter();
  const promotionId = useParam("promotionId", "number");
  const [deletePromotionMutation] = useMutation(deletePromotion);
  const [promotion] = useQuery(getPromotion, { id: promotionId });

  return (
    <>
      <Head>
        <title>Promotion {promotion.id}</title>
      </Head>

      <div>
        <h1>Promotion {promotion.id}</h1>
        <pre>{JSON.stringify(promotion, null, 2)}</pre>

        <Link href={Routes.EditPromotionPage({ promotionId: promotion.id })}>
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePromotionMutation({ id: promotion.id });
              await router.push(Routes.PromotionsPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowPromotionPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PromotionsPage()}>Promotions</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Promotion />
      </Suspense>
    </div>
  );
};

ShowPromotionPage.authenticate = { redirectTo: "/" }
ShowPromotionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowPromotionPage;
