// import building from '../assets/building.jpg'
// import background_image from '../assets/background_image.jpg'

// sameera new bloosoms
import sameera_background from '../assets/sameera_new_bloosms/background.jpg'
import sameera1 from '../assets/sameera_new_bloosms/sameera1.jpg'
import sameera2 from '../assets/sameera_new_bloosms/sameera2.jpg'
import sameera3 from '../assets/sameera_new_bloosms/sameera3.jpg'

// Urbanrise 
import urbanrise1 from '../assets/opus_urbanrise/urbanrise_opus1.jpg'
import urbanrise2 from '../assets/opus_urbanrise/urbanrise_opus2.jpg'
import urbanrise3 from '../assets/opus_urbanrise/urbanrise_opus3.jpg'
import urbanrise4 from '../assets/opus_urbanrise/urbanrise_opus4.jpg'

// Vr dazzle
import vrdazzle1 from '../assets/vrdazzle/vr-dazzle1.jpg'
import vrdazzle2 from '../assets/vrdazzle/vr-dazzle2.jpg'
import vrdazzle3 from '../assets/vrdazzle/vr-dazzle3.jpg'
import vrdazzle4 from '../assets/vrdazzle/vr-dazzle14.jpg'
import vrdazzle5 from '../assets/vrdazzle/vr-dazzle5.jpg'

// Vr perl 
import perlcity1 from '../assets/vr-perl/vr-perl1.jpg'
import perlcity2 from '../assets/vr-perl/vr-perl12.jpg'
import perlcity3 from '../assets/vr-perl/vr-perl13.jpg'

// poorva ragam
import poorva1 from '../assets/purva-ragam/purvaragam1.jpg'
import poorva2 from '../assets/purva-ragam/purvaragam2.jpg'
import poorva3 from '../assets/purva-ragam/purvaragam3.jpg'
import poorva4 from '../assets/purva-ragam/purvaragam4.jpg'
import poorva5 from '../assets/purva-ragam/purvaragam5.jpg'

// crystal crown
import crystal1 from '../assets/cristal-crown/cristalcrown1.jpg'
import crystal2 from '../assets/cristal-crown/cristalcrown2.jpg'
import crystal3 from '../assets/cristal-crown/cristalcrown3.jpg'
import crystal4 from '../assets/cristal-crown/cristalcrown4.jpg'

// tatia
import tatia1 from '../assets/tatia/tatia1.jpg'
import tatia2 from '../assets/tatia/tatia2.jpg'
import tatia3 from '../assets/tatia/tatia3.jpg'
import tatia4 from '../assets/tatia/tatia4.jpg'

// adithyaram
import adityaram1 from '../assets/adithyaram/adithyaram1.jpg'
import adityaram2 from '../assets/adithyaram/adithyaram2.jpg'
import adityaram3 from '../assets/adithyaram/adithyaram3.jpg'
import adityaram4 from '../assets/adithyaram/adithyaram4.jpg'

// urbanrise game changer
import urbanrisegamechanger1 from '../assets/urbanrise_game_changer/Urbanrise_Codename_The_Game_Changer_1.jpg'


export interface NearbyItem {
    type: 'bus' | 'metro' | 'industrial' | 'hospital' | 'school' | 'college' | 'entertainment' | 'railway' | 'itpark' | 'amusement' | 'road' | 'airport' | 'area';
    distance: string;
    name: string
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: any;
    images: string[];
    category: 'Plots' | 'Villas' | 'Apartments';
    location: string;
    price?: string;
    nearby?: NearbyItem[]; // Updated to use structured objects
    nearbydatas?: string[]; // Optional: if you still want raw strings
    amenities?: string[];
    status?: "Under Construction" | "Ready to Move" | "Upcoming";
}

export const allProjects: Project[] = [
    {
        id: 1,
        title: 'Sameera New Bloosoms',
        description: 'A place for new beginning to your future',
        image: sameera_background,
        images: [sameera_background, sameera1, sameera2, sameera3],
        category: 'Plots',
        location: 'Thirumazhisai',
        price: '3,800 / sqft',
        nearbydatas: ['college', 'school', 'hospital', 'bus'],
        nearby: [{'type': 'college', distance: '2km', name: 'Panimalar Engineering College'}, {'type': 'school', 'distance': '600 mtr', name: 'chennai public school'}, {'type': 'entertainment', 'distance': '3.5 Kms', name: 'queensland'}, {'type': 'hospital', 'distance': '4 kms', name: 'ramachandra hospital'}, {'type': 'bus', distance: '300 Mrs', name: 'Thirumazhisai bus stop'} ],
        amenities: ['Black top road', 'Children park', '30 Feet road', 'Avenue Trees'],
        status: 'Ready to Move'
    },{
        id: 2,
        title: 'urbanrise opus 96',
        description: "embark on chennai's first nature inspired 125 Acres township.",
        image: urbanrise1,
        images: [urbanrise1, urbanrise2, urbanrise3, urbanrise4],
        category: 'Plots',
        location: 'Tambaram, Kiskinta',
        price: '6,000 / sqft',
        amenities: [
            'luxurious two clubhouse only for plot project.',
            '24 x 7 sceurity.',
            'CCTV.',
            'well lite street and common area.',
            'Cricket net, volley ball court, badminton court',
            'GYM',
            'Childrens play area',
            'jogging tracks',
            'upgrade to green living'
        ],
        nearbydatas: ['bus'],
        nearby : [{type: 'railway', distance: '6 KM', name: 'Tambaram Railway'}, {type: 'hospital', name:'Hindu Mission Hospital.', distance: '4.5 KM'}, {type: 'bus', name: 'Kilambakkam bus', distance: '9 KM'}, {type: 'school', distance: '3.5 KM', name: 'VElS Global'}, {name: 'MCC', distance: '7 KM', 'type': 'college'}],
        status: 'Ready to Move'
    }, {
    id: 3,
    title: 'VR Dazzle City-Phase I',
    description: 'RERA Approved Gated Community with 500+ Plots & 50+ Amenities.',
    image: vrdazzle4, // replace with actual image import
    images: [vrdazzle1, vrdazzle2, vrdazzle3, vrdazzle4, vrdazzle5], // add actual images
    category: 'Plots',
    location: 'Malayambakkam, Chennai',
    price: '2400 / sqft',
    amenities: [
        'DTCP & RERA Approved',
        'Gated Community with 25 Acres & 500+ Plots',
        '50+ World Class Amenities',
        '33 & 30 ft Black Top Roads',
        'Potable Water',
        'Clear Title with Legal Approvals',
        'Up to 80% Bank Loan Available',
        'Children’s Play Area',
        'Jogging & Walking Tracks',
        'Security with CCTV Surveillance'
    ],
    nearbydatas: ['bus', 'metro', 'itparks', 'schools', 'colleges'],
    nearby: [
        { type: 'bus', name: 'Local Bus Stop', distance: '1 min' },
        { type: 'metro', name: 'Upcoming Metro & ORR', distance: '7 mins' },
        { type: 'bus', name: 'Kuthambakkam', distance: '10 mins' },
        { type: 'itpark', name: 'Tidel Parks', distance: '15 mins' },
        { type: 'itpark', name: 'OMR 2.0 - Porur IT Corridor', distance: '30 mins' },
        { type: 'school', name: 'Nearby Schools', distance: 'Within 5-10 mins' },
        { type: 'college', name: 'Nearby Colleges', distance: 'Within 10-15 mins' },
        { type: 'amusement', name: 'Amusement Parks', distance: '15-20 mins' }
    ],
    status: 'Ready to Move'
},
{
    id: 4,
    title: 'VR Pearl City',
    description: '20 Acres DTCP & RERA Approved Gated Community with 477+ Plots & 30+ Amenities.',
    image: vrdazzle2, // replace with actual image import
    images: [perlcity1, perlcity2, perlcity3,], // add actual images
    category: 'Plots',
    location: 'Melakondaiyur, Near Thiruninravur',
    price: '1200 / sqft',
    amenities: [
        'DTCP & RERA Approved',
        'Gated Community with 20 Acres & 477+ Plots',
        '30+ Amenities',
        '33 & 30 ft Black Top Roads',
        'Potable Water',
        'Clear Title with Legal Approvals',
        'Up to 90% Bank Loan Available'
    ],
    nearbydatas: ['railway', 'college', 'school', 'tidalpark', 'highway'],
    nearby: [
        { type: 'railway', name: 'Thiruninravur Railway Station', distance: '15 mins' },
        { type: 'itpark', name: 'Pattabiram New Tidel Park', distance: '15 mins' },
        { type: 'road', name: 'Chennai Peripheral Ring Road', distance: '5 mins' },
        { type: 'road', name: 'Chennai - Tirupati Highway', distance: '10 mins' },
        { type: 'college', name: 'Bajrang Engineering College', distance: '10 mins' },
        { type: 'school', name: 'Oxford School', distance: '5 mins' },
        { type: 'college', name: 'Jaya Surya Engineering College', distance: '15 mins' }
    ],
    status: 'Ready to Move'
}, {
        id: 5,
        title: 'Purva Ragam',
        description: 'A place for new beginning to your future',
        image: poorva1,
        images: [poorva1, poorva2, poorva3, poorva4, poorva5],
        category: 'Plots',
        location: 'Thirumazhisai',
        price: '4,500 / sqft',
        nearbydatas: ['college', 'school', 'hospital', 'bus'],
        nearby: [{'type': 'college', distance: '3 km', name: 'Panimalar Engineering College'}, {'type': 'school', 'distance': '900 mtr', name: 'chennai public school'}, {'type': 'entertainment', 'distance': '4.5 Kms', name: 'queensland'}, {'type': 'hospital', 'distance': '5 kms', name: 'ramachandra hospital'}, {'type': 'bus', distance: '600 Mrs', name: 'Thirumazhisai bus stop'} ],
        amenities: ['Black top road', 'Children park', '30 Feet road', 'Avenue Trees'],
        status: 'Ready to Move'
    },
{
    id: 6,
    title: 'Crystal Crown',
    description: 'Premium Villa Plots in Kundrathur with sizes ranging from 774 to 2000 sq.ft.',
    image: crystal1, // replace with actual image import
    images: [crystal1, crystal2, crystal3, crystal4], // add actual images
    category: 'Plots',
    location: 'Kundrathur, Chennai',
    price: '2999 - 3199 / sqft',

    amenities: [
        'DTCP & RERA Approved Premium Villa Plots',
        'Sizes from 774 sq.ft to 2000 sq.ft',
        'Gated Community with Clear Title',
        'Wide Black Top Roads',
        'Potable Water & Drainage',
        'Street Lighting & CCTV',
        'Children’s Play Area',
        'Jogging & Walking Tracks',
        'Bank Loan Facility'
    ],
    nearbydatas: ['itpark', 'industrial', 'road', 'metro', 'bus', 'airport', 'school', 'college'],
    nearby: [
        // IT & Industrial Hubs
        { type: 'itpark', name: 'Tambaram MEPZ IT Park', distance: '15 mins' },
        { type: 'itpark', name: 'Shriram IT Gateway', distance: '15 mins' },
        { type: 'itpark', name: 'DLF IT Park', distance: '20 mins' },
        { type: 'itpark', name: 'L&T', distance: '20 mins' },
        { type: 'itpark', name: 'Embassy Tech Park', distance: '20 mins' },
        { type: 'itpark', name: 'Ascendas Tech Park', distance: '20 mins' },
        { type: 'industrial', name: 'Irungattukottai Industrial Park', distance: '15 mins' },
        { type: 'industrial', name: 'Sriperumbudur Industrial Estate', distance: '20 mins' },
        { type: 'industrial', name: 'Oragadam Industrial Estate', distance: '30 mins' },

        // Transport Hubs
        { type: 'road', name: 'Outer Ring Road (ORR)', distance: '2 mins' },
        { type: 'metro', name: 'Upcoming Poonamallee Metro', distance: '10 mins' },
        { type: 'bus', name: 'New Vandalur Bus Terminal', distance: '15 mins' },
        { type: 'bus', name: 'New Kuthambakkam Bus Terminal', distance: '15 mins' },
        { type: 'airport', name: 'Chennai International Airport', distance: '20 mins' },

        // Schools
        { type: 'school', name: 'Madha Matriculation School', distance: '1.5 Km' },
        { type: 'school', name: 'Peter International CBSE School', distance: '1.5 Km' },

        // Colleges
        { type: 'college', name: 'Madha Engineering College', distance: '2 Km' },
    ],
    status: 'Ready to Move'
}, {
    id: 7,
    title: 'Tatia Township',
    description: 'DTCP & RERA Approved Villa Plots in Thalambur with clear titles and immediate registration.',
    image: tatia1, // replace with actual image import
    images: [tatia1, tatia2, tatia3, tatia4], // add actual images
    category: 'Plots',
    location: 'Thalambur, Chennai',
    price: '5,500 / sqft',

    amenities: [
        'DTCP & RERA Approved',
        'Clear Documents & Immediate Registration',
        'Commercial & Residential Villa Plots',
        'Total 6.5 Acres | 134+ Units',
        'Plot Sizes: 575 - 2600 sq.ft',
        'Bank Loan up to 85% (All Leading Banks)',
        'Gated Community',
        'Grand Entrance Arch',
        'Pedestrian Walkway',
        'Storm Water Drainage',
        'Black Top Roads',
        'Underground EB Facility',
        'Avenue Tree Plantation',
        'Multipurpose Hall',
        'Fully Lighted Campus',
        'CCTV & 24/7 Security'
    ],
    nearbydatas: ['road', 'itpark', 'school', 'college'],
    nearby: [
        // Location Highlights
        { type: 'road', name: 'Thalambur Junction', distance: '150 mtrs' },
        { type: 'road', name: 'Navallur', distance: '3.2 kms' },
        { type: 'area', name: 'Siruseri', distance: '1.2 kms' },
        { type: 'itpark', name: 'Siruseri IT Park', distance: '4 kms' },
        { type: 'road', name: 'Pudupakkam (Vandalur – Kelambakkam Road)', distance: '7 kms' },

        // Schools & Colleges
        { type: 'school', name: 'The School KFI', distance: 'Adjacent' },
        { type: 'school', name: 'Vels Vidhyasharam CBSE School', distance: '900 mtrs' },
        { type: 'college', name: 'Sri Venkateswara Nursing College', distance: '850 mtrs' },
        { type: 'college', name: 'Vels University - School of Maritime', distance: '900 mtrs' },
        { type: 'college', name: 'Agni College of Technology', distance: '1 km' },
        { type: 'school', name: 'KG High International School', distance: '4 kms' },
        { type: 'school', name: 'PSBB School, Siruseri', distance: '4 kms' }
    ],
    status: 'Ready to Move'
}, {
    id: 8,
    title: 'Adityaram Empire',
    description: 'DTCP & RERA Approved Villa Plots in Kelambakkam with 15.5 Acres of prime plotted development.',
    image: adityaram1, // replace with actual image import
    images: [adityaram1, adityaram2, adityaram3, adityaram4], // add actual images
    category: 'Plots',
    location: 'Kelambakkam, Chennai',
    price: '5,500 / sqft',

    amenities: [
        'DTCP & RERA Approved',
        '15.5 Acres of Plotted Development',
        'Gated Community with Ready-to-Construct Villa Plots',
        '268 Plots with Varied Sizes',
        '20+ World-Class Amenities',
        'Portable Sweet Water',
        'Black Top Roads',
        'Street Lighting',
        'CCTV Surveillance',
        'Children’s Play Area',
        'Walking & Jogging Tracks',
        'Clear Title & Legal Approvals'
    ],
    nearbydatas: ['road', 'itpark', 'college', 'bus'],
    nearby: [
        { type: 'road', name: 'Kelambakkam – Vandalur Road', distance: '500 mtrs' },
        { type: 'itpark', name: 'SIPCOT IT Park', distance: '10 mins' },
        { type: 'road', name: 'Kovalam – ECR', distance: '10 mins' },
        { type: 'college', name: 'SSN Engineering College', distance: 'Nearby' },
        { type: 'college', name: 'VIT Engineering College', distance: 'Nearby' },
        { type: 'bus', name: 'Kilambakkam Bus Terminus', distance: '15 mins' },
        { type: 'college', name: 'IIT Madras – New Campus', distance: '2.5 kms' }
    ],
    status: 'Ready to Move'
}, {
    id: 9,
    title: 'Urbanrise Codename The Game Changer',
    description: 'A residential project in Siruseri, Chennai, featuring premium 2 & 3 BHK apartments with a focus on luxury, sustainability, and community living',
    image: urbanrisegamechanger1,
    images: [urbanrisegamechanger1],
    category: 'Apartments',
    location: 'Siruseri, Chennai',
    price: '70 L - 74 L (Base Price)',
    status: 'Under Construction',
    amenities: ['Club House', 'Club House', 'Swimming Pool', 'Roof Top Amenities', ' Lawn Tennis', 'Amphitheatre', 'Play Court', 'Security Cabin', 'Gym', 'Mini Theatre', 'Cafe', 'Party Lawn', 'Play Ground', 'Jogging Path']
}
];

export const locationData: string[] = [
    "Medavakkam",
    "Tambaram",
    "Velachery",
    "Thoraipakkam",
    "Sholinganallur",
]
