# The College Hub

## Problem Statement

MANIT is a large college with numerous events happening throughout the year. However, many of these events often go unnoticed by students, even when they are of significant importance. This lack of awareness is a common pain point for students at the college.

## Solution

"The College Hub" is a project designed to address this issue. It serves as a centralized platform for all news and events taking place within the college. The primary goal is to keep students and users well-informed about the various activities and occurrences on campus.

In summary, "The College Hub" is a comprehensive college news and event platform that:

- Aggregates information about events, news, and important updates within the college.
- Ensures that students and users stay up-to-date with campus activities.
- Helps bridge the gap between the college community and the events that matter to them.


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

1. You should have [PostgreSQL](https://www.postgresql.org/download/) installed on your machine along with [pgAdmin](https://www.postgresql.org/download/)

2. Clone the repo
    ```sh
    git clone https://github.com/Aloneduckling/TheCollegeHub.git
    ```

3. Create a database with the name `TheCollegeHub` using pgAdmin

4. Create the tables in the database by running the [SQL Source file](https://github.com/Aloneduckling/TheCollegeHub/blob/main/utils/creatin_tables_commands.sql) in pgAdmin

5. Fill the following details in the `.env` file 
    ```
    # NODE_ENV
    NODE_ENV='development'


    # express port
    PORT= #enter the port number here

    # postgress configurations
    DB_USER= #enter the postgress username here
    DB_PASSWORD= #enter the password here
    DB_HOST='localhost'
    DB_NAME='TheCollegeHub'
    DB_PORT=5432 #this is the default port for postgres database

    # JWT SECRET
    JWT_SECRET= #any random string will do
    ```

### Installation and getting the server up and running


1. Install NPM packages
   ```sh
   cd backend
   npm install
   ```
2. Start the server
    ```sh
    npm start
    ```

## Roadmap

### Backend

- [ ] Migrate to an ORM for the backend
- [ ] Complete the commentControllers
- [ ] Implement Unit tests
- [ ] Implement rate-limiting

---
**The College Hub** - Stay Connected, Stay Informed
