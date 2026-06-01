export interface BrideGroom {
  name: string;
  fullName: string;
  fatherName: string;
  motherName: string;
  instagram: string;
  image: string;
}

export interface WeddingData {
  bride: BrideGroom;
  groom: BrideGroom;
  date: string;
  title: string;
}
