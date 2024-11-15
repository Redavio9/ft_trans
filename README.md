
---

# Overview

- [Authentication](https://github.com/amaitou/Transcendence?tab=readme-ov-file#authentication)
- [JWT](https://github.com/amaitou/Transcendence?tab=readme-ov-file#jwt)
    - [What is a JSON Web Token (JWT)?](https://github.com/amaitou/Transcendence?tab=readme-ov-file#what-is-a-json-web-token-jwt)
    - [Structure of a JWT](https://github.com/amaitou/Transcendence?tab=readme-ov-file#structure-of-a-jwt)
    - [How does JWT work?](https://github.com/amaitou/Transcendence?tab=readme-ov-file#how-does-jwt-work)
    - [Advantages of JWT](https://github.com/amaitou/Transcendence?tab=readme-ov-file#advantages-of-jwt)
- [Endpoints](https://github.com/amaitou/Transcendence?tab=readme-ov-file#endpoints)
    - [/api/register/](https://github.com/amaitou/Transcendence?tab=readme-ov-file#register-a-new-user)
    - [/api/login/](https://github.com/amaitou/Transcendence?tab=readme-ov-file#login-user)
    - [/api/logout/](https://github.com/amaitou/Transcendence?tab=readme-ov-file#logout-user)
    - [/api/users/](https://github.com/amaitou/Transcendence?tab=readme-ov-file#get-all-users)
---

# Authentication

![MFA-Azure-Hero-image](https://github.com/user-attachments/assets/599a6a9d-ca1f-4491-96c0-b39e1dc25b78)


Authentication is the process of verifying the identity of a user, device, or system to ensure that they are who they claim to be. In the context of web applications and digital systems, authentication is a critical security measure that protects sensitive information and resources from unauthorized access. It typically involves the user providing credentials, such as a username and password, which are then checked against a database or authentication service. More advanced forms of authentication may include multi-factor authentication (MFA), where users must provide additional proof of identity, such as a code sent to their mobile device or a fingerprint scan. Authentication is the first line of defense in securing applications and is often combined with authorization, which controls what authenticated users are allowed to do within a system.

---

# JWT

![jwt-structure](https://github.com/user-attachments/assets/6e9ceeec-4530-490c-9262-ae9162ee868d)


- ### What is a JSON Web Token (JWT)?

    A JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object. The JWT format is defined by the RFC 7519 standard and consists of three main components: a header, a payload, and a signature. The header specifies the type of token (JWT) and the signing algorithm used, such as HMAC SHA256. The payload contains the claims, which are statements about an entity (usually, the user) and additional data. The signature is used to verify the authenticity of the token and to ensure that the token has not been tampered with.

---

- ### Structure of a JWT

    A JWT is typically composed of three parts, separated by dots (.), resulting in a string that looks like this:

    ```
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    ```

    > Header

    The header typically consists of two parts: the type of token (JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.

    ```json
    {
        "alg": "HS256",
        "typ": "JWT"
    }
    ```

    > Payload

    The payload contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims. Registered claims are predefined and include standard fields like iss (issuer), exp (expiration time), sub (subject), and aud (audience). Public claims are user-defined and must be collision-resistant. Private claims are custom claims agreed upon between parties.

    ```json
    {
        "sub": "1234567890",
        "name": "Amine",
        "iat": 1516239022
    }
    ```

    > Signature

    The signature is created by taking the encoded header, the encoded payload, a secret, and the algorithm specified in the header. This part of the JWT is used to verify that the message wasn't changed along the way and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

---

- ### How does JWT work?


    1. **User Login**: When a user logs in with their credentials, the server verifies their identity.
    2. **Token Creation**: Upon successful authentication, the server generates a JWT containing the user's information (claims) and signs it using a secret key or a private key.
    3. **Token Transmission**: The JWT is sent back to the client (usually in the response body or as a cookie).
    4. **Client-Side Storage**: The client stores the JWT, typically in local storage or a cookie, and sends it in the header (Authorization: Bearer <token>) with each subsequent request to the server.

    5. **Token Verification**: Upon receiving a request with a JWT, the server verifies the token's signature and checks its validity (e.g., expiration time, issuer). If valid, the server processes the request; otherwise, it returns an error.

---


- ### Advantages of JWT

    - **Stateless Authentication**: JWTs are self-contained; all the information required for authentication is present in the token. This reduces the server's load since there is no need to store session information in the server's memory or database.

    - **Compact and Portable**: JWTs are compact and URL-safe, making them ideal for transmission in HTTP headers or as URL parameters.

    - **Versatility**: JWTs can be used for both authentication (verifying the user's identity) and authorization (granting access to resources).

    - **Cross-Domain Support**: JWTs are language-agnostic and can be easily used across different domains, making them suitable for microservices architecture and cross-domain authentication.

    - **Improved Performance**: Since JWTs are self-contained, there is no need to query the database multiple times to verify user sessions, resulting in improved application performance.

---

# Endpoints

- ## Register a New User

    <img width="2124" alt="Screen Shot 2024-09-11 at 8 44 25 AM" src="https://github.com/user-attachments/assets/cc67e579-7a6c-40c9-9fb1-c4cd49d99967"> <br>

    - **Endpoint:** `/api/register/`
    - **Method:** `POST`
    - **Description:** Registers a new user and sends an email verification link.
    - **Authentication**: no authentication required.

    ---

    ### Request

    <img width="1051" alt="Screen Shot 2024-09-11 at 8 47 36 AM" src="https://github.com/user-attachments/assets/f59aa05c-7a89-4c48-8cf6-b75351fb68d4"> <br>
    
    - **Headers:** 'Content-Type: application/json`

    - **Body:**

        ```json
        {
            "first_name": "Amine",
            "last_name": "Ait Ouazghour",
            "username": "amaitou",
            "gender": "M",
            "email": "aitouazghouramine@gmail.com",
            "password": "Test@12__34",
            "re_password": "Test@12__34"
        }
        ```

        - **first_name (string, required):** The first name of the user.
        - **last_name (string, required):** The last name of the user.
        - **username (string, required):** The username chosen by the user.
        - **gender (string, required):** The gender of the user (e.g., "M" for male, "F" for female).
        - **email (string, required):** The user's email address. This email will be used to send a verification link.
        - **password (string, required):** The user's password.
        - **re_password (string, required):** The user's password confirmation. Must match the `password` field.

    ---

    ### Response

    <img width="2131" alt="Screen Shot 2024-09-11 at 8 50 15 AM" src="https://github.com/user-attachments/assets/8ee11cd0-db4f-488f-9d16-0ded274b5ea9">


    - **Status Code:** `201 Created`
    - **Body:** If registration is successful, the response will contain:

        ```json
        {
            "success": "User registered successfully, check your email for verification",
            "redirect": true,
            "redirect_url": "/api/login/",
            "output": {
                "id": 1,
                "first_name": "Amine",
                "last_name": "Ait Ouazghour",
                "username": "amaitou",
                "date_joined": "2024-09-11T06:23:07.641780Z",
                "avatar": null,
                "gender": "M",
                "is_verified": false,
                "email": "aitouazghouramine@gmail.com"
            }
        }
        ```

        ---

        ### Error Response
 
      <img width="2131" alt="Screen Shot 2024-09-11 at 8 50 59 AM" src="https://github.com/user-attachments/assets/8d882562-8694-49e8-9a3b-8ce409fbaca7">


        - **Status Code:** `400 Bad Request`
        - **Body:** If there are validation errors, the response will contain:

            ```json
            {
                "error": {
                    "username": [
                        "A user with that username already exists."
                    ]
                },
                "redirect": true,
                "redirect_url": "/api/register/"
            }
            ```

        ---

>  Notes

- Ensure the `email` field is correct and accessible, as it will be used for email verification.
- The passwords (`password` and `re_password`) must match.
- This endpoint does not require authentication.
- No duplicate email or username is allowed (one per user).

---

- ## Login User

    <img width="2131" alt="Screen Shot 2024-09-11 at 8 55 00 AM" src="https://github.com/user-attachments/assets/50303a10-c050-420a-8caa-76b0f148cc4f"> <br>


    - **Endpoint:** `/api/login/`
    - **Method:** `POST`
    - **Description:** Authenticates a user using their username and password, and sets JWT tokens in cookies if authentication is successful.
    - **Authentication**: no authentication is required (only when the user is not logged in).

    ---

    ### Request

    <img width="2131" alt="Screen Shot 2024-09-11 at 8 55 36 AM" src="https://github.com/user-attachments/assets/8b2ba6b3-f68f-47d0-894b-4a84e6f0bcbc"> <br>

    - **Headers:** `Content-Type: application/json`

    - **Body:**

        ```json
        {
            "username": "amaitou",
            "password": "Test@12__34"
        }
        ```

        - **username (string, required):** The username of the user.
        - **password (string, required):** The password of the user.
    
    ---

    ### Response

    <img width="2131" alt="Screen Shot 2024-09-11 at 8 54 16 AM" src="https://github.com/user-attachments/assets/84482a28-bcb2-40dc-83b7-5fd2c5711c06">

    - **Status Code:** `200 OK`
    - **Body:** If the login is successful, the response will contain:

        ```json
        {
            "success": "Login successful",
            "redirect": true,
            "redirect_url": "/api/profile"
        }
        ```

    - **Cookies:**

        <img width="2131" alt="Screen Shot 2024-09-11 at 8 54 24 AM" src="https://github.com/user-attachments/assets/731fe83e-fd62-49f2-8a80-4dbbcda12d30">

      
        - `access_token`: JWT access token set as a cookie (not `HttpOnly`).
        - `refresh_token`: JWT refresh token set as a cookie (`HttpOnly`).

    ---

    ### Error Responses



    1. **User Already Logged In:**

        <img width="2125" alt="Screen Shot 2024-09-11 at 8 56 45 AM" src="https://github.com/user-attachments/assets/2d30375b-bba1-45a4-ac80-0d668a56c35d"> <br>

        - **Status Code:** `200 OK`
        - **Body:**

            ```json
            {
                "success": "User already logged in",
                "redirect": true,
                "redirect_url": "/api/profile/"
            }
            ```

            ---

    3. **Invalid Credentials:**
 
       <img width="2125" alt="Screen Shot 2024-09-11 at 8 58 00 AM" src="https://github.com/user-attachments/assets/0eb060c6-2af5-41f2-9af5-9b89ad76c9aa"> <br>


        - **Status Code:** `401 Unauthorized`
        - **Body:**

            ```json
            {
                "error": "Invalid username or password",
                "redirect": true,
                "redirect_url": "/api/login/"
            }
            ```

            ---

    4. **User Not Verified:**
 
       <img width="2131" alt="Screen Shot 2024-09-11 at 8 53 14 AM" src="https://github.com/user-attachments/assets/31f1b869-6aa7-4a6a-8acd-d108b5d06284"> <br>


        - **Status Code:** `401 Unauthorized`
        - **Body:**

            ```json
            {
                "error": "User is not verified, check your email",
                "redirect": true,
                "redirect_url": "/api/login/"
            }
            ```

            ---

> Notes

- If the user is already authenticated (i.e., logged in), the endpoint returns a message stating the user is already logged in and redirects them to their profile.
- If the login is successful, JWT tokens (`access_token` and `refresh_token`) are generated and set as cookies. The `access_token` is not `HttpOnly`, allowing access by client-side JavaScript, while the `refresh_token` is `HttpOnly`.
- Ensure that the user has verified their email before attempting to log in. If not, they will receive a "User is not verified" error.
- This endpoint does not require authentication to access.

---

- ## Logout User

    <img width="2125" alt="Screen Shot 2024-09-11 at 9 31 04 AM" src="https://github.com/user-attachments/assets/15c31993-7677-4d11-a50f-6de6d12d5a46"> <br>


    - **Endpoint:** `/api/logout/`
    - **Method:** `POST`
    - **Description:** Logs out the user by blacklisting their refresh token and clearing the relevant cookies. Requires authentication.
    - **Authentication**: authentication is required. (the access token is retrieved from the cookies).

    ---

    ### Request

    - **Headers:** `Content-Type: application/json`
    - **Body:** None

    ---

    ### Response

    <img width="2125" alt="Screen Shot 2024-09-11 at 9 31 29 AM" src="https://github.com/user-attachments/assets/31b3afcf-f3d7-49b0-853f-083aa552cb6b"> <br>

    - **Status Code:** `200 OK`
    - **Body:** If the logout is successful, the response will contain:

        ```json
        {
            "success": "Logout successful",
            "redirect": true,
            "redirect_url": "/api/login/"
        }
        ```
    
    ---

    ### Error Responses

    1. **No Refresh Token Provided:**
 
        <img width="2125" alt="Screen Shot 2024-09-11 at 9 33 09 AM" src="https://github.com/user-attachments/assets/a1eee346-9193-439c-90d0-d5296bc62907">


        - **Status Code:** `400 Bad Request`
        - **Body:**

            ```json
            {
                "error": "No refresh token was provided",
                "redirect": true,
                "redirect_url": "/api/login/"
            }
            ```

        ---

    3. **Invalid, Expired, or Blacklisted Refresh Token:**
 
       <img width="2125" alt="Screen Shot 2024-09-11 at 9 35 17 AM" src="https://github.com/user-attachments/assets/62def221-b197-439f-a1b5-8e5ce388ab33">


        - **Status Code:** `401 Unauthorized`
        - **Body:**

            ```json
            {
                "error": "Invalid or Expired refresh token",
                "redirect": true,
                "redirect_url": "/api/login/"
            }
            ```
        
        ---

> Notes

- The endpoint requires the user to be authenticated before logging out.
- The logout process involves checking for the presence of a refresh token in the request cookies.
- If a valid refresh token is provided, it is blacklisted to prevent future use, and the JWT tokens (`access_token` and `refresh_token`) are removed from the cookies.
- On successful logout, the user is redirected to the login page.
- This endpoint does not accept any parameters in the request body.

---

- ## Get All Users

  <img width="2125" alt="Screen Shot 2024-09-11 at 9 38 41 AM" src="https://github.com/user-attachments/assets/77efa703-64a9-434c-bf6c-bca226b1dd53">


    - **Endpoint:** `/api/users/`
    - **Method:** `GET`
    - **Description:** Retrieves a list of all users excluding superusers. Requires authentication.
    - **Authentication**: authentication is required. (the access token is retrieved from the cookies).

    ---

    ### Request

    - **Headers:** `Content-Type: application/json`
    - **Body:** None

    ---

    ### Response

    <img width="2125" alt="Screen Shot 2024-09-11 at 9 39 58 AM" src="https://github.com/user-attachments/assets/3c876d63-3305-4612-8ec7-b1f173d8a13c">


    - **Status Code:** `200 OK`
    - **Body:** If the request is successful, the response will contain:

        ```json
        {
            "success": "Users were retrieved successfully",
            "redirect": false,
            "redirect_url": null,
            "output": [
                {
                    "id": 1,
                    "first_name": "Amine",
                    "last_name": "Ait Ouazghour",
                    "username": "amaitou",
                    "gender": "M",
                    "email": "aitouazghouramine@gmail.com",
                    "date_joined": "2024-09-11T06:23:07.641780Z",
                    "avatar": null,
                },
                {
                    "id": 2,
                    "first_name": "Ahmad",
                    "last_name": "Idrissi",
                    "username": "Amed26",
                    "gender": "M",
                    "email": "Amed@example.com",
                    "date_joined": "2024-09-11T06:23:07.641780Z",
                    "avatar": null,
                }
            ]
        }
        ```

        - **success (string):** A message indicating that the users were retrieved successfully.
        - **redirect (boolean):** Indicates whether a redirect is needed (always `false` in this case).
        - **redirect_url (string):** The URL to redirect to if a redirect is needed (always `null` in this case).
        - **data (array):** An array of user objects containing details such as `id`, `first_name`, `last_name`, `username`, `gender`, and `email`.
    
    ---

    ### Error Responses

    <img width="2125" alt="Screen Shot 2024-09-11 at 9 41 28 AM" src="https://github.com/user-attachments/assets/8f87f40a-271d-4295-aa26-e5770449f8b2">

    - **Unauthorized Request:**

        - **Status Code:** `401 Unauthorized`
        - **Body:**

            ```json
            {
                "error": "Invalid or Expired refresh token",
                "redirect": true,
                "redirect_url": "/api/login/"
            }
            ```
    
    ---

> Notes

- The endpoint requires the user to be authenticated to access the list of users.
- Only non-superuser accounts are retrieved and included in the response.
- The response provides a list of all users along with their details serialized using the `UserSerializer`.
- This endpoint does not accept any parameters in the request body.

---

- # Retrieve User Profile

    ![Screenshot from 2024-09-19 08-45-46](https://github.com/user-attachments/assets/c5112bd9-f0e7-42d5-ba24-ddb00601d48d)


    - **Endpoint**: /api/profile/ or /api/profile/<username>/
    - **Method**: GET
    - **Description**: Retrieves the profile information of the authenticated user or a specific user if the username is provided.
    - **Authorization**: authentication is required. (the access token is retrieved from the cookies).

    ---

    ### Request

    - **Headers**: Content-Type: application/json
    - **Body**: None

    ---

    ### Response

    ![Screenshot from 2024-09-19 08-44-37](https://github.com/user-attachments/assets/11829e94-b90f-4aa7-9ffa-e672f3c627cd)


    - **Status Code:** `200 OK`
    - **Body:** If the request is successful, the response will contain: <br>
        ```json
        {
            "success": "User retrieved successfully",
            "redirect": false,
            "redirect_url": null,
            "output": {
                "id": 7,
                "username": "amaitou",
                "first_name": "Amine",
                "last_name": "Ait Ouazghour",
                "email": "aitouazghouramine@gmail.com",
                "date_joined": "2024-09-19T07:25:00.929065Z",
                "avatar": null,
                "gender": "M"
        }
        ```

        - **success (string):** A message indicating the user was retrieved successfully.
        - **redirect (boolean):** Indicates whether a redirect is needed (always `false` in this case).
        - **redirect_url (string):** The URL to redirect if a redirect is needed (always `null` in this case).
        - **data (array):** An array of user objects containing details such as `id`, `first_name`, `last_name`, `username`, `gender`, `email`, `date_joined`, and `avatar`.

    ---
