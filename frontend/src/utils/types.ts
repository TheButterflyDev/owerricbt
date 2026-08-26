export type ServiceCategory =
  | "CBT_EXAM"
  | "JAMB_REGISTRATION"
  | "POST_UTME"
  | "COMPUTER_TRAINING"
  | "CERTIFICATE_COURSE";

export interface TimetableSlot {
  id: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  feeNaira: number;
  category: ServiceCategory;
  isActive: boolean;
  slots?: TimetableSlot[];
}
