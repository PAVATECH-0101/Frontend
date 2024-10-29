-- schema.sql
CREATE TABLE UserPreferences (
    UserId INT PRIMARY KEY,
    StartWaypoint NVARCHAR(MAX),
    EndWaypoint NVARCHAR(MAX)
);
