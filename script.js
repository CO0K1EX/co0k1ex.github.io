const leetcodeUsername = "co0k1ex";
const githubUsername = "CO0K1EX";

const terminal = document.getElementById("terminal");

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function printLine(text, delay = 30) {
    return new Promise(resolve => {
        const div = document.createElement("div");
        div.className = "line";
        terminal.appendChild(div);

        let i = 0;
        function type() {
            if (i < text.length) {
                div.textContent += text[i++];
                setTimeout(type, delay);
            } else {
                resolve();
            }
        }
        type();
    });
}

function printPrompt(text) {
    const div = document.createElement("div");
    div.className = "line prompt";
    div.textContent += text;
    terminal.appendChild(div);
}

function link(text, url) {
  const div = document.createElement("div");
  div.className = "line";

  const span = document.createElement("span");
  span.className = "cmd-link";
  span.textContent = text;
  span.onclick = () => window.open(url, "_blank");

  div.appendChild(span);
  terminal.appendChild(div);
}

async function loadLeetCode() {
    try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
    const data = await res.json();

    await printLine(`✔ Solved: ${data.totalSolved}`);
    await printLine(`🟢 Easy: ${data.easySolved}`);
    await printLine(`🟡 Medium: ${data.mediumSolved}`);
    await printLine(`🔴 Hard: ${data.hardSolved}`);
    await printLine(`🏆 Ranking: ${data.ranking}`);
    }
    catch {
        await printLine("Failed to load LeetCode stats");
    }
}

async function loadGitHubProjects(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`);
    const repos = await res.json();

    const filtered = repos
      .filter(r => !r.fork)
      .slice(0, 5); // показываем 5 последних проектов

    for (const repo of filtered) {
      const line = document.createElement("div");
      line.className = "line";

      const span = document.createElement("span");
      span.className = "cmd-link";
      span.textContent = `📁 ${repo.name}`;
      span.onclick = () => window.open(repo.html_url, "_blank");

      line.appendChild(span);
      terminal.appendChild(line);

      if (repo.description) {
        await printLine(`   ${repo.description}`);
      }

      await printLine("");
    }
  } catch {
    await printLine("Failed to load GitHub repositories");
  }
}

async function statusLine(text, duration = 1200) {
  const div = document.createElement("div");
  div.className = "line";
  terminal.appendChild(div);

  const start = Date.now();

  while (Date.now() - start < duration) {
    for (let i = 0; i < 4; i++) {
      div.textContent = text + ".".repeat(i);
      await sleep(250);
    }
  }

  div.textContent = text + "... done";
}

async function revealLine(text) {
  await sleep(120);
  await printLine(text, 18); // медленнее = плавнее
}

async function boot() {
    await statusLine("Preparing interface");
    await sleep(600);
    await printLine("ready.");
    await sleep(800);

    await printLine("devOS v3.1 (portfolio build)");
    await printLine("Copyright (c) CO0K1E\n");

    await statusLine("Collecting profile data");

    printPrompt("whoami");
    await revealLine("Name: Said-Ali");
    await revealLine("Role: Software Engineer");
    await revealLine("Focus: Systems Programming • Game Development • Low-level Exploration\n");

    printPrompt("skills");
    await revealLine("C++ • C# • Unreal Engine • WinAPI • OOP • Debugging\n");
    await revealLine("Languages: C++ (Primary) • C# (Secondary)\n");
    await revealLine("Core: Memory Management • Engine Systems • Tools Development • Problem Solving\n")
    await revealLine("Tools: Unreal Engine • Visual Studio • Rider • Git")

    printPrompt("projects");
    await statusLine("Fetching repositories");
    await loadGitHubProjects(githubUsername);

    printPrompt("leetcode");
    await statusLine("loading modules: leetcode");
    await loadLeetCode();
    await printLine("");

    printPrompt("contacts");
    await link("GitHub: CO0K1E", `https://github.com/${githubUsername}`);
    await link("LeetCode: CO0K1E", `https://leetcode.com/u/${leetcodeUsername}/`);
    await link("Epic developer community: ScorePass304", "https://dev.epicgames.com/community/profile/kP3Zb/ScorePass304");
    await printLine("");

    printPrompt("");
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    terminal.lastChild.appendChild(cursor);
}

boot();