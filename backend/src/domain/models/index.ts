import User from './User';
import Disease from './Disease';
import Doctor from './Doctor';
import Service from './Service';
import Project from './Project';
import Newsletter from './Newsletter';
import Contact from './Contact';
import FAQ from './FAQ';
import Content from './Content';
import ImageDisease from './ImageDisease';

// Export all models
export { User, Disease, ImageDisease, Doctor, Service, Project, Newsletter, Contact, FAQ, Content };

// Export interfaces
export type { UserAttributes, UserCreationAttributes } from './User';
export type { DiseaseAttributes, DiseaseCreationAttributes } from './Disease';
export type { ImageDiseadeAttributes, ImageDiseaseCreationAttributes } from './ImageDisease';
export type { DoctorAttributes, DoctorCreationAttributes } from './Doctor';
export type { ServiceAttributes, ServiceCreationAttributes } from './Service';
export type { ProjectAttributes, ProjectCreationAttributes } from './Project';
export type { NewsletterAttributes, NewsletterCreationAttributes } from './Newsletter';
export type { ContactAttributes, ContactCreationAttributes } from './Contact';
export type { FAQAttributes, FAQCreationAttributes } from './FAQ';
export type { ContentAttributes, ContentCreationAttributes } from './Content';
