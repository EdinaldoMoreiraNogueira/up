import LinksModels, { ILinkModel } from './linksModels';
import { Link } from './link';


const findByCode = (code: string) =>
   LinksModels.findOne<ILinkModel>({ where: { code } });


const add = ( link: Link) =>
   LinksModels.create<ILinkModel>(link);


const hit = async (code: string)=> {
  const link = await findByCode(code);
  if (!link){ 
    return null
  }

  link.hits!++;
  await link.save();

  return link;
}

export default {
    findByCode,
    add,
    hit,
}