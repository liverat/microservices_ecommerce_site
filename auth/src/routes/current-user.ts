import express from 'express';
import { currentUser, requireAuth } from '@liverattickets/common';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req, res) => {
  console.log(req.session!.jwt);
  res.send({currentUser: req.currentUser || null});
})


export { router as currentUserRouter };