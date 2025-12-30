## How to run

You need node version `22+`. I used node 24 in development but node 22 should be fine.
If you have `nvm`, you can do `nvm install 24` `nvm use 24` to easily switch to node 24.

First install the dependencies by running `npm install`

Then, to run in production mode, use `npm run build` then `npm run preview`

To run in dev mode, use `npm run dev`.

## Apis

I used `msw` to mock the api layer, so there is no need to run something other than the frontend host. `msw` works by intercepting network calls using a service worker.

## Comments

I focused mainly on the products and login pages, this is where I followed best practices for components composition and accessibility. I added listing, pagination, filtering, decent image optimization, and used react query to represent the server state, and msw and a mock to abstract the backend layer.

But in other pages, even in login and products pages, there is room for improvement in reusability and code structure, but I was iterating fast and I was planning to refactor a little at the end if I still had time.

Regarding the size of the mock data, I added 40 items because I am currently rendering about 6 to 10 products at once on ui and the pagination is done on the backend server (msw api), so adding more items would not slow down the ui. That is also why so I only implemented pagination without virtualization (that I would have done with react virtuozo).

I used radix unstyled primitives for the good composition and accessibility they offer, and implemented my own design theme.
I am using Linaria which is a zero runtime css library. I created my own theme structure (inspired by mui theme) and applied it using Linaria. So all the css in the application is statically generated at build time, even styled components.
Linaria allowed me to write css syntax, and still have the composability of js modules and react components, with 0 runtime.

The theme can change and it is built to support that, but because I ran out of time I left both the dark and light themes using the same palettes.