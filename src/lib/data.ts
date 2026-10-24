  // experience details
  export type Experience = {
    roleName:string;
    duration?:{
      start?:string;
      end?:string
    };
    current?:boolean
    type:"remote" | "hybrid" | "onsite";
    jobType:"Internship" | "Full-Time" | "Freelance" | "Contract" | "Part-time";
    desc:string[];
    skills:string[];
    companyLink?:string;
    companyName?:string;
  }


  export const experienceData :Experience[] = [
    {
      roleName:"Software Developer",
      duration:{
        start:"Oct, 2025",
        end:"Present"
      },
      current:true,
      type:"remote",
      jobType:"Full-Time",
      desc:[
        "Own features end-to-end across a Next.js/TypeScript vendor CRM and 4 Node.js microservices (MongoDB, Zod), from data model and REST API to UI.",
        "Engineered the smart-document Services & Packages block (client-selectable services, quantities, tax mapping, dynamic invoice totals) and wired it to Stripe across 3 payment methods: card, ACH and BNPL.",
        "Launched a block-based lead-form builder with an embeddable iframe-free widget, a referral program with branded signup pages, and custom client domains on Cloudflare and CloudFront.",
        "Built an MCP (Model Context Protocol) server exposing CRM tools to AI assistants such as Claude, with OAuth consent, CSRF protection and stateless sessions, plus internal AI agents that automated onboarding of 8+ vendor accounts and headless end-to-end smoke tests.",
      ],
      skills:[
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Zod",
        "Stripe",
        "MCP",
        "OAuth",
        "Cloudflare",
        "CloudFront",
        "Microservices",
      ],
      companyLink:"https://www.wedyapp.com/",
      companyName:"Wedy AI"
    },
    {
      roleName:"Frontend Developer Consultant",
      duration:{
        start:"Aug, 2025",
        end:"Oct, 2025"
      },
      current:false,
      type:"remote",
      jobType:"Part-time",
      desc:[
        "Led frontend development of the Meta Create product in Next.js, architecting a reusable component system adopted across the product.",
        "Delivered interfaces for 3 client projects with a focus on performance and usability, refining design systems from user feedback.",
      ],
      skills:[
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "React Query",
        "Redux Toolkit",
      ],
      companyLink:"https://www.m0.org/",
      companyName:"M0"
    },
    {
      roleName:"Full Stack Developer Intern",
      duration:{
        start:"May, 2025",
        end:"Aug, 2025"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Created the Zame AI dashboard in Next.js and 15+ FastAPI endpoints backing it, integrating the two end-to-end.",
        "Overhauled the product UI with a consistent component set, replacing ad-hoc styles across every dashboard screen.",
      ],
      skills:[
        "Next.js",
        "TypeScript",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "Docker",
        "Tailwind CSS",
        "Figma",
      ],
      companyLink:"https://www.zame.ai/",
      companyName:"Zame AI"
    },
    {
      roleName:"Frontend Developer Intern",
      duration:{
        start:"Oct, 2024",
        end:"May, 2025"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Implemented the UI for the new Taktys web application from design handoff, shipping its core screens and frontend features.",
      ],
      skills:[
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Query",
        "Nivo Charts",
        "TimescaleDB",
      ],
      companyLink:"https://www.taktys.com/",
      companyName:"Taktys"
    },
    {
      roleName:"Frontend Developer Intern",
      duration:{
        start:"Aug, 2024",
        end:"Jan, 2025"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Integrated new frontend features into the ChatClient application, streamlining its key user flows.",
      ],
      skills:[
        "Next.js",
        "Tailwind CSS",
        "Context API",
        "Redux Toolkit",
      ],
      companyLink:"https://www.chatclient.ai/",
      companyName:"ChatClient.ai"
    },
    {
      roleName:"Frontend Developer Intern",
      duration:{
        start:"Apr, 2024",
        end:"Aug, 2024"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Maintained the frontend of 3 client and admin web applications, resolving bugs and shipping feature requests.",
        "Designed an Admin Analytics page with interactive charts, collaborating with cross-functional teams to ship on schedule.",
      ],
      skills:[
        "Next.js",
        "TypeScript",
        "Redux Toolkit",
        "Chart.js",
        "Shadcn UI",
        "MongoDB",
      ],
      companyLink:"https://www.shopiq.app/",
      companyName:"CFT Labs"
    },
    {
      roleName:"Frontend Developer Intern",
      duration:{
        start:"Jun, 2023",
        end:"Jul, 2023"
      },
      current:false,
      type:"remote",
      jobType:"Internship",
      desc:[
        "Developed a portfolio website for a professor at IIT Roorkee using React.js, Tailwind CSS, and various UI libraries.",
        "Featured sections include the professor's achievements, work experience, and research.",
      ],
      skills:[
        "React",
        "Vite",
        "Tailwind CSS",
        "TypeScript",
      ],
      companyName:"CypherTech"
    },
    {
      roleName:"Frontend Developer Intern",
      duration:{
        start:"Feb, 2023",
        end:"Apr, 2023"
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
        "React",
        "Tailwind CSS",
      ],
      companyLink:"https://meraqui.com/",
      companyName:"KaroStartup"
    },
  ]





  // about me details
  export type College = {
    name:string;
    branch?:string;
    mains?:string;
    years?:string;
    cgpa?:string;
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
    role:"Software Developer",
    education:{
      college:{
        name:"Dayananda Sagar College of Engineering",
        branch:"B.E. in Electronics and Communication Engineering",
        years:"2021 – 2025",
        cgpa:"8.1",
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