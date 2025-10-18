import authRoutes from "./auth.routes.js";
import blogsRoutes from "./blogs.routes.js";
import adminRoutes from "./admin.routes.js";

export default function registerRoutes(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/blogs", blogsRoutes);
  app.use("/api/admin", adminRoutes);
}
