# azureBackend

## Deployments

Netlify was used to deploy the client side
- [Azure Splash App](https://azuresplash.netlify.app/)

Heroku was used to deploy the server
- [App Server](https://azures-splash-8d7c939ebec7.herokuapp.com/)






## Project Management & Source Control

When developing the app it was important that we got all the moving parts done in order. We used Trello to achieve this. Breaking down the parts  and components, and delegating a team member with due dates on some components. The dates were important because some functions depended on others.

We divided the work work up as follows after discussing strengths and weaknesses. 

- Fabian - Server side
- Claire - Client side
- Cameron - HTML and CSS

We all leaned on each for help and feedback when reaching hurdles. We had 1 or 2 calls a week to check in on progress plus many messages, Discord was used to stay in touch and screen share for trouble shooting.

#### GitHub

We created two repositories in our Azure Splash Organization. This made deploying a smoother process. Fabian worked on the main branch and then once deployed and working started using branches to update and add features. The team used branches while working on the client side. Once the branch was complete and ready to merge, a pull request was created and it would then be reviewed by another team member. If all was good any conflicts would be resolved and squashed and merged in most case instead of just merging. Once the branches were merged a new one would be created. We did not delete branches unless needed. Fabian had accidentally made a second branch for the some function, so said branch was deleted. 









## Route Testing

## Admin Controllers

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


## User Controllers

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

## Booking Controllers

The booking routes have two different set of permissions. Some routes can only be accessed by admin and workers. The others can be accessed by a regular user.

### Booking Admin/Worker Routes

Must be signed in with the right permissions (admin or worker)to access these routes. If not an error message will be thrown.

![Admin Booking Routes](./docImages/booking_admin_routes.png)

#### GET - admin view all bookings
![All Bookings](./docImages/admin_booking_all.png)

#### GET - admin find bookings by dates
![Bookings By Date](./docImages/admin_booking_date.png)

#### GET - admin find a booking by id
![Booking By ID](./docImages/booking_ID.png)

#### GET - admin find booking by User ID
![Bookings By User ID](./docImages/booking_UserID.png)

#### GET - admin find all bookings by pool ID
![Bookings by pool](./docImages/booking_by_pool.png)

#### POST - admin can make a booking for a user
![New Booking](./docImages/newBooking_admin.png)

#### PATCH - admin update any booking by booking ID
![Updated Booking Admin](./docImages/updated_admin_booking.png)

#### DELETE - admin delete any booking by booking ID
![Deleted Booking By Admin](./docImages/Booking_deleted_admin.png)



### Booking User Routes

![User Booking Routes](./docImages/booking_user_routes.png)

#### POST - logged in user make a new booking
![User Booking](./docImages/user_booking.png)

#### GET - logged in user view all their bookings
![User View Bookings](./docImages/user_view_all.png)

#### PATCH - logged in user to update their own booking by ID
![User Update Booking](./docImages/user_booking_updated.png)

#### DELETE - logged in user to delete their own booking by ID
![User delete booking](./docImages/user_deleted_booking.png)
