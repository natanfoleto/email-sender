import { Router } from 'express';

import { CheckWebhookController } from '@modules/webhook/useCases/checkWebhook/checkWebhookController';
import { RequestWebhookController } from '@modules/webhook/useCases/requestWebhook/requestWebhookController';

const webhookRoutes = Router();

webhookRoutes.get('/', new CheckWebhookController().handle);

webhookRoutes.post('/', new RequestWebhookController().handle);

export { webhookRoutes };
