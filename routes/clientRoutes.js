import express from "express";
import {
  renderHome,
  renderClientsList,
  renderClientDetails,
  renderCreateClient,
  renderUpdateClient,
  createClient,
  updateClient,
  deleteClient,
  apiGetClients,
  apiGetClientById,
} from "../controllers/clientController.js";

const router = express.Router();

// SSR PAGES 
router.get("/", renderHome); 
router.get("/clients", renderClientsList); 
router.get("/clients/:id", renderClientDetails);
router.get("/clients/create", renderCreateClient); 
router.get("/clients/update/:id", renderUpdateClient); 

// SSR FORM ACTIONS 
router.post("/clients/create", createClient); 
router.post("/clients/update/:id", updateClient); 
router.post("/clients/delete/:id", deleteClient); 

//API 
router.get("/api/clients", apiGetClients); 
router.get("/api/clients/:id", apiGetClientById); 

export default router;

