## How to Implement Routing and Navigation

This project uses React Router v4. To add/edit/remove routes, edit the `routes/routes.jsx` file.

This project also implements 3 special routes:

* `<OnlyGuestRoute>` Will redirect to `/` or to previous path if there's an authenticated user.
* `<AuthOnlyRoute>` Will redirect to `/login` if there isn't an authenticated user.
* `<PrivateRoute>` This route will receive a `validator` function. Which receives the authenticated user. Will redirect to `/login` if validator returns `false` for `validator(null)`. If there's an authenticated user and `validator` returns `false`, will redirect to `/` or previous path sending an application message if `message`, `messageType` are provided. Additionally, receives a `messageErrorStatus`, if this is 403, will redirect always to `/`

For example, consider this component:

```
<PrivateRoute validator={(user) => user.email === 'admin@mydomain.com'} message="Unauthorized" messageType="warning" messageErrorStatus={403} {...otherRouteProps} />
```

If the authenticated user has `react@facebook.com` as email, this route will redirect to `/` sending a _warning_ saying **Unauthorized**. This is particullary useful if your app implements roles.

Both `OnlyGuestRoute` and `AuthOnlyRoute` are built over `PrivateRoute`.
