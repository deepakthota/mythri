import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./browser-tests',
 timeout:30000,
 expect:{timeout:10000},
 retries:1,
 workers:1,
 use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure'},
 projects:[
  {name:'chromium',use:{browserName:'chromium'}},
  {name:'firefox',use:{browserName:'firefox'}},
  {name:'webkit',use:{browserName:'webkit'}}
 ],
 webServer:{command:'node dev-server.mjs',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI,timeout:30000}
});
