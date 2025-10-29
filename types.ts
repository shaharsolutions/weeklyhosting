export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface ShoppingItem {
  id: number;
  name: string;
  purchased: boolean;
}

export type DayOfWeek = 'SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY';

export interface Settings {
  userName: string;
  hostingDay: DayOfWeek;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  tasks: { text: string }[];
  shoppingItems: { name: string }[];
}
