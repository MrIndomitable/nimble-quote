import config from './config/config';
import { configureApp } from './server';

const PORT = (process.env as any).PORT || 5000;
configureApp(config).then(app => app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
}));