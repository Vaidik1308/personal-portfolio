import type { ComponentType } from "react";
import type { AppId } from "../registry";
import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";

export const appContent: Record<AppId, ComponentType> = {
  about: About,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  contact: Contact,
};
