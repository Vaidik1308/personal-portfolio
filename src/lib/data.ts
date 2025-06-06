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





  // experience details
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
      roleName:"Full Stack Developer",
      duration:{
        start:"May, 2025",
        end:"Present"
      },
      current:true,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Developing and integrating the Dashboard of the zame ai with backend",
        "Developing the APIs for the dashboard using fastApi.",
        "Improving the Overall UI of the zame ai.",
        "Developing reusable components which maintains code reusability.",
      ],
      skills:[
        "Next Js",
        "Tailwind CSS",
        "Redux Toolkit",
        "React Query",
        "Shadcn UI",
        "TypeScript",
        "Postgres SQL",
        "Docker",
        "FastApi",
        "Python",
        "Git Github",
        "Figma",
        "scss",
        
      ],
      companyLink:"https://www.zame.ai/",
      companyName:"Zame AI"
    },
    {
      roleName:"Frontend UI Developer",
      duration:{
        start:"Nov, 2024",
        
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
        "Tailwind CSS",
        "Redux Toolkit",
        "React Query",
        "Shadcn UI",
        "TypeScript",
        "TimescaleDB",
        "Nivo Charts",
        "Postgres SQL",
        "Docker"
      ],
      companyLink:"https://www.taktys.com/",
      companyName:"Taktys"
    },
   
    {
      roleName:"Frontend Developer",
      duration:{
        start:"Aug, 2024",
        end:"May, 2025"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Implemented features like custom actions, integrations with Zapier and Slack, teams, and revamped the ChatClient UI while adding a tools section.",
        "Enhanced user experience by developing and integrating new features to improve functionality and usability.",
        "Collaborated with backend developers for seamless integration and built reusable components to maintain code efficiency.",
      ],
      skills:[
        "Next Js",
        "Tailwind CSS",
        "Context API",
        "Redux Toolkit",
      ],
      companyLink:"https://www.chatclient.ai/",
      companyName:"Chatclientai"
    },
    {
      roleName:"Next Js Developer",
      duration:{
        start:"Apr, 2024",
        end:"Aug, 2024"
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
        "Tailwind CSS",
        "Redux Toolkit",
        "ChartJs",
        "Shadcn UI",
        "TypeScript",
        "Git Github",
        "MongoDB",
      ],
      companyLink:"https://www.shopiq.app/",
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
        "Vite",
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
        start:"Feb, 2023",
        end:"Apr, 2023",
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





  // about me details
  export type College = {
    name:string;
    branch?:string;
    mains?:string;
  }

  type Education = {
    college:College;
    school:College
  }

  export type AboutMe = {
    role:string;
    education:Education;
    location:string;
    fullName:string;
    nativeTown?:string;
  }

  export const aboutData:AboutMe = {
    role:"Full Stack Web Developer",
    education:{
      college:{
        name:"Dayananda Sagar College of Engineering",
        branch:"Electronics and Communication Engineering",
      },
      school:{
        name:"Dayananda Sagar College of Engineering",
        mains:"PCM",
      },
    },
    location:"Bengaluru, Karnataka",
    nativeTown:"Ajmer, Rajasthan",
    fullName:"Vaidik Singh Nirwan"
  }