from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 14)
        self.cell(0, 10, 'Harshit Pal', ln=True, align='C')
        self.set_font('Arial', '', 10)
        self.cell(0, 5, 'Email: harshitpal175786@gmail.com | Phone: +91-6306681521', ln=True, align='C')
        self.cell(0, 5, 'GitHub: github.com/harshitpal175786 | LinkedIn: linkedin.com/in/harshitpal01', ln=True, align='C')
        self.ln(5)

    def chapter_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.set_text_color(0, 0, 128)
        self.cell(0, 6, title, ln=True)
        self.ln(2)

    def chapter_body(self, body):
        self.set_font('Arial', '', 11)
        self.set_text_color(0, 0, 0)
        for line in body.split('\n'):
            self.multi_cell(0, 5, line)
        self.ln()

pdf = PDF()
pdf.add_page()

pdf.chapter_title('Professional Summary')
pdf.chapter_body('Motivated Computer Science student passionate about open source, Linux, and collaborative software development. Skilled in problem-solving, scripting, and building web projects. Experienced in community leadership through GDG Kanpur and active in open-source contributions. Eager to learn, contribute, and grow in mentorship and internship opportunities.')

pdf.chapter_title('Skills')
pdf.chapter_body('Programming: Python, C++, Java, JavaScript (ES6+), Rust (beginner)\nTools & Platforms: Git, GitHub, Linux (bash, shell scripting), VS Code\nWeb Development: HTML, CSS, JavaScript, React (beginner), Node.js basics\nOpen Source: Pull requests, issue triaging, documentation improvements, GitHub collaboration')

pdf.chapter_title('Education')
pdf.chapter_body('B.Tech in Computer Science & Engineering – AKTU University, India\nExpected Graduation: 2027')

pdf.chapter_title('Projects')
pdf.chapter_body('Linux Automation Scripts (2024) – Built shell scripts for file organization and log monitoring, improving efficiency by ~30%.\nPortfolio Website (2024) – Designed and deployed a responsive personal portfolio using HTML, CSS, and JavaScript.\nOpen Source Contributions (2024 – Present) – Submitted bug fixes, documentation improvements, and patches to beginner-friendly repositories.')

pdf.chapter_title('Community & Open Source')
pdf.chapter_body('Team Head, GDG Kanpur Volunteer Team (2024 – Present) – Coordinated developer events, managed volunteer teams, and fostered community collaboration.\nVolunteer, FOSS United Kanpur Meetup (2025) – Supported event organization, mentored beginners in Git/GitHub setup, and promoted open-source culture.\nActive contributor in GitHub discussions, issue triaging, and collaborative projects.')

pdf.chapter_title('Extracurriculars')
pdf.chapter_body('Tech blogger writing beginner-friendly guides on Git, GitHub, and Linux basics.\nMember of college coding club; organized peer learning sessions on Python, DSA, and open-source workflows.\nHackathon participant; collaborated on small web apps and automation tools.')

pdf.output('/mnt/data/Harshit_Pal_Resume.pdf')