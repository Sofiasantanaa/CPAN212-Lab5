import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";

import clientRoutes from "./routes/clientRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ES module __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to track current path for navigation highlighting
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Set views root
const viewsRoot = path.join(__dirname, "views");
app.set("view engine", "ejs");
app.set("views", viewsRoot);

// Custom EJS engine configuration
app.engine("ejs", (filePath, options, callback) => {
  const renderOptions = {
    ...options,
    filename: filePath,
    root: [viewsRoot],
  };
  ejs.renderFile(filePath, renderOptions, callback);
});

// Express EJS Layouts middleware
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Serve static assets (CSS, images)
app.use(express.static(path.join(__dirname, "public")));

// Routes (SSR + API)
app.use("/", clientRoutes);

// 404 handler for SSR and API requests
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "Not Found", path: req.path });
  }
  return res.status(404).render("pages/notFound", {
    pageTitle: "Not Found",
    details: `The page you requested (${req.path}) does not exist.`,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

