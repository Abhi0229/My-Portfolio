// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
        this.charArray = this.chars.split('');
        this.fontSize = 14;
        this.drops = [];

        this.init();
        this.animate();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const columns = this.canvas.width / this.fontSize;

        for(let x = 0; x < columns; x++) {
            this.drops[x] = 1;
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = this.fontSize + 'px monospace';

        for(let i = 0; i < this.drops.length; i++) {
            const text = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Typing Effect
class TypeWriter {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.currentText = '';

        this.type();
    }

    type() {
        const current = this.textIndex % this.texts.length;
        const fullText = this.texts[current];

        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.currentText = fullText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        this.element.innerHTML = this.currentText;

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === fullText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Terminal Command Simulation
class TerminalSimulator {
    constructor() {
        this.commandElement = document.getElementById('typing-command');
        this.outputElement = document.getElementById('typing-output');
        this.commands = [
            'whoami',
            'cat about.txt',
            'ls skills/',
            'git status'
        ];
        this.responses = {
            'whoami': 'abhishekh_yadav',
            'cat about.txt': '👨‍💻 I\'m Abhishekh Yadav, a 3rd-year IT student passionate about tech, design, and building smart digital solutions. Always exploring new tools, breaking things, and learning faster than ever.',
            'ls skills/': 'c_language.exe\njava.class\npython.py\nhtml.html\ngit.config\ncss.stylesheet',
            'git status': 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean'
        };
        this.currentCommand = 0;

        this.startSimulation();
    }

    async startSimulation() {
        for(let i = 0; i < this.commands.length; i++) {
            await this.typeCommand(this.commands[i]);
            await this.showOutput(this.responses[this.commands[i]]);
            await this.delay(2000);
        }
        this.startHeroTyping();
    }

    typeCommand(command) {
        return new Promise(resolve => {
            let i = 0;
            const typing = setInterval(() => {
                this.commandElement.textContent = command.slice(0, i);
                i++;
                if(i > command.length) {
                    clearInterval(typing);
                    resolve();
                }
            }, 100);
        });
    }

    showOutput(output) {
        return new Promise(resolve => {
            this.outputElement.textContent = output;
            setTimeout(resolve, 1000);
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    startHeroTyping() {
        const heroDescription = document.getElementById('hero-description');
        const description = "👨‍💻 I'm Abhishekh Yadav, a 3rd-year IT student passionate about tech, design, and building smart digital solutions. Always exploring new tools, breaking things, and learning faster than ever.";

        new TypeWriter(heroDescription, description, 50);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');

                    // Animate skill bars
                    if(entry.target.classList.contains('skill-card')) {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        const width = progressBar.getAttribute('data-width');
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 500);
                    }
                }
            });
        }, observerOptions);

        // Observe skill cards and project cards
        document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// Chatbot
class Chatbot {
    constructor() {
        this.chatbot = document.getElementById('chatbot');
        this.trigger = document.getElementById('chatbot-trigger');
        this.toggle = document.getElementById('chatbot-toggle');
        this.input = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-message');
        this.messages = document.getElementById('chat-messages');

        this.responses = {
            'hello': 'Hello! I\'m Abhishekh\'s AI assistant. How can I help you?',
            'hi': 'Hi there! What would you like to know about Abhishekh?',
            'projects': 'Abhishekh has worked on MediTrack (medical tracker) and MoneyMap (finance tracker). Both focus on user experience and practical solutions.',
            'skills': 'Abhishekh knows C (basic), Java (little bit), Python (little bit), HTML (good knowledge), Git (basic), and CSS (very little).',
            'contact': 'You can reach Abhishekh at abhishekhyadav292619@gmail.com or call +91 9619115121',
            'github': 'Check out his GitHub: https://github.com/Abhi0229',
            'linkedin': 'Connect on LinkedIn: https://www.linkedin.com/in/abhishekh-yadav-aa3b25272',
            'education': 'Abhishekh is currently a 3rd-year IT student.',
            'about': 'Abhishekh is passionate about tech, design, and building smart digital solutions. Always exploring new tools and learning!',
            'default': 'I\'m not sure about that. Try asking about his projects, skills, contact info, or education!'
        };

        this.init();
    }

    init() {
        this.trigger.addEventListener('click', () => this.toggleChatbot());
        this.toggle.addEventListener('click', () => this.toggleChatbot());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChatbot() {
        if(this.chatbot.style.display === 'none' || !this.chatbot.style.display) {
            this.chatbot.style.display = 'flex';
            this.trigger.style.display = 'none';
        } else {
            this.chatbot.style.display = 'none';
            this.trigger.style.display = 'block';
        }
    }

    sendMessage() {
        const message = this.input.value.trim().toLowerCase();
        if(!message) return;

        this.addMessage(this.input.value, 'user');
        this.input.value = '';

        setTimeout(() => {
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        if(sender === 'bot') {
            messageDiv.innerHTML = `<span class="prompt">assistant@help:~$</span> ${text}`;
        } else {
            messageDiv.innerHTML = `<span class="prompt">user@query:~$</span> ${text}`;
        }

        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    getResponse(message) {
        for(let key in this.responses) {
            if(message.includes(key)) {
                return this.responses[key];
            }
        }
        return this.responses.default;
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if(href && href !== '#') {
                    const target = document.querySelector(href);
                    if(target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    new MatrixRain();

    // Initialize Terminal Simulator
    new TerminalSimulator();

    // Initialize Scroll Animations
    new ScrollAnimations();

    // Initialize Chatbot
    new Chatbot();

    // Initialize Smooth Scrolling
    initSmoothScrolling();

    // Handle window resize for matrix rain
    window.addEventListener('resize', () => {
        const canvas = document.getElementById('matrix-rain');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

// Add some fun console messages
console.log(`
%c╔══════════════════════════════════════╗
║        ABHISHEKH'S PORTFOLIO         ║
║                                      ║
║  🔥 Hacker Terminal Theme Activated  ║
║  🚀 All Systems Online               ║
║  💻 Ready for Exploration            ║
╚══════════════════════════════════════╝
`, 'color: #00ff41; font-family: monospace; font-size: 12px;');

console.log('%cWelcome to the Matrix! 🔴💊', 'color: #ff0080; font-size: 16px; font-weight: bold;');
console.log('%cType "help" in the chatbot for assistance!', 'color: #00d4ff; font-size: 14px;');