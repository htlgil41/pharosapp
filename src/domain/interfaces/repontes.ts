export interface IncidenciasGenerales {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    nombre_inci: string;
    descripcion: string | null;
    fecha_registro: string | Date;
}

export interface IncidenciasPc {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    equipo_resum: string;
    id_equipo: number;
    nombre_inci: string;
    descripcion: string | null;
    fecha_incidencia: string | Date;
}

export interface Requerimientos {
    id: number;
    name_farmacia: string | null;
    id_farmacia: number | null;
    name_req: string | null;
    descripcion: string | null;
    fix: boolean;
    fecha_req: string | Date;
    fecha_fix: string | Date;
}