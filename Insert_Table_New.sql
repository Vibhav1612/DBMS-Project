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

alter table club drop column Advisor;
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

INSERT INTO `club_management`.`user` (`User_ID`, `Name`, `Email`) VALUES ('1', 'Ram', 'ram@gmail.com');
INSERT INTO `club_management`.`user` (`User_ID`, `Name`, `Email`) VALUES ('2', 'Joe', 'joe@gmail.com');
INSERT INTO `club_management`.`user` (`User_ID`, `Name`, `Email`) VALUES ('3', 'Jay', 'jay@gmail.com');
INSERT INTO `club_management`.`user` (`User_ID`, `Name`, `Email`) VALUES ('4', 'Vish', 'vish@gmail.com');
INSERT INTO `club_management`.`user` (`User_ID`, `Name`, `Email`) VALUES ('5', 'Bob', 'bob@gmail.com');


INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('1', 'Head');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('2', 'Web Developer');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('3', 'Logistic');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('4', 'Operations');
INSERT INTO `club_management`.`member` (`Member_ID`, `Role`) VALUES ('5', 'Events');



