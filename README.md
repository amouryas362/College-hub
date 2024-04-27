# The College Hub

## Problem Statement

MANIT is a large college with numerous events happening throughout the year. However, many of these events often go unnoticed by students, even when they are important. This lack of awareness is a common pain point for students at the college.

## Solution

"The College Hub" is a project designed to address this issue. It serves as a centralized platform for all news and events within the college. The primary goal is to keep students and users well-informed about campus activities and occurrences.

In summary, "The College Hub" is a comprehensive college news and event platform that:

- Aggregates information about events, news, and important updates within the college.
- Ensures that students and users stay up-to-date with campus activities.
- Helps bridge the gap between the college community and the events that matter to them.


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

1. You should have [NodeJS](https://nodejs.org/en/download) and [PostgreSQL](https://www.postgresql.org/download/) installed on your machine

2. Clone the repo
    ```sh
    git clone https://github.com/Aloneduckling/TheCollegeHub.git
    ```

3. Create a database with the name `TheCollegeHub` using pgAdmin

4. Create a `.env` File in the `backend` directory and add the following details in the `.env` file 
    ```
        NODE_ENV='dev'
        
        PORT=3000
        
        DB_USER=''
        DB_PASSWORD=''
        DB_HOST='localhost'
        DB_NAME='TheCollegeHub'
        DB_PORT=5432
        
        JWT_SECRET=''
        
        
        CLOUDINARY_CLOUD_NAME=""
        CLOUDINARY_API_KEY=""
        CLOUDINARY_API_SECRET=""
    ```
5. This project uses [Cloudinary](https://cloudinary.com/users/register_free) for hosting images so signup on the platform to get your credentials.
### Installation and getting the server up and running


1. Install NPM packages,  from the root of the project execute the following
   ```sh
   cd backend
   npm install
   ```
2. Start the server
    ```sh
    npm run dev
    ```

### Installation and getting the frontend up and running


1. Install NPM packages, from the root of the project execute the following
   ```sh
   cd frontend
   npm install
   ```
2. Start the server
    ```sh
    npm run dev
    ```
---
**The College Hub** - Stay Connected, Stay Informed
