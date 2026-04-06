import express from "express";
import type { ObjectId } from "mongodb";
export type SessionReq = express.Request & {
    userId: ObjectId;
};
//# sourceMappingURL=sessionReq.d.ts.map