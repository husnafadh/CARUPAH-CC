# CARUPAH-CC

## Carupah

**Carupah** is an application that allows users to detect types of waste, interact with chatbots, and get information about the nearest waste bank. This application is built using the Express.js framework for the back-end server, Firebase as a database and file storage, and Google Cloud Console to manage the API used.
This is the Node.js backend server used by Carupah which was developed by Team C23-PS062 using express.js, firebase, and google cloud console for capstone project  related to the Bangkit Program. To see the server implementation of this repository, visit: https://

## Main Feature

1. **Authentication**
    
    
    - Register
        
        ```java
        POST ../auth/register
        ```
        
        ```java
        {
            "name": "husnafr",
            "email": "husna@carupah.com",
            "password": "husna123",
            "confirm_pw": "husna123",
            "numberPhone": "08112244500"
        }
        ```
        
    - Login
        
        ```java
         POST ../auth/login
        ```
        
        ```java
        {
            "email": "husna@carupah.com",
            "password": "husna123",
            "confirm_pw": "husna123"
        }
        ```
        
        ```java
        
        ```
        
2. **Waste Type Detection**
    
    Users can upload trash images, and the system will detect the type of trash based on image analysis using AI technology. This app provides the following API endpoints:
    
    ```java
    POST ../bank-sampah/
    ```
    
    ```java
    {
      "image": "<base64 encoded image>"
    }
    ```
    
    ```java
    {
      "result": "<jenis_sampah>"
    }
    ```
    
3. **Chatbot**
    
    The application provides a chatbot feature that allows users to interact and get information related to waste. API endpoint for chatbot:
    
    ```java
    POST ../carupai
    ```
    
    ```java
    {
      "message": "<pesan_pengguna>"
    }
    ```
    
    ```java
    {
      "message": "<pesan_respon_chatbot>"
    }
    ```
    
4. **Waste Bank Features**
    
    The application also provides information about the nearest waste bank based on the user's location. API endpoint to get waste bank information:
    
    ```java
    GET ../nearest-bank/distance?latitude=<latitude>&longitude=<longitude>
    ```
    
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
    

### **Development Environment Setup**

Here are the steps to setup the development environment:

1. Clone the repository into a local directory
    
    ```java
    git clone https://github.com/user/repo.git
    ```
    
2. Install the required dependencies
    
    ```java
    cd repo
    npm install
    ```
    
3. Firebase configuration
    - Create a new project in Firebase and get the Firebase API configuration.
    - Copy the **.env.example** file to **.env** and fill it with the Firebase configuration.
4. Google Cloud Console configuration
    - Generate API key in Google Cloud Console and get API key.
    - Copy the file **.env.example** to **.env** and fill it with the API key.
5. Run local Server
    
    ```java
    npm start
    ```
    
6. Access the application via the browser
