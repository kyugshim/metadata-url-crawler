import express from 'express';
import { metaCrawler } from '../controllers/metadata';
import controller from '../controllers/metaController';

const router = express.Router();


router.get('/get', controller.getAllMeta);

router.post('/post', async (req, res) => {
    const url = req.body.url;
    const metadata = await metaCrawler(url);
    res.json(metadata);
}, controller.createMeta);

export = router;