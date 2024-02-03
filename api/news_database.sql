create schema news_db;
alter
    schema news_db collate utf8mb4_general_ci;

create table news_db.post (
    id INT auto_increment PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(50),
    createdAt VARCHAR(50) NOT NULL
);

create table news_db.comments (
    id INT auto_increment PRIMARY KEY,
    post_id INT NOT NULL,
    author VARCHAR(100) DEFAULT 'anonymous',
    text TEXT NOT NULL
);

alter table news_db.comments add constraint post_id_fk
foreign key (post_id) references post (id) on delete cascade;

INSERT INTO news_db.post (id, title, description, createdAt)
VALUES (50, 'Fire mans saved the cat', 'Breaking news fearless fireman has saved innocent little kitty', '2024-01-28');
INSERT INTO news_db.post (id, title, description, createdAt)
VALUES (51, 'Huges holes on the roads', 'Citizens complaining state of roads, a few cars damaged', '2024-01-05');

INSERT INTO news_db.comments (id, post_id, author, text)
VALUES (40, 50, 'Bob', 'what a good news!');
INSERT INTO news_db.comments (id, post_id, author, text)
VALUES (41, 50, 'Susan', 'useless post');
INSERT INTO news_db.comments (id, post_id, author, text)
VALUES (42, 51, 'Robbie', 'F*cking roads for what i pay taxes');
INSERT INTO news_db.comments (id, post_id, author, text)
VALUES (43, 51, 'Bill', 'love my city');

