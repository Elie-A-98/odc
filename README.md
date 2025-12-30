

used woff2_compress on Mac to convert the .ttf Manrope font i got from google to .woff2 format

used postcss-pxtorem postcss plugin to automatically transform px to rem values - it transforms everything and i can optionally opt out of it by using PX instead of px

used polished js to get some utilities for fuild typography. I could have wrote the interpolation functions myself but i thing have polished as a library make sense for later. also my css is generated at build time so it's still zero runtime.

because my css is not generated at runtime, i can store svgs as normal assets instead of react components and allow full browser caching

used the vite-plugin-svgr to let vite automatically transform .svg files to SVGr components so i can easily import them like normal components

theme.ts is slightly overengineered for fast iteration. i can ask ai to remove abstractions and it's api will still be the same