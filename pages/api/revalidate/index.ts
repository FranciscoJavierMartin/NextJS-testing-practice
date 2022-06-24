import type { NextApiRequest, NextApiResponse } from 'next';
import { createHandler } from '@/lib/api/handler';

const handler = createHandler();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.APP_ENV !== 'test') {
    res.status(401).json({ message: 'endpoint only available for test use' });
  } else if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    res.status(401).json({ message: 'invalid revalidation secret' });
  } else {
    await res.unstable_revalidate('/shows');
    await res.unstable_revalidate('/bands');
    res.status(200).end();
  }
});

export default handler;
