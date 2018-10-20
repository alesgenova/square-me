import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'square-me',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
