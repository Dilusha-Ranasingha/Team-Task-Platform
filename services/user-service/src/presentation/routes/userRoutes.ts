import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";
import { GetProfileUseCase } from "../../application/use-cases/GetProfileUseCase";

// Infrastructure
import { UserRepositoryMongo } from "../../infrastructure/repositories/UserRepositoryMongo";
import { PasswordHasher } from "../../infrastructure/auth/PasswordHasher";
import { JWTService } from "../../infrastructure/auth/JWTService";

// Middleware
import { authMiddleware } from "../middlewares/authMiddleware";

// Create instances (Dependency Injection)
const userRepo = new UserRepositoryMongo();
const passwordHasher = new PasswordHasher();
const jwtService = new JWTService(process.env.JWT_SECRET!);

// Use cases
const registerUser = new RegisterUserUseCase(userRepo, passwordHasher);
const loginUser = new LoginUserUseCase(userRepo, passwordHasher, jwtService);
const getProfile = new GetProfileUseCase(userRepo);

// Controller
const userController = new UserController(registerUser, loginUser, getProfile);

// Router
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.profile);

export default router;