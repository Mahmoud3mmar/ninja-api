import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./Role.enum";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private Reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {


        const requireroles = this.Reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()
        ])
        if (!requireroles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException('No user authenticated');
        }
        const hasrole=requireroles.some((role) => user.role?.includes(role))

        if (!hasrole) {
            throw new ForbiddenException('You do not have the Authorized roles');

        }

        return hasrole
    }
}
