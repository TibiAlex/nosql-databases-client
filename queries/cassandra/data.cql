-- Create a Keyspace
CREATE KEYSPACE my_keyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- Use the Keyspace
USE my_keyspace;

-- Create a Table
CREATE TABLE my_table (
    id UUID PRIMARY KEY,
    title TEXT,
    author TEXT,
    publish_date DATE,
    content TEXT
);

-- Insert Data
INSERT INTO my_table (id, title, author, publish_date, content) VALUES (uuid(), 'Cassandra Basics', 'John Doe', '2021-12-15', 'This is a beginner''s guide to Cassandra.');
INSERT INTO my_table (id, title, author, publish_date, content) VALUES (uuid(), 'Advanced Cassandra', 'Alice Smith', '2022-01-10', 'Deep dive into Cassandra features.');
INSERT INTO my_table (id, title, author, publish_date, content) VALUES (uuid(), 'Cassandra in Production', 'Bob Johnson', '2022-02-20', 'Best practices for using Cassandra in production environments.');

-- Select All Data
SELECT * FROM my_table;

-- Select Data by ID
SELECT * FROM my_table WHERE id = <uuid>;

-- Update Data
UPDATE my_table SET author = 'Jane Doe' WHERE id = <uuid>;

-- Delete Data
DELETE FROM my_table WHERE id = <uuid>;

-- Create an Index on Author
CREATE INDEX ON my_table (author);

-- Select Data by Author
SELECT * FROM my_table WHERE author = 'John Doe';

-- Filtering Data by Publish Date
SELECT * FROM my_table WHERE publish_date >= '2021-01-01' ALLOW FILTERING;

-- Aggregating Data (Note: Cassandra has limited support for aggregation)
-- Count the number of rows in the table
SELECT COUNT(*) FROM my_table;

-- Drop the Index
DROP INDEX my_table_author_idx;

-- Drop the Table
DROP TABLE my_table;

-- Drop the Keyspace
DROP KEYSPACE my_keyspace;