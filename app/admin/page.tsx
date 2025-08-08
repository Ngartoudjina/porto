"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, FileText, Menu, Mail, MessageSquare } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { Project, Experience, Media, Vitae } from "@/lib/types";

interface Email {
  id: string;
  email: string;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  country: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [vitae, setVitae] = useState<Vitae[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [projectForm, setProjectForm] = useState<{ id?: string; title: string; description: string; image: File | string | null; softwares: string[] }>({
    title: '',
    description: '',
    image: null,
    softwares: [],
  });
  const [experienceForm, setExperienceForm] = useState<{ name: string; subject: string; image: File | string; verified: boolean }>({ name: "", subject: "", image: "", verified: false });
  const [mediaForm, setMediaForm] = useState<{ title: string; description: string; src: File | string; category: string; duration: string; views: string }>({
    title: "", description: "", src: "", category: "", duration: "", views: "",
  });
  const [vitaeForm, setVitaeForm] = useState<{ name: string; file: File | string }>({ name: "", file: "" });
  const [emailForm, setEmailForm] = useState<{ id?: string; email: string }>({ email: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"projects" | "experiences" | "media" | "vitae" | "emails" | "messages">("projects");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: "project" | "experience" | "media" | "vitae" | "email" | "message"; title: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const availableSoftwares = [
    'Matlab',
    'AutoCAD',
    'Proteus',
    'PVsyst',
    'EasyEDA',
    'Fusion 360',
    'TRNSYS',
    'LTspice',
    'TopSolid',
    'SimulIDE',
    'FreeCAD',
    'TRNBuild',
    'RETScreen Expert',
    'Bitzer Software',
    'Arduino',
  ];

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Échec de la récupération des projets');
      const data = await res.json();
      setProjects(data.map((project: Project) => ({ ...project, softwares: project.softwares || [] })));
    } catch (error) {
      toast.error('Échec de la récupération des projets');
      console.error(error);
    }
  };

  const cld = new Cloudinary({ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME } });
  const placeholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

  useEffect(() => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    window.location.href = '/';
    return;
  }

  const fetchData = async () => {
    try {
      const [projectsRes, experiencesRes, mediaRes, vitaeRes, emailsRes, messagesRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/experiences"),
        fetch("/api/media"),
        fetch("/api/vitae"),
        fetch(`/api/subscribe?isAdmin=${isAdmin}`),
        fetch(`/api/messages?isAdmin=${isAdmin}`),
      ]);

      // Vérifier les réponses
      if (!projectsRes.ok || !experiencesRes.ok || !mediaRes.ok || !vitaeRes.ok || !emailsRes.ok || !messagesRes.ok) {
        throw new Error("Échec du chargement des données");
      }

      const projectsData = await projectsRes.json();
      const experiencesData = await experiencesRes.json();
      const mediaData = await mediaRes.json();
      const vitaeData = await vitaeRes.json();
      const emailsData = await emailsRes.json();
      const messagesData = await messagesRes.json();

      // Valider que mediaData est un tableau
      if (!Array.isArray(mediaData)) {
        console.error("La réponse de /api/media n'est pas un tableau :", mediaData);
        toast.error("Erreur lors du chargement des médias : données invalides");
        setMedia([]); // Définir un tableau vide comme secours
      } else {
        setMedia(mediaData);
      }

      // Appliquer la même validation pour les autres données si nécessaire
      setProjects(projectsData.map((project: Project) => ({ ...project, softwares: project.softwares || [] })));
      setExperiences(experiencesData);
      setVitae(vitaeData);
      setEmails(emailsData);
      setMessages(messagesData);
    } catch (error) {
      console.error("Erreur dans fetchData :", error);
      toast.error("Échec du chargement des données");
      // Définir des états par défaut pour éviter d'autres erreurs
      setMedia([]);
      setProjects([]);
      setExperiences([]);
      setVitae([]);
      setEmails([]);
      setMessages([]);
    }
  };
  fetchData();
}, []);

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      toast.error("Le titre et la description sont requis");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      if (projectForm.image) formData.append('image', projectForm.image);
      formData.append('softwares', JSON.stringify(projectForm.softwares));
      if (editingId) formData.append('id', editingId);

      const res = await fetch('/api/projects', {
        method: editingId ? 'PUT' : 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Échec de l\'enregistrement du projet');

      if (editingId) {
        setProjects(projects.map((p) => (p.id === editingId ? { id: editingId, ...data } : p)));
      } else {
        setProjects([...projects, { id: data.id, ...data }]);
      }
      toast.success(editingId ? 'Projet mis à jour' : 'Projet ajouté');
      setProjectForm({ title: '', description: '', image: null, softwares: [] });
      setEditingId(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Échec de l'enregistrement de l'expérience");
      } else {
        toast.error("Échec de l'enregistrement de l'expérience");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", experienceForm.name);
    formData.append("subject", experienceForm.subject);
    formData.append("verified", String(experienceForm.verified));
    if (experienceForm.image instanceof File) {
      if (experienceForm.image.size > 10 * 1024 * 1024) {
        toast.error("La taille de l'image dépasse la limite de 10 Mo");
        setIsLoading(false);
        return;
      }
      if (!experienceForm.image.type.includes("image")) {
        toast.error("Seuls les fichiers image sont autorisés");
        setIsLoading(false);
        return;
      }
      formData.append("image", experienceForm.image);
    } else {
      formData.append("image", experienceForm.image);
    }

    try {
      const url = editingId ? `/api/experiences?id=${editingId}` : "/api/experiences";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Échec de l'enregistrement de l'expérience");
      const newExperience = await res.json();
      if (editingId) {
        setExperiences(experiences.map((e) => (e.id === editingId ? newExperience : e)));
        toast.success("Expérience mise à jour avec succès");
        setEditingId(null);
      } else {
        setExperiences([...experiences, newExperience]);
        toast.success("Expérience ajoutée avec succès");
      }
      setExperienceForm({ name: "", subject: "", image: "", verified: false });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Échec de l'enregistrement de l'expérience");
      } else {
        toast.error("Échec de l'enregistrement de l'expérience");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Validation initiale
    if (!mediaForm.title?.trim()) {
      toast.error("Le titre est requis");
      setIsLoading(false);
      return;
    }

    // Vérification du fichier pour les nouveaux uploads
    if (!editingId) {
      if (!mediaForm.src || !(mediaForm.src instanceof File)) {
        toast.error("Veuillez sélectionner un fichier vidéo");
        setIsLoading(false);
        return;
      }

      // Validation du fichier
      if (mediaForm.src.size > 100 * 1024 * 1024) { // Augmenté à 100MB pour correspondre au serveur
        toast.error("La taille de la vidéo dépasse la limite de 100 Mo");
        setIsLoading(false);
        return;
      }

      // Validation plus stricte du type de fichier
      const validTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime'];
      if (!validTypes.includes(mediaForm.src.type)) {
        toast.error("Format supporté: MP4, WebM, MOV, AVI uniquement");
        setIsLoading(false);
        return;
      }

      console.log("File validation passed:", {
        name: mediaForm.src.name,
        size: `${(mediaForm.src.size / (1024 * 1024)).toFixed(2)}MB`,
        type: mediaForm.src.type
      });
    }

    // Créer FormData
    const formData = new FormData();
    
    // Ajouter les champs obligatoires
    formData.append("title", mediaForm.title.trim());
    formData.append("description", mediaForm.description?.trim() || "");
    formData.append("category", mediaForm.category?.trim() || "general");

    // Pour les mises à jour, ajouter l'ID
    if (editingId) {
      formData.append("id", editingId);
    }

    // Ajouter le fichier seulement s'il existe et que c'est un File
    if (mediaForm.src instanceof File) {
      formData.append("src", mediaForm.src);
      console.log("File added to FormData:", mediaForm.src.name);
    } else if (editingId && typeof mediaForm.src === 'string') {
      // Pour les mises à jour sans changement de fichier, ne pas ajouter src
      console.log("Updating without file change");
    }

    // NE PAS ajouter duration et views - ils sont calculés côté serveur
    // Ces champs ne doivent pas être envoyés par le client

    console.log("Sending request to server...");
    console.log("FormData contents:");
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    });

    // Envoi de la requête
    const url = editingId ? "/api/media" : "/api/media";
    const method = editingId ? "PUT" : "POST";
    
    const res = await fetch(url, {
      method,
      body: formData,
      // NE PAS définir Content-Type avec FormData - le navigateur le fait automatiquement
    });

    console.log("Response received:", res.status, res.statusText);

    // Gestion de la réponse
    if (!res.ok) {
      let errorMessage = "Échec de l'enregistrement du média";
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch (parseError) {
        console.error("Error parsing error response:", parseError);
        // Utiliser le message d'erreur par défaut
      }
      
      throw new Error(errorMessage);
    }

    const result = await res.json();
    console.log("Success response:", result);

    if (!result.success) {
      throw new Error(result.error || "Réponse inattendue du serveur");
    }

    // Mettre à jour l'état
    if (editingId) {
      setMedia(media.map((m) => (m.id === editingId ? result.data : m)));
      toast.success("Média mis à jour avec succès");
      setEditingId(null);
    } else {
      setMedia([...media, result.data]);
      toast.success("Média ajouté avec succès");
    }

    // Réinitialiser le formulaire
    setMediaForm({ 
      title: "", 
      description: "", 
      src: "", 
      category: "general", 
      duration: "", 
      views: "" 
    });

  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message || "Échec de l'enregistrement de l'expérience");
    } else {
      toast.error("Échec de l'enregistrement de l'expérience");
    }
  } finally {
    setIsLoading(false);
  }
};

  const handleVitaeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", vitaeForm.name);
    if (vitaeForm.file instanceof File) {
      if (vitaeForm.file.size > 10 * 1024 * 1024) {
        toast.error("La taille du fichier dépasse la limite de 10 Mo");
        setIsLoading(false);
        return;
      }
      if (!vitaeForm.file.type.includes("pdf")) {
        toast.error("Seuls les fichiers PDF sont autorisés");
        setIsLoading(false);
        return;
      }
      formData.append("file", vitaeForm.file);
    } else {
      formData.append("file", vitaeForm.file);
    }

    try {
      const url = editingId ? `/api/vitae?id=${editingId}` : "/api/vitae";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Échec de l'enregistrement du CV");
      }
      const newVitae = await res.json();
      if (editingId) {
        setVitae(vitae.map((v) => (v.id === editingId ? newVitae : v)));
        toast.success("CV mis à jour avec succès");
        setEditingId(null);
      } else {
        setVitae([...vitae, newVitae]);
        toast.success("CV ajouté avec succès");
      }
      setVitaeForm({ name: "", file: "" });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Échec de l'enregistrement de l'expérience");
      } else {
        toast.error("Échec de l'enregistrement de l'expérience");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!emailForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.email)) {
      toast.error("Veuillez entrer une adresse email valide");
      setIsLoading(false);
      return;
    }

    try {
      const url = editingId ? `/api/subscribe?id=${editingId}&isAdmin=${isAdmin}` : `/api/subscribe`;
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForm.email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Échec de l'enregistrement de l'email");
      }

      const newEmail = { id: editingId || (await res.json()).id, email: emailForm.email, createdAt: new Date().toISOString() };
      if (editingId) {
        setEmails(emails.map((e) => (e.id === editingId ? newEmail : e)));
        toast.success("Email mis à jour avec succès");
        setEditingId(null);
      } else {
        setEmails([...emails, newEmail]);
        toast.success("Email ajouté avec succès");
      }
      setEmailForm({ email: "" });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Échec de l'enregistrement de l'expérience");
      } else {
        toast.error("Échec de l'enregistrement de l'expérience");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image || null,
      softwares: project.softwares || [],
    });
    setEditingId(project.id);
    setActiveSection("projects");
    setIsMenuOpen(false);
  };

  const handleEditExperience = (experience: Experience) => {
    setExperienceForm({ name: experience.name, subject: experience.subject, image: experience.image, verified: experience.verified });
    setEditingId(experience.id);
    setActiveSection("experiences");
    setIsMenuOpen(false);
  };

  const handleEditMedia = (mediaItem: Media) => {
    setMediaForm({
      title: mediaItem.title,
      description: mediaItem.description,
      src: mediaItem.src,
      category: mediaItem.category,
      duration: mediaItem.duration,
      views: mediaItem.views,
    });
    setEditingId(mediaItem.id);
    setActiveSection("media");
    setIsMenuOpen(false);
  };

  const handleEditVitae = (vitaeItem: Vitae) => {
    setVitaeForm({ name: vitaeItem.name, file: vitaeItem.file });
    setEditingId(vitaeItem.id);
    setActiveSection("vitae");
    setIsMenuOpen(false);
  };

  const handleEditEmail = (emailItem: Email) => {
    setEmailForm({ id: emailItem.id, email: emailItem.email });
    setEditingId(emailItem.id);
    setActiveSection("emails");
    setIsMenuOpen(false);
  };

  const handleDeleteProject = async (id: string, title: string) => {
    setDeleteConfirm({ id, type: "project", title });
  };

  const handleDeleteExperience = (id: string, title: string) => {
    setDeleteConfirm({ id, type: "experience", title });
  };

  const handleDeleteMedia = (id: string, title: string) => {
    setDeleteConfirm({ id, type: "media", title });
  };

  const handleDeleteVitae = (id: string, title: string) => {
    setDeleteConfirm({ id, type: "vitae", title });
  };

  const handleDeleteEmail = (id: string, title: string) => {
    setDeleteConfirm({ id, type: "email", title });
  };

  const handleDeleteMessage = (id: string, title: string) => {
    setDeleteConfirm({ id, type: "message", title });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    setIsLoading(true);
    try {
      const { id, type } = deleteConfirm;
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      const url = `/api/${type}s?id=${id}&isAdmin=${isAdmin}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error(`Échec de la suppression de ${type}`);
      if (type === "project") {
        setProjects(projects.filter((p) => p.id !== id));
        toast.success("Projet supprimé avec succès");
      } else if (type === "experience") {
        setExperiences(experiences.filter((e) => e.id !== id));
        toast.success("Expérience supprimée avec succès");
      } else if (type === "media") {
        setMedia(media.filter((m) => m.id !== id));
        toast.success("Média supprimé avec succès");
      } else if (type === "vitae") {
        setVitae(vitae.filter((v) => v.id !== id));
        toast.success("CV supprimé avec succès");
      } else if (type === "email") {
        setEmails(emails.filter((e) => e.id !== id));
        toast.success("Email supprimé avec succès");
      } else if (type === "message") {
        setMessages(messages.filter((m) => m.id !== id));
        toast.success("Message supprimé avec succès");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || `Échec de la suppression de ${deleteConfirm?.type}`);
      } else {
        toast.error(`Échec de la suppression de ${deleteConfirm?.type}`);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
      setDeleteConfirm(null);
    }
  };

  const animationProps = shouldReduceMotion ? { initial: {}, animate: {}, exit: {} } : {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 sm:p-6 font-sans" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <Toaster position="top-center" toastOptions={{ className: "text-sm" }} />
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 text-center"
        >
          Tableau de Bord Admin
        </motion.h1>

        {/* Mobile Navigation */}
        <div className="sm:hidden relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-between text-sm"
            aria-label="Ouvrir le menu de navigation"
          >
            <span>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</span>
            <Menu className="w-4 h-4" />
          </motion.button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-0 right-0 bg-white rounded-lg shadow-lg z-10 overflow-hidden"
              >
                {["projects", "experiences", "media", "vitae", "emails", "messages"].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setActiveSection(section as "projects" | "experiences" | "media" | "vitae" | "emails" | "messages");
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200 ${
                      activeSection === section ? "bg-blue-100 font-semibold" : ""
                    }`}
                    aria-label={`Naviguer vers ${section}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="hidden sm:flex justify-center space-x-2 mb-6"
        >
          {["projects", "experiences", "media", "vitae", "emails", "messages"].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                activeSection === section
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setActiveSection(section as "projects" | "experiences" | "media" | "vitae" | "emails" | "messages")}
              aria-label={`Naviguer vers ${section}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Sections */}
        <AnimatePresence mode="wait">
          {activeSection === 'projects' && (
            <motion.div
              key="projects"
              {...animationProps}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gérer les Projets</h2>
              <form onSubmit={handleProjectSubmit} className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre du Projet</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Titre du projet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    required
                    aria-required="true"
                    aria-label="Description du projet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Logiciels Utilisés</label>
                  <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-lg bg-gray-50">
                    {availableSoftwares.map((software) => (
                      <motion.label
                        key={software}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center space-x-2 text-sm cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="checkbox"
                          checked={projectForm.softwares.includes(software)}
                          onChange={(e) => {
                            const newSoftwares = e.target.checked
                              ? [...projectForm.softwares, software]
                              : projectForm.softwares.filter((s) => s !== software);
                            setProjectForm({ ...projectForm, softwares: newSoftwares });
                          }}
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{software}</span>
                      </motion.label>
                    ))}
                  </div>
                  {projectForm.softwares.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {projectForm.softwares.map((software) => (
                        <motion.span
                          key={software}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                        >
                          {software}
                          <button
                            type="button"
                            onClick={() =>
                              setProjectForm({
                                ...projectForm,
                                softwares: projectForm.softwares.filter((s) => s !== software),
                              })
                            }
                            className="ml-1 text-blue-500 hover:text-blue-700"
                            aria-label={`Supprimer ${software}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image (Optionnel)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files?.[0] || null })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    aria-label="Téléverser l'image du projet"
                  />
                  {projectForm.image && typeof projectForm.image === "string" && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Image actuelle :</p>
                      <Image
                        src={projectForm.image}
                        alt="Aperçu de l'image"
                        width={100}
                        height={67}
                        sizes="100vw"
                        className="mt-2 rounded-lg"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={placeholderImage}
                        onError={() => toast.error("Erreur de chargement de l'image")}
                      />
                    </div>
                  )}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className={`w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg flex items-center justify-center contrast-125 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                  aria-label={editingId ? 'Mettre à jour le projet' : 'Ajouter un projet'}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingId ? 'Mettre à jour le projet' : 'Ajouter un projet'}
                </motion.button>
              </form>
              <div className="space-y-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      {project.image && (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={48}
                          height={48}
                          sizes="100vw"
                          className="object-cover rounded-lg"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={placeholderImage}
                          onError={() => toast.error(`Erreur de chargement de l'image pour ${project.title}`)}
                        />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{project.description}</p>
                        {project.softwares && project.softwares.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.softwares.map((software) => (
                              <span key={software} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                                {software}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditProject(project)}
                        className="p-2 text-blue-500 hover:text-blue-600"
                        aria-label={`Modifier ${project.title}`}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteProject(project.id, project.title)}
                        className="p-2 text-red-500 hover:text-red-600"
                        aria-label={`Supprimer ${project.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "experiences" && (
            <motion.div
              key="experiences"
              {...animationProps}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gérer les Expériences</h2>
              <form onSubmit={handleExperienceSubmit} className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={experienceForm.name}
                    onChange={(e) => setExperienceForm({ ...experienceForm, name: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Nom de l'expérience"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Sujet</label>
                  <input
                    type="text"
                    value={experienceForm.subject}
                    onChange={(e) => setExperienceForm({ ...experienceForm, subject: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Sujet de l'expérience"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setExperienceForm({ ...experienceForm, image: e.target.files?.[0] || experienceForm.image })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    aria-label="Téléverser l'image de l'expérience"
                  />
                  {experienceForm.image && typeof experienceForm.image === "string" && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Image actuelle :</p>
                      <Image
                        src={experienceForm.image}
                        alt="Aperçu"
                        width={100}
                        height={67}
                        sizes="100vw"
                        className="mt-2 rounded-lg"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={placeholderImage}
                        onError={() => toast.error("Erreur de chargement de l'image")}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vérifié</label>
                  <input
                    type="checkbox"
                    checked={experienceForm.verified}
                    onChange={(e) => setExperienceForm({ ...experienceForm, verified: e.target.checked })}
                    className="mt-1 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    aria-label="Vérifier l'expérience"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className={`w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg flex items-center justify-center contrast-125 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                  aria-label={editingId ? "Mettre à jour l'expérience" : "Ajouter une expérience"}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingId ? "Mettre à jour l'expérience" : "Ajouter une expérience"}
                </motion.button>
              </form>
              <div className="space-y-4">
                {experiences.map((experience) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      {experience.image && (
                        <Image
                          src={experience.image}
                          alt={experience.name}
                          width={48}
                          height={48}
                          sizes="100vw"
                          className="object-cover rounded-lg"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={placeholderImage}
                          onError={() => toast.error(`Erreur de chargement de l'image pour ${experience.name}`)}
                        />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{experience.name}</h3>
                        <p className="text-xs text-gray-600">{experience.subject}</p>
                        <p className="text-xs text-gray-500">{experience.verified ? "Vérifié" : "Non vérifié"}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditExperience(experience)}
                        className="p-2 text-blue-500 hover:text-blue-600"
                        aria-label={`Modifier ${experience.name}`}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteExperience(experience.id, experience.name)}
                        className="p-2 text-red-500 hover:text-red-600"
                        aria-label={`Supprimer ${experience.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "media" && (
            <motion.div
              key="media"
              {...animationProps}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gérer les Médias</h2>
              <form onSubmit={handleMediaSubmit} className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre</label>
                  <input
                    type="text"
                    value={mediaForm.title}
                    onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Titre du média"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={mediaForm.description}
                    onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    required
                    aria-required="true"
                    aria-label="Description du média"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vidéo</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setMediaForm({ ...mediaForm, src: e.target.files?.[0] || mediaForm.src })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    aria-label="Téléverser la vidéo du média"
                  />
                  {mediaForm.src && typeof mediaForm.src === "string" && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Vidéo actuelle :</p>
                      <AdvancedVideo
                        cldVid={cld.video(mediaForm.src)
                          .resize(fill().width(100).height(67))
                          .quality(auto())
                          .delivery(format('auto'))}  // Modifié ici
                        controls
                        className="mt-2 rounded-lg"
                        aria-label="Aperçu de la vidéo"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                  <input
                    type="text"
                    value={mediaForm.category}
                    onChange={(e) => setMediaForm({ ...mediaForm, category: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Catégorie du média"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Durée</label>
                  <input
                    type="text"
                    value={mediaForm.duration}
                    onChange={(e) => setMediaForm({ ...mediaForm, duration: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Durée du média"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vues</label>
                  <input
                    type="text"
                    value={mediaForm.views}
                    onChange={(e) => setMediaForm({ ...mediaForm, views: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Vues du média"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className={`w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg flex items-center justify-center contrast-125 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                  aria-label={editingId ? "Mettre à jour le média" : "Ajouter un média"}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingId ? "Mettre à jour le média" : "Ajouter un média"}
                </motion.button>
              </form>
              <div className="space-y-4">
                {media.map((mediaItem) => (
                  <motion.div
                    key={mediaItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      {mediaItem.src && (
                        <AdvancedVideo
                          cldVid={cld.video(mediaItem.src)
                            .resize(fill().width(48).height(48))
                            .quality(auto())
                            .delivery(format('auto'))}  // Modifié ici
                          className="object-cover rounded-lg"
                          aria-label={mediaItem.title}
                          onError={() => toast.error(`Erreur de chargement de la vidéo pour ${mediaItem.title}`)}
                        />
                      )}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{mediaItem.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{mediaItem.description}</p>
                        <p className="text-xs text-gray-500">Catégorie: {mediaItem.category} | Durée: {mediaItem.duration} | Vues: {mediaItem.views}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditMedia(mediaItem)}
                        className="p-2 text-blue-500 hover:text-blue-600"
                        aria-label={`Modifier ${mediaItem.title}`}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteMedia(mediaItem.id, mediaItem.title)}
                        className="p-2 text-red-500 hover:text-red-600"
                        aria-label={`Supprimer ${mediaItem.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "vitae" && (
            <motion.div
              key="vitae"
              {...animationProps}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gérer les CVs</h2>
              <form onSubmit={handleVitaeSubmit} className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    value={vitaeForm.name}
                    onChange={(e) => setVitaeForm({ ...vitaeForm, name: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Nom du CV"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fichier</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setVitaeForm({ ...vitaeForm, file: e.target.files?.[0] || vitaeForm.file })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    aria-label="Téléverser le fichier du CV"
                  />
                  {vitaeForm.file && typeof vitaeForm.file === "string" && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Fichier actuel :</p>
                      <a href={vitaeForm.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">
                        Voir le PDF
                      </a>
                    </div>
                  )}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className={`w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg flex items-center justify-center contrast-125 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                  aria-label={editingId ? "Mettre à jour le CV" : "Ajouter un CV"}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingId ? "Mettre à jour le CV" : "Ajouter un CV"}
                </motion.button>
              </form>
              <div className="space-y-4">
                {vitae.map((vitaeItem) => (
                  <motion.div
                    key={vitaeItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-12 h-12 text-blue-500" />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{vitaeItem.name}</h3>
                        <a href={vitaeItem.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">
                          Voir le PDF
                        </a>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditVitae(vitaeItem)}
                        className="p-2 text-blue-500 hover:text-blue-600"
                        aria-label={`Modifier ${vitaeItem.name}`}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteVitae(vitaeItem.id, vitaeItem.name)}
                        className="p-2 text-red-500 hover:text-red-600"
                        aria-label={`Supprimer ${vitaeItem.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "emails" && (
            <motion.div
              key="emails"
              {...animationProps}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gérer les Abonnements</h2>
              <form onSubmit={handleEmailSubmit} className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    className="mt-1 w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    aria-required="true"
                    aria-label="Email de l'abonné"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className={`w-full bg-blue-500 text-white px-4 py-2 text-sm rounded-lg flex items-center justify-center contrast-125 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                  aria-label={editingId ? "Mettre à jour l'email" : "Ajouter un email"}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingId ? "Mettre à jour l'email" : "Ajouter un email"}
                </motion.button>
              </form>
              <div className="space-y-4">
                {emails.map((emailItem) => (
                  <motion.div
                    key={emailItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <Mail className="w-12 h-12 text-blue-500" />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{emailItem.email}</h3>
                        <p className="text-xs text-gray-600">Inscrit le : {new Date(emailItem.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditEmail(emailItem)}
                        className="p-2 text-blue-500 hover:text-blue-600"
                        aria-label={`Modifier ${emailItem.email}`}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteEmail(emailItem.id, emailItem.email)}
                        className="p-2 text-red-500 hover:text-red-600"
                        aria-label={`Supprimer ${emailItem.email}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "messages" && (
            <motion.div
              key="messages"
              {...animationProps}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Gérer les Messages</h2>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-12 h-12 text-blue-500" />
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{message.name}</h3>
                          <p className="text-xs text-gray-600">Email : {message.email}</p>
                          <p className="text-xs text-gray-600">Téléphone : {message.phone}</p>
                          <p className="text-xs text-gray-600">Intérêt : {message.interest}</p>
                          <p className="text-xs text-gray-600">Budget : {message.budget}</p>
                          <p className="text-xs text-gray-600">Pays : {message.country}</p>
                          <p className="text-xs text-gray-600 mt-2 line-clamp-3">{message.message}</p>
                          <p className="text-xs text-gray-500 mt-1">Reçu le : {new Date(message.createdAt).toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteMessage(message.id, message.name)}
                          className="p-2 text-red-500 hover:text-red-600"
                          aria-label={`Supprimer le message de ${message.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md max-w-sm w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Confirmer la Suppression</h3>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Fermer la confirmation de suppression"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Êtes-vous sûr de vouloir supprimer "{deleteConfirm.title}" ? Cette action est irréversible.
                </p>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-lg"
                    aria-label="Annuler la suppression"
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDelete}
                    className="flex-1 bg-red-500 text-white px-4 py-2 text-sm rounded-lg"
                    aria-label="Confirmer la suppression"
                  >
                    Supprimer
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}