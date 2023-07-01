--
-- PostgreSQL database cluster dump
--

-- Started on 2023-07-01 14:05:27

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:vXzHH5e1vGGq82qL/60hxg==$j+u5liY3h6Ylny+vTbkUPdczdVbUg0VOxH21F1cLA/0=:Fw1/pFvu8Q9RGRfzc45BI+kovXvSPWAE/QyQSvaDZx8=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-01 14:05:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2023-07-01 14:05:31

--
-- PostgreSQL database dump complete
--

--
-- Database "db_dashboard" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-01 14:05:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3360 (class 1262 OID 16398)
-- Name: db_dashboard; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE db_dashboard WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';


ALTER DATABASE db_dashboard OWNER TO postgres;

\connect db_dashboard

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16445)
-- Name: document_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.document_types (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.document_types OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16444)
-- Name: document_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.document_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.document_types_id_seq OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 220
-- Name: document_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.document_types_id_seq OWNED BY public.document_types.id;


--
-- TOC entry 217 (class 1259 OID 16417)
-- Name: hobbies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hobbies (
    id integer NOT NULL,
    userid integer NOT NULL,
    hobby character varying(255) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.hobbies OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16416)
-- Name: hobbies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hobbies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hobbies_id_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 216
-- Name: hobbies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hobbies_id_seq OWNED BY public.hobbies.id;


--
-- TOC entry 219 (class 1259 OID 16430)
-- Name: logins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logins (
    id integer NOT NULL,
    userid integer NOT NULL,
    logintime timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ipaddress character varying(255),
    deviceinfo character varying(255)
);


ALTER TABLE public.logins OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16429)
-- Name: logins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logins_id_seq OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 218
-- Name: logins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logins_id_seq OWNED BY public.logins.id;


--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    document_number character varying(20) NOT NULL,
    birthdate date NOT NULL,
    expedition_date date NOT NULL,
    username character varying(255),
    password character varying(255),
    document_type integer NOT NULL,
    residence_country character varying(255),
    residence_city character varying(255),
    residence_address character varying(255),
    profile_photo text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16399)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3193 (class 2604 OID 16448)
-- Name: document_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document_types ALTER COLUMN id SET DEFAULT nextval('public.document_types_id_seq'::regclass);


--
-- TOC entry 3189 (class 2604 OID 16420)
-- Name: hobbies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hobbies ALTER COLUMN id SET DEFAULT nextval('public.hobbies_id_seq'::regclass);


--
-- TOC entry 3191 (class 2604 OID 16433)
-- Name: logins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logins ALTER COLUMN id SET DEFAULT nextval('public.logins_id_seq'::regclass);


--
-- TOC entry 3188 (class 2604 OID 16403)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3354 (class 0 OID 16445)
-- Dependencies: 221
-- Data for Name: document_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.document_types (id, name) FROM stdin;
1	Cédula de Ciudadanía
2	Tarjeta de Identidad
3	Pasaporte
\.


--
-- TOC entry 3350 (class 0 OID 16417)
-- Dependencies: 217
-- Data for Name: hobbies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hobbies (id, userid, hobby, createdat) FROM stdin;
\.


--
-- TOC entry 3352 (class 0 OID 16430)
-- Dependencies: 219
-- Data for Name: logins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logins (id, userid, logintime, ipaddress, deviceinfo) FROM stdin;
\.


--
-- TOC entry 3348 (class 0 OID 16400)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, phone_number, first_name, last_name, document_number, birthdate, expedition_date, username, password, document_type, residence_country, residence_city, residence_address, profile_photo) FROM stdin;
10	sebastian45roa@gmail.com	3012191573	Sebastian	Ocampo	1010088562	2000-05-04	2018-05-07	sebastian	$2b$10$qCjR6tAYiRsbUGBhEs2YsOoQYT4HG4jA8L5crfRncVjUYrXwXwsGi	1	\N	\N	\N	\N
\.


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 220
-- Name: document_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.document_types_id_seq', 3, true);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 216
-- Name: hobbies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hobbies_id_seq', 1, false);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 218
-- Name: logins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logins_id_seq', 1, false);


--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- TOC entry 3201 (class 2606 OID 16450)
-- Name: document_types document_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.document_types
    ADD CONSTRAINT document_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 16423)
-- Name: hobbies hobbies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hobbies
    ADD CONSTRAINT hobbies_pkey PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 16438)
-- Name: logins logins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logins
    ADD CONSTRAINT logins_pkey PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 16407)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 16451)
-- Name: users fk_document_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_document_type FOREIGN KEY (document_type) REFERENCES public.document_types(id);


--
-- TOC entry 3203 (class 2606 OID 16424)
-- Name: hobbies hobbies_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hobbies
    ADD CONSTRAINT hobbies_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 3204 (class 2606 OID 16439)
-- Name: logins logins_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logins
    ADD CONSTRAINT logins_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


-- Completed on 2023-07-01 14:05:32

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-01 14:05:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 3316 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


-- Completed on 2023-07-01 14:05:33

--
-- PostgreSQL database dump complete
--

-- Completed on 2023-07-01 14:05:33

--
-- PostgreSQL database cluster dump complete
--

