import { Dispatch, SetStateAction } from "react";

export type TypeDatabaseConnection = {
  databaseConnection: boolean;
  setDatabaseConnection?: Dispatch<SetStateAction<boolean>>;
};
