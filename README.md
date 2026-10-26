Riyadvi Technologies — Website Revamp
A responsive, multi-page corporate website prototype for Riyadvi Technologies, with a black-and-gold visual system, service and case-study routes, blog and career detail pages, an interactive 3D hero, and Django/MySQL-backed lead forms.
Project status: Local development build. Live frontend/backend deployment is not configured yet. Verify every item marked to verify before submitting the assignment.

Features
- Multi-page React site with React Router.
- Black-and-gold responsive interface.
- Six reusable service detail routes: Web Development, App Development, Digital Marketing, AR/VR, 3D Modeling, and UI/UX Design.
- Portfolio listing and case-study detail pages for GlowBook, PriceWise, and Compliance Hub.
- Blog listing with article detail routes and thumbnail imagery.
- Careers listing with sample role detail pages. These are prototype descriptions, not confirmed vacancies.
- Three-dimensional golden sphere and orbit rings in the hero, responding to pointer movement.
- Business Health Checkup multi-step questionnaire and assessment results.
- Software Project Planning Guide with checklist progress, lead form, and downloadable PDF.
- Contact enquiry form.
- Django REST Framework API endpoints with MySQL-backed lead records.
Technology stack
Frontend
- React 19
- Vite 8
- React Router 7
- Three.js
- React Three Fiber (@react-three/fiber)
- Drei (@react-three/drei)
- GSAP and Motion are listed as dependencies; verify their actual use in source files before describing them as implemented animation technologies.
- Axios and Lucide React are installed dependencies.
Backend
- Python
- Django 5.2
- Django REST Framework
- django-cors-headers
- python-dotenv
- MySQL
Repository layout
riyadvi-revamp/
├── frontend/
│   ├── public/
│   │   └── software_project_planning_guide.pdf
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   ├── .env                 # local only; ignored by Git
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   ├── contact/
│   ├── healthcheck/
│   ├── planningguide/
│   ├── .env                 # local only; ignored by Git
│   └── manage.py
├── .gitattributes
├── .gitignore
└── README.md
Local setup
Run the frontend and backend in separate terminals.
1. MySQL database
Start MySQL and create the database if it does not already exist:
CREATE DATABASE riyadvi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
For a production deployment, use a dedicated database user with only the permissions the application needs; do not use MySQL's root account.
2. Backend environment
In PowerShell:
cd C:\Users\IIISI\riyadvi-revamp\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install Django==5.2.18 djangorestframework django-cors-headers mysqlclient python-dotenv
Create backend/.env locally. Do not commit it:
DJANGO_SECRET_KEY=replace_with_a_new_random_secret_key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=riyadvi_db
DB_USER=root
DB_PASSWORD=replace_with_your_local_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
Generate a Django key locally with:
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
Paste the generated value into DJANGO_SECRET_KEY in your local backend/.env. Never share or commit the actual value. For production, set DJANGO_DEBUG=False, configure the real host names, and use secure environment variables provided by the hosting platform.

Check the backend settings and apply migrations:
python manage.py check
python manage.py migrate
python manage.py runserver
The local API base URL is http://127.0.0.1:8000. Django CORS settings currently allow http://localhost:5173; update them for the deployed frontend origin before production.
3. Frontend environment
In a second PowerShell terminal:
cd C:\Users\IIISI\riyadvi-revamp\frontend
npm install
Create frontend/.env locally:
VITE_API_BASE_URL=http://127.0.0.1:8000
Then start Vite:
npm run dev
Open http://localhost:5173.

Useful frontend commands:
npm run build
npm run lint
npm run preview
Pages and routes
Page	Route
Home	/
Services	/services
Service detail	/services/:slug
Portfolio	/portfolio
Portfolio case study	/portfolio/:slug
About	/about
Blog	/blog
Blog article	/blog/:slug
Careers	/careers
Career detail	/careers/:job-slug
Contact	/contact
Business Health Checkup	/business-health-checkup
Software Project Planning Guide	/software-project-planning-guide


API endpoints
These local endpoints are implemented as POST endpoints. The Django REST Framework browsable API may show 405 Method Not Allowed for a browser GET request; that is expected for a create-only endpoint.
Method	Local endpoint	Purpose
POST	/api/contact/	Create a contact enquiry
POST	/api/business-health-checkup/	Save a business assessment
POST	/api/planning-guide/	Save a planning-guide lead


Local base URL: http://127.0.0.1:8000.

The forms have been manually tested during local development and returned successful responses with reference IDs. This does not yet constitute production deployment verification.
3D and animation implementation
The current Hero3D.jsx implementation confirms use of:
- Three.js — 3D geometry and materials.
- React Three Fiber — React renderer, <Canvas>, and frame updates.
- Drei — floating animation and MeshDistortMaterial.
- Pointer-reactive sphere rotation, animated orbit rings, metallic/gold materials, and supporting sphere geometry.
The project package also lists GSAP and Motion. Search the source code for their imports/usages and make sure they visibly contribute to the experience before counting them as implemented technologies. Assignment evaluation requires meaningful implementation, not dependency installation alone. Also verify the assignment's requirement for interactive visual experiences on at least three major sections/pages; the current confirmed evidence here is the home hero.
AI tools used
ChatGPT
- Purpose: Development assistance for planning, React component updates, API wiring, debugging, CSS refinements, and documentation planning.
- Representative prompt: “Help me build and debug a premium, responsive black-and-gold multi-page React website with Django REST Framework APIs and MySQL lead storage; explain the changes and preserve existing functionality.”
- Assisted output: Code suggestions and explanations for page components, blog thumbnails, environment-variable setup, Django configuration debugging, and Git safety checks.
- Manual changes and verification: The developer applied changes in VS Code, inspected and corrected code, ran Django checks, launched Vite, navigated routes, and tested the contact, business health checkup, and planning guide submissions locally.
- Why selected: Interactive troubleshooting and step-by-step explanations help iterate on the existing codebase and understand the changes.
This prompt is representative documentation, not a verbatim transcript. Add any other AI tools actually used and describe their real contributions; do not claim tools that were not used.
Third-party assets
- Blog thumbnails load from images.unsplash.com URLs in the blog data. Confirm the image source/license and any attribution requirements for the intended production use.
- Icons are provided by Lucide React.
- Three.js, React Three Fiber, and Drei provide the 3D rendering utilities.
- The project includes public/software_project_planning_guide.pdf as a downloadable resource.
Performance and accessibility considerations
- Blog thumbnail <img> elements use lazy loading.
- Vite provides a production build (npm run build).
- Hero 3D canvas uses a capped device-pixel ratio (dpr={[1, 1.5]}) and transparent antialiased rendering.
- Forms use native required-field and input-type validation and expose status messages where implemented.
To verify before submission: run npm run build and npm run lint; test at mobile/tablet/desktop widths; inspect Lighthouse performance and accessibility; confirm reduced-motion/mobile fallback strategy for the 3D hero; and verify all images load.
Known limitations / items to finish
- The site has not yet been deployed; production frontend and backend URLs are pending.
- The online GitHub repository and meaningful commit history are pending.
- Replace the starter README with this project-specific documentation, then review and update it as implementation changes.
- Confirm GSAP and Motion source usage and ensure at least four listed animation/3D technologies are meaningfully implemented.
- Audit meaningful 3D/interactive experiences across at least three major sections/pages.
- Careers content is sample role content, not a verified vacancy feed. A complete application form, resume handling, and backend persistence still need to be confirmed/implemented.
- The contact form currently does not include a phone field; compare the form against the assignment's contact-field requirements.
- Official business email, telephone, and location details have not been confirmed in the contact page content.
- A custom admin dashboard and email notifications/other contact integrations have not been verified.
- Verify backend validation, error handling, security settings, database permissions, and CORS/allowed hosts for production.
Deployment
Deployment is pending. The assignment requires a live frontend (Vercel is suggested) and a live backend/API (Render, Railway, or another suitable host).

Before publishing:
1. Provision a production MySQL database and restricted database user.
2. Set the production Django secret key and database credentials through the hosting provider's environment settings, not committed files.
3. Set DJANGO_DEBUG=False, production DJANGO_ALLOWED_HOSTS, and the deployed frontend origin in CORS configuration.
4. Set VITE_API_BASE_URL to the deployed backend base URL and rebuild the frontend.
5. Run database migrations and test the three forms against the live API.
6. Add the actual deployment URLs here only after deployment succeeds.
   - Frontend URL: Pending deployment
   - Backend/API URL: Pending deployment
Future improvements
- Finish the required 3D/animation experiences across multiple pages and improve mobile fallback/performance.
- Add a dynamic content source or CMS integration for blog articles, services, portfolio case studies, and careers.
- Add a full careers application workflow with resume upload and backend persistence.
- Add an admin interface for viewing and managing leads and applications.
- Add email notifications and production monitoring/logging.
- Complete accessibility, Lighthouse, security, and cross-device testing.