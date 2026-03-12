import { Prisma } from "../models/client/client.ts";
import { DataAlredyExistsExceptionInfra } from "./dataAlredyExists.ts";
import { DataDoNotExistsExceptionInfra } from "./dataDoNotExists.ts";
import { DependDataExceptionInfra } from "./dependData.ts";
import { FormateDataInvalidExceptionInfra } from "./formateDataInvalid.ts";
import { RedInvalidExceptionInfra } from "./redInvalid.ts";
import { RelationDoNoExistsException } from "./relationDoNotExists.ts";
import { ServiceInactiveExceptionInfra } from "./serviceInactive.ts";
import { UnknowErrorExceptionInfra } from "./UnknowError.ts";

export const ErrorPrismaExceptions = (error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError){
        switch (error.code) {
            case 'P2002':
                return new DataAlredyExistsExceptionInfra();
            
            case 'P2003':
                return new RelationDoNoExistsException();

            case 'P2025':
                return new DataDoNotExistsExceptionInfra();

            case 'P2000':
            case 'P2005':
            case 'P2011':
                return new FormateDataInvalidExceptionInfra();

            case 'P1001':
            case 'P1002':
            case 'P1008':
            case 'P1017':
                return new RedInvalidExceptionInfra();

            case 'P1003':
            case 'P1010':
                return new ServiceInactiveExceptionInfra();

            case 'P2014':
                return new DependDataExceptionInfra();

            default:
                return new UnknowErrorExceptionInfra();
        }
    }
    console.log(error);
    return new UnknowErrorExceptionInfra();
}