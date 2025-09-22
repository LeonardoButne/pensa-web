import { ImageDiseaseModel } from './create-image-disease-usecase';

export interface DiseaseModel {
  name: string;
  description: string;
  symptoms: string;
  causes: string;
  treatments: string;
  prevention: string;
  isHighlighted?: boolean;
  isActive?: boolean;
  image?: ImageDiseaseModel;
}

export type DiseaseWithoutId = Omit<DiseaseModel, 'id'>;

export interface CreateDiseaseUseCase {
  add(dataDisease: DiseaseWithoutId): Promise<DiseaseModel>;
}
