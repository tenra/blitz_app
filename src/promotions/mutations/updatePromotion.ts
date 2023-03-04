import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdatePromotion = z.object({
  id: z.number(),
  title: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdatePromotion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const promotion = await db.promotion.update({ where: { id }, data });

    return promotion;
  }
);
