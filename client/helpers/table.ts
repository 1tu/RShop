export interface TableHeader<T> {
  text: string;
  value?: keyof T;
  align?: string;
  sortable?: boolean;
  actionList?: { name: string, icon?: string, onClick: (...arg: any[]) => void }[];
  transformer?: (data: any) => any;
}




