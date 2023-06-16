# CARUPAH-CC
# API Docs

## ****************Endpoint****************

http://34.128.86.162:8080/

### Register

- **URL**
    - /auth/register
- **Method**
    - POST
- **Request Body**
    - name as string
    - email as string
    - password as string, must be at least 8 chatacters
    - confirm_pw as string, must be same as password
    - numberPhone as number
- **Response**
    
    ```json
    {
        "message": "User registered successfully.",
        "data": {
            "uid": "4CAKnmsWhXOsjvyWpdV67qKG7dO2",
            "email": "lilytest123@gmail.com",
            "emailVerified": false,
            "disabled": false,
            "metadata": {
                "lastSignInTime": null,
                "creationTime": "Tue, 13 Jun 2023 13:11:06 GMT",
                "lastRefreshTime": null
            },
            "tokensValidAfterTime": "Tue, 13 Jun 2023 13:11:06 GMT",
            "providerData": [
                {
                    "uid": "lilytest123@gmail.com",
                    "email": "lilytest123@gmail.com",
                    "providerId": "password"
                }
            ]
        }
    }
    ```
    
    ```json
    {
        "error": "Failed to registered."
    }
    ```
    

### Login

- **URL**
    - /auth/login
- **Method**
    - POST
- **Request Body**
    - email as string
    - password as string, must be at least 8 chatacters
- **Response**
    
    ```json
    {
    "message": "Login successful",
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTY4Njc5MDA4NCwiZXhwIjoxNjg2NzkzNjg0LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1zemZsaUBjYXJ1cGFoLWJhY2tlbmQtODc4YTMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1zemZsaUBjYXJ1cGFoLWJhY2tlbmQtODc4YTMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiJidVdkZENrb0U1YVJuRGNmcVhUQ21LbmVQbUkzIn0.TCuRY_JDMutSvepwzBoTVk6a7y8Sblsj4LS5pMNr2hIQdFXiIrnvWbdkoLze4xJbeuX2RUZeAZiR4HF99LZhOir3DGT1CA5hG70u7n2QlfyIc2kXNJoSf9iePNwRGiimrlWsaxymGga0nvMg74DkxEBbf93kOYVZvGS_cs4vAoovgVeMnokBVUgTGyaOlQVZ8RUR288JUQEI9YrBi6qWSdo3QEmckQBctd2CUVhhK6M7GKtESNsxFLnyVVp5DTpbp0vHdcMkGVobTKpLmqUlQIfCWE-LfqdSjVAF1rza55SsGbpMPsIZYAFIFIcv4sS7cnFXd6dadrRygHsqmtpYGQ"
    }
    ```
    
    ```json
    {
        "error": "Failed to login."
    }
    ```
    

### Get All User

- **URL**
    - /profile
- **Method**
    - GET
- **Response**
    
    ```json
    [
        {
            "password": "$2b$10$NJ6MPmpYg25CeS7Nc4oUQevtihGf79GKj.S41u9C8T10B53t9hCbO",
            "numberPhone": "084357567943",
            "name": "Lily",
            "email": "lilytest123@gmail.com",
            "updatedAt": {
                "_seconds": 1686661867,
                "_nanoseconds": 202000000
            },
            "id": "4CAKnmsWhXOsjvyWpdV67qKG7dO2"
        },
        {
            "password": "$2b$10$mLbLooZheCUPsDtRLUeNEeAAHI.ZCNrrkz3J77gzjeR8z41wXjyYm",
            "numberPhone": "081324904522",
            "name": "alvaro",
            "email": "varoalvaro493@gmail.com",
            "updatedAt": {
                "_seconds": 1686663499,
                "_nanoseconds": 801000000
            },
            "id": "7RQPo65q1LWHqcfQUzSkp8H8RPs1"
        }
    ]
    ```
    
    ```json
    {
        "error": "Failed to retrieve users."
    }
    ```
    

### Get User By Id

- **URL**
    - /profile/{{id}}
- **Method**
    - GET
- **Response**
    
    ```json
    {
        "password": "$2b$10$NJ6MPmpYg25CeS7Nc4oUQevtihGf79GKj.S41u9C8T10B53t9hCbO",
        "numberPhone": "084357567943",
        "name": "Lily",
        "email": "lilytest123@gmail.com",
        "updatedAt": {
            "_seconds": 1686661867,
            "_nanoseconds": 202000000
        }
    }
    ```
    
    ```json
    {
        "error": "Failed to retrieve user."
    }
    ```
    

### Update User

- **URL**
    - /profile/{{id}}
- **Method**
    - PACTH
- **Request Body**
    - name as string
    - numberPhone as number
    - city as string
    - district as string
    - subdistrict as string
    - address as string
- **Response**
    
    ```json
    {
        "message": "User profile updated successfully.",
        "data": {}
    }
    ```
    
    ```json
    {
        "error": "Failed to update user"
    }
    ```
    

### Profile Picture

- **URL**
    - /profile/profile-picture/{{id}}
- **Method**
    - PACTH
- **Request Body**
    - Image as file ( .png/.jpeg/.jpg)
- **Response**
    
    ```json
    {
        "message": "Profile image uploaded successfully.",
        "data": {}
    }
    ```
    
    ```json
    {
        "error": "Failed to upload profile image."
    }
    ```
    

### Change Password

- **URL**
    - /profile/change-password/{{id}}
- **Method**
    - PACTH
- **Request Body**
    - oldPassword
    - newPassword
    - confirm_newPassword
- **Response**
    
    ```json
    {
        "message": "Password changed successfully.",
        "data": {
            "password": "$2b$10$2VzvYWncgos3nE3yCZNxbunNJdsPpT/1MT1Zj1y4MFFzJQzEtBOOe",
            "updatedAt": "2023-06-13T16:18:16.453Z"
        }
    }
    ```
    
    ```json
    {
        "error": "Failed to change password."
    }
    ```
    

### Delete User

- **URL**
    - /profile/{{id}}
- **Method**
    - DELETE
- **Response**
    
    ```json
    {
        "message": "User delete successfully.",
        "data": {}
    }
    ```
    
    ```json
    {
        "error": "Failed to delete user"
    }
    ```
    

### Register Bank Sampah

- **URL**
    - /bank-sampah
- **Method**
    - POST
- **Request Body**
    - name,
    - email,
    - password,
    - confirm_pw,
    - numberPhone,
    - address
    - evidenceFile, (upload file)
- ****************Response****************
    
    ```json
    {
        "message": "User created successfully.",
        "data": {
            "uid": "Y5j2XXfCUPR8NNqrsOI6tAh81tN2",
            "email": "banksampah@gmail.com",
            "emailVerified": false,
            "disabled": false,
            "metadata": {
                "lastSignInTime": null,
                "creationTime": "Tue, 13 Jun 2023 16:21:58 GMT",
                "lastRefreshTime": null
            },
            "tokensValidAfterTime": "Tue, 13 Jun 2023 16:21:58 GMT",
            "providerData": [
                {
                    "uid": "banksampah@gmail.com",
                    "email": "banksampah@gmail.com",
                    "providerId": "password"
                }
            ]
        }
    }
    ```
    
    ```json
    {
        "error": "Failed to registered."
    }
    ```
    

### login Bank Sampah

- **URL**
    - /bank-sampah/login
- **Method**
    - POST
- **Request Body**
    - email,
    - password,
- **************Response**************
    
    ```json
    {
        "message": "Login successful."
    }
    ```
    
    ```json
    {
        "error": "Failed to login."
    }
    ```
    

### Get All User (bank-sampah)

- **URL**
    - /bank-sampah
- **Method**
    - GET
- ******************Response******************
    
    ```json
    [
        {
            "password": "$2b$10$RGFTGD4qZNgAhg.UJvjIz.GA42rrrZxDFU/QdV2om1zdZ64NZEb.a",
            "address": "Jln. Merpati",
            "evidenceFile": {
                "originalname": "Hello - Copy.pdf",
                "mimetype": "application/pdf"
            },
            "numberPhone": "086352427634",
            "name": "Bank Sampah 12",
            "email": "banksampah@gmail.com",
            "updatedAt": {
                "_seconds": 1686673319,
                "_nanoseconds": 325000000
            }
        }
    ]
    ```
    
    ```json
    {
        "error": "Failed to retrieve users."
    }
    ```
    

### Get All User By Id (bank-sampah)

- **URL**
    - /bank-sampah/{{id}}
- **Method**
    - GET
- **Request Body**
    - email,
    - password,
- **************Response**************
    
    ```json
    {
        "password": "$2b$10$RGFTGD4qZNgAhg.UJvjIz.GA42rrrZxDFU/QdV2om1zdZ64NZEb.a",
        "address": "Jln. Merpati",
        "evidenceFile": {
            "originalname": "Hello - Copy.pdf",
            "mimetype": "application/pdf"
        },
        "numberPhone": "086352427634",
        "name": "Bank Sampah 12",
        "email": "banksampah@gmail.com",
        "updatedAt": {
            "_seconds": 1686673319,
            "_nanoseconds": 325000000
        }
    }
    ```
    
    ```json
    {
        "error": "Failed to retrieve user."
    }
    ```
    

### Update Bank Sampah

- **URL**
    - /bank-sampah/{{id}}
- **Method**
    - PACTH
- **Request Body**
    - name,
    - numberPhone,
    - ~~city,~~
    - ~~district,~~
    - ~~subdistrict,~~
    - address
- **************Response**************
    
    ```json
    {
        "message": "User profile updated successfully.",
        "data": {}
    }
    ```
    
    ```json
    {
        "error": "Failed to update user"
    }
    ```
    

### Profile Picture Bank Sampah

- **URL**
    - /bank-sampah/profile-picture/{{id}}
- **Method**
    - PACTH
- **Request Body**
    - Image as file ( .png/.jpeg/.jpg)
- ****************Response****************
    
    ```json
    {
        "message": "Profile image uploaded successfully.",
        "data": {}
    }
    ```
    
    ```json
    {
        "error": "Failed to upload profile image."
    }
    ```
    

### Change Password Bank Sampah

- **URL**
    - /bank-sampah/change-password/{{id}}
- **Method**
    - PACTH
- **Request Body**
    - oldPassword
    - newPassword
    - confirm_newPassword
- ****************Response****************
    
    ```json
    {
        "message": "Password changed successfully.",
        "data": {
            "password": "$2b$10$IDSO6RP8FW9Rs/yS.ATrfOe6d1P0kD6d69d980.5TF9pq0zR4/N6i",
            "updatedAt": "2023-06-13T16:49:53.252Z"
        }
    }
    ```
    
    ```json
    {
        "error": "Failed to change password."
    }
    ```
    

### Delete Bank Sampah

- **URL**
    - /bank-sampah/{{id}}
- **Method**
    - DELETE
- ****************Response****************
    
    ```json
    {
        "message": "User delete successfully.",
        "data": {}
    }
    ```
    
    ```json
    {
        "error": "Failed to delete user"
    }
    ```
    

## Endpoint

http://34.101.82.202:8080/

### Carupai

- **URL**
    - /carupai
- **Method**
    - POST
- **Request Body**
    - message, as string
- **************Response**************
    
    ```json
    {
        "message": "Ada yang bisa CarupAI bantu?"
    }
    ```
    
    ```json
    {
        "detail": "Not Found"
    }
    ```
    

## Endpoint

http://34.101.243.177:8080/

### Image Identification

- ******URL******
    - /predict
- ************Method************
    - POST
- **************************Request Body**************************
    - file, as file
- ****************Response****************
    
    ```json
    {
      "predicted_class": "Alumunium"
    }
    ```
    
    ```json
    {
      "detail": [
        {
          "loc": [
            "string",
            0
          ],
          "msg": "string",
          "type": "string"
        }
      ]
    }
    ```
