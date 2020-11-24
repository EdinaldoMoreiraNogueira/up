import { Request, Response } from 'express';
import{ Link }from '../models/link';
import linksRepository from '../models/linksRepository';


function generateCode(){
    let text = "";
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    for(let i = 0; i < 5; i++); 
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

async function postLinks(request: Request, response: Response){
    const link = request.body as Link;
    link.code = generateCode();
    link.hits = 0;
   const result = await linksRepository.add(link);

   if(!result.id) response.status(404);

   link.id = result.id!;

   response.status(201).json(link);
  
}

async function getLinks(request: Request, response: Response){
    const code = request.params.code as string;
    const link = await linksRepository.findByCode(code);
    if(!link){
        response.sendStatus(404);
    } else {
        response.json(link);
    }
}

async function hitLinks(request: Request, response: Response){
    const code = request.params.code as string;
    const links = await linksRepository.hit(code);
    if(!links){
        response.sendStatus(404);
    } else {
        
        response.json(links);
    }
}

export default {
    postLinks,
    getLinks,
    hitLinks,
}