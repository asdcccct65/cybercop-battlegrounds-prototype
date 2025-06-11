
import { LabMission } from "./labMissions"

export const enhancedMissions: LabMission[] = [
  {
    id: 5,
    title: "Cross-Site Scripting (XSS) Mastery",
    description: "Master advanced XSS techniques including DOM-based and stored XSS attacks in modern web applications.",
    difficulty: "Medium",
    duration: "60 min",
    teamType: "Red Team",
    points: 200,
    participants: 156,
    category: "Advanced Web Security",
    steps: [
      {
        id: 11,
        type: "web-login",
        title: "Reflected XSS Exploitation",
        description: "Exploit a reflected XSS vulnerability in the search function",
        points: 50,
        completed: false,
        data: {
          vulnerability: "xss-reflected",
          expectedPayload: "<script>alert('XSS')</script>"
        }
      },
      {
        id: 12,
        type: "code-injection",
        title: "DOM-Based XSS Attack",
        description: "Inject malicious JavaScript through DOM manipulation",
        points: 75,
        completed: false,
        data: {
          targetCode: `// Vulnerable DOM manipulation
function updatePage(userInput) {
  document.getElementById('content').innerHTML = userInput;
}`,
          expectedPayload: "<img src=x onerror=alert('DOM-XSS')>",
          vulnerability: "dom-xss"
        }
      },
      {
        id: 13,
        type: "terminal",
        title: "XSS Cookie Theft",
        description: "Use XSS to steal session cookies",
        points: 75,
        completed: false,
        data: {
          prompt: "attacker@kali:~# Setting up cookie theft payload",
          expectedCommands: ["document.cookie", "fetch", "btoa"],
          successResponse: "Session cookie successfully extracted: JSESSIONID=ABC123..."
        }
      }
    ]
  },
  {
    id: 6,
    title: "DNS Spoofing Attack",
    description: "Learn to intercept and redirect DNS queries to malicious servers in a controlled environment.",
    difficulty: "Hard",
    duration: "90 min",
    teamType: "Red Team",
    points: 300,
    participants: 67,
    category: "Network Attacks",
    steps: [
      {
        id: 14,
        type: "terminal",
        title: "DNS Cache Poisoning",
        description: "Poison the DNS cache to redirect traffic",
        points: 100,
        completed: false,
        data: {
          prompt: "root@attacker:~# Starting DNS spoofing attack",
          expectedCommands: ["ettercap", "dnsmasq", "iptables"],
          successResponse: "DNS cache poisoned. Target redirected to 192.168.1.200"
        }
      },
      {
        id: 15,
        type: "multiple-choice",
        title: "DNS Security Assessment",
        description: "Identify DNS security weaknesses",
        points: 100,
        completed: false,
        data: {
          question: "Which DNS record type is most vulnerable to spoofing attacks?",
          options: [
            "A records (IPv4 addresses)",
            "MX records (Mail exchange)",
            "NS records (Name servers)",
            "TXT records (Text data)"
          ],
          correct: 0
        }
      },
      {
        id: 16,
        type: "terminal",
        title: "Traffic Interception",
        description: "Intercept and analyze redirected traffic",
        points: 100,
        completed: false,
        data: {
          prompt: "root@attacker:~# Analyzing intercepted traffic",
          expectedCommands: ["wireshark", "tcpdump", "grep"],
          successResponse: "Captured 247 packets, including login credentials"
        }
      }
    ]
  },
  {
    id: 7,
    title: "Brute Force Attack Prevention",
    description: "Implement and test various brute force protection mechanisms against automated attacks.",
    difficulty: "Medium",
    duration: "45 min",
    teamType: "Red Team",
    points: 180,
    participants: 203,
    category: "Authentication Security",
    steps: [
      {
        id: 17,
        type: "terminal",
        title: "Password Brute Force",
        description: "Execute a brute force attack against a login system",
        points: 60,
        completed: false,
        data: {
          prompt: "attacker@kali:~# Launching brute force attack",
          expectedCommands: ["hydra", "john", "rockyou.txt"],
          successResponse: "Password found: admin123 (attempt 1247/10000)"
        }
      },
      {
        id: 18,
        type: "multiple-choice",
        title: "Rate Limiting Implementation",
        description: "Choose the best rate limiting strategy",
        points: 60,
        completed: false,
        data: {
          question: "What's the most effective brute force protection method?",
          options: [
            "CAPTCHA after 3 failed attempts",
            "Account lockout for 24 hours",
            "Progressive delay with exponential backoff",
            "IP blocking after 5 attempts"
          ],
          correct: 2
        }
      },
      {
        id: 19,
        type: "input",
        title: "Security Report",
        description: "Document the brute force vulnerabilities found",
        points: 60,
        completed: false,
        data: {
          placeholder: "Describe the attack vectors and countermeasures...",
          minLength: 150,
          keywords: ["rate limiting", "account lockout", "monitoring", "alerting"]
        }
      }
    ]
  },
  {
    id: 8,
    title: "Advanced Log Analysis",
    description: "Analyze complex security logs to identify sophisticated attack patterns and anomalies.",
    difficulty: "Hard",
    duration: "75 min",
    teamType: "Blue Team",
    points: 280,
    participants: 91,
    category: "Security Operations",
    steps: [
      {
        id: 20,
        type: "terminal",
        title: "Log Parsing and Filtering",
        description: "Extract relevant security events from system logs",
        points: 100,
        completed: false,
        data: {
          prompt: "analyst@soc:~# Analyzing security logs from the past 24 hours",
          expectedCommands: ["grep", "awk", "sort", "uniq"],
          successResponse: "Found 23 suspicious login attempts from 5 different IP addresses"
        }
      },
      {
        id: 21,
        type: "multiple-choice",
        title: "Attack Pattern Recognition",
        description: "Identify the attack pattern from log entries",
        points: 90,
        completed: false,
        data: {
          question: "Based on these log entries, what type of attack is occurring?\n\n10:15:23 Failed login: admin from 203.0.113.1\n10:15:24 Failed login: administrator from 203.0.113.1\n10:15:25 Failed login: root from 203.0.113.1",
          options: [
            "SQL Injection attack",
            "Brute force authentication attack",
            "Cross-site scripting",
            "DNS poisoning"
          ],
          correct: 1
        }
      },
      {
        id: 22,
        type: "terminal",
        title: "Threat Intelligence Correlation",
        description: "Correlate findings with threat intelligence feeds",
        points: 90,
        completed: false,
        data: {
          prompt: "analyst@soc:~# Checking IP reputation databases",
          expectedCommands: ["curl", "whois", "nslookup"],
          successResponse: "IP 203.0.113.1 flagged as malicious in 3/5 threat feeds"
        }
      }
    ]
  },
  {
    id: 9,
    title: "Threat Hunting Expedition",
    description: "Proactively hunt for advanced persistent threats (APTs) hiding in enterprise networks.",
    difficulty: "Hard",
    duration: "2 hours",
    teamType: "Blue Team",
    points: 350,
    participants: 42,
    category: "Advanced Defense",
    steps: [
      {
        id: 23,
        type: "terminal",
        title: "Baseline Network Analysis",
        description: "Establish normal network behavior patterns",
        points: 120,
        completed: false,
        data: {
          prompt: "hunter@soc:~# Analyzing network traffic baselines",
          expectedCommands: ["netstat", "ss", "iftop", "ntopng"],
          successResponse: "Baseline established: 2.3GB/hour average traffic, 1,247 active connections"
        }
      },
      {
        id: 24,
        type: "multiple-choice",
        title: "APT Indicator Recognition",
        description: "Identify potential APT indicators",
        points: 115,
        completed: false,
        data: {
          question: "Which indicator suggests an Advanced Persistent Threat?",
          options: [
            "Single failed login attempt",
            "Regular outbound traffic to known CDN",
            "Encrypted traffic during off-hours to unknown domains",
            "High CPU usage during business hours"
          ],
          correct: 2
        }
      },
      {
        id: 25,
        type: "terminal",
        title: "Memory Forensics",
        description: "Analyze system memory for malicious artifacts",
        points: 115,
        completed: false,
        data: {
          prompt: "hunter@soc:~# Performing memory dump analysis",
          expectedCommands: ["volatility", "strings", "hexdump"],
          successResponse: "Suspicious process found: svchost.exe communicating with 185.34.72.89"
        }
      }
    ]
  },
  {
    id: 10,
    title: "Network Packet Analysis",
    description: "Master deep packet inspection and network forensics to uncover hidden communication channels.",
    difficulty: "Medium",
    duration: "50 min",
    teamType: "Blue Team",
    points: 220,
    participants: 134,
    category: "Network Forensics",
    steps: [
      {
        id: 26,
        type: "terminal",
        title: "Packet Capture Setup",
        description: "Configure network monitoring and packet capture",
        points: 75,
        completed: false,
        data: {
          prompt: "analyst@soc:~# Setting up packet capture on eth0",
          expectedCommands: ["tcpdump", "wireshark", "tshark"],
          successResponse: "Packet capture initiated: monitoring 192.168.1.0/24 network"
        }
      },
      {
        id: 27,
        type: "multiple-choice",
        title: "Protocol Analysis",
        description: "Identify suspicious network protocols",
        points: 70,
        completed: false,
        data: {
          question: "Which network protocol is commonly abused for data exfiltration?",
          options: [
            "HTTP/HTTPS",
            "DNS",
            "ICMP",
            "All of the above"
          ],
          correct: 3
        }
      },
      {
        id: 28,
        type: "terminal",
        title: "Traffic Decryption",
        description: "Decrypt and analyze suspicious encrypted traffic",
        points: 75,
        completed: false,
        data: {
          prompt: "analyst@soc:~# Analyzing encrypted traffic patterns",
          expectedCommands: ["openssl", "ssldump", "ettercap"],
          successResponse: "TLS handshake anomaly detected: potential certificate pinning bypass"
        }
      }
    ]
  }
]
