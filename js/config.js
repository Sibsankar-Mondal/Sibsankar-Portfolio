/* ==========================================================================
   SIBSANKAR MONDAL — PORTFOLIO v3 — config.js
   ==========================================================================
   THIS is the only file you should ever need to edit to update the site.

   Lines marked "⚠ REPLACE" are placeholders — either an asset I don't have
   (your actual photo, resume PDF, certificates, gallery shots) or a value
   only you have (social URLs, EmailJS keys). Everything else below is
   drawn from what you've told me about your work — but you know your own
   story better than I do, so treat the narrative project fields (overview,
   problem, challenges, iterations) as a first draft to correct, not a
   finished product.

   See README.md for exactly how to replace each of these.
   ========================================================================== */

const CONFIG = {

  /* ---------------------------------------------------------------------
     PERSONAL
  --------------------------------------------------------------------- */
  personal: {
    name: 'Sibsankar Mondal',
    initials: 'S.M.',
    status: 'OPEN TO OPPORTUNITIES',
    university: 'Jadavpur University',
    cgpa: '9.55',
    graduationYear: '2028',
    location: 'Kolkata, India',
    emailDisplay: 'msibsankar305@gmail.com',
    photo: 'assets/images/hero/portrait.webp',
    resumeUrl: 'assets/resume/sibsankar-mondal-resume.pdf',
    resumeThumbnail: 'assets/images/resume-thumb.jpg',
  },

  resume: {
    blurb:
      'A one-page summary of coursework, club projects, and internship experience. For full project detail — CAD, process, iterations — the Projects section below has more than a resume can hold.',
  },

  /* ---------------------------------------------------------------------
     HERO
  --------------------------------------------------------------------- */
  hero: {
    eyebrow: 'PRODUCTION ENGINEERING — ROBOTICS — MECHATRONICS',
    masthead: 'SIBSANKAR',
    subhead:
      'Production Engineering undergraduate at Jadavpur University, working across mechanism design, robotics and manufacturing — currently interning at METNMAT Innovations, Kolkata.',
  },

  /* ---------------------------------------------------------------------
     ABOUT
  --------------------------------------------------------------------- */
  about: {
    story:
      "I like taking things apart to understand why they work, then putting them back together better than I found them. That instinct is what pulled me toward Production Engineering — it sits right at the intersection of designing a part, figuring out how to actually make it, and making it work in the real world.\n\nMost of what I know, I've learned by building: leading the mechanism design on a flapping-wing aircraft, assembling and testing rover subsystems for a competition deadline, and now — at METNMAT — taking a product from a SolidWorks model to something signed off for mass production. I'm still early in this, and I like that. There's always a better tolerance, a cleaner assembly, a lighter structure to find.",
    philosophy:
      'Build it, test it honestly, and let the failure tell you what to fix next.',
    timeline: [
      {
        date: '2024',
        title: 'Started at Jadavpur University',
        subtitle: 'B.E. Production Engineering',
        description:
          'Began at JU and quickly got involved with the Mechatronics and Motorsports clubs.',
      },
      {
        date: '2025',
        title: 'Led Team Falcon',
        subtitle: 'Autonomous Ornithopter Project',
        description:
          'Took the lead on mechanism design, CAD and sensor/actuator integration for a flapping-wing autonomous aircraft.',
      },
      {
        date: '2026',
        title: 'Mechanical Engineering Intern',
        subtitle: 'METNMAT Innovations Pvt. Ltd.',
        description:
          'Moved from coursework and club projects into real product design — from an injection-moulded enclosure signed off for mass production to failure diagnosis on an electrolyzer pneumatic system.',
      },
    ],
  },

  /* ---------------------------------------------------------------------
     EDUCATION
  --------------------------------------------------------------------- */
  education: [
    {
      date: '2024 — 2028 (Expected)',
      title: 'B.E. in Production Engineering',
      subtitle: 'Jadavpur University, Kolkata',
      description:
        'Currently in the 3rd year, holding a CGPA of 9.55. Coursework spans manufacturing processes, mechanical design, robotics and automation.',
    },
    {
      date: '2021 — 2023',
      title: 'Higher Secondary Examination',
      subtitle: 'Bagdoba Jalpai High School, Purba Medinipur',
      description: 'Cleared PCMB and English with an aggregate score of 96.4%.',
    },
  ],

  /* ---------------------------------------------------------------------
     EXPERIENCE (clubs)
     ⚠ Join dates below are my best guess based on your year of study —
     confirm/adjust the exact ranges.
  --------------------------------------------------------------------- */
  experience: [
    {
      date: 'May 2025 — Present',
      title: 'Hardware Team Member',
      subtitle: 'JU Mechatronics Club',
      description:
        'CAD, robotics hardware, sensors/actuators and mechanical integration across club subsystems and autonomous-systems builds. Previously led Team Falcon, the club\u2019s autonomous ornithopter project.',
    },
    {
      date: 'Sep 2025 — Present',
      title: 'Chassis & Fabrication Team Member',
      subtitle: 'JU Motorsports Club — Team XLR8',
      description:
        'Vehicle assembly, chassis manufacturing, fabrication and performance testing.',
    },
  ],

  /* ---------------------------------------------------------------------
     INTERNSHIP
     ⚠ "Summer 2026" is a placeholder for the exact start month — confirm.
  --------------------------------------------------------------------- */
  internship: {
    company: 'METNMAT Innovations Pvt. Ltd.',
    role: 'Mechanical Engineering Intern',
    duration: 'Summer 2026 · 3 months', // ⚠ REPLACE with exact start month
    description:
      'Real product design work in SolidWorks, spanning new-product development, failure diagnosis and cost engineering on existing lines.',
    highlights: [
      'Designed an injection-moulded data logger housing in SolidWorks — passed validation and was signed off for mass production.',
      'Diagnosed a corrosion failure on an electrolyzer\u2019s pneumatic system and designed the replacement fitting.',
      'Worked on piping and routing for an experimental gallium-extraction setup.',
      'Ran cost-reduction redesigns on existing products.',
    ],
  },

  /* ---------------------------------------------------------------------
     PROJECTS
     ⚠ Image/video/download paths are placeholders — add real files under
     assets/images/projects/ and update the paths. Narrative fields
     (overview, problem, challenges, iterations) are first drafts —
     edit them to match what actually happened.
  --------------------------------------------------------------------- */
  projects: [
    {
      slug: 'autonomous-ornithopter',
      title: 'Autonomous Ornithopter',
      role: 'Team Lead',
      shortDescription:
        'A flapping-wing autonomous aircraft — mechanism design, lightweight structure and sensor/actuator integration, built and led as Team Falcon at the JU Mechatronics Club.',
      tags: ['Mechanism Design', 'CAD', 'FEA', 'Sensors & Actuators', 'Prototyping'],
      discipline: 'mechanical',
      coverImage: 'assets/images/projects/Falcon.jpeg', // ⚠ REPLACE
      links: {
        github: '', // ⚠ REPLACE or leave blank to hide the button
        docs: '',
        demo: '',
      },
      overview:
        'Team Falcon set out to design and build an autonomous ornithopter — a flapping-wing aircraft — from mechanism through to sensor/actuator-driven electronics, as lead of the mechanical and electronics-integration work. Developed for RoboFest 5.0 (GUJCOST, Gujarat).',
      problem:
        'Flapping-wing flight demands a mechanism light and efficient enough to generate usable lift, on a structure rigid enough to survive repeated cyclic loading, while still leaving room on board for flight electronics.',
      designProcess:
        'Design moved through concept sketches, kinematic analysis of the flapping linkage, CAD modelling in SolidWorks, and FEA to validate the structure against cyclic wing loads before committing to fabrication.',
      cad: {
        text: 'Full mechanism and airframe modelled in SolidWorks, with FEA used to check structural members against repeated flapping loads before parts were cut.',
        images: [
          'assets/images/projects/ornithopter-cad-1.jpg', // ⚠ REPLACE
          'assets/images/projects/ornithopter-cad-2.jpg', // ⚠ REPLACE
        ],
      },
      manufacturing: {
        text: 'Lightweight airframe fabrication and assembly, balancing structural rigidity against the weight budget the mechanism could actually lift.',
        images: [
          'assets/images/projects/ornithopter-mfg-1.jpg', // ⚠ REPLACE
        ],
      },
      electronics: {
        text: 'Sensor and actuator integration onto the airframe, wiring the electronics needed for autonomous operation.',
        images: [
          'assets/images/projects/ornithopter-electronics-1.jpg', // ⚠ REPLACE
        ],
      },
      challenges:
        'The core tension throughout was weight versus rigidity: a mechanism strong enough to survive continuous flapping cycles, without adding so much mass that the wings could no longer generate enough lift to fly.',
      iterations:
        'The mechanism and airframe went through multiple revisions as testing exposed weak points — refining joint design and structural members with each pass.',
      finalSolution:
        'A flight-tested ornithopter platform with a validated flapping mechanism, a lightweight airframe sized to the lift budget, and onboard electronics for autonomous flight control.',
      gallery: [
        'assets/images/projects/ornithopter-gallery-1.jpg', // ⚠ REPLACE
        'assets/images/projects/ornithopter-gallery-2.jpg', // ⚠ REPLACE
        'assets/images/projects/ornithopter-gallery-3.jpg', // ⚠ REPLACE
      ],
      videos: [
        // ⚠ Add flight/test footage, e.g.:
        // { embedUrl: 'https://www.youtube.com/embed/VIDEO_ID' }
      ],
      downloads: [
        // ⚠ Add CAD files, reports, etc., e.g.:
        // { label: 'CAD Assembly (.zip)', url: 'assets/downloads/ornithopter-cad.zip' }
      ],
    },

    {
      slug: 'international-rover-challenge',
      title: 'International Rover Challenge 2026',
      role: 'Hardware & Systems',
      shortDescription:
        'Hardware assembly, sensor interfacing and autonomous subsystem testing for a planetary rover competing in the International Rover Challenge.',
      tags: ['Rover Systems', 'Sensor Integration', 'Autonomous Systems', 'Hardware Assembly'],
      discipline: 'electronics',
      coverImage: 'assets/images/projects/IRC.jpeg', // ⚠ REPLACE
      links: {
        github: '',
        docs: '',
        demo: '',
      },
      overview:
        'Contributed to the hardware side of a planetary rover built for the International Rover Challenge — assembling subsystems, interfacing sensors, and testing autonomous behaviors ahead of competition.',
      problem:
        'A competition rover has to survive being assembled, disassembled, tested, and shipped repeatedly, while its sensor suite and autonomy stack have to work reliably under real field conditions, not just on a bench.',
      designProcess:
        'Worked subsystem-by-subsystem: hardware assembly and integration first, then sensor interfacing, then structured test passes on the autonomous behaviors before competition.',
      cad: {
        text: '', // add if you did CAD work specifically on IRC hardware
        images: [],
      },
      manufacturing: {
        text: '',
        images: [],
      },
      electronics: {
        text: 'Sensor integration and wiring across rover subsystems, supporting the autonomy stack with reliable, tested hardware interfaces.',
        images: [
          'assets/images/projects/irc-electronics-1.jpg', // ⚠ REPLACE
        ],
      },
      challenges:
        'Getting sensor data to be reliable enough for autonomous subsystems to actually trust, under the time pressure of a competition build schedule.',
      iterations:
        'Hardware and sensor mounts were revised through several assembly-and-test cycles as issues surfaced during subsystem testing.',
      finalSolution:
        'An assembled, sensor-integrated rover platform with autonomous subsystems tested and validated ahead of competition.',
      gallery: [
        'assets/images/projects/irc-gallery-1.jpg', // ⚠ REPLACE
        'assets/images/projects/irc-gallery-2.jpg', // ⚠ REPLACE
      ],
      videos: [],
      downloads: [],
    },
  ],

  /* ---------------------------------------------------------------------
     SKILLS
  --------------------------------------------------------------------- */
  skills: [
    {
      category: 'CAD',
      icon: 'fa-solid fa-cube',
      discipline: 'mechanical',
      items: ['SolidWorks', 'Siemens NX', 'AutoCAD'],
    },
    {
      category: 'Manufacturing',
      icon: 'fa-solid fa-industry',
      discipline: 'mechanical',
      items: ['GD&T', 'Fabrication', 'Rapid Prototyping', 'Assembly', 'Testing', 'Quality Control'],
    },
    {
      category: 'Engineering Fundamentals',
      icon: 'fa-solid fa-gauge-high',
      discipline: 'mechanical',
      items: ['Thermodynamics', 'Fluid Mechanics', 'Supply Chain Management'],
    },
    {
      category: 'Robotics & Electronics',
      icon: 'fa-solid fa-robot',
      discipline: 'electronics',
      items: ['Arduino', 'Raspberry Pi', 'Sensors', 'Actuators', 'Basic Circuits'],
    },
    {
      category: 'Programming',
      icon: 'fa-solid fa-code',
      discipline: 'software',
      items: ['Python', 'C', 'C++'],
    },
    {
      category: 'Software',
      icon: 'fa-solid fa-chart-line',
      discipline: 'software',
      items: ['ANSYS (FEA)', 'SolidWorks Simulation', 'Git'],
    },
  ],

  /* ---------------------------------------------------------------------
     ACHIEVEMENTS
     ⚠ Confirm the years — I estimated based on your current year of study.
  --------------------------------------------------------------------- */
  achievements: [
    {
      icon: 'fa-solid fa-chalkboard-user',
      date: '2025',
      title: 'Mentor, STATERA 2.0',
      description:
        'Mentored 150+ students through STATERA 2.0, guiding them through robotics fundamentals and hands-on project work.',
    },
    {
      icon: 'fa-solid fa-robot',
      date: '2025',
      title: 'Guest Instructor, Robotics Workshops',
      description:
        'Conducted guest robotics workshops, guiding participants in building face-tracking robotic systems from scratch.',
    },
  ],

  /* ---------------------------------------------------------------------
     CERTIFICATIONS
     ⚠ Placeholder — replace with your real certifications, or delete
     this entry and leave the array empty to hide unfinished cards.
  --------------------------------------------------------------------- */
  certifications: [
    {
      image: 'assets/images/certificates/Robo-Ai.png', // ⚠ REPLACE
      title: '45 Days ROBO-AI Training',
      issuer: 'My Equation',
      date: '31 May 2025',
    },

    {
      image: 'assets/images/certificates/Robofest.jpg', // ⚠ REPLACE
      title: 'ROBOFEST 5.0',
      issuer: 'Gujarat Council on Science & Technology (GUJCOST)',
      date: '30 DECEMBER 2025',
    },
    
  ],

  /* ---------------------------------------------------------------------
     GALLERY
     ⚠ Placeholder set — swap in real build/workshop/test photos.
  --------------------------------------------------------------------- */
  gallery: [
    { image: 'assets/images/gallery/gallery-1.jpg', caption: '[Replace with a build/workshop photo]' },
    { image: 'assets/images/gallery/gallery-2.jpg', caption: '[Replace with a build/workshop photo]' },
    { image: 'assets/images/gallery/gallery-3.jpg', caption: '[Replace with a build/workshop photo]' },
    { image: 'assets/images/gallery/gallery-4.jpg', caption: '[Replace with a build/workshop photo]' },
  ],

  /* ---------------------------------------------------------------------
     SOCIAL
     ⚠ Blank until you fill these in — script.js quietly skips empty ones.
  --------------------------------------------------------------------- */
  social: {
    linkedin: 'https://www.linkedin.com/in/sibsankar-mondal',
    github: '',    // ⚠ REPLACE e.g. 'https://github.com/your-handle'
    instagram: '', // ⚠ REPLACE
    emailHref: 'mailto:msibsankar305@gmail.com',
  },

  /* ---------------------------------------------------------------------
     CONTACT (Web3Forms)
     ⚠ Blank until you connect Web3Forms — the form will show a friendly
     "not connected yet" message rather than fail silently. Setup takes
     about 2 minutes — full steps are in README.md.
  --------------------------------------------------------------------- */
  contact: {
    blurb: "Open to internships, collaborations, and conversations about robotics, manufacturing, or product design. I read everything that comes through here.",
    web3formsAccessKey: 'b7ea2b87-bdff-4243-bf7c-6b852c970e14', // ⚠ REPLACE — get a free key at web3forms.com using msibsankar305@gmail.com
  },
};
