export interface ImageDiseaseModel {
  originalName: string;
  fileName: string;
  url?: string;
  diseaseId?: string;
}

export type ImageDiseaseWitoutId = Omit<ImageDiseaseModel, 'id'>;

export interface CreateImageDiseaseUseCase {
  add(dataDisease: ImageDiseaseWitoutId): Promise<ImageDiseaseModel>;
}
