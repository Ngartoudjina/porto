export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  softwares: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Experience {
  id: string;
  name: string;
  subject: string;
  image: string;
  verified: boolean;
}

export interface Media {
  id: string;
  title: string;
  description: string;
  src: string;
  category: string;
  duration: number; // Changé de string à number
  views: number;    // Changé de string à number
  // Ajoutez les propriétés manquantes qui apparaissent dans votre code
  publicId?: string;
  width?: number;
  height?: number;
  format?: string;
  fileSize?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Vitae {
  id: string;
  name: string;
  file: string;
  publicId?: string;
  createdAt?: string;
  updatedAt?: string;
}