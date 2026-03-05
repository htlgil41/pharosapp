export interface EquipoPC {
    id: bigint;
    name_farmacia: string | null;
    id_farmacia: number | null;
    ip: string;
    anydesk: string | null;
    sa_anydesk: string | null;
    so: string;
    ram: number;
    disk: string;
    rom_size: number;
}

export interface EquipoImpresora {
    id: bigint;
    name_farmacia: string | null;
    id_farmacia: number | null;
    modelo_print: string;
    marca: string;
    area: string;
    count_toners: number;
}

export interface PuntoVenta {
    id: bigint;
    name_farmacia: string | null;
    id_farmacia: bigint | null;
    modelo: string;
    banco: string;
    serial_code: string;
    tag: string | null;
}

export interface InventarioGeneral {
    id: bigint;
    name_farmacia: string | null;
    id_farmacia: number | null;
    hardware: string;
    nota: string | null;
    cantidad: number;
}