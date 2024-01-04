# azureBackend


## Route Testing

### Admin Controllers

The following is a list of admin routes

![Admin Routes](./docImages/AdminList.png)

All these routes require a token with 'admin' or 'worker' role. If a token is not present the following error will  be  displayed.

![No Token](./docImages/NotSignedIn.png)

If a token with 'user' role is attached to it, an error will be thrown.

![Unauthorized](./docImages/unauthorized.png)

The routes information will be displayed when a valid token is presented. This an example of the GET - admin/users/all. Once logged in the route can be viewed.

![List All Users](./docImages/admin_user_all.png)

The same for all the other routes on the list when an id or last name are provided. 

![Find User By ID](./docImages/admin_user_id.png)

![Find User By Last Name](./docImages/admin_user_lastname.png)

The above two images show the same result but the user was fetched by two different routes. One by ID and the other by Last Name 

The Patch route will edit the given user. As the image shows, only the changed fields will be updated.

![Update User](./docImages/admin_user_patch.png)

A user can also be deleted by ID

![Delete User](./docImages/admin_user_delete.png)


### User Controllers

![User Routes](./docImages/users_routes.png)

The two post routes above do not require a user to be to logged in to access. The GET, PATCH and DELETE will require a user be logged in to view the routes.

Once a user is registered they can login with their email and password. When the correct email and password are provided, a jwt is generated. This will allow the user to view their own details, make bookings, edit profile or even delete

When incorrect information is provided, login will fail.

![Fail Login](./docImages/login_failed.png)

With the correct details, a jwt is produced, this is used to view the GET, PATCH, and DELETE routes. 'Unauthorized' or 'Must be logged in' message is displayed if no jwt is present to view these routes.

Login Route
![user login](./docImages/users_login.png)

View Details
![View details](./docImages/users_details.png)

Update Details (excluding role)
![Update users](./docImages/user_update.png)
![Update error](./docImages/update_error.png)

Delete Account
![Deleted User](./docImages/user_delete.png)

### Booking Controllers


