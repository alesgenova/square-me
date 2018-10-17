import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'grid-me',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
