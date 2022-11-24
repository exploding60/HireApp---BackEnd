-- Active: 1669184842080@@satao.db.elephantsql.com@5432@apfpynxx@public
CREATE TABLE work_experiences (
    id_work INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    role VARCHAR (100) NOT NULL,
    company_name VARCHAR (100) NOT NULL,
    description VARCHAR (300) NOT NULL,
    id_pekerja VARCHAR (100),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)