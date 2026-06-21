CREATE TABLE USERS(
    id serial primary key,
    name text,
    email text unique,
    password text not null
);

CREATE TABLE TASKS(
    id serial primary key,
    title text not null,
    description text,
    completed boolean not null default false,
    user_id integer not null references USERS(ID) on delete cascade,

    UNIQUE(title,user_id)
)