## Changes from main

- added a light theme and a theme switcher button
- fixed lazy loaded routes not showing loader on navigation (navigation in dev is still slow on first encounter because the lazy loaded components are esm built at run-time. production build is normally fast)
- added a global loading indicator on api calls.
- refactored/cleaned the wrapped fetch
- cleaned App.tsx startup code and removed duplicate msw calls
- removed some unused code

## Screenshots

<img width="1512" height="785" alt="image" src="https://github.com/user-attachments/assets/50c5ae94-921a-42cb-bcf0-9ed6d18a14fe" />


<img width="747" height="785" alt="image" src="https://github.com/user-attachments/assets/9ad56c8a-1e5e-4ff6-ac5b-01707e659892" />


<img width="747" height="785" alt="image" src="https://github.com/user-attachments/assets/f24043b1-72b8-43a2-be7a-858c899187f3" />



## How to run

You need node version `22+`. I used node 24 in development but node 22 should be fine.
If you have `nvm`, you can do `nvm install 24` `nvm use 24` to easily switch to node 24.

First install the dependencies by running `npm install`

To run use `npm run build` then `npm run preview` (runs in production mode which is preferred)

To run in dev mode, use `npm run dev` (in dev mode only, first time navigation will be slow)

## Apis

I used `msw` to mock the api layer, so there is no need to run something other than the frontend host. `msw` works by intercepting network calls using a service worker.

## Design decisions

### Structure 

I've split the code into 4 layers: api (satisfies the backend), design (satisfies the design), app (satisfies both the backend, the design and the app's logic like routing and initialization) and lib (shared services and utilities)

The dependency rule is: 
- app can depend on api, design and lib (app can depend on any group - it's where the core features are implemented)
- api can only depend on lib
- design can only depend on lib

There's another folder in the root called feature, this belongs in the app group since it's free to use all other groups. It's in root because it's easier to access.

I considered a feature a page, so i followed next.js app router structure.
`features/_shared` contain component that are shared between features. Ideally features should not use each other, and if something needs to be shared between them, I lift it up to the `_shared/` folder.

For naming conventions I followed kebab-case because I allow a file to export more than 1 react component.

Finally I try to not export things that are used in 1 place because when scaled the global module gets messy.

## Styling

The app is fully responsive. I used fluid design and `postcss-pxtorem` to automatically convert almost all px values to rem.

I added a theme with typescript intellicense and dynamic variables.
The theme can be switched by either pressing the theme switcher button or changing the user color-scheme preferences in the browser

I used radix unstyled primitives for their good composition and accessibility, and implemented my own design theme.

I used Linaria which is a zero runtime css in js library and used it to inject my theme structure (inspired by mui theme). So all the css in the application is statically generated at build time.
Linaria also adds vendor prefix so I didn't use any other plugin for that.

### Auth

Auth is implemented using an HttpOnly session cookie. It is handled in my msw handlers

### fetch

I was planning to add axios and intercept network calls but for now I stuck to using a `safeFetch` and `protectedfetch` that handles http error http responses and including credentials.

### Server State

I used react query for the server state, and kept id the single source of truth so I didn't use a store for authorization.

## Comments

I focused mainly on the products and login pages, this is where I followed best practices for components composition and accessibility. I added listing, pagination, filtering, decent image optimization, and used react query to represent the server state, and msw and a mock to abstract the backend layer.

Regarding the size of the mock data, I added 40 items because I am currently rendering about 6 to 10 products at once on ui and the pagination is done on the backend server (msw api), so adding more items would not slow down the ui. That is also why so I only implemented pagination without virtualization (that I would have done with react virtuozo).
