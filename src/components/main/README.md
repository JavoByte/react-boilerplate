Keep in this folder all the main path components. This means, all single page paths under the root path.

Examples:

* /about
* /contact
* /login
* /not-found
* /error

Don't place here components which will live with others under the same path. For example:

* /users
* /users/create
* /users/4

All components under the `/users` path, must be placed in the `users` folder (sibling of this one)
