PGDMP         #                y            postgres #   12.7 (Ubuntu 12.7-0ubuntu0.20.04.1) #   12.7 (Ubuntu 12.7-0ubuntu0.20.04.1) +    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    13463    postgres    DATABASE     z   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false            ?           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3020                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            ?           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            ?            1259    16766    billing    TABLE     ?   CREATE TABLE public.billing (
    id integer NOT NULL,
    user_id integer NOT NULL,
    balance integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.billing;
       public         heap    postgres    false    3            ?            1259    16764    billing_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.billing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.billing_id_seq;
       public          postgres    false    209    3            ?           0    0    billing_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.billing_id_seq OWNED BY public.billing.id;
          public          postgres    false    208            ?            1259    16774    cars    TABLE     ?  CREATE TABLE public.cars (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    brand character varying(255) NOT NULL,
    color character varying(255) NOT NULL,
    prod_year character varying(255) NOT NULL,
    cost integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.cars;
       public         heap    postgres    false    3            ?            1259    16772    cars_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.cars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cars_id_seq;
       public          postgres    false    3    211            ?           0    0    cars_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.cars_id_seq OWNED BY public.cars.id;
          public          postgres    false    210            ?            1259    16785    charts    TABLE     ?   CREATE TABLE public.charts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    car_id integer NOT NULL,
    quantity integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.charts;
       public         heap    postgres    false    3            ?            1259    16783    charts_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.charts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.charts_id_seq;
       public          postgres    false    213    3            ?           0    0    charts_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.charts_id_seq OWNED BY public.charts.id;
          public          postgres    false    212            ?            1259    16793    payments    TABLE     G  CREATE TABLE public.payments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    car_id integer NOT NULL,
    quantity integer NOT NULL,
    total_paid integer NOT NULL,
    status character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.payments;
       public         heap    postgres    false    3            ?            1259    16791    payments_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.payments_id_seq;
       public          postgres    false    215    3            ?           0    0    payments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;
          public          postgres    false    214            ?            1259    16753    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    user_type character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            ?            1259    16751    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    3    207            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    206            /           2604    16769 
   billing id    DEFAULT     h   ALTER TABLE ONLY public.billing ALTER COLUMN id SET DEFAULT nextval('public.billing_id_seq'::regclass);
 9   ALTER TABLE public.billing ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            0           2604    16777    cars id    DEFAULT     b   ALTER TABLE ONLY public.cars ALTER COLUMN id SET DEFAULT nextval('public.cars_id_seq'::regclass);
 6   ALTER TABLE public.cars ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            1           2604    16788 	   charts id    DEFAULT     f   ALTER TABLE ONLY public.charts ALTER COLUMN id SET DEFAULT nextval('public.charts_id_seq'::regclass);
 8   ALTER TABLE public.charts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            2           2604    16796    payments id    DEFAULT     j   ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);
 :   ALTER TABLE public.payments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            .           2604    16756    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            ?          0    16766    billing 
   TABLE DATA           Q   COPY public.billing (id, user_id, balance, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    209            ?          0    16774    cars 
   TABLE DATA           k   COPY public.cars (id, type, brand, color, prod_year, cost, quantity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    211            ?          0    16785    charts 
   TABLE DATA           Y   COPY public.charts (id, user_id, car_id, quantity, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    213            ?          0    16793    payments 
   TABLE DATA           o   COPY public.payments (id, user_id, car_id, quantity, total_paid, status, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215            ?          0    16753    users 
   TABLE DATA           ?   COPY public.users (id, first_name, last_name, username, email, password, phone_number, address, user_type, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    207            ?           0    0    billing_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.billing_id_seq', 1, true);
          public          postgres    false    208            ?           0    0    cars_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cars_id_seq', 1, false);
          public          postgres    false    210            ?           0    0    charts_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.charts_id_seq', 1, false);
          public          postgres    false    212            ?           0    0    payments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.payments_id_seq', 1, false);
          public          postgres    false    214            ?           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 8, true);
          public          postgres    false    206            8           2606    16771    billing billing_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.billing
    ADD CONSTRAINT billing_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.billing DROP CONSTRAINT billing_pkey;
       public            postgres    false    209            :           2606    16782    cars cars_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cars DROP CONSTRAINT cars_pkey;
       public            postgres    false    211            <           2606    16790    charts charts_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.charts
    ADD CONSTRAINT charts_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.charts DROP CONSTRAINT charts_pkey;
       public            postgres    false    213            >           2606    16798    payments payments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    215            4           2606    16763    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    207            6           2606    16761    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    207            ?   0   x?3???4?4202?50?54U0??2??2?Գ04?6??#????? ?	?      ?      x?????? ? ?      ?      x?????? ? ?      ?      x?????? ? ?      ?     x?}??O?0 ??????ͬ??B???????йx??b??5?????&^?wx??=?Bvߡ?p?????U?!FNzWK?4?h?-
*??l??WٸX27??}<S??4-?m?F?0L\??M??o;????l@o?<@? S?!eCC?????,J-?V?? %+.jP~???t????;?.1>	??5c?????~:I?7??yR???*M??5ᶑj??????%uX??2|??!?????ʺ??e??~h?     