import { db } from './db.js'

console.log('Seeding database...')

db.exec('DELETE FROM events')
db.exec('DELETE FROM news')
db.exec('DELETE FROM resources')
db.exec('DELETE FROM site_stats')

const insertEvent = db.prepare(`
  INSERT INTO events (title, description, event_date, event_time, location, event_type, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`)

insertEvent.run(
  'JAMB 2026 Registration Opens',
  'Registration for JAMB 2026/2027 academic session is now open. Visit our center with your O-Level results and national ID.',
  '2026-01-15',
  '08:00',
  'Owerri CBT HI-TECH, New Owerri',
  'registration',
  'upcoming'
)

insertEvent.run(
  'CBT Practice Session — Free',
  'Free CBT practice session for all registered JAMB candidates. Get familiar with the exam interface before the real thing.',
  '2026-02-20',
  '10:00',
  'Owerri CBT HI-TECH, New Owerri',
  'training',
  'upcoming'
)

insertEvent.run(
  'JAMB Mock Examination',
  'Mock examination simulating the actual JAMB CBT format. Includes all four subjects.',
  '2026-03-01',
  '09:00',
  'Owerri CBT HI-TECH, New Owerri',
  'exam',
  'upcoming'
)

insertEvent.run(
  'Computer Basics Workshop',
  'Introductory workshop covering computer basics, typing, and internet skills. Open to all ages.',
  '2026-03-15',
  '14:00',
  'Owerri CBT HI-TECH, New Owerri',
  'training',
  'upcoming'
)

const insertNews = db.prepare(`
  INSERT INTO news (title, slug, summary, content, category, published_at)
  VALUES (?, ?, ?, ?, ?, ?)
`)

insertNews.run(
  'JAMB 2026 Date Announced',
  'jamb-2026-date-announced',
  'JAMB has officially announced the examination dates for the 2026/2027 academic session.',
  `The Joint Admissions and Matriculation Board (JAMB) has officially announced that the 2026/2027 Unified Tertiary Matriculation Examination (UTME) will hold from March 14 to April 15, 2026.\n\nCandidates are advised to begin their preparations early and ensure they complete their registration before the deadline.\n\nOur center offers comprehensive CBT practice sessions to help you ace the exam. Visit us at New Owerri for registration and practice.`,
  'jamb',
  '2025-12-01'
)

insertNews.run(
  'New CBT Lab Upgrade Complete',
  'new-cbt-lab-upgrade',
  'We have upgraded our computer lab with new systems and faster internet for a better exam experience.',
  `Owerri CBT HI-TECH is pleased to announce the completion of a major upgrade to our computer-based testing laboratory.\n\nKey improvements include:\n- 24 new high-performance desktop computers\n- Upgraded internet connectivity (100Mbps fiber)\n- New ergonomic seating and improved lighting\n- Updated exam simulation software\n\nThese upgrades ensure our candidates get the most realistic CBT experience possible. Book your practice session today.`,
  'center',
  '2025-11-15'
)

insertNews.run(
  'Post-UTME Preparation Tips',
  'post-utme-preparation-tips',
  'Essential tips to help you prepare for Post-UTME examinations after your JAMB result.',
  `After your JAMB examination, the next hurdle is the Post-UTME screening conducted by individual universities. Here are some tips:\n\n1. Start early — don't wait for JAMB results\n2. Review your O-Level subjects thoroughly\n3. Practice with our CBT platform for computer-based Post-UTME\n4. Research your chosen university's specific requirements\n5. Stay updated on screening dates and requirements\n\nVisit our center for dedicated Post-UTME preparation sessions.`,
  'jamb',
  '2025-10-20'
)

const insertResource = db.prepare(`
  INSERT INTO resources (title, description, content, resource_type, href)
  VALUES (?, ?, ?, ?, ?)
`)

insertResource.run(
  'Getting Started Guide',
  'Everything you need to know about registering for JAMB and using our CBT center.',
  `Welcome to Owerri CBT HI-TECH! Here's how to get started:\n\n1. Visit our center at New Owerri with your documents\n2. Complete your JAMB registration with our staff\n3. Schedule a CBT practice session\n4. Take advantage of our study materials\n\nRequired documents:\n- O-Level results (WAEC/NECO)\n- National ID or birth certificate\n- Passport photographs`,
  'guide',
  '#getting-started'
)

insertResource.run(
  'Helpful Articles',
  'Collection of articles on exam preparation, study tips, and educational guidance.',
  `Browse our collection of articles designed to help you succeed:\n\n- How to Score Above 300 in JAMB\n- Best Study Strategies for CBT Exams\n- Understanding JAMB Subject Combinations\n- Top Universities in Nigeria and Their Cut-Off Marks\n- How to Write a Winning Post-UTME`,
  'articles',
  '#articles'
)

insertResource.run(
  'Frequently Asked Questions',
  'Answers to the most common questions from our students and parents.',
  `Q: How much does JAMB registration cost?\nA: JAMB registration fee is ₦4,700. Our service fee covers the full registration process and CBT practice.\n\nQ: Do I need to bring my own laptop?\nA: No, our center is fully equipped with computers for practice and examinations.\n\nQ: How many practice sessions can I book?\nA: You can book as many sessions as you need. We recommend at least 3-5 sessions before the exam.\n\nQ: Do you offer Post-UTME preparation?\nA: Yes, we offer dedicated Post-UTME preparation sessions covering aptitude tests and subject-specific reviews.`,
  'faq',
  '#faq'
)

const insertStat = db.prepare(`
  INSERT INTO site_stats (stat_key, stat_value, label)
  VALUES (?, ?, ?)
`)

insertStat.run('reviews', '38+', 'Google Reviews')
insertStat.run('registration_time', '5 min', 'Fast Registration')
insertStat.run('years_experience', '10+', 'Years of Service')
insertStat.run('students_served', '5000+', 'Students Served')
insertStat.run('pass_rate', '95%', 'JAMB Pass Rate')

console.log('Database seeded successfully!')
console.log('  - 4 events')
console.log('  - 3 news articles')
console.log('  - 3 resources')
console.log('  - 5 site stats')
