export interface LabStep {
  id: number
  type: "terminal" | "web-login" | "code-injection" | "multiple-choice" | "input"
  title: string
  description: string
  points: number
  completed: boolean
  data: any
}

export interface LabMission {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  duration: string
  teamType: "Red Team" | "Blue Team" | "Both"
  points: number
  participants: number
  category: string
  steps: LabStep[]
}

export const labMissions: LabMission[] = [
  {
    id: 1,
    title: "SQL Injection Attack",
    description: "Practice identifying and exploiting SQL injection vulnerabilities in a web application.",
    difficulty: "Medium",
    duration: "45 min",
    teamType: "Red Team",
    points: 150,
    participants: 234,
    category: "Web Security",
    steps: [
      {
        id: 1,
        type: "web-login",
        title: "Exploit Login Form",
        description: "Bypass the authentication using SQL injection",
        points: 75,
        completed: false,
        data: {
          vulnerability: "sqli",
          expectedPayload: "' OR 1=1 --"
        }
      },
      {
        id: 2,
        type: "terminal",
        title: "Extract Database",
        description: "Use sqlmap to extract database information",
        points: 75,
        completed: false,
        data: {
          prompt: "root@kali:~# Connected to target database",
          expectedCommands: ["sqlmap", "SELECT * FROM users", "--dump"],
          successResponse: "Database dumped successfully! Found 1337 user records."
        }
      }
    ]
  },
  {
    id: 2,
    title: "Cross-Site Scripting (XSS)",
    description: "Learn to identify and exploit XSS vulnerabilities in web applications.",
    difficulty: "Easy",
    duration: "30 min",
    teamType: "Red Team",
    points: 100,
    participants: 456,
    category: "Web Security",
    steps: [
      {
        id: 3,
        type: "code-injection",
        title: "Reflected XSS Attack",
        description: "Inject malicious JavaScript code into the search functionality",
        points: 50,
        completed: false,
        data: {
          targetCode: `// Vulnerable search function
function search(query) {
  document.getElementById('results').innerHTML = 
    '<h3>Results for: ' + query + '</h3>';
}`,
          expectedPayload: "<script>alert('XSS')</script>",
          vulnerability: "xss"
        }
      },
      {
        id: 4,
        type: "multiple-choice",
        title: "XSS Prevention",
        description: "Identify the best method to prevent XSS attacks",
        points: 50,
        completed: false,
        data: {
          question: "Which is the most effective way to prevent XSS attacks?",
          options: [
            "Input validation only",
            "Output encoding and Content Security Policy",
            "Using HTTPS",
            "Disabling JavaScript"
          ],
          correct: 1
        }
      }
    ]
  },
  {
    id: 3,
    title: "Network Penetration Test",
    description: "Conduct a comprehensive penetration test on a corporate network infrastructure.",
    difficulty: "Hard",
    duration: "3 hours",
    teamType: "Red Team",
    points: 500,
    participants: 89,
    category: "Network Security",
    steps: [
      {
        id: 5,
        type: "terminal",
        title: "Network Discovery",
        description: "Scan the target network to discover active hosts",
        points: 150,
        completed: false,
        data: {
          prompt: "root@kali:~# Starting network reconnaissance",
          expectedCommands: ["nmap", "-sn", "192.168.1.0/24"],
          successResponse: "Scan complete. Found 12 active hosts on network."
        }
      },
      {
        id: 6,
        type: "terminal",
        title: "Service Enumeration",
        description: "Identify running services on discovered hosts",
        points: 150,
        completed: false,
        data: {
          prompt: "root@kali:~# Enumerating services on 192.168.1.100",
          expectedCommands: ["nmap", "-sV", "-p-"],
          successResponse: "Open ports: 22/ssh, 80/http, 443/https, 3389/rdp"
        }
      },
      {
        id: 7,
        type: "code-injection",
        title: "Remote Code Execution",
        description: "Exploit a command injection vulnerability",
        points: 200,
        completed: false,
        data: {
          targetCode: `// Vulnerable ping function
function ping(host) {
  exec('ping -c 4 ' + host, callback);
}`,
          expectedPayload: "; cat /etc/passwd",
          vulnerability: "command-injection"
        }
      }
    ]
  },
  {
    id: 4,
    title: "Incident Response Simulation",
    description: "Respond to a simulated security breach and contain the threat using proper procedures.",
    difficulty: "Hard",
    duration: "2 hours",
    teamType: "Blue Team",
    points: 300,
    participants: 187,
    category: "Incident Response",
    steps: [
      {
        id: 8,
        type: "multiple-choice",
        title: "Incident Classification",
        description: "Classify the severity of the security incident",
        points: 100,
        completed: false,
        data: {
          question: "A user reports their computer is running slowly and showing pop-ups. What's the likely incident type?",
          options: [
            "Phishing attack",
            "Malware infection",
            "DDoS attack",
            "Insider threat"
          ],
          correct: 1
        }
      },
      {
        id: 9,
        type: "terminal",
        title: "Forensic Analysis",
        description: "Analyze system logs to identify the attack vector",
        points: 100,
        completed: false,
        data: {
          prompt: "analyst@soc:~# Analyzing suspicious network traffic",
          expectedCommands: ["grep", "malware", "tcpdump", "wireshark"],
          successResponse: "Identified malicious C2 communication to 185.234.72.45"
        }
      },
      {
        id: 10,
        type: "input",
        title: "Incident Report",
        description: "Document your findings and recommended actions",
        points: 100,
        completed: false,
        data: {
          placeholder: "Describe the incident, impact, and remediation steps...",
          minLength: 100,
          keywords: ["malware", "containment", "remediation", "timeline"]
        }
      }
    ]
  }
]

// Import and merge enhanced missions
import { enhancedMissions } from "./enhancedMissions"

// Export combined missions
export const allMissions = [...labMissions, ...enhancedMissions]
