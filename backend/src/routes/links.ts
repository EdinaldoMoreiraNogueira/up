import { Router } from 'express';
import LinksControlllers from '../controllers/links';

const router = Router();

router.post('/links', LinksControlllers.postLinks );

router.get('/links/:code', LinksControlllers.hitLinks);

router.get('/links/:code/status', LinksControlllers.getLinks);

export default router;