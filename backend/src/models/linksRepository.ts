import LinksModels, {ILinkModel} from './linksModels';
import { Link } from './link';


function findByCode(code: string) {
  return LinksModels.findOne<ILinkModel>({ where: {code}});
}

function add( link: Link) {
  return LinksModels.create<ILinkModel>(link);
}

async function hit(code: string) {
  const link = await findByCode(code);
  if (!link) return null;

  link.hits!++;
  await link.save();

  return link;
}

export default {
    findByCode,
    add,
    hit,
}