// Static Data Store (Replaces Supabase database)
const PORTFOLIO_DATA = {
  profile: {
    name: "PRAMUDITA AHMAD",
    callsign: "PLAYER 1: ACTIVE",
    title: "SOFTWARE ENGINEER // MUSIC // TEACHING",
    bio: "Building efficient systems and writing code with passion across low-level operating systems, native desktop software, machine learning, and fullstack architectures.",
    aboutLong1: "Hello, I'm Pramudita Ahmad, a 21-year-old Information Systems student at Siliwangi University. I've been coding since I was 17, and I love continuous learning across core computer science and software systems.",
    aboutLong2: "I have a dream to teach computer science because sharing knowledge creates real impact. When I'm not coding, you can find me exploring music and technology.",
    resumeUrl: "assets/images/resume.pdf",
    githubUrl: "https://github.com/pramahmad",
    mediumUsername: "rheaa2602",
    socials: {
      github: "https://github.com/pramahmad",
      instagram: "https://www.instagram.com/suhn_flou_er/?hl=en",
      twitter: "https://twitter.com/PramuditaAhmad1",
      linkedin: "https://www.linkedin.com/in/pramudita-ahmad-4ba11a232/",
      facebook: "https://www.facebook.com/pramudita.ahmad.10"
    }
  },

  skills: [
    { name: "LARAVEL / PHP", level: 90 },
    { name: "VUE.JS / NUXT", level: 95 },
    { name: "GOLANG", level: 80 },
    { name: "SQL & DATABASE DESIGN", level: 85 },
    { name: "CSS & WEB STYLING", level: 95 },
    { name: "PYTHON / DJANGO", level: 78 },
    { name: "FLUTTER / DART", level: 75 },
    { name: "TENSORFLOW / ML", level: 83 }
  ],

  projects: [
    {
      id: 1,
      nama: "mrapmusic - Terminal Audio Workstation",
      deskripsi: "High-performance Linux terminal music player and digital audio workstation written in pure C11. Features real-time FFT audio spectrum visualizer (Braille & Unicode TrueColor) without X11/Wayland dependencies, live DSP sound effects, and low-latency audio playback.",
      img: "assets/images/JJ.png",
      github: "https://github.com/pramahmad/mrapmusic",
      link: "-",
      type: "Systems & Desktop",
      stack: "C11, Linux, ALSA, PulseAudio, DSP",
      created_at: "2024-11-04"
    },
    {
      id: 2,
      nama: "Human Pose Estimation Research & Journal",
      deskripsi: "Deep learning and computer vision framework for human pose estimation. Implemented end-to-end dataset preprocessing, keypoint detection, and algorithmic evaluation for scientific journal publication.",
      img: "assets/images/hehe1.png",
      github: "https://github.com/pramahmad",
      link: "-",
      type: "Machine Learning",
      stack: "Python, PyTorch, OpenCV, MediaPipe",
      created_at: "2024-05-18"
    },
    {
      id: 3,
      nama: "CariDesa - Multi-Tenant Village E-Catalog SaaS",
      deskripsi: "Modern catalog and administrative web platform empowering village enterprises and governance. Built with Laravel with clean relational database architecture, role-based access control, and dynamic storefronts.",
      img: "assets/images/c.png",
      github: "https://github.com/pramahmad",
      link: "-",
      type: "Web Application",
      stack: "PHP, Laravel, MySQL, Tailwind CSS",
      created_at: "2024-05-06"
    },
    {
      id: 4,
      nama: "Pixel 2D Interactive Web Portfolio",
      deskripsi: "Retro 2D pixel-styled personal developer portfolio with 8-bit aesthetic, responsive layouts, audio player integration, and zero framework overhead.",
      img: "assets/images/avasds.png",
      github: "https://github.com/pramahmad",
      link: "https://pramudita.vercel.app",
      type: "Frontend Application",
      stack: "Vanilla HTML5, Pure CSS3, JavaScript",
      created_at: "2024-04-25"
    }
  ],

  blogs: [
    {
      guid: "log-01",
      title: "Operating Systems Fundamentals: How Kernel Processes Memory",
      description: "An in-depth look at memory management, virtual memory paging, process scheduling, and system calls in Unix-like operating systems.",
      pubDate: "2024-04-20",
      link: "https://medium.com/@rheaa2602",
      thumbnail: "assets/images/JJ.png"
    },
    {
      guid: "log-02",
      title: "Building High Performance Audio Visualizers in Pure C",
      description: "Implementing Fast Fourier Transform (FFT) algorithms and rendering real-time sound frequencies directly to the terminal using Braille Unicode characters.",
      pubDate: "2024-03-15",
      link: "https://medium.com/@rheaa2602",
      thumbnail: "assets/images/hehe1.png"
    },
    {
      guid: "log-03",
      title: "Practical Machine Learning: Computer Vision Keypoints Detection",
      description: "Step-by-step pipeline for human pose estimation, dataset preparation, neural network inference, and real-time webcam pose tracking.",
      pubDate: "2024-02-10",
      link: "https://medium.com/@rheaa2602",
      thumbnail: "assets/images/c.png"
    }
  ]
};
