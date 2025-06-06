-- SQL script to create the database schema for the theater application

-- Create Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Shows table
CREATE TABLE Shows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Seats table
CREATE TABLE Seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    show_id INT NOT NULL,
    seat_number INT NOT NULL,
    status ENUM('libre', 'ocupado', 'seleccionado') DEFAULT 'libre',
    FOREIGN KEY (show_id) REFERENCES Shows(id) ON DELETE CASCADE
);

-- Create Payments table
CREATE TABLE Payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES Shows(id) ON DELETE CASCADE
);

-- Insert sample data into Shows table
INSERT INTO Shows (title, description, date, time) VALUES
('Hamlet', 'A tragedy by William Shakespeare', '2023-11-01', '20:00'),
('The Phantom of the Opera', 'A musical by Andrew Lloyd Webber', '2023-11-05', '19:30'),
('Les Misérables', 'A musical based on the novel by Victor Hugo', '2023-11-10', '21:00');