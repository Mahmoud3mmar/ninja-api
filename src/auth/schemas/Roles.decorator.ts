import { SetMetadata } from "@nestjs/common";
import { Role } from "./Role.enum";

export const Roles =(...Roles:Role[])=> SetMetadata('roles',Roles)