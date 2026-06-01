export interface EventDetail {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapUrl: string;
}

export interface WeddingEvents {
  akad: EventDetail;
  resepsi: EventDetail;
}
