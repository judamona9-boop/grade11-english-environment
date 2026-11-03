/* Grade 11 English Learning Environment
   Updated Unit 3 and Unit 4 content.
   All learner-facing content is in English.
*/
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = (message) => {
    const element = $("#toast");
    if (!element) return;
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => element.classList.remove("show"), 2400);
  };

  // Keep the website English-only.
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
  document.body.classList.remove("arabic");
  const languageToggle = $("#langToggle");
  if (languageToggle) languageToggle.hidden = true;

  const heroTitle = $("#heroTitle");
  const heroText = $("#heroText");
  const exploreBtn = $("#exploreBtn");
  const heroNote = $("#heroNote");
  if (heroTitle) heroTitle.innerHTML = 'Your English journey<br><span>starts here.</span>';
  if (heroText) heroText.textContent = 'Explore Units 3 and 4 through meaningful activities that connect listening, speaking, reading and writing.';
  if (exploreBtn) exploreBtn.innerHTML = 'Explore learning units <span>↗</span>';
  if (heroNote) heroNote.textContent = 'Learn at your pace. Practise, reflect and improve.';

  const menuToggle = $("#menuToggle");
  if (menuToggle) menuToggle.addEventListener("click", () => {
    const nav = $("#mainNav");
    if (!nav) return;
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", () => {
    $("#mainNav")?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  $$(".copy-prompt").forEach(button => button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy || "");
      toast("Prompt copied. Paste it into your chosen AI tool.");
    } catch (error) {
      window.prompt("Copy this prompt:", button.dataset.copy || "");
    }
  }));

  // Milo is a guided demonstration, not a live AI connection.
  const miloPanel = $("#miloPanel");
  function toggleMilo(open) {
    if (!miloPanel) return;
    miloPanel.classList.toggle("open", open);
    miloPanel.setAttribute("aria-hidden", String(!open));
    if (open) setTimeout(() => $("#miloInput")?.focus(), 180);
  }
  $("#miloFab")?.addEventListener("click", () => toggleMilo(!miloPanel?.classList.contains("open")));
  $("#closeMilo")?.addEventListener("click", () => toggleMilo(false));
  $("#openMiloHero")?.addEventListener("click", () => toggleMilo(true));
  $("#openMiloBanner")?.addEventListener("click", () => toggleMilo(true));

  const topicReplies = {
    Vocabulary: "Choose a word from the current unit. Write a sentence that shows its meaning in context. I can help you review the sentence step by step.",
    Grammar: "Tell me which structure you are practising: have to, had to, mustn't, be allowed to, prefer or would rather. I will give you one practice question at a time.",
    Writing: "Share your paragraph or first draft. I will help you check organisation, grammar, vocabulary and punctuation while keeping your own ideas.",
    Speaking: "Give a short spoken response or type what you would say. Try to express a clear idea, add a supporting detail and explain your reason."
  };

  function addMessage(message, who = "milo") {
    const messages = $("#miloMessages");
    if (!messages) return;
    const bubble = document.createElement("div");
    bubble.className = "message " + (who === "user" ? "message-user" : "message-milo");
    bubble.textContent = message;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function demoReply(input) {
    const value = input.toLowerCase();
    if (/^(hello|hi|hey)\b/.test(value)) return "Hello! What would you like to practise: vocabulary, grammar, reading, listening, speaking or writing?";
    if (/have to|had to|mustn't|must not|allowed/.test(value)) return "Remember to distinguish meaning: have to expresses necessity; mustn't expresses prohibition; don't have to means there is no obligation. Try writing one example of each.";
    if (/prefer|would rather/.test(value)) return "Use prefer + noun or verb-ing + to for a comparison. Use would rather + base verb + than. Write one sentence and check the verb form.";
    if (/well-known|well informed|well-informed|well written|well-written/.test(value)) return "A well-compound adjective combines well with a past participle. Use a hyphen when it comes before a noun: a well-known guide.";
    if (/insurance/.test(value)) return "The Unit 3 reading distinguishes contents insurance from personal accident insurance. Revisit the passage and identify what each type covers.";
    if (/tour guide|tourist|guide/.test(value)) return "Think about the qualities of an effective tour guide: knowledge, communication and the ability to respond to tourists' needs. Support your ideas with details from the Unit 4 reading.";
    if (/read/.test(value)) return "Before reading, predict the topic from the title. During reading, identify the main idea and locate details that support it. Which paragraph would you like to discuss?";
    if (/listen/.test(value)) return "Listen once for the general idea. Listen again for specific details such as reasons, examples, numbers or opinions. Write keywords rather than complete sentences.";
    if (/help|don't know|dont know/.test(value)) return "Let's take it one step at a time. Tell me the unit and the task. I will give you a hint first, then let you try.";
    if (/thank/.test(value)) return "You're welcome! Keep practising and use feedback to improve your next attempt.";
    return "Thank you for sharing your answer. Check that it responds to the task, uses an appropriate structure and includes a supporting detail. Try revising it in your own words. This is a guided demo, not a live AI service.";
  }

  $("#miloForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#miloInput");
    const value = input?.value.trim();
    if (!value) return;
    addMessage(value, "user");
    input.value = "";
    setTimeout(() => addMessage(demoReply(value)), 250);
  });

  $$(".milo-quick-actions button").forEach(button => button.addEventListener("click", () => {
    const topic = button.dataset.topic || "";
    addMessage(topic, "user");
    setTimeout(() => addMessage(topicReplies[topic] || demoReply(topic)), 200);
  }));
    addMessage(value, "user");
    input.value = "";
    setTimeout(() => addMessage(demoReply(value)), 250);
  });

  $$(".milo-quick-actions button").forEach(button => button.addEventListener("click", () => {
    const topic = button.dataset.topic || "";
    addMessage(topic, "user");
    setTimeout(() => addMessage(topicReplies[topic] || demoReply(topic)), 200);
  }));

  const unitData = {
    3: {
      title: "Unit 3 · Take Care!",
      kicker: "SAFETY, RESPONSIBILITY AND EVERYDAY LIFE",
      learn: `
        <h3>Learning Goals</h3>
        <p>By the end of this section, you should be able to understand and use language related to home safety, accident prevention, insurance, rules and responsibilities.</p>

        <h3>1. Reading: Accident Prevention in the Home</h3>
        <p>Read the textbook passage and organise its advice under the relevant headings:</p>
        <ul>
          <li><strong>Fire safety:</strong> safe use of heaters, candles, matches and lighters; smoke alarms; keeping clothes away from flames.</li>
          <li><strong>Cooking safety:</strong> careful use of hot water and drinks; turning pan handles inward; staying near a cooking pan; keeping knives sharp and handling them carefully.</li>
          <li><strong>DIY and garden safety:</strong> avoiding unfamiliar electrical or gas work; checking tools; keeping chemicals and equipment away from children; following safety instructions.</li>
        </ul>
        <p><strong>Reading task:</strong> Find one piece of advice for each heading. Explain the risk it is intended to prevent.</p>

        <h3>2. Reading: Insurance Made Clear</h3>
        <p>Read the second text. Identify the difference between <em>contents insurance</em> and <em>personal accident insurance</em>. Then find the advice the text gives before choosing an insurance policy.</p>

        <h3>3. Grammar: Obligation, Prohibition and Permission</h3>
        <ul>
          <li><strong>have to / had to:</strong> express present or past necessity.</li>
          <li><strong>don't have to / didn't have to:</strong> express lack of necessity.</li>
          <li><strong>mustn't:</strong> expresses prohibition; an action is not allowed.</li>
          <li><strong>be allowed to:</strong> expresses permission; use the appropriate form of <em>be</em>.</li>
        </ul>
        <p><strong>Check the meaning:</strong> <em>You mustn't touch the faulty appliance</em> means it is prohibited. <em>You don't have to use the appliance</em> means it is not necessary.</p>

        <h3>4. Fixed Phrases</h3>
        <p>Review the expressions in the textbook and use them in context: <em>by law, in theory, in practice, on offer, against the law, under pressure, in a hurry</em> and <em>out of reach</em>.</p>

        <h3>5. Writing: Summaries and Graphs</h3>
        <p>Study the textbook bar chart about literacy rates for men and women aged 15 and over in Palestine (2001–2013). Identify the overall trend, compare the groups and select relevant figures before writing a concise summary.</p>

        <div class="activity-box">
          <h3>Quick Writing Practice</h3>
          <label for="u3answer">Write three safety recommendations for a family home. Use at least one expression of obligation and one expression of prohibition.</label>
          <textarea id="u3answer" rows="4" placeholder="Write your recommendations here..."></textarea>
          <button class="button button-primary" id="checkWriting" type="button" style="margin-top:10px">Get a writing hint</button>
          <div id="writingHint" class="feedback-result" aria-live="polite"></div>
        </div>
      `,
      quiz: [
        {
          q: "According to the home-safety advice, where should pan handles point?",
          opts: ["Outwards, towards the edge", "Inwards, away from the edge", "Towards the floor", "In any direction"],
          correct: 1,
          explain: "The passage advises turning pan handles inwards to reduce the risk of a pan being knocked off the cooker."
        },
        {
          q: "Which statement expresses prohibition?",
          opts: ["You don't have to clean it now.", "You are allowed to use it.", "You mustn't touch the faulty appliance.", "You had to buy a new one."],
          correct: 2,
          explain: "Mustn't means that an action is not allowed."
        },
        {
          q: "What does contents insurance cover, according to the reading?",
          opts: ["Accidental damage to household possessions", "Monthly travel costs", "School examination fees", "A person's language course"],
          correct: 0,
          explain: "The text explains that contents insurance can cover accidental damage to possessions such as televisions and computers."
        },
        {
          q: "Choose the correct completion: The children were not ______ to enter the workshop.",
          opts: ["allow", "allowed", "allowing", "allows"],
          correct: 1,
          explain: "The passive structure is be allowed to. After were, use allowed."
        },
        {
          q: "Which phrase completes the sentence? The chemicals must be kept ______ of children.",
          opts: ["under pressure", "on offer", "out of reach", "in theory"],
          correct: 2,
          explain: "Out of reach means that something cannot be reached or accessed easily."
        }
      ],
      integrate: `
        <h3>Integrated Skills Challenge: Make the Home Safer</h3>
        <p><strong>Driving question:</strong> How can people reduce common risks at home and communicate safety advice clearly?</p>

        <div class="activity-box">
          <h4>Stage 1 · Listen for Information</h4>
          <p>Listen to the Unit 3 audio resource selected by your teacher. First, identify the situation. Listen again and record two hazards and the safety advice given for each one.</p>
          <p><em>Listening resource: Use the verified audio accompanying the textbook lesson. Do not replace it with an unrelated recording.</em></p>
        </div>

        <div class="activity-box">
          <h4>Stage 2 · Read to Verify and Extend</h4>
          <p>Read <em>Accident Prevention in the Home</em>. Find textbook evidence that confirms, adds to or differs from the advice you heard. Select three useful recommendations and identify the risk behind each one.</p>
        </div>

        <div class="activity-box">
          <h4>Stage 3 · Speak to Solve a Problem</h4>
          <p>Work with a partner. One student describes a home-safety problem; the other recommends a solution and explains why it is important. Change roles. Use <em>have to, mustn't</em> or <em>be allowed to</em> accurately.</p>
        </div>

        <div class="activity-box">
          <h4>Stage 4 · Write for a Real Audience</h4>
          <p>Create a short family safety notice. Include a clear title, at least three evidence-based recommendations and a reason for two of them. Use appropriate obligation or prohibition structures.</p>
        </div>

        <div class="activity-box">
          <h4>Final Product and Reflection</h4>
          <p>Present your notice to another pair. Revise it using their feedback. Check: Does it use information from both listening and reading? Are the recommendations clear? Is the grammar accurate?</p>
          <p><strong>Skills connection:</strong> Listening supplies information; reading verifies and extends it; speaking negotiates and explains solutions; writing turns the shared conclusions into a practical safety notice.</p>
        </div>
      `
    },
    4: {
      title: "Unit 4 · Going Places",
      kicker: "TOURISM, PEOPLE AND PREFERENCES",
      learn: `
        <h3>Learning Goals</h3>
        <p>By the end of this section, you should be able to understand information about tour guiding, express preferences, use well-compound adjectives and prepare a job application.</p>

        <h3>1. Reading: Being a Tour Guide</h3>
        <p>Read the textbook article and identify the changing expectations of tourists. Pay attention to the importance of local knowledge, interaction with people and places, and responding to tourists' demands.</p>
        <p><strong>Vocabulary in context:</strong> Revisit the words and expressions in the passage, including <em>extras, demands, local knowledge, monuments, temporarily, picked up, lecture</em> and <em>interact</em>. Use the surrounding sentence to work out meaning before checking a dictionary.</p>

        <h3>2. Word Formation</h3>
        <p>Study how words change form in context: <em>demand / demanding, challenge / challenging, surprise / surprising, conclude / concluding, decide / deciding</em> and <em>provide / provision</em>. Notice the grammatical role of each form in its sentence.</p>

        <h3>3. Grammar: Expressing Preferences</h3>
        <ul>
          <li><strong>prefer + noun / verb-ing + to + noun / verb-ing:</strong> I prefer travelling by train to travelling by bus.</li>
          <li><strong>would rather + base form + than + base form:</strong> I would rather visit the old city than stay at the hotel.</li>
        </ul>
        <p>Use the structures to compare options and give a reason for your choice.</p>

        <h3>4. Language: Well-Compound Adjectives</h3>
        <p>Review the forms in the textbook: <em>well-informed, well-educated, well-dressed, well-behaved, well-made, well-known, well-paid</em> and <em>well-written</em>. These combine <em>well</em> with a past participle. Use a hyphen when the compound adjective comes before a noun: <em>a well-known monument</em>.</p>

        <h3>5. Writing: Applying for a Tour Guide Position</h3>
        <p>Use the textbook model to prepare an application. Include relevant personal and contact details, education, languages and a short paragraph explaining why your knowledge and skills make you suitable for the position. Organise the information clearly and use an appropriate formal tone.</p>

        <div class="activity-box">
          <h3>Quick Writing Practice</h3>
          <label for="u4answer">Write four sentences explaining why you would be a suitable tour guide. Use one preference structure and two well-compound adjectives.</label>
          <textarea id="u4answer" rows="4" placeholder="I would rather... because..."></textarea>
          <button class="button button-primary" id="checkWriting" type="button" style="margin-top:10px">Get a writing hint</button>
          <div id="writingHint" class="feedback-result" aria-live="polite"></div>
        </div>
      `,
      quiz: [
        {
          q: "What do many modern tourists look for, according to the reading?",
          opts: ["Only a long lecture", "Culture, real life and local knowledge", "Shopping centres only", "A guide who avoids interaction"],
          correct: 1,
          explain: "The article highlights tourists' interest in culture, real life and local knowledge."
        },
        {
          q: "Choose the correct sentence.",
          opts: ["I prefer travel by train to by bus.", "I prefer travelling by train to travelling by bus.", "I prefer to travelling by train than bus.", "I prefer travelling by train than to travel by bus."],
          correct: 1,
          explain: "Use prefer + verb-ing + to + verb-ing when comparing activities."
        },
        {
          q: "Complete the sentence: I would rather ______ the old city than stay at the hotel.",
          opts: ["visiting", "to visit", "visit", "visited"],
          correct: 2,
          explain: "Would rather is followed by the base form of the verb."
        },
        {
          q: "Which sentence uses a well-compound adjective correctly before a noun?",
          opts: ["a well known guide", "a well-known guide", "a well-knowing guide", "a well-know guide"],
          correct: 1,
          explain: "Use a hyphen in the compound adjective before the noun: a well-known guide."
        },
        {
          q: "Which information is relevant to an application for a tour guide position?",
          opts: ["Education and language skills", "A list of unrelated household objects", "An unorganised travel diary only", "A favourite film with no explanation"],
          correct: 0,
          explain: "The application task asks for relevant details such as education, languages and reasons for suitability."
        }
      ],
      integrate: `
        <h3>Integrated Skills Challenge: Apply to Become a Tour Guide</h3>
        <p><strong>Driving question:</strong> How can you use information, communication and language skills to present yourself as a suitable tour guide?</p>

        <div class="activity-box">
          <h4>Stage 1 · Listen for a Tourist's Needs</h4>
          <p>Listen to the verified Unit 4 audio resource selected by your teacher. Identify the speaker's purpose, preferences and two details that would help a tour guide plan an appropriate experience.</p>
          <p><em>Listening resource: Use the audio that accompanies the relevant textbook lesson. The printed pupil's book alone does not provide the audio recording.</em></p>
        </div>

        <div class="activity-box">
          <h4>Stage 2 · Read and Gather Evidence</h4>
          <p>Read <em>Being a Tour Guide</em>. Select three qualities or types of knowledge that an effective guide needs. Find details in the text that support your choices. Review the vocabulary in context.</p>
        </div>

        <div class="activity-box">
          <h4>Stage 3 · Speak and Recommend</h4>
          <p>In pairs, take turns being a tourist and a tour guide. The tourist explains preferences; the guide asks a follow-up question and recommends an experience. Compare options using <em>prefer</em> or <em>would rather</em>, and give reasons.</p>
        </div>

        <div class="activity-box">
          <h4>Stage 4 · Write a Job Application</h4>
          <p>Use the information gathered from listening, reading and speaking to draft an application for the position of tour guide. Include education, language skills, relevant knowledge and a convincing explanation of your suitability. Use an appropriate formal style and well-compound adjectives where suitable.</p>
        </div>

        <div class="activity-box">
          <h4>Final Product and Reflection</h4>
          <p>Exchange applications with a partner. Check whether the application responds to the position, includes relevant evidence and uses accurate preference structures and compound adjectives. Revise the final draft.</p>
          <p><strong>Skills connection:</strong> Listening identifies a visitor's needs; reading provides evidence about the role; speaking develops and justifies recommendations; writing presents the learner's qualifications in a purposeful application.</p>
        </div>
      `
    }
  };

  let activeUnit = 3;
  let activeTab = "learn";
  const dialog = $("#unitDialog");
  const content = $("#unitDialogContent");
  function renderWritingHint() {
    const button = $("#checkWriting", content);
    if (!button) return;

    button.addEventListener("click", () => {
      const field = $("textarea", content);
      const feedback = $("#writingHint", content);
      const value = field?.value.trim() || "";

      if (!value) {
        feedback.textContent = "Write your first draft. Start with a clear main idea and develop it with relevant details.";
      } else if (value.split(/\s+/).length < 25) {
        feedback.textContent = "Good start. Develop your ideas with specific details and reasons. Check that every sentence supports the task.";
      } else {
        feedback.textContent = "You have developed your response. Review organisation, grammar, punctuation and vocabulary. Make sure your ideas are supported by the unit material.";
      }
    });
  }

  function renderQuiz() {
    const questions = unitData[activeUnit].quiz;
    let questionIndex = 0;
    let score = 0;

    function showQuestion() {
      const item = questions[questionIndex];

      content.innerHTML = `
        <h3>Unit ${activeUnit} Quick Check</h3>
        <p class="form-note">Question ${questionIndex + 1} of ${questions.length}</p>
        <h4>${item.q}</h4>
        <div class="answer-options">
          ${item.opts.map((option, index) =>
            `<button class="answer-option" data-answer="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`
          ).join("")}
        </div>
        <div id="quizResult" class="feedback-result" aria-live="polite"></div>
        <button class="button button-primary" id="nextQuestion" type="button" disabled style="margin-top:12px">
          ${questionIndex === questions.length - 1 ? "View Results" : "Next Question"}
        </button>
      `;

      $$(".answer-option", content).forEach(button => {
        button.addEventListener("click", () => {
          if ($$(".answer-option", content).some(option => option.disabled)) return;

          const isCorrect = Number(button.dataset.answer) === item.correct;
          if (isCorrect) score++;

          $$(".answer-option", content).forEach(option => {
            option.disabled = true;
            if (Number(option.dataset.answer) === item.correct) {
              option.classList.add("correct");
            }
          });

          if (!isCorrect) button.classList.add("incorrect");

          const result = $("#quizResult", content);
          result.textContent = (isCorrect ? "Correct! " : "Not quite. ") + item.explain;
          result.style.color = isCorrect ? "#16805d" : "#b44b3d";

          $("#nextQuestion", content).disabled = false;

          if (isCorrect) happyChime();
        });
      });

      $("#nextQuestion", content).addEventListener("click", () => {
        questionIndex++;

        if (questionIndex < questions.length) {
          showQuestion();
        } else {
          content.innerHTML = `
            <h3>Practice Complete</h3>
            <p>You scored <strong>${score} out of ${questions.length}</strong>.</p>
            <p>${score === questions.length
              ? "Excellent work! Review the unit and try the integrated skills challenge."
              : "Review the explanations, revisit the relevant textbook sections and try again."}</p>
            <button class="button button-primary" id="retryQuiz" type="button">Try Again</button>
          `;

          $("#retryQuiz", content)?.addEventListener("click", () => {
            questionIndex = 0;
            score = 0;
            showQuestion();
          });
        }
      });
    }

    showQuestion();
  }

  function renderUnitTab() {
    const data = unitData[activeUnit];

    $$(".dialog-tab").forEach(button => {
      button.classList.toggle("active", button.dataset.tab === activeTab);
    });

    if (!content) return;

    if (activeTab === "learn") {
      content.innerHTML = data.learn;
      renderWritingHint();
    } else if (activeTab === "quiz") {
      renderQuiz();
    } else {
      content.innerHTML = data.integrate;
    }
  }

  $$(".unit-open").forEach(button => {
    button.addEventListener("click", () => {
      activeUnit = Number(button.dataset.unit);
      if (!unitData[activeUnit]) return;

      activeTab = "learn";

      if ($("#dialogTitle")) {
        $("#dialogTitle").textContent = unitData[activeUnit].title;
      }

      if ($("#dialogKicker")) {
        $("#dialogKicker").textContent = unitData[activeUnit].kicker;
      }

      renderUnitTab();
      dialog?.showModal();
    });
  });

  $("#closeUnitDialog")?.addEventListener("click", () => dialog?.close());

  $$(".dialog-tab").forEach(button => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.tab;
      renderUnitTab();
    });
  });

  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  // Feedback is downloaded locally; this form does not submit to a server.
  $("#feedbackForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const rating = $("#rating")?.value;
    const feedback = $("#feedbackText")?.value.trim() || "(No comment)";

    if (!rating) {
      toast("Please choose a rating first.");
      return;
    }

    const report = `Learning Environment Feedback\nRating: ${rating}\nComment: ${feedback}`;
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "learning-environment-feedback.txt";
    link.click();

    URL.revokeObjectURL(url);
    toast("Feedback file prepared. It has not been submitted online.");
  });

  // Optional music and gentle feedback sounds. Audio starts after user interaction.
  let musicOn = false;
  let soundOn = true;
  let audioCtx = null;
  let musicTimer = null;
  let noteIndex = 0;

  function getAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }

    if (audioCtx?.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function playTone(frequency = 660, duration = 0.12, type = "sine", volume = 0.045, delay = 0) {
    if (!soundOn && type !== "music") return;

    const context = getAudio();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + delay);

    gain.gain.setValueAtTime(0.0001, context.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + delay + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start(context.currentTime + delay);
    oscillator.stop(context.currentTime + delay + duration + 0.03);
  }

  function happyChime() {
    if (!soundOn) return;

    [523.25, 659.25, 783.99].forEach((note, index) => {
      playTone(note, 0.18, "sine", 0.04, index * 0.09);
    });
  }

  const melody = [
    523.25, 659.25, 783.99, 659.25,
    587.33, 698.46, 880, 698.46,
    523.25, 659.25, 783.99, 1046.5,
    880, 783.99, 659.25, 587.33
  ];

  function musicStep() {
    if (!musicOn) return;

    playTone(melody[noteIndex % melody.length], 0.27, "sine", 0.018, 0);

    if (noteIndex % 4 === 0) {
      playTone(melody[noteIndex % melody.length] / 2, 0.34, "triangle", 0.012, 0.02);
    }

    noteIndex++;
  }

  function setMusic(enabled) {
    musicOn = enabled;

    const button = $("#musicToggle");

    if (button) {
      button.setAttribute("aria-pressed", String(enabled));
      button.innerHTML = enabled
        ? '♫ <span>Music on</span>'
        : '♫ <span>Music off</span>';
    }

    if (enabled) {
      getAudio();
      musicStep();
      musicTimer = setInterval(musicStep, 360);
    } else {
      clearInterval(musicTimer);
      musicTimer = null;
    }
  }

  $("#musicToggle")?.addEventListener("click", () => setMusic(!musicOn));

  $("#soundToggle")?.addEventListener("click", () => {
    soundOn = !soundOn;

    const button = $("#soundToggle");

    if (button) {
      button.setAttribute("aria-pressed", String(soundOn));
      button.innerHTML = soundOn
        ? '🔔 <span>Sounds on</span>'
        : '🔕 <span>Sounds off</span>';
    }

    if (soundOn) happyChime();
  });

  $("#startJourney")?.addEventListener("click", () => {
    getAudio();
    $("#welcomeScreen")?.classList.add("hidden");
    happyChime();
  });

})();
