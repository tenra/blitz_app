import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreatePromotion = z.object({
  userId: z.number(),
  title: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreatePromotion),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const promotion = await db.promotion.create({ data: input });

    return promotion;
  }
);
