use club_management;
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

create TABLE club_category(Club_ID int,  Category_ID int, primary key(Club_ID, Category_ID));
alter table club_category add foreign key club_category(club_id) references CLub(clubid);
alter table club_category add foreign key club_category(category_id) references Category(category_id);

create table CLUB_MEMBER(club_id int, member_id int, primary key(club_id, member_id));
alter table CLUB_MEMBER add foreign key club_member(club_id) references club(clubid);
alter table CLUB_MEMBER add foreign key club_member(member_id) references member(member_id);






