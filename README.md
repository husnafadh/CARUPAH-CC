# CARUPAH-CC

## Carupah

**Carupah** is an application that allows users to detect types of waste, interact with chatbots, and get information about the nearest waste bank. This application is built using the Express.js framework for the back-end server, Firebase as a database and file storage, and Google Cloud Console to manage the API used.
This is the Node.js backend server used by Carupah which was developed by Team C23-PS062 using express.js, firebase, and google cloud console for capstone project  related to the Bangkit Program.

## Main Feature

1. **Authentication**
    
    The authentication feature is used to allow users to access features such as junk type detection, chatbots, and redirection to the trash bank. Below, we will describe the implementation steps and the technology used in this project.
    
    **********************Requirement**********************
    
    - Express.js
        
        This project uses Express.js as the backend framework to manage HTTP routes and requests.
        
    - Firebase and Google Cloud Console.
        
        We use Firebase as the authentication platform integrated with the Google Cloud Console. Firebase provides secure and easy-to-use authentication features.
        
    
    **************************************Implementation Step**************************************
    
    - Firebase Authentication integration with Express.js
    - Configuration of Firebase and Google Cloud Console
    - Implementation of user Registration and Login logic
    
2. **Waste Type Detection**
    
    Users can upload trash images, and the system will detect the type of trash based on image analysis using AI technology. This app provides the following API endpoints:
    
    *bash*
    
    ```java
    GET ../bank-sampah
    GET ../bank-sampah/:userId
    POST ../bank-sampah
    PATCH ../bank-sampah/:userId
    DELETE ../bank-sampah/:userId
    PATCH ../bank-sampah/profile-picture/:userId
    PATCH ../bank-sampah/change-password/:userId
    POST ../bank-sampah/login
    ```
    
3. **Chatbot**
    
    The application provides a chatbot feature that allows users to interact and get information related to waste. API endpoint for chatbot:
    
    *bash*
    
    ```java
    POST ../carupai
    ```
    
    ***request body***
    
    ```java
    {
      "message": "<user_message>"
    }
    ```
    
    ********response********
    
    ```java
    {
      "message": "<chatbot_response_message>"
    }
    ```
    
4. **Waste Bank Features**
    
    The application also provides information about the nearest waste bank based on the user's location. API endpoint to get waste bank information:
    
    *bash*
    
    ```java
    GET ../nearest-bank/distance?latitude=<latitude>&longitude=<longitude>
    ```
    
    ********response********
    
    ```java
    {
      "bank_sampah": [
        {
          "nama": "<nama_bank_sampah>",
          "alamat": "<alamat_bank_sampah>",
          "jarak": "<jarak_dalam_km>"
        },
        // ...
      ]
    }
    ```
    

## Development Environment Setup

Here are the steps to setup the development environment:

1. Create a new project
2. Install the required dependencies
    
    ```java
    npm install
    ```
    
3. Firebase configuration
    - Create a new project in Firebase and get the Firebase configuration.
    - Use the required Firebase configuration.
4. Google Cloud Console configuration
    - Create a new project in Google Cloud Console (GCP) and get the GCP configuration.
    - Use the required GCP configuration.
5. Application configuration 
    - Create files and import required modules
    - Set up firebase using previous configuration
    - Use Google Cloud module to connect application via API
    - Create API endpoint
    - Run server
6. Run the Application
