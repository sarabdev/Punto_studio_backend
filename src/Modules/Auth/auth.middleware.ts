import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthServices } from "./auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthServices
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const skipPaths = ["/api/register", "/api/login"];

    const isSkipped = skipPaths.some((path) => request.path.includes(path));
    if (isSkipped) {
      return true;
    }
    const authHeader = request.headers.authorization || "";
    if (!authHeader.startsWith("Bearer")) {
      console.log("ok");
      throw new UnauthorizedException();
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.authService.findOneid(payload.id);

      if (!user) {
        throw new UnauthorizedException();
      }

      request.user = { id: user.id, email: user.email };

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
