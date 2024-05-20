-- public.book definition

-- Drop table

-- DROP TABLE public.book;

CREATE TABLE public.book (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id)
);


-- public."user" definition

-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user" (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
);


-- public.user_book definition

-- Drop table

-- DROP TABLE public.user_book;

CREATE TABLE public.user_book (
	id serial4 NOT NULL,
	status public.user_book_status_enum NOT NULL,
	"userScore" int4 NULL,
	"userId" int4 NULL,
	"bookId" int4 NULL,
	CONSTRAINT "PK_3fdacff8af7da81a1cab6bc9f17" PRIMARY KEY (id),
	CONSTRAINT "FK_82b430d61bfdb4e840329b48170" FOREIGN KEY ("bookId") REFERENCES public.book(id),
	CONSTRAINT "FK_ab47037d446ad35a3437ad77170" FOREIGN KEY ("userId") REFERENCES public."user"(id)
);