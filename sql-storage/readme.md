# SQL Storage with SQLite

The SqlStorage component was removed between the final Ionic 2 beta and the Ionic 2 RC release. The `user-settings.service.ts` file in this directory shows and example implementation of the `user-settings.service.ts` file shown in the course. 

The file uses several `if` statements to make it very obvious what is going on. It is also created in such a way that you can run it in the browser via `ionic serve` and it will fall back to work with local storage since SQLite is not available in the browser. It will use SQLite (via the SQLite Ionic Native plugin) when running on an actual device. 