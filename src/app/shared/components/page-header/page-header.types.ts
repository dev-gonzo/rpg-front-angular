export interface PagAction {
  label: string;
  hidden?: boolean;
  action: () => void;
}

