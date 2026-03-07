-- CREATE DATABASE NAME OWNER USER;

CREATE TABLE IF NOT EXISTS farmacias (
    id SERIAL PRIMARY KEY,
    some_code VARCHAR(10) NOT NULL UNIQUE,
    name_farmacia TEXT NOT NULL,
    rif VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(255) DEFAULT NULL
);
CREATE INDEX ix_farmacias_name ON farmacias (name_farmacia);

CREATE TABLE IF NOT EXISTS caja_farmacia (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER NOT NULL,
    nm_caja INTEGER NOT NULL,
    area VARCHAR(255) NOT NULL,
    CONSTRAINT fk_cajas_farmacia_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX ix_caja_farmacia_id_farmacia ON caja_farmacia (id_farmacia);

CREATE TABLE IF NOT EXISTS punto_venta (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    modelo VARCHAR(255) NOT NULL,
    banco TEXT NOT NULL,
    serial_code VARCHAR(255) NOT NULL UNIQUE,
    tag TEXT DEFAULT 'Punto de venta',
    CONSTRAINT fk_punto_venta_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX ix_punto_venta_banco ON punto_venta (banco);
CREATE INDEX ix_punto_venta_serial ON punto_venta (serial_code);

CREATE TABLE IF NOT EXISTS equipo_pc (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    ip VARCHAR(255) NOT NULL,
    anydesk VARCHAR(255) DEFAULT '',
    sa_anydesk VARCHAR(255) DEFAULT NULL,
    so VARCHAR(255) NOT NULL,
    ram FLOAT NOT NULL,
    disk VARCHAR(255) NOT NULL DEFAULT 'HDD',
    rom_size FLOAT NOT NULL DEFAULT 0,
    CONSTRAINT fk_equipo_pc_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX ix_equipo_pc_ip ON equipo_pc (ip);
CREATE INDEX ix_equipo_pc_id_farmacia ON equipo_pc (id_farmacia);

CREATE TABLE IF NOT EXISTS equipo_impresora (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    modelo_print TEXT NOT NULL,
    marca TEXT NOT NULL,
    area VARCHAR(255) NOT NULL,
    count_toners INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_equipo_impresora_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX ix_equipo_impresora_marca ON equipo_impresora (marca);

CREATE TABLE IF NOT EXISTS cajas_asigne_equipo (
    id SERIAL PRIMARY KEY,
    name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    resum_equipo TEXT DEFAULT NULL,
    id_equipo INTEGER NOT NULL,
    observacion_asignacion TEXT DEFAULT NULL,

    CONSTRAINT fk_asigne_equipo_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_asigne_equipo_pc FOREIGN KEY (id_equipo) 
        REFERENCES equipo_pc (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX ix_cajas_asigne_equipo_id_farmacia ON cajas_asigne_equipo (id_farmacia);
CREATE INDEX ix_cajas_asigne_equipo_id_equipo ON cajas_asigne_equipo (id_equipo);
CREATE UNIQUE INDEX ux_cajas_equipo_unico ON cajas_asigne_equipo (id_equipo);

CREATE TABLE IF NOT EXISTS cajas_asigne_punto_venta (
    id SERIAL PRIMARY KEY,
    name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    id_punto_venta INTEGER NOT NULL,
    observacion_pos TEXT DEFAULT NULL,

    CONSTRAINT fk_asigne_pv_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_asigne_pv_punto FOREIGN KEY (id_punto_venta) 
        REFERENCES punto_venta (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX ix_asigne_pv_id_farmacia ON cajas_asigne_punto_venta (id_farmacia);
CREATE UNIQUE INDEX ux_asigne_pv_equipo_unico ON cajas_asigne_punto_venta (id_punto_venta);
CREATE INDEX ix_asigne_pv_id_punto_venta ON cajas_asigne_punto_venta (id_punto_venta);

CREATE TABLE IF NOT EXISTS requerimientos_solicitudes (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    name_req VARCHAR(255) NOT NULL,
    descripcion TEXT DEFAULT 'sin Requerimiento',
    fix BOOL DEFAULT false,
    fecha_req DATE DEFAULT CURRENT_DATE,
    fecha_fix DATE DEFAULT NULL,
    
    CONSTRAINT fk_asigne_pv_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX ix_requerimientos_id_farmacia ON requerimientos_solicitudes (id_farmacia);
CREATE INDEX ix_requerimientos_fix ON requerimientos_solicitudes (fix) WHERE fix = false;
CREATE INDEX ix_requerimientos_fecha_req ON requerimientos_solicitudes (fecha_req);
CREATE INDEX ix_requerimientos_name_req ON requerimientos_solicitudes (name_req);

CREATE TABLE IF NOT EXISTS incidencias_pc (
    id SERIAL PRIMARY KEY,
    id_farmacia INTEGER,
	equipo_resum TEXT DEFAULT NULL,
    id_equipo INTEGER NOT NULL,
    nombre_inci VARCHAR(255) NOT NULL,
    descripcion TEXT DEFAULT 'sin novedades',
    fecha_incidencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_incidencias_pc_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_incidencias_id_equipo FOREIGN KEY (id_equipo) 
        REFERENCES equipo_pc (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX ix_incidencias_pc_id_equipo ON incidencias_pc (id_equipo);
CREATE INDEX ix_incidencias_pc_id_farmacia ON incidencias_pc (id_farmacia);
CREATE INDEX ix_incidencias_pc_nombre ON incidencias_pc (nombre_inci);
CREATE INDEX ix_incidencias_pc_fecha ON incidencias_pc (fecha_incidencia);

CREATE TABLE IF NOT EXISTS incidencias_generales (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    nombre_inci VARCHAR(255) NOT NULL,
    descripcion TEXT DEFAULT 'sin novedades',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_incidencias_gen_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX ix_incidencias_gen_id_farmacia ON incidencias_generales (id_farmacia);
CREATE INDEX ix_incidencias_gen_nombre ON incidencias_generales (nombre_inci);
CREATE INDEX ix_incidencias_gen_fecha ON incidencias_generales (fecha_registro);

CREATE TABLE IF NOT EXISTS inventario_general (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER,
    hardware TEXT NOT NULL,
    nota TEXT DEFAULT NULL,
    cantidad INTEGER DEFAULT 0,

    CONSTRAINT fk_inventario_general_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX ix_inventario_gen_id_farmacia ON inventario_general (id_farmacia);
CREATE INDEX ix_inventario_gen_hardware ON inventario_general (hardware);
CREATE INDEX ix_inventario_farmacia_hardware ON inventario_general (id_farmacia, hardware);

CREATE TABLE IF NOT EXISTS usuario_role (
	id SERIAL PRIMARY KEY,
	rolee VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    id_role INTEGER DEFAULT NULL,
    name_user VARCHAR(255) NOT NULL,
    ape VARCHAR(255) DEFAULT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    contact VARCHAR(255) DEFAULT NULL,

    CONSTRAINT fk_usuario_id_role FOREIGN KEY (id_role) 
        REFERENCES usuario_role(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX ix_usuario_username ON usuario (username);
CREATE INDEX ix_usuario_id_role ON usuario (id_role);	
CREATE INDEX ix_usuario_nombre_completo ON usuario (name_user, ape);

CREATE TABLE IF NOT EXISTS usuario_by_farmacia (
    id SERIAL PRIMARY KEY,
	name_farmacia TEXT DEFAULT NULL,
    id_farmacia INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,

    CONSTRAINT fk_usuario_by_farmacia_id_farmacia FOREIGN KEY (id_farmacia) 
        REFERENCES farmacias (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_usuario_by_farmacia_id_usuario FOREIGN KEY (id_usuario) 
        REFERENCES usuario (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX ix_usuario_by_farmacia_id_usuario ON usuario_by_farmacia (id_usuario);
CREATE INDEX ix_usuario_by_farmacia_id_farmacia ON usuario_by_farmacia (id_farmacia);
CREATE UNIQUE INDEX ux_usuario_farmacia_duplicado ON usuario_by_farmacia (id_usuario, id_farmacia);