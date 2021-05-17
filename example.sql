CREATE TABLE `User` (
   `User_code`   int   primary key auto_increment,
   `User_name`   varchar(30)   not NULL,
   `User_country`   varchar(30)   not NULL,
   `User_nickname`   varchar(30)   not NULL,
   `User_introduction`   varchar(1000),
   `User_id`   varchar(20)   not NULL,
   `User_password`   varchar(20)   not NULL,
   `User_sex`   boolean   not NULL,
   `User_birth`   Date not NULL,
   `User_photo`   varchar(500)
);

CREATE TABLE `Activity` (
   `At_code`   int   primary key auto_increment,
   `User_code`   int   NOT NULL,
   `At_title`   varchar(100) not NULL,
   `At_content`   varchar(500) not NULL,
   `At_currentNumber`   int   not NULL default 1,
   `At_recruitNumber`   int   not NULL,
   `At_hostIntro`   varchar(100) NULL,
   `At_place`   varchar(100) not NULL,
   `At_intro`   varchar(1500)not NULL,
   `At_price`   int   not NULL,
    foreign key (User_code) references `User` (User_code) on delete cascade
);

CREATE TABLE `Pid` (
   `Pid_code`   int   primary key auto_increment,
   `User_code`   int   NOT NULL,
   `Pid_title`   varchar(100) not NULL,
   `Pid_content`   varchar(1500) not NULL,
   `Pid_dday`   Date not NULL,
   `Pid_currentNumber`   int   not NULL default 1,
   `Pid_recruitNumber`   int   not NULL,
   `Pid_religion`   varchar(70)   not NULL,
   `Pid_startDate`   Datetime not NULL default current_timestamp ,
   `Pid_finish`   boolean   not NULL,
    foreign key (User_code) references `User` (User_code) on delete cascade
);

CREATE TABLE `Activity_Category` (
   `At_code` int primary key,
    `AC_tag` varchar(10) Null,
    foreign key (At_code) references `Activity` (At_code) on delete cascade
);

CREATE TABLE `Pid_Category` (
   `Pid_code`   int   primary key,
   `PC_tag`   varchar(20)   NULL,
    foreign key (Pid_code) references `Pid` (Pid_code) on delete cascade
);

CREATE TABLE `At_photo` (
   `At_code` int primary key,
    `Apt_filename` varchar(500),
    `Apt_randomName` varchar(500),
    foreign key (At_code) references `Activity` (At_code) on delete cascade
);

CREATE TABLE `Pid_photo` (
   `Pid_code`   int   NOT NULL,
    `Pp_filename` varchar(500),
    `Pp_randomName` varchar(500),
     foreign key (Pid_code) references `Pid` (Pid_code) on delete cascade
);

CREATE TABLE `At_like` (
   `At_code`   int   NOT NULL,
    `Atl_id` varchar(20) not null,
    foreign key (At_code) references `Activity` (At_code) on delete cascade
);

CREATE TABLE `Pid_like` (
   `Pid_code`   int   primary key,
   `pl_id`   varchar(20)   not NULL,
    foreign key (Pid_code) references `Pid` (Pid_code) on delete cascade
);

CREATE TABLE `Pid_reply` (
   `Pr_code`   int   primary key auto_increment,
   `Pid_code`   int   NOT NULL,
   `Pr_writeDate`   Datetime not NULL default current_timestamp,
   `Pr_content`   varchar(150) not NULL,
   `Pr_author`   varchar(20) not NULL,
    foreign key (Pid_code) references `Pid` (Pid_code) on delete cascade
);

CREATE TABLE `Pid_apply` (
   `Pa_code`   int   primary key auto_increment,
   `Pid_code`   int   NOT NULL,
   `Pa_id`   varchar(20)   not NULL,
   `Pa_enter`   boolean   not NULL default 0,
    foreign key (Pid_code) references `Pid` (Pid_code) on delete cascade
);

CREATE TABLE `At_apply` (
   `Aa_code`   int   primary key auto_increment,
   `At_code`   int   NOT NULL,
   `Aa_id`   varchar(20)   not NULL,
   `Aa_enter`   boolean   not NULL default 0,
    foreign key (At_code) references `Activity` (At_code) on delete cascade
);

CREATE TABLE `InterestCountry` (
   `User_code`   int   primary key,
   `Country_name`   varchar(30)   NULL,
    foreign key (User_code) references `User`(User_code) on delete cascade
);