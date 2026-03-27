import { http, HttpResponse } from 'msw';

// Define mock API handlers here.
// Import sample data generators from @model as you add entities:
//   import { createEntitySample } from '@model';

export const handlers = [
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok' });
  }),
];
