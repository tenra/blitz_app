import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetPromotionsInput
  extends Pick<
    Prisma.PromotionFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPromotionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: promotions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.promotion.count({ where }),
      query: (paginateArgs) =>
        db.promotion.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      promotions,
      nextPage,
      hasMore,
      count,
    };
  }
);
