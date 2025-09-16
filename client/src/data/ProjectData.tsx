// Example images for projects (replace with your actual imports)
// import newbloosoms1 from "../assets/sameera_new_bloosms/sameera1.jpg";
// import newbloosoms2 from "../assets/projects/newbloosoms2.jpg";
// import newbloosoms3 from "../assets/projects/newbloosoms3.jpg";

// import zenons1 from "../assets/projects/zenons1.jpg";
// import zenons2 from "../assets/projects/zenons2.jpg";
// import zenons3 from "../assets/projects/zenons3.jpg";

// import urbanriseeternity1 from "../assets/projects/urbanriseeternity1.jpg";
// import urbanriseeternity2 from "../assets/projects/urbanriseeternity2.jpg";
// import urbanriseeternity3 from "../assets/projects/urbanriseeternity3.jpg";

// import lifestyle1 from "../assets/projects/lifestyle1.jpg";
// import lifestyle2 from "../assets/projects/lifestyle2.jpg";
// import lifestyle3 from "../assets/projects/lifestyle3.jpg";
// import lifestyle4 from "../assets/projects/lifestyle4.jpg";

// import jainhousing1 from "../assets/projects/jainhousing1.jpg";
// import jainhousing2 from "../assets/projects/jainhousing2.jpg";
// import jainhousing3 from "../assets/projects/jainhousing3.jpg";
// import jainhousing4 from "../assets/projects/jainhousing4.jpg";

// import casagrandzenith1 from "../assets/projects/casagrandzenith1.jpg";
// import casagrandzenith2 from "../assets/projects/casagrandzenith2.jpg";
// import casagrandzenith3 from "../assets/projects/casagrandzenith3.jpg";

// import tvsemerald1 from "../assets/projects/tvsemerald1.jpg";
// import tvsemerald2 from "../assets/projects/tvsemerald2.jpg";
// import tvsemerald3 from "../assets/projects/tvsemerald3.jpg";

// import radiancepride1 from "../assets/projects/radiancepride1.jpg";
// import radiancepride2 from "../assets/projects/radiancepride2.jpg";
// import radiancepride3 from "../assets/projects/radiancepride3.jpg";

// Utility to generate SEO-friendly slug
export const seoSlug = (title: string, location: string) =>
  `${title}-${location}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .trim();

export const locationData = ['chennai', 'velachery']

// Projects Array
// export const projects = [
//   {
//     id: 1,
//     title: "Sameera New Bloosoms",
//     des: "Premium gated community plots in Thirumazhisai with modern amenities.",
//     image: newbloosoms1,
//     images: [newbloosoms1, newbloosoms2, newbloosoms3],
//     type: "Plots",
//     location: "Thirumazhisai, Chennai",
//     price: "₹2,400 / sqft",
//     amenities: ["24 x 7 Security", "CCTV", "Black Top Roads", "Children’s Play Area", "Street Lights"],
//     nearbydatas: ["bus", "hospital", "school", "college"],
//     nearby: [
//       { type: "bus", name: "Thirumazhisai Bus Stand", distance: "2 KM" },
//       { type: "hospital", name: "Saveetha Hospital", distance: "4 KM" },
//       { type: "school", name: "Velammal School", distance: "3.5 KM" },
//       { type: "college", name: "Saveetha Engineering College", distance: "3 KM" }
//     ],
//     status: "Ready to Move"
//   },
//   {
//     id: 2,
//     title: "Zenons City",
//     des: "DTCP approved plots with premium facilities and connectivity.",
//     image: zenons1,
//     images: [zenons1, zenons2, zenons3],
//     type: "Plots",
//     location: "Poonamallee, Chennai",
//     price: "₹2,800 / sqft",
//     amenities: ["Clubhouse", "Children’s Play Area", "Street Lights", "CCTV", "24/7 Water Supply"],
//     nearbydatas: ["bus", "school", "hospital"],
//     nearby: [
//       { type: "bus", name: "Poonamallee Bus Terminus", distance: "1 KM" },
//       { type: "school", name: "Chaitanya Techno School", distance: "2 KM" },
//       { type: "hospital", name: "Be Well Hospital", distance: "2.5 KM" }
//     ],
//     status: "Ready to Move"
//   },
//   {
//     id: 3,
//     title: "Urbanrise Eternity",
//     des: "A landmark plotted development in Thirumazhisai with state-of-the-art amenities.",
//     image: urbanriseeternity1,
//     images: [urbanriseeternity1, urbanriseeternity2, urbanriseeternity3],
//     type: "Plots",
//     location: "Thirumazhisai, Chennai",
//     price: "₹4,500 / sqft",
//     amenities: ["Clubhouse", "24 x 7 Security", "CCTV", "Black Top Roads", "Children’s Play Area", "Jogging Tracks"],
//     nearbydatas: ["bus", "hospital", "college", "school"],
//     nearby: [
//       { type: "bus", name: "Thirumazhisai Bus Stand", distance: "1.5 KM" },
//       { type: "hospital", name: "Be Well Hospital", distance: "3 KM" },
//       { type: "college", name: "Rajalakshmi Engineering College", distance: "4 KM" },
//       { type: "school", name: "Chaitanya Techno School", distance: "2 KM" }
//     ],
//     status: "Ready to Move"
//   },
//   {
//     id: 4,
//     title: "Lifestyle Housing - The Habitat",
//     des: "Luxury apartments with modern amenities designed for urban living.",
//     image: lifestyle1,
//     images: [lifestyle1, lifestyle2, lifestyle3, lifestyle4],
//     type: "Apartments",
//     location: "Medavakkam, Chennai",
//     price: "₹65 Lakhs onwards",
//     amenities: ["Swimming Pool", "Gym", "Children’s Play Area", "Clubhouse", "24/7 Power Backup", "CCTV & Security"],
//     nearbydatas: ["school", "hospital", "college"],
//     nearby: [
//       { type: "school", name: "Zion Matriculation School", distance: "2 KM" },
//       { type: "hospital", name: "Global Hospitals", distance: "3 KM" },
//       { type: "college", name: "Sathyabama University", distance: "8 KM" }
//     ],
//     status: "Under Construction"
//   },
//   {
//     id: 5,
//     title: "Jain Housing - Pebble Brook Phase II",
//     des: "Premium residential community with world-class amenities.",
//     image: jainhousing1,
//     images: [jainhousing1, jainhousing2, jainhousing3, jainhousing4],
//     type: "Apartments",
//     location: "Thoraipakkam, Chennai",
//     price: "₹75 Lakhs onwards",
//     amenities: ["Swimming Pool", "Gymnasium", "Indoor Games", "Children’s Park", "Clubhouse", "Power Backup"],
//     nearbydatas: ["itpark", "school", "hospital"],
//     nearby: [
//       { type: "itpark", name: "Tidel Park", distance: "5 KM" },
//       { type: "school", name: "DAV School", distance: "2 KM" },
//       { type: "hospital", name: "Apollo Hospitals", distance: "6 KM" }
//     ],
//     status: "Ready to Move"
//   },
//   {
//     id: 6,
//     title: "Casagrand Zenith",
//     des: "High-rise apartments with premium lifestyle facilities in Medavakkam.",
//     image: casagrandzenith1,
//     images: [casagrandzenith1, casagrandzenith2, casagrandzenith3],
//     type: "Apartments",
//     location: "Medavakkam, Chennai",
//     price: "₹80 Lakhs onwards",
//     amenities: ["Rooftop Swimming Pool", "Fitness Center", "Community Hall", "Children’s Play Zone", "Jogging Track"],
//     nearbydatas: ["college", "hospital", "bus"],
//     nearby: [
//       { type: "college", name: "Mohamed Sathak AJ College", distance: "5 KM" },
//       { type: "hospital", name: "Kamakshi Hospital", distance: "4 KM" },
//       { type: "bus", name: "Medavakkam Junction Bus Stop", distance: "1.5 KM" }
//     ],
//     status: "Under Construction"
//   },
//   {
//     id: 7,
//     title: "TVS Emerald Aaranya",
//     des: "Villa community with lush green surroundings and luxury amenities.",
//     image: tvsemerald1,
//     images: [tvsemerald1, tvsemerald2, tvsemerald3],
//     type: "Villas",
//     location: "Vengaivasal, Chennai",
//     price: "₹1.5 Cr onwards",
//     amenities: ["Private Garden", "Swimming Pool", "Clubhouse", "Gym", "Children’s Play Area", "Walking Trails"],
//     nearbydatas: ["school", "college", "hospital"],
//     nearby: [
//       { type: "school", name: "PSBB Millennium School", distance: "3 KM" },
//       { type: "college", name: "SIVET College", distance: "4 KM" },
//       { type: "hospital", name: "Dr. Kamakshi Memorial Hospital", distance: "5 KM" }
//     ],
//     status: "Upcoming"
//   },
//   {
//     id: 8,
//     title: "Radiance The Pride",
//     des: "Spacious apartments in Pallavaram with luxury living standards.",
//     image: radiancepride1,
//     images: [radiancepride1, radiancepride2, radiancepride3],
//     type: "Apartments",
//     location: "Pallavaram, Chennai",
//     price: "₹70 Lakhs onwards",
//     amenities: ["Multipurpose Hall", "Swimming Pool", "Gym", "Indoor Games", "Children’s Play Area", "Power Backup"],
//     nearbydatas: ["airport", "metro", "hospital", "college"],
//     nearby: [
//       { type: "airport", name: "Chennai International Airport", distance: "3 KM" },
//       { type: "metro", name: "Airport Metro Station", distance: "3.5 KM" },
//       { type: "hospital", name: "MIOT Hospital", distance: "8 KM" },
//       { type: "college", name: "Madras Christian College", distance: "6 KM" }
//     ],
//     status: "Ready to Move"
//   }
// ];
