export interface PengajuanPinjaman {
    id: number;
    nama: string;
    jumlahPinjaman: number;
    tenor: number;
    disetujui?: boolean;
    alasan?: string;
    tanggalPengajuan?: Date;
}
