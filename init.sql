-- init.sql
CREATE DATABASE IF NOT EXISTS mydatabase;

USE mydatabase;

CREATE TABLE transactions (
  id INT PRIMARY KEY,
  sourceAccount VARCHAR(255),
  targetAccount VARCHAR(255),
  amount DECIMAL(10, 2),
  category VARCHAR(255),
  time DATETIME
);

INSERT INTO transactions (id, sourceAccount, targetAccount, amount, category, time) VALUES
(3, 'A', 'B', 1000, 'eating_out', '2018-03-02 10:34:30'),
(11, 'A', 'B', 1000, 'eating_out', '2018-03-02 10:35:20'),
(4, 'A', 'C', 250, 'other', '2018-03-02 10:37:20'),
(12, 'A', 'C', 250, 'other', '2018-03-02 10:37:40'),
(5, 'A', 'D', 250, 'other', '2018-03-02 10:39:40'),
(6, 'A', 'E', 250, 'other', '2018-03-02 10:39:50'),
(7, 'A', 'F', 250, 'other', '2018-03-02 10:43:10'),
(8, 'A', 'G', 250, 'other', '2018-03-02 10:45:10'),
(9, 'A', 'H', 250, 'other', '2018-03-02 10:46:10'),
(10, 'A', 'I', 250, 'other', '2018-03-02 10:47:10'),
(17, 'A', 'H', 250, 'other', '2018-03-02 10:50:10'),
(18, 'A', 'I', 250, 'other', '2018-03-02 10:54:10'),
(19, 'A', 'I', 250, 'other', '2018-03-02 10:54:50');
