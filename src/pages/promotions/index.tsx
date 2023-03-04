import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import getPromotions from "src/promotions/queries/getPromotions";

const ITEMS_PER_PAGE = 100;

export const PromotionsList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ promotions, hasMore }] = usePaginatedQuery(getPromotions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.id}>
            <Link
              href={Routes.ShowPromotionPage({ promotionId: promotion.id })}
            >
              {promotion.title}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const PromotionsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Promotions</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPromotionPage()}>Create Promotion</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PromotionsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default PromotionsPage;
