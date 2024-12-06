import { NavigationType } from "@/types";

export const navigationData:NavigationType[] = [
    {
      label:"Home",
      path:"/"
    },
    {
      label:"About Me",
      path:"#about"
    },
    {
      label:"Experience",
      path:"#experience"
    },
    {
      label:"Projects",
      path:"#projects"
    },
    {
      label:"contact",
      path:"#contact"
    },
  ]




  export type Experience = {
    roleName:string;
    duration?:{
      start?:string;
      end?:string
    };
    current?:boolean
    type:"remote" | "hybrid" | "onsite";
    jobType:"Internship" | "Full-Time" | "Freelance" | "Contract";
    desc:string[];
    skills:string[];
    companyLink?:string;
    companyName?:string;
  }


  export const experienceData :Experience[] = [
    {
      roleName:"Frontend UI Developer",
      duration:{
        start:"Oct, 2024"
      },
      current:true,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Developed the UI for taktys.",
        "Utilized modern frameworks and libraries to streamline development.",
        "Developing the modern dashboard for users.",
        "Worked closely with backend developers to ensure seamless integration.",
        "Developing reusable components which maintains code reusability.",
      ],
      skills:[
        "Next Js",
        "React Js",
        "Tailwind CSS",
        "Redux Toolkit",
        "Zustand",
        "Shadcn UI",
        "TypeScript",
        "Git Github",
        "TimescaleDB",
        "Nivo Charts",
        "Postgres SQL"
      ],
      companyLink:"https://www.taktys.com/",
      companyName:"Taktys"
    },
   
    {
      roleName:"Frontend Developer",
      duration:{
        start:"Aug, 2024",
        end:"Nov, 2024"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Enhancing User Experience on the ChatClient frontend by Developing and Integrating new features",
        "Improving the Overall Functionality and Usability of the ChatClient application through frontend development and feature implementation.",
        "Implemented the Teams feature in the existing website",
        "Revamp the Chatclient UI",
        "Added the tools section the website",
        "Worked closely with backend developers to ensure seamless integration.",
        "Developing reusable components which maintains code reusability.",
      ],
      skills:[
        "Next Js",
        "React Js",
        "Tailwind CSS",
        "Context API",
        "Git Github",
      ],
      companyLink:"https://www.chatclient.ai/",
      companyName:"Chatclientai"
    },
    {
      roleName:"Next Js Developer",
      duration:{
        start:"Oct, 2024"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Developed and maintained the front-end of multiple client and admin web applications at CFT Labs.",
        "Implemented front-end features for an Admin Analytics Page, enabling efficient data visualization and user interaction.",
        "Developing the modern dashboard for users.",
        "Collaborated with cross-functional teams to deliver high-quality web applications within project timelines.",
      ],
      skills:[
        "Next Js",
        "React Js",
        "Tailwind CSS",
        "Redux Toolkit",
        "ChartJs",
        "Shadcn UI",
        "TypeScript",
        "Git Github",
        "MongoDB",
      ],
      companyLink:"https://www.taktys.com/",
      companyName:"ShopIQ"
    },
    {
      roleName:"Frontend Developer",
      duration:{
        start:"Jun, 2023",
        end:"July, 2023"
      },
      current:false,
      type:"remote",
      jobType:"Freelance",
      desc:[
        "Developed a portfolio website for a professor at IIT Roorkee using React.js, Tailwind CSS, and various UI libraries.",
        "Featured sections include the professor’s achievements, work experience, and research.",
      ],
      skills:[
        "Vite Js",
        "React Js",
        "Tailwind CSS",
        "TypeScript",
        "Git Github",
      ],
      companyLink:"https://github.com/Vaidik1308/sr-meka-web",
      companyName:"CypherTech"
    },
    {
      roleName:"Frontend Developer",
      duration:{
        start:"Jun, 2023",
        end:"uly, 2023",
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Developed the Meraqui Company website using React.js and Tailwind CSS.",
        "Integrated sections for achievements, work offers, past works, and customer reviews.",
        "Optimized website performance, enhancing load times and user experience.",
      ],
      skills:[
        "React Js",
        "Tailwind CSS",
        "Git Github",
      ],
      companyLink:"https://meraqui.com/",
      companyName:"Meraqui"
    },
    
  ]