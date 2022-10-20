import express, { json } from 'express';
import { createUser, getUsers, getUser, deleteUser, patchUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:email', getUser);

router.delete('/:email', deleteUser);

router.patch('/:email', patchUser);

export default router;