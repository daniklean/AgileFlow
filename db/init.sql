-- CREATE DATABASE IF NOT EXISTS 
SELECT 'CREATE DATABASE kanban_task_pg'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'kanban_task_pg')