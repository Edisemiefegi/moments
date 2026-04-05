export type User = {
  name: string;
  email: string;
  userid: string;
};

export type Timeline = {
  title: string;
  date: Date;
  icon?: string;
  note: string;
  photos?: string;
  userid?: string;
  id?: string;
};
