import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Minimal Chair' },
    { id: 2, name: 'Ceramic Planter' },
  ]);
});

export default router;
