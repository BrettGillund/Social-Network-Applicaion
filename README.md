## Social Network Application

# Table of Contents


# Video Walkthrough of Application

# About

This is a basic social media application where users can create profiles, add existing users as friends to their profile, create posts known as thoughts, and react to other users posts.

# Starting the Application

Starting this Social Network Applicaiton is as easy as entering npm start in the main directory of this application. From there users can add data through the various API routes listed in the api_routes.js file. Please see the below table in regard to referencing these routes.

# Functionality and Routes:

This application is built to update several different models. The first of the three models included in this application is the User model that is used when users want to be created, modified, and deleted, as well as adding other existing users to a friend array. The next model used in this application is the Thought model where users can save their thoughts using the format listed in the Thought.js file. The final of the three models is the Reaction model where other users can create reactions to another users thoughts. Please see the below list regarding how to use get each of these routes to function.

USER ROUTES:
- Creating a user.
    - To create a user in insomnia a user will need to POST to the http://localhost:3333/api/users route passing in an object containing "username" and "email" parameters.

- Getting all users.
    - To view all users in insomnia a user will need to GET to the http://localhost:3333/api/allUsers route. All existing users will populate in the preview tab.

- Getting a single user by ID.
    - To get a single user by ID in insomnia a user will need to GET to the http://localhost:3333/api/users/:userId route passing an individual users ID into the userId field.

- Updating a users information.
    - To update a single users username or email in insomnia a user will need to PUT to the the http://localhost:3333/api/users/:userId route passing an individual users ID into the userId field. Additionally, they will need to pass in an object including the "username" and "email" they would like to have updated.

- Deleting a user.
    - To delete a user in insomnia a user will need to DELETE to the http://localhost:3333/api/users/:userId route passing an individual users ID into the userId field.

- Posting a friend to a users friend array.
    - To add an existing user to another users friends list in insomnia a user will need to POST to the http://localhost:3333/api/users/:userId/friends/:friendId route passing an individual users ID into the userId field, and the friends userId into the :friendId field.

- Deleting a friend from a users friend array.
    - To delete a friend from a users friend array in insomnia a user will need to DELETE to the http://localhost:3333/api/users/:userId/friends/:friendId route passing an individual users ID into the userId field, and the friends userId into the :friendId field.

- Adding a thought to a users thoughts array.
    - To add a thought to a users thought array in insomnia a user will need to POST to the http://localhost:3333/api/thought/userId route passing in in an object including "thoughtText" and "username".

- Viewing all created thoughts.
    - To view all created thoughts in insomnia a user will need to GET to the http://localhost:3333/api/allThoughts route.

- Viewing a single users thought.
    - To view a single thought created by a user in insomnia a user will need to GET to the http://localhost:3333/api/thought/thoughtId passing in a thoughts id in the thoughtId field.

- Updating a thought.
    - To update a thought in insomnia a user will need to PUT to the http://localhost:3333/api/thought/thoughtId route passing in an object of the "thuoghtText" they would like to update. 

- Deleting a thought.
    - To delete a thought in insomnia a user will need to DELETE to the http://localhost:3333/api/thought/thoughtId route passing in a thoughts id in the thoughtId field.

- Creating a reaction to a post.
    - To create a reaction to an existing post in insomnia a user will need to POST to the http://localhost:3333/api/thought/:thoughtId/reactions route passing in the thuoghtId in the required field, as well as passing in an object including "reactionBody" and "username".

- Deleting a reaction to a post.
    - To delete a reaction to an existing post in insomnia a user will need to DELETE to the http://localhost:3333/api/thought/:thoughtId/reactions/:reactionid route passing in the thuoghtId and reactionid in the required field.

# Technologies

- MongoDB as a database
- Express.js for routing
- Mongoose ODM
- Insomia for testing routes
- JavaScript as a programming language.