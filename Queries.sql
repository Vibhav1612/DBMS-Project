/* CREATE */

create table Club (ClubID int primary key, ClubName varchar(50), Description varchar(50), Advisor varchar(50));


create table announcement(Announcement_ID int,Content varchar(50),Title varchar(50),Date date);


create table budget(Budget_ID int primary key,year year,Amount mediumtext);


create TABLE club_category(Club_ID int,  Category_ID int, primary key(Club_ID, Category_ID));


create table CLUB_MEMBER(club_id int, member_id int, primary key(club_id, member_id));


create table event(Event_ID int primary key,Description varchar(50),Location varchar(50),Date_Time datetime,Title varchar(50));


create table faculty_advisor(Name varchar(50),Phone_number mediumtext,Faculty_ID int primary key);

create table meetings(Meeting_ID int primary key,Date_Time datetime,Agenda varchar(50));


create table users(Email varchar(50),Password varchar(50),user_id int);

/* ALTER */

alter table Club add column Faculty_ID int;
alter table Club add constraint Fk1 foreign key CLub(Faculty_ID) references FACULTY_ADVISOR(Faculty_ID);


alter table ANNOUNCEMENT add column Club_id int;
alter table ANNOUNCEMENT add foreign key ANNOUNCEMENT(Club_id) references CLUB(Clubid);


alter table Event add column Club_id int;
alter table Event add foreign key Event(Club_id) references CLUB(Clubid);


alter table Meeting add column Club_id int;
alter table Meeting add foreign key Meeting(Club_id) references CLUB(Clubid);


alter table Budget add column Club_id int;
alter table Budget add foreign key Budget(Club_id) references CLUB(Clubid);

alter table club_category add foreign key club_category(club_id) references CLub(clubid);
alter table club_category add foreign key club_category(category_id) references Category(category_id);


alter table CLUB_MEMBER add foreign key club_member(club_id) references club(clubid);
alter table CLUB_MEMBER add foreign key club_member(member_id) references member(member_id);


/* INSERT AND UPDATE */

INSERT INTO `club_management`.`event` (`Event_ID`, `Description`, `Location`, `Date_Time`, `Title`, `Club_id`) VALUES ('2', 'RoadShow', 'PESU52', '2023-11-20 20:30:30', 'Roadshow', '2');
INSERT INTO `club_management`.`event` (`Event_ID`, `Description`, `Location`, `Date_Time`, `Title`, `Club_id`) VALUES ('3', 'HashCode', 'MRD', '2023-11-21 20:00:00', 'HashCode', '2');
INSERT INTO `club_management`.`event` (`Event_ID`, `Description`, `Location`, `Date_Time`, `Title`, `Club_id`) VALUES ('4', 'Robot-Wars', 'GJB', '2023-11-25 10:00:00', 'RW', '3');
INSERT INTO `club_management`.`event` (`Event_ID`, `Description`, `Location`, `Date_Time`, `Title`, `Club_id`) VALUES ('5', 'Apple-Develop', 'PESU52', '2023-11-28 11:00:00', 'Developing', '3');
update event set CLub_ID = 1 where Title = 'Hallothon';


INSERT INTO `club_management`.`announcement` (`Announcement_ID`, `Content`, `Title`, `Date`, `Club_id`) VALUES ('1', 'Join us for a seminar on ML', 'ML Seminar', '2023-11-23', '2');
INSERT INTO `club_management`.`announcement` (`Announcement_ID`, `Content`, `Title`, `Date`, `Club_id`) VALUES ('2', 'Fashion Show', 'Fashion Show', '2023-11-24', '1');
INSERT INTO `club_management`.`announcement` (`Announcement_ID`, `Content`, `Title`, `Date`, `Club_id`) VALUES ('3', 'PIL are Recruiting', 'PIL RAECRUITMENTS', '2023-11-30', '2');
INSERT INTO `club_management`.`announcement` (`Announcement_ID`, `Content`, `Title`, `Date`, `Club_id`) VALUES ('4', 'ADG is recruiting!', 'ADG recruitments', '2023-11-28', '3');


INSERT INTO `club_management`.`category` (`Category_ID`, `Category_Name`) VALUES ('1', 'Technical');
INSERT INTO `club_management`.`category` (`Category_ID`, `Category_Name`) VALUES ('2', 'Cultural');
INSERT INTO `club_management`.`category` (`Category_ID`, `Category_Name`) VALUES ('3', 'RND');
INSERT INTO `club_management`.`category` (`Category_ID`, `Category_Name`) VALUES ('4', 'Music');


INSERT INTO `club_management`.`club` (`ClubID`, `ClubName`, `Description`, `Advisor`) VALUES ('4', 'Trance', 'Dance', 'Mr D');
INSERT INTO `club_management`.`club` (`ClubID`, `ClubName`, `Description`, `Advisor`) VALUES ('5', 'Ecell', 'Entrepreneurship', 'Mr E');
INSERT INTO `club_management`.`club` (`ClubID`, `ClubName`, `Description`, `Advisor`) VALUES ('1', 'Aatmatrisha', 'Feast commitee', 'Mr A');
INSERT INTO `club_management`.`club` (`ClubID`, `ClubName`, `Description`, `Advisor`) VALUES ('2', 'PES Innovation Lab', 'Reasearch', 'Mr B');
INSERT INTO `club_management`.`club` (`ClubID`, `ClubName`, `Description`, `Advisor`) VALUES ('3', 'ADG', 'Development', 'Mr C');
INSERT INTO `club_management`.`faculty_advisor` (`Name`, `Phone_Number`, `Faculty_ID`) VALUES ('Mr A', '1111111111', '1');
INSERT INTO `club_management`.`faculty_advisor` (`Name`, `Phone_Number`, `Faculty_ID`) VALUES ('Mr B', '2222222222', '2');
INSERT INTO `club_management`.`faculty_advisor` (`Name`, `Phone_Number`, `Faculty_ID`) VALUES ('Mr C', '3333333333', '3');


UPDATE `club_management`.`club` SET `Faculty_ID` = '1' WHERE (`ClubID` = '1');
UPDATE `club_management`.`club` SET `Faculty_ID` = '2' WHERE (`ClubID` = '2');
UPDATE `club_management`.`club` SET `Faculty_ID` = '2' WHERE (`ClubID` = '3');
UPDATE `club_management`.`club` SET `Faculty_ID` = '3' WHERE (`ClubID` = '4');
UPDATE `club_management`.`club` SET `Faculty_ID` = '1' WHERE (`ClubID` = '5');


INSERT INTO `club_management`.`budget` (`Budget_id`, `year`, `Amount`, `Club_id`) VALUES ('1', 2023, '20000', '1');
INSERT INTO `club_management`.`budget` (`Budget_id`, `year`, `Amount`, `Club_id`) VALUES ('4', 2023, '30000', '2');
INSERT INTO `club_management`.`budget` (`Budget_id`, `year`, `Amount`, `Club_id`) VALUES ('4', 2023, '15000', '3');
INSERT INTO `club_management`.`budget` (`Budget_id`, `year`, `Amount`, `Club_id`) VALUES ('4', 2023, '27000', '4');


INSERT INTO `club_management`.`club_category` (`Club_ID`, `Category_ID`) VALUES ('1', '1');
INSERT INTO `club_management`.`club_category` (`Club_ID`, `Category_ID`) VALUES ('1', '2');
INSERT INTO `club_management`.`club_category` (`Club_ID`, `Category_ID`) VALUES ('2', '1');
INSERT INTO `club_management`.`club_category` (`Club_ID`, `Category_ID`) VALUES ('2', '3');
INSERT INTO `club_management`.`club_category` (`Club_ID`, `Category_ID`) VALUES ('3', '3');


INSERT INTO `club_management`.`meeting` (`Meeting_ID`, `Date_Time`, `Agenda`, `Club_id`) VALUES ('1', ' 2023-11-22 21:30:00', 'RnD Discussion', '2');
INSERT INTO `club_management`.`meeting` (`Meeting_ID`, `Date_Time`, `Agenda`, `Club_id`) VALUES ('2', ' 2023-11-29 19:00:00', 'Fest Discussion', '1');
INSERT INTO `club_management`.`meeting` (`Meeting_ID`, `Date_Time`, `Agenda`, `Club_id`) VALUES ('3', ' 2023-11-20 18:00:00', 'Robotics Discussion', '2');
INSERT INTO `club_management`.`meeting` (`Meeting_ID`, `Date_Time`, `Agenda`, `Club_id`) VALUES ('4', ' 2023-11-25 22:00:00', 'Apple Devs Meeting', '3');


INSERT INTO `club_management`.`users` (`Email`,`Password`) VALUES ('ram@gmail.com','123');
INSERT INTO `club_management`.`users` (`Email`,`Password`) VALUES ('joe@gmail.com','123');
INSERT INTO `club_management`.`users` (`Email`,`Password`) VALUES ('jay@gmail.com','123');
INSERT INTO `club_management`.`users` (`Email`,`Password`) VALUES ('vish@gmail.com','12345');
INSERT INTO `club_management`.`users` (`Email`,`Password`) VALUES ('bob@gmail.com','abc');


INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('1', 'Head');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('2', 'Web Developer');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('3', 'Logistic');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('4', 'Operations');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('5', 'Events');



/* NESTED QUERIES */
SELECT * FROM meetings WHERE Club_ID IN (SELECT ClubID FROM Club_User WHERE User_ID = ?);

 SELECT club.clubid, club.ClubName, (
      SELECT COUNT(*) FROM event WHERE event.club_id = club.clubid
    ) AS event_count
    FROM club;
    

/* UPDATE QUERY */

UPDATE meetings SET Agenda = ?, Date_Time = ? WHERE Meeting_ID = ? AND Club_ID IN (SELECT ClubID FROM Club_User WHERE User_ID = ?);

/* JOIN QUERIES */

SELECT club.*
      FROM club
      INNER JOIN club_category ON club.clubid = club_category.Club_id
      INNER JOIN category ON club_category.category_id = category.category_id
      WHERE category.category_name = ?;
      
      
/* TRIGGERS */

CREATE TRIGGER increment_user_id BEFORE INSERT ON users
    FOR EACH ROW
    SET NEW.user_id = IFNULL((SELECT MAX(user_id) FROM users),0)+1;
    

/* AGGREGATE QUERIES */

SELECT club.clubid, club.ClubName, (
      SELECT COUNT(*) FROM event WHERE event.club_id = club.clubid
    ) AS event_count
    FROM club;

CREATE TRIGGER increment_user_id BEFORE INSERT ON users
    FOR EACH ROW
    SET NEW.user_id = IFNULL((SELECT MAX(user_id) FROM users),0)+1;



/* PROCEDURES */

DELIMITER //
create PROCEDURE `GetUserClubs`(IN userId INT)
BEGIN
    SELECT club.clubid, club.ClubName
    FROM club
    INNER JOIN Club_User ON club.clubid = Club_User.ClubID
    WHERE Club_User.User_ID = userId;
END //
delimiter ;


DELIMITER //

create PROCEDURE `SelectAnnouncementsWithSearchTerm`(IN search_term VARCHAR(255))
BEGIN
    SET @query = CONCAT('SELECT * FROM ANNOUNCEMENT WHERE CONTENT LIKE "%', search_term, '%" AND DATE > CURDATE();');
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //
delimiter ;
















