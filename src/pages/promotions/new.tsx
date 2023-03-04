import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "src/core/layouts/Layout";
import createPromotion from "src/promotions/mutations/createPromotion";
import {
  PromotionForm,
  FORM_ERROR,
} from "src/promotions/components/PromotionForm";

const NewPromotionPage = () => {
  const router = useRouter();
  const [createPromotionMutation] = useMutation(createPromotion);

  return (
    <Layout title={"Create New Promotion"}>
      <h1>Create New Promotion</h1>

      <PromotionForm
        submitText="Create Promotion"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePromotion}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const promotion = await createPromotionMutation(values);
            await router.push(
              Routes.ShowPromotionPage({ promotionId: promotion.id })
            );
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.PromotionsPage()}>Promotions</Link>
      </p>
    </Layout>
  );
};

NewPromotionPage.authenticate = true;

export default NewPromotionPage;
