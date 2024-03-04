export type TimestampsType = {
  created_at: Date;
  updated_at?: Date | null;
};

export type BaseEntity = TimestampsType & {
  id: string;
};
