import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeletePromotion = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeletePromotion),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const promotion = await db.promotion.deleteMany({ where: { id } });

    return promotion;
  }
);
