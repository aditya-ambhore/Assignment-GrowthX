
# Setup and Run Documentation

     This guide will walk you through how to set up and run the system, which includes user and admin management, assignment handling, and token-based authentication using JWT.


## Prerequisites


     • Before setting up the project, ensure you have the following installed:

     1. Node.js (v12 or higher)  
     2. MongoDB (either locally or a cloud service like MongoDB Atlas)
     3. Postman (for API testing) or any similar tool
## Installation Steps

    1.Clone the Repository

      • Start by cloning the repository to your local system using Git:

          git clone <your-repository-url>  
          cd <repository-folder>


    2.Install Dependencies

      • Install the necessary Node.js packages by running the following command:

          npm install


    3.Set Up Environment Variables

      • Create a .env file in the root directory and add the following environment variables:

          JWT_SECRET=your_jwt_secret_key
          MONGO_URI=your_mongodb_connection_string


    4.Start the MongoDB Server

      • If you’re running MongoDB locally, make sure the MongoDB server is running by using:

          mongod


    5.Run the Server  

      • Once MongoDB is running, start your Node.js server by executing:


          npm start


      • The server will start on the default port (usually http:// localhost:5000).

## API Endpoints


      1. Admin Registration



          • Endpoint: POST /admins/register  
          • Description: Register a new admin.  
          • Request Body: 


              {     
               "username": "admin_username",  
               "password": "admin_password"  
              }



      2. Admin Login

          • Endpoint: POST /admins/login  
          • Description: Admin can log in using their credentials.  
          • Request Body:  
            {  
              "username": "admin_username",  
              "password": "admin_password"  
            }
 
      3. User Registration

          • Endpoint: POST /users/register  
          • Description: Register a new user.  
          • Request Body:  
            {  
              "username": "user_username",  
              "password": "user_password"  
            }

 
      4. User Login

          • Endpoint: POST /users/login  
          • Description: User can log in using their credentials  
          • Request Body:  
            {  
               "username": "user_username",  
               "password": "user_password"  
            }

 
       5. Upload Assignment

          • Endpoint: POST /users/upload  
          • Description: Users can upload their assignments to admins.  
          • Request Body:  
            {  
               "userId": "user_id",  
               "task": "description_of_task",  
               "adminId": "admin_id"  
            }


      6. Fetch Admin Assignments

          • Endpoint: GET /admins/assignments  
          • Description: Admins can view assignments tagged to them 


      7. Accept or Reject Assignment

          • Endpoints:

             PUT /admins/assignment/:id/accept: Accept an assignment  
             PUT /admins/assignment/:id/reject: Reject an assignment

      8. Token-Based Authentication (JWT)   



          • Ensure that the API requests (except for login and registration) include an Authorization header with a valid JWT token:

              Authorization: Bearer <your_token>



## Error Handling

      • All responses include appropriate status codes (e.g., 400 for bad requests, 500 for internal server errors).   

      • In case of invalid credentials or missing data, relevant error messages will be returned.
## Testing

      •  You can use Postman or curl to test the endpoints.                

      •  For assignment upload and assignment actions, ensure proper role-based access using tokens (JWT) passed in the Authorization header.