import express from "express";

export const handleError = (res: express.Response, err: any, code: number) => {
  res.status(code).send({ error: err.message });
};
