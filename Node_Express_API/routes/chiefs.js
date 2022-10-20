import express, { json } from 'express';
import { createChief, getChiefs, getChief, deleteChief, patchChief } from '../controllers/chiefs.js';

const router = express.Router();

router.get('/', getChiefs);

router.post('/', createChief);

router.get('/:email', getChief);

router.delete('/:email', deleteChief);

router.patch('/:email', patchChief);



export default router;