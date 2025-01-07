export interface Notification {
  id: number;
  contents: string;
  estimateId?: number;
  assignedEstimateRequestId?: number;
  estimateRequestId?: number;
  createdAt: string;
  isRead: boolean;
}

export interface NotificationProps {
  list: Notification[];
  notReadCount: number;
}
