## How to run

You need node version `22+`. I used node 24 in development but node 22 should be fine.
If you have `nvm`, you can do `nvm install 24` `nvm use 24` to easily switch to node 24.

First install the dependencies by running `npm install`

Then, to run in production mode, use `npm run build` then `npm run preview`

To run in dev mode, use `npm run dev`.

## Apis

I used `msw` to mock the api layer, so there is no need to run something other than the frontend host. `msw` works by intercepting network calls using a service worker.

## Comments