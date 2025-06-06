# Theater Application

## Overview
This project is a theater application that allows users to book tickets for shows. It consists of a frontend interface for user interactions and a backend server to handle data management and API requests.

## Project Structure
```
theater-app
├── frontend
│   ├── index.html        # Main HTML document for the application
│   ├── style.css         # Styles for the frontend application
│   └── app.js            # JavaScript code for user interactions and API communication
├── backend
│   ├── server.js         # Entry point for the backend application
│   ├── db
│   │   └── database.sql  # SQL commands to create and populate the database
│   └── routes
│       └── index.js      # API endpoints for the application
├── assets
│   └── obras             # Folder containing images related to the movies or shows
└── README.md             # Documentation for the project
```

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- A MySQL or compatible database server.

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd theater-app
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up the database:
   - Open your database management tool and run the SQL commands in `db/database.sql` to create the necessary tables.

4. Start the backend server:
   ```
   node server.js
   ```

5. Navigate to the frontend directory and open `index.html` in your web browser.

## Usage
- Users can log in, select shows, choose seats, and complete their bookings through the frontend interface.
- The backend handles authentication, seat selection, and payment processing.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes. 

## License
This project is licensed under the MIT License.