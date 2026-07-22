import 'dotenv/config';
import app from './src/app.js';
import { connectDB } from './src/db.js';
import { seedAdmin } from './src/seed.js';

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
