export interface RSVPData {
  name: string;
  whatsapp: string;
  guests: number;
  status: 'hadir' | 'tidak_hadir' | 'mungkin';
  message: string;
}

export interface Wish {
  name: string;
  message: string;
  date: string;
}
