export interface MissionInstitute {
  id: string;
  name: string;
  city: string;
  country: string;
  type: 'embassy' | 'svcc' | 'university' | 'consulate';
  activeScholarsCount: number;
  contactEmail: string;
  isICCRPartner: boolean;
}

export interface CohortBatch {
  id: string;
  batchCode: string;
  instituteId: string;
  targetLanguage: string;
  cefrTarget: string;
  enrolledStudentsCount: number;
  instructorName: string;
  schedule: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
}
