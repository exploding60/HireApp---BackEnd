-- Active: 1669197341670@@satao.db.elephantsql.com@5432@apfpynxx
CREATE TABLE work_experiences (
    id_work INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    role VARCHAR (100) NOT NULL,
    company_name VARCHAR (100) NOT NULL,
    description VARCHAR (300) NOT NULL,
    join_date VARCHAR(100) NOT NULL,
    id_pekerja VARCHAR (100),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO work_experiences(role,company_name,description,join_date,id_pekerja) VALUES ('Pegawai', 'PT Mencari Cinta Sejati 2','Aku suka di pt mencari cinta sejati','Januari 2018','217e61a7-187e-48f7-aefa-0bfc6ad30b23')

SELECT id_work,role,company_name,description,join_date,id_pekerja FROM work_experiences WHERE id_pekerja = 'as'
