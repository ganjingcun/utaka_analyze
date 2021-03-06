
create database pools;
use pools;

CREATE TABLE pay_history(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  start_time timestamp,
  metric varchar(100),
  tag varchar(100),
  address varchar(100),
  total  float8  DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE (start_time, metric)
);

insert into pay_history values(null, now(), 'fish_xx','fish', 'xx', 12);


select count(*), metric  from pay_history group by metric ;

DROP SERIES FROM miner_status WHERE address='r_MeI2MiNckImjC'

DROP SERIES FROM miner_status WHERE address='0xdea727cc7E2e290212F5b6fA03E06Cd854F17c09'