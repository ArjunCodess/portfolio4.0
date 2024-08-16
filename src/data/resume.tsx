import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, FilePen } from "lucide-react";

export const DATA = {
    name: "Arjun Vijay Prakash",
    initials: "ArjunCodess",
    url: "https://arjuncodess.vercel.app",
    location: "Lucknow, Uttar Pradesh, India",
    locationLink: "https://www.google.com/maps/place/lucknow",
    description:
        "I'm 14yo full-stack developer, aspiring writer and student who loves to design & build stuff.",
    summary:
        "I'm Arjun Vijay Prakash, a 14-year-old [full-stack developer](https://github.com/ArjunCodess), [technical writer](https://dev.to/arjuncodess) and student from India. I've been building websites and apps since I was young. I love turning ideas into reality through code. I've already shipped over 20 projects and even made some money freelancing. I share my coding journey on my blog, where I've built a community of over 30,000 followers. I'm actively looking to collaborate on projects, as well as on my blog.",
    avatarUrl: "/me.jpeg",
    skills: [
        "Clerk",
        "Cloudinary",
        "Drizzle ORM",
        "Express.js",
        "GSAP",
        "JavaScript",
        "MongoDB",
        "Next.js",
        "Node.js",
        "Python",
        "React.js",
        "Shadcn/UI",
        "SQL",
        "Tailwind CSS",
        "Typescript"
    ],
    navbar: [
        { href: "/", icon: HomeIcon, label: "Home" },
        { href: "/blog", icon: NotebookIcon, label: "Blog" },
        { href: "/guestbook", icon: FilePen, label: "Guestbook" },
    ],
    contact: {
        email: "arjunv.prakash12345@gmail.com",
        tel: "+91 8601404303",
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/ArjunCodess",
                icon: Icons.github,

                navbar: true,
            },
            X: {
                name: "X",
                url: "https://x.com/ArjunCodess",
                icon: Icons.x,

                navbar: true,
            },
            Email: {
                name: "Send Email",
                url: "mailto:arjunv.prakash12345@gmail.com",
                icon: Icons.email,

                navbar: true,
            },
            Linktree: {
                name: "Linktree",
                url: "https://linktr.ee/arjuncodess",
                icon: Icons.linktree,

                navbar: true,
            },
        },
    },
    work: [
        {
            company: "Self Employed",
            href: "/",
            badges: [],
            location: "Remote",
            title: "Full Stack Developer",
            logoUrl: "/logo.png",
            start: "2020",
            end: "Present",
            description:
                "I have profound skills in Full-Stack Web Application Development and a little bit in design too. I have built projects ranging from simple games and mini implementations of data tools to more complex applications like social media platforms, e-commerce stores, and popular app clones. I'm learning new things all the time, so it's a mix of good and bad code on my GitHub.",
        },
    ],
    education: [
        {
            school: "City Montessori School",
            href: "https://www.cmseducation.org/",
            degree: "Intermediate +2 Course",
            logoUrl: "/cms.jfif",
            start: "2012",
            end: "2028",
        }
    ],
    projects: [
        {
            title: "PalettePro",
            href: "https://palettepro.vercel.app",
            dates: "January, 2024",
            active: true,
            description:
                "PalettePro is a color palette generator. Built with Next.js 14, Tailwind CSS, and TypeScript, it lets users upload images and get hex color codes for creative projects. Perfect for people who spend time struggling what color 'this' or 'that' is using.",
            technologies: [
                "Next.js 14",
                "Tailwind CSS",
                "TypeScript",
                "ColorThief",
                "Vercel",
            ],
            links: [
                {
                    type: "Live Website",
                    href: "https://palettepro.vercel.app",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "/project1.png",
        },
        {
            title: "TBH",
            href: "https://tbh-link.vercel.app/",
            dates: "June 2024 - August 2024",
            active: true,
            description:
                "TBH is a Q&A app where users can connect with friends and be themselves. It's built with Next.js, TypeScript, and Tailwind CSS, offering unique ways to share prompt images and interact with their audience.",
            technologies: [
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "MongoDB",
                "Vercel",
                "NextAuth",
            ],
            links: [
                {
                    type: "Live Website",
                    href: "https://tbh-link.vercel.app/",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "/project2.png",
        },
        {
            title: "VendX",
            href: "https://vendx.com",
            dates: "July 2024",
            active: true,
            description:
                "VendX is an e-commerce platform with an admin dashboard and storefront. Made with Next.js, Tailwind CSS, and DrizzleORM, it lets users manage products, categories, colors, and sizes. It's very flexible and user-friendly.",
            technologies: [
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "DrizzleORM",
                "Neon",
                "Shadcn/UI",
                "Clerk",
            ],
            links: [
                {
                    type: "Admin Dashboard",
                    href: "https://vendx-admin.vercel.app",
                    icon: <Icons.globe className="size-3" />,
                },
                {
                    type: "Store",
                    href: "https://vendx-store.vercel.app",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "/project3.png",
        },
        {
            title: "SortingWiz",
            href: "https://www.youtube.com/watch?v=hjY9Ifs8L6U",
            dates: "January 2024",
            active: true,
            description:
                "SortingWiz is a tool made with Python and Pygame that visualizes sorting algorithms. Users can watch the sorting process in real-time and control the speed. It supports Bubble Sort, Insertion Sort, Selection Sort, and Heap Sort.",
            technologies: [
                "Python",
                "Pygame"
            ],
            links: [
                {
                    type: "Video Demo",
                    href: "https://www.youtube.com/watch?v=hjY9Ifs8L6U",
                    icon: <Icons.youtube className="size-3" />
                },
                {
                    type: "Source Code",
                    href: "https://github.com/ArjunCodess/algorithm_visualizer_pygame",
                    icon: <Icons.github className="size-3" />
                }
            ],
            image: "/project4.png",
        },
        {
            title: "Dropbox 2.0",
            href: "https://dropbox-2-0-arjuncodess.vercel.app/",
            dates: "January 2024",
            active: true,
            description:
                "Dropbox 2.0 is a cloud storage app built with Next.js 14. Users can store and manage files with a drag-and-drop interface. The app uses Clerk for login and Firebase for secure file storage.",
            technologies: [
                "Next.js",
                "Clerk",
                "Shadcn/UI",
                "Tailwind CSS",
                "Firebase",
                "TypeScript"
            ],
            links: [
                {
                    "type": "Website",
                    "href": "https://dropbox-2-0-arjuncodess.vercel.app/",
                    "icon": <Icons.globe className="size-3" />
                }
            ],
            image: "/project5.png",
        },
        {
            title: "Pixify",
            href: "https://pixify-arjuncodess-projects.vercel.app/",
            dates: "Jun 2024",
            active: true,
            description:
                "Pixify is an image transformation app created with Next.js 14. It allows users to upload, manage, search, and edit images using AI. The app includes user authentication, image uploads to Cloudinary, and features like search and pagination.",
            technologies: [
                "Next.js",
                "Clerk",
                "Tailwind CSS",
                "React Hook Form",
                "Zod",
                "Cloudinary",
                "TypeScript",
                "Tailwind CSS"
            ],
            links: [
                {
                    type: "Website",
                    href: "https://pixify-arjuncodess-projects.vercel.app/",
                    icon: <Icons.globe className="size-3" />
                }
            ],
            image: "/project6.png",
        },
    ],
    personalAchievements: [
        {
            title: "Learnt Full Stack Dev at 14",
            dates: "2024",
            location: "Online",
            description: "Self-taught full-stack development, mastering technologies like MERN stack at the age of 14.",
            image: "",
            links: []
        },
        {
            title: "Made 20+ Projects Using MERN",
            dates: "2020 - Present",
            location: "Remote",
            description: "Developed over 20 projects using the MERN stack, showcasing a wide range of applications from social media platforms to e-commerce stores.",
            image: "",
            links: []
        },
        {
            title: "Made my first $140 w/ Freelancing",
            dates: "2023",
            location: "Online",
            description: "Earned $140 through freelancing, providing web development services and gaining practical experience.",
            image: "",
            links: []
        },
        {
            title: "Hit 20K+ Followers on Blog",
            dates: "2024",
            location: "Online",
            description: "Built a blog with a following of over 20,000, sharing insights and tips on coding and development.",
            image: "",
            links: []
        },
        {
            title: "Listed as the Top Writer on DEV.to",
            dates: "2024",
            location: "Online",
            description: "Recognized as a top writer on DEV.to for engaging and informative content on technology and programming.",
            image: "",
            links: []
        }
    ],
    personalityTraits: [
        {
            title: "Self-motivated",
            dates: "Ongoing",
            location: "Self",
            description: "Driven to achieve my goals 🚀, always pushing myself to reach new heights in both personal and professional life.",
            image: "",
            links: []
        },
        {
            title: "Curious",
            dates: "Ongoing",
            location: "Self",
            description: "Always eager to learn new things 🧠, constantly exploring new technologies and concepts to expand my knowledge.",
            image: "",
            links: []
        },
        {
            title: "Anti-Social",
            dates: "Ongoing",
            location: "Self",
            description: "Doesn't enjoy working with others 👤, preferring to focus on individual tasks and projects.",
            image: "",
            links: []
        },
        {
            title: "Small-circle",
            dates: "Ongoing",
            location: "Self",
            description: "Prefers a small group of like-minded people 🫂, valuing quality over quantity in personal connections.",
            image: "",
            links: []
        },
        {
            title: "Open-minded",
            dates: "Ongoing",
            location: "Self",
            description: "Enjoys hearing different opinions 💬, open to diverse perspectives and ideas for personal and professional growth.",
            image: "",
            links: []
        },
        {
            title: "Detail-oriented",
            dates: "Ongoing",
            location: "Self",
            description: "Pays attention to the little things 🤓, ensuring accuracy and thoroughness in all tasks and projects.",
            image: "",
            links: []
        }
    ],
    hobbiesInterests: [
        {
            title: "Enthusiastic Reader",
            dates: "Ongoing",
            location: "Self",
            description: "Reading non-fiction and self-help books 📚 to gain insights and improve knowledge.",
            image: "",
            links: []
        },
        {
            title: "Love Coding",
            dates: "Ongoing",
            location: "Self",
            description: "Building stuff out of code 👨🏼‍💻, turning ideas into functional applications and tools.",
            image: "",
            links: []
        },
        {
            title: "Consistent Writer",
            dates: "Ongoing",
            location: "Self",
            description: "Writing general knowledge, practical tips, and development-related content ✍️ to share insights and help others.",
            image: "",
            links: []
        },
        {
            title: "Music Lover",
            dates: "Ongoing",
            location: "Self",
            description: "Compiling and sharing underrated hip-hop songs 🎵, discovering and promoting hidden musical gems.",
            image: "",
            links: []
        },
        {
            title: "Exploring Visual Arts",
            dates: "Ongoing",
            location: "Self",
            description: "Particularly interested in sketching 🎨, experimenting with different styles and techniques in visual art.",
            image: "",
            links: []
        }
    ],
} as const;