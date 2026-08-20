/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "es" | "en";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  es: {
    "nav.services": "Servicios",
    "nav.jobs": "Trabajos",
    "nav.gallery": "Galería",
    "nav.location": "Ubicación",
    "nav.home": "Inicio",
    "footer.contact": "Contacto",
    "footer.admin": "Modo Admin",
    "footer.sell": "¿Querés tu propio sitio?",
    "home.title": "Precisión y calidad en cada obra",
    "home.subtitle":
      "Durlock, pintura, electricidad, carpintería, plomería y servicios generales para tu hogar o negocio.",
    "home.estimate": "Pedí tu presupuesto",
    "home.services": "Servicios",
    "services.drywall": "Durlock",
    "services.electrical": "Electricidad",
    "services.painting": "Pintura",
    "services.carpentry": "Carpintería",
    "services.plumbing": "Plomería",
    "services.utilities": "Servicios generales",
    "services.drywallDesc":
      "Instalación de cielorrasos, durlock y tabiques con calidad.",
    "services.electricalDesc":
      "Instalación eléctrica completa: cableado y colocación de artefactos.",
    "services.paintingDesc":
      "Pintura profesional para casas, espacios o negocios.",
    "services.carpentryDesc":
      "Carpintería a medida: trabajo en madera y remodelaciones.",
    "services.plumbingDesc":
      "Instalación y mantenimiento de sistemas de agua y plomería.",
    "services.utilitiesDesc":
      "Mantenimiento y reparaciones generales para tu hogar o negocio.",
    "texts.philosophy": "Filosofía",
    "texts.philosophyDesc":
      "Somos un equipo sólido que se cuida entre sí, cuida el trabajo y cuida a quienes nos contrataron. Ponemos atención a los detalles porque creemos que son lo más importante.",
    "texts.methodology": "Metodología",
    "texts.methodologyDesc":
      "Aseguramos calidad usando materiales de primera, manteniendo comunicación clara, cumpliendo normas de seguridad y entregando resultados a tiempo con trabajo en equipo.",
    "jobs.select": "Elegí una categoría",
    "jobs.send": "Enviar",
    "jobs.title": "Título",
    "jobs.date": "Fecha",
    "jobs.description": "Descripción",
    "jobs.category": "Categoría",
    "jobs.image": "Imagen",
    "jobs.editImage": "Editar imagen",
    "jobs.deleteJob": "Borrar trabajo",
    "jobs.submit": "Enviar",
    "jobs.exitEdit": "Salir del modo edición",
    "jobs.uploaded": "Trabajo publicado",
    "jobs.uploadedMsg": "El trabajo se publicó correctamente.",
    "jobs.uploadError": "Error de subida",
    "jobs.uploadErrorMsg": "El trabajo no pudo publicarse.",
    "jobs.deleted": "Trabajo borrado",
    "jobs.deletedMsg": "El trabajo se borró correctamente.",
    "jobs.deleteError": "Error al borrar",
    "jobs.deleteErrorMsg": "El trabajo no pudo borrarse.",
    "jobs.modified": "Trabajo modificado",
    "jobs.modifiedMsg": "El trabajo se modificó correctamente.",
    "jobs.modifyError": "Error al modificar",
    "jobs.modifyErrorMsg": "El trabajo no pudo modificarse.",
    "jobs.imageModified": "Imagen modificada",
    "jobs.imageModifiedMsg": "La imagen se modificó correctamente.",
    "jobs.imageError": "Error de imagen",
    "jobs.imageErrorMsg": "La imagen no pudo modificarse.",
    "jobs.connection": "Error de conexión",
    "jobs.connectionMsg": "No se pudieron cargar los trabajos, intentá de nuevo.",
    "gallery.connectionMsg": "No se pudieron cargar las imágenes, intentá de nuevo.",
    "gallery.deleted": "Imagen borrada",
    "gallery.deletedMsg": "La imagen se borró correctamente.",
    "gallery.deleteError": "Error al borrar",
    "gallery.deleteErrorMsg": "La imagen no pudo borrarse.",
    "gallery.modified": "Imagen modificada",
    "gallery.modifiedMsg": "La imagen se modificó correctamente.",
    "gallery.modifyError": "Error al modificar",
    "gallery.modifyErrorMsg": "La imagen no pudo modificarse.",
    "gallery.uploaded": "Imagen publicada",
    "gallery.uploadedMsg": "La imagen se publicó correctamente.",
    "gallery.uploadError": "Error de subida",
    "gallery.uploadErrorMsg": "La imagen no pudo publicarse.",
    "gallery.select": "Elegí una categoría",
    "gallery.image": "Imagen",
    "estimate.title": "Pedir presupuesto",
    "estimate.name": "Nombre",
    "estimate.email": "Email",
    "estimate.phone": "Teléfono",
    "estimate.message": "Mensaje",
    "estimate.send": "Enviar",
    "estimate.thanks": "¡Gracias!",
    "estimate.thanksMsg": "Tu mensaje fue enviado. Te respondemos a la brevedad.",
    "estimate.error": "Error",
    "estimate.errorMsg": "El mensaje no pudo enviarse, intentá de nuevo.",
    "login.email": "Email",
    "login.password": "Contraseña",
    "login.show": "Mostrar contraseña",
    "login.submit": "Ingresar",
    "login.wrong": "Email o contraseña incorrectos",
    "login.hello": "¡Hola!",
    "login.helloMsg": "Sesión iniciada correctamente.",
    "location.title": "Ubicación",
    "location.address":
      "Trabajamos en la zona: Rosario y alrededores. Consultanos por tu dirección.",
    "location.maps": "Abrir en Google Maps",
    "admin.title": "Panel de administración",
    "admin.jobs": "Ver trabajos",
    "admin.gallery": "Ver galería",
    "admin.editImage": "Editar imagen",
    "register.title": "Creá tu sitio",
    "register.intro":
      "Tené tu propio porfolio de obra online, actualizable por vos en minutos.",
    "register.name": "Nombre de tu negocio",
    "register.slug": "Tu dirección (solo minúsculas, sin espacios)",
    "register.email": "Email de acceso",
    "register.phone": "Teléfono de contacto",
    "register.password": "Contraseña",
    "register.submit": "Crear mi sitio",
    "register.done": "¡Listo!",
    "register.doneMsg": "Tu sitio fue creado. Ingresá para cargar tus primeros trabajos.",
    "register.error": "Error",
    "register.errorMsg":
      "No pudimos crear el sitio. Probá con otro nombre de dirección.",
    "landing.title": "Do you build? Get your online portfolio in minutes",
    "landing.subtitle":
      "Your own site with all your jobs, photos and contact info. Update it yourself, no tech skills needed. Ready to show every client who asks “do you have photos of your work?”.",
    "landing.ctaPrimary": "Create your site",
    "landing.ctaDemo": "Ask me for a demo on WhatsApp",
    "landing.f1Title": "All your work in one place",
    "landing.f1Desc":
      "Upload photos of your jobs with categories: drywall, painting, electrical and more. Your professional portfolio always at hand.",
    "landing.f2Title": "With your own brand",
    "landing.f2Desc":
      "Your logo, your colors, your phone and email. A site that looks like yours, not someone else's.",
    "landing.f3Title": "No hassle",
    "landing.f3Desc":
      "If you can send a photo on WhatsApp, you can update your site. We set you up and load your first jobs for you.",
    "landing.priceTitle": "Simple plan",
    "landing.priceValue": "Setup + monthly fee",
    "landing.priceDetail":
      "We load your first jobs as a welcome gift. No lock-in, cancel anytime.",
    "alerts.cancel": "¿Seguro que querés borrar esto?",
    "jobs.imageN": "Imagen",
  },
  en: {
    "nav.services": "Services",
    "nav.jobs": "Jobs",
    "nav.gallery": "Gallery",
    "nav.location": "Location",
    "nav.home": "Home",
    "footer.contact": "Contact",
    "footer.admin": "Admin Mode",
    "footer.sell": "Want your own site?",
    "home.title": "Precision and quality in every project",
    "home.subtitle":
      "Drywall, painting, electrical, carpentry, plumbing and general utilities for your home or business.",
    "home.estimate": "Get an estimate",
    "home.services": "Services",
    "services.drywall": "Drywall",
    "services.electrical": "Electrical",
    "services.painting": "Painting",
    "services.carpentry": "Carpentry",
    "services.plumbing": "Plumbing",
    "services.utilities": "Utilities",
    "services.drywallDesc":
      "Quality ceiling installations, drywall, and partitions services.",
    "services.electricalDesc":
      "House electrical installation: wiring and fixture setup.",
    "services.paintingDesc":
      "Professional painting for homes, spaces, or businesses.",
    "services.carpentryDesc":
      "Carpenter specializing in custom woodwork and renovations.",
    "services.plumbingDesc":
      "Installation and maintenance of plumbing and water systems.",
    "services.utilitiesDesc":
      "Common premises maintenance and repairs.",
    "texts.philosophy": "Philosophy",
    "texts.philosophyDesc":
      "We are a solid group that cares for each other, cares about the work and cares about the people who hired us. We pay attention to details because we believe those are the most important things.",
    "texts.methodology": "Methodology",
    "texts.methodologyDesc":
      "We ensure quality by using top-notch materials, maintaining clear communication, adhering to safety standards, and delivering timely results with attention to team work.",
    "jobs.select": "Select a category",
    "jobs.send": "Send",
    "jobs.title": "Title",
    "jobs.date": "Date",
    "jobs.description": "Description",
    "jobs.category": "Category",
    "jobs.image": "Image",
    "jobs.editImage": "Edit image",
    "jobs.deleteJob": "Delete job",
    "jobs.submit": "Submit",
    "jobs.exitEdit": "Exit edit mode",
    "jobs.uploaded": "Job Uploaded",
    "jobs.uploadedMsg": "The job has been uploaded successfully.",
    "jobs.uploadError": "Upload Error",
    "jobs.uploadErrorMsg": "The job could not be uploaded.",
    "jobs.deleted": "Job Deleted",
    "jobs.deletedMsg": "The job has been deleted successfully.",
    "jobs.deleteError": "Deletion Error",
    "jobs.deleteErrorMsg": "The job could not be deleted.",
    "jobs.modified": "Job Modified",
    "jobs.modifiedMsg": "The job has been modified successfully.",
    "jobs.modifyError": "Modification Error",
    "jobs.modifyErrorMsg": "The job could not be modified.",
    "jobs.imageModified": "Image Modified",
    "jobs.imageModifiedMsg": "The image has been modified successfully.",
    "jobs.imageError": "Image Error",
    "jobs.imageErrorMsg": "The image could not be modified.",
    "jobs.connection": "Connection Error",
    "jobs.connectionMsg": "Could not load jobs, try again.",
    "gallery.connectionMsg": "Could not load images, try again.",
    "gallery.deleted": "Image Deleted",
    "gallery.deletedMsg": "The image has been deleted successfully.",
    "gallery.deleteError": "Deletion Error",
    "gallery.deleteErrorMsg": "The image could not be deleted.",
    "gallery.modified": "Image Modified",
    "gallery.modifiedMsg": "The image has been modified successfully.",
    "gallery.modifyError": "Modification Error",
    "gallery.modifyErrorMsg": "The image could not be modified.",
    "gallery.uploaded": "Image Uploaded",
    "gallery.uploadedMsg": "The image has been uploaded successfully.",
    "gallery.uploadError": "Upload Error",
    "gallery.uploadErrorMsg": "The image could not be uploaded.",
    "gallery.select": "Select a category",
    "gallery.image": "Image",
    "estimate.title": "Request an estimate",
    "estimate.name": "Name",
    "estimate.email": "Email",
    "estimate.phone": "Phone",
    "estimate.message": "Message",
    "estimate.send": "Send",
    "estimate.thanks": "Thanks!",
    "estimate.thanksMsg": "Your message was sent. We will reply shortly.",
    "estimate.error": "Error",
    "estimate.errorMsg": "The message could not be sent, try again.",
    "login.email": "Email",
    "login.password": "Password",
    "login.show": "Show password",
    "login.submit": "Log in",
    "login.wrong": "Email or password are not correct!",
    "login.hello": "Hello!",
    "login.helloMsg": "Logged in successfully.",
    "location.title": "Location",
    "location.address":
      "We work in the area: Rosario and surroundings. Drop us a line about your venue.",
    "location.maps": "Open in Google Maps",
    "admin.title": "Admin panel",
    "admin.jobs": "View jobs",
    "admin.gallery": "View gallery",
    "admin.editImage": "Edit image",
    "register.title": "Create your site",
    "register.intro":
      "Get your own online portfolio of projects, updatable by you in minutes.",
    "register.name": "Your business name",
    "register.slug": "Your address (lowercase, no spaces)",
    "register.email": "Login email",
    "register.phone": "Contact phone",
    "register.password": "Password",
    "register.submit": "Create my site",
    "register.done": "Done!",
    "register.doneMsg": "Your site was created. Log in to upload your first jobs.",
    "register.error": "Error",
    "register.errorMsg":
      "We couldn't create the site. Try a different address.",
    "landing.title": "¿Construís? Tené tu porfolio online en minutos",
    "landing.subtitle":
      "Un sitio propio con todos tus trabajos, fotos y contacto. Lo actualizás vos mismo, sin saber de tecnología. Listo para mostrarle a cada cliente que te pregunta “¿tenés fotos de obras?”.",
    "landing.ctaPrimary": "Creá tu sitio",
    "landing.ctaDemo": "Pedime una demo por WhatsApp",
    "landing.f1Title": "Todos tus trabajos en un mismo lugar",
    "landing.f1Desc":
      "Subí fotos de tus obras con categorías: durlock, pintura, electricidad y más. Tu portafolio profesional siempre a mano.",
    "landing.f2Title": "Con tu marca",
    "landing.f2Desc":
      "Tu logo, tus colores, tu teléfono y tu email. Un sitio que se ve como tuyo, no como de otro.",
    "landing.f3Title": "Sin complicaciones",
    "landing.f3Desc":
      "Si sabés mandar una foto por WhatsApp, sabés actualizar tu sitio. Te damos de alta y cargamos tus primeros trabajos nosotros.",
    "landing.priceTitle": "Plan simple",
    "landing.priceValue": "Setup + mensualidad",
    "landing.priceDetail":
      "Te cargo tus primeras obras como regalo de bienvenida. Sin permanencia, cancelás cuando quieras.",
    "alerts.cancel": "Are you sure you want to delete this job?",
    "jobs.imageN": "Image",
  },
};

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = "calles_lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "es";
  });

  const value: LangContextValue = {
    lang,
    toggle: () => {
      const next: Lang = lang === "es" ? "en" : "es";
      setLang(next);
      localStorage.setItem(STORAGE_KEY, next);
    },
    t: (key: string) => translations[lang][key] ?? key,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}