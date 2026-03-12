import type { Request } from "express";
import type { DataAccessToken, DataRefreshToken } from "../../../../applicactions/ports/token.ts";

export interface RequestWithDataAccessToken extends Request{
    dataToken?: DataAccessToken;
}

export interface RequestWithDataRefreshToken extends Request{
    dataToken?: DataRefreshToken;
}