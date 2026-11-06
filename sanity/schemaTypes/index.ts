import { author } from "./author";
import { blockContent } from "./blockContent";
import { calloutBlock } from "./blocks/calloutBlock";
import { ctaButtonBlock } from "./blocks/ctaButtonBlock";
import { htmlBlock } from "./blocks/htmlBlock";
import { tableBlock } from "./blocks/tableBlock";
import { category } from "./category";
import { post } from "./post";
import { review } from "./review";

export const schemaTypes = [
  post,
  review,
  author,
  category,
  blockContent,
  tableBlock,
  ctaButtonBlock,
  calloutBlock,
  htmlBlock,
];
