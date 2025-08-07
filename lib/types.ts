export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  softwares: string[];
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
  duration: string;
  views: string;
}

export interface Vitae {
  id: string;
  name: string;
  file: string; // URL to the CV PDF on Cloudinary
}