/* -------------------------------------------------------------
 * MATH BOUND - Web Script Engine (Cleaned Version)
 * ------------------------------------------------------------- */

// Wait for DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
     * 1. Navigation & Theme Toggle Setup
     * ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    // Toggle theme day/night
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('theme-day')) {
            document.body.classList.remove('theme-day');
            document.body.classList.add('theme-night');
            initMeteorShower(); // Start meteor animation in night theme
        } else {
            document.body.classList.remove('theme-night');
            document.body.classList.add('theme-day');
            stopMeteorShower();
        }
    });

    // Mobile nav toggle
    mobileToggleBtn.addEventListener('click', () => {
        const isOpen = mainNav.style.display === 'block';
        mainNav.style.display = isOpen ? 'none' : 'block';
        mobileToggleBtn.innerHTML = isOpen ? '<i class=\"fa-solid fa-bars\"></i>' : '<i class=\"fa-solid fa-xmark\"></i>';
    });

    // Handle menu links click on mobile (close menu)
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.style.display = 'none';
                mobileToggleBtn.innerHTML = '<i class=\"fa-solid fa-bars\"></i>';
            }
        });
    });


    /* ==========================================
     * 2. Particle Canvas (Meteor Shower Animation)
     * ========================================== */
    const particleContainer = document.getElementById('particle-canvas-container');
    let meteorTimer = null;

    function createMeteor() {
        if (!document.body.classList.contains('theme-night')) return;

        const meteor = document.createElement('div');
        meteor.className = 'meteor';

        // Random start position
        const startX = Math.random() * window.innerWidth;
        const duration = 1.5 + Math.random() * 2; // 1.5 to 3.5 seconds
        const size = 1 + Math.random() * 2; // 1px to 3px

        meteor.style.left = `${startX}px`;
        meteor.style.top = `-10px`;
        meteor.style.width = `${size}px`;
        meteor.style.height = `${size * 30}px`; // Long trail
        meteor.style.animationDuration = `${duration}s`;

        particleContainer.appendChild(meteor);

        // Remove after animation finishes
        setTimeout(() => {
            meteor.remove();
        }, duration * 1000);
    }

    function initMeteorShower() {
        // Inject styles for meteors dynamically
        if (!document.getElementById('meteor-styles')) {
            const style = document.createElement('style');
            style.id = 'meteor-styles';
            style.innerHTML = `
                .meteor {
                    position: absolute;
                    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,51,102,0.8) 70%, #ffffff 100%);
                    opacity: 0.8;
                    pointer-events: none;
                    animation: fall-diagonal linear forwards;
                    box-shadow: 0 0 10px rgba(255, 51, 102, 0.5);
                }
                @keyframes fall-diagonal {
                    0% { transform: translateY(0) translateX(0) rotate(-35deg); opacity: 0; }
                    10% { opacity: 0.8; }
                    100% { transform: translateY(${window.innerHeight + 100}px) translateX(-${window.innerWidth / 2}px) rotate(-35deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        // Start spawn loop
        meteorTimer = setInterval(createMeteor, 600);
    }

    function stopMeteorShower() {
        clearInterval(meteorTimer);
        particleContainer.innerHTML = '';
    }


    /* ==========================================
     * 3. Interactive World Map Handler
     * ========================================== */
    // Levels database details matching Image 4
    const levelsData = {
        1: {
            title: "ป่าแห่งการเริ่มต้น (The Forest of Beginnings)",
            skill: "การบวกเลขจำนวนเต็ม (บวกเลข 1-2 หลัก)",
            boss: "Dark Knight (อัศวินทมิฬ)",
            desc: "ด่านที่ 1 ผู้กล้าแห่งความหวังจะได้เรียนรู้กลไกตอบโจทย์เลข 'การบวก' เพื่อโจมตี",
            image: "assets/+lv.png"
        },
        2: {
            title: "ทะเลทรายสูญสิ้น (Lost Desert)",
            skill: "การลบเลขจำนวนเต็ม (ลบเลขไม่เกิน 100)",
            boss: "Balelian (มังกรบาเลเลี่ยน)",
            desc: "ด่านที่ 2 ท้าทายการคำนวณ 'การลบ' ในดินแดนทะเลทรายแห้งแล้ง",
            image: "assets/screenshot_map.jpg"
        },
        3: {
            title: "วิหารโบราณลึกลับ (Ancient Ruins)",
            skill: "การคูณพื้นฐาน (สูตรคูณแม่ 2 ถึง 12)",
            boss: "Waygha (มังกรเวย์ก้า)",
            desc: "ด่านที่ 3 ฝึกการประยุกต์ทักษะ 'การคูณ' เพื่อทำลายเกราะสายฟ้าแโจมตีใส่มังกรเวย์ก้า",
            image: "assets/screenshot_start_day.jpg"
        },
        4: {
            title: "ปราสาทแห่งอาณาจักรเทมเพลส (Castle of the Tempest Kingdom)",
            skill: "การหารลงตัว (หารเลขคณิตเศษศูนย์)",
            boss: "Kalaxis (มังกรคาแลคซิส)",
            desc: "ด่านที่ 4 ค้นหาส่วนแบ่งที่สมดุลกับ 'การหาร' บนปราสาทแห่งอาณาจักรเทมเพลส",
            image: "assets/screenshot_start_night.jpg"
        },
        5: {
            title: "เสาหินพายุแปรผัน (Storm Pillar)",
            skill: "คณิตศาสตร์ระคน (บวก ลบ คูณ หาร ผสมผสานเข้าด้วยกัน)",
            boss: "Morgoth (จอมมารมอร์กอธ)",
            desc: "ด่านที่ 5 ท้าทายคณิตศาสตร์ระคนเพื่อโจมตีจอมมารมอร์กอธ",
            image: "assets/screenshot_battle.jpg"
        },
        6: {
            title: "ช่องว่างระหว่างมิติ (Dimension)",
            skill: "พีชคณิตและสมการตัวแปรต้น (เช่น 2x = 8, x = ?)",
            boss: "???",
            desc: "ปลายทางสูงสุดศึกสุดท้าย การเผชิญหน้ากับ ??? ณ ช่องว่างระหว่างมิติ",
            image: "assets/screenshot_start_night.jpg"
        }
    };

    const mapNodes = document.querySelectorAll('.map-node');
    const detailLvlBadge = document.getElementById('detail-lvl-badge');
    const detailTitle = document.getElementById('detail-title');
    const detailSkill = document.getElementById('detail-skill');
    const detailBoss = document.getElementById('detail-boss');
    const detailDesc = document.getElementById('detail-description');
    const detailPreviewImg = document.getElementById('detail-preview-img');

    mapNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Play retro sound effect
            playBeep(220, 0.08, 'square');

            // Toggle active classes
            mapNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            // Get level data
            const lvl = node.getAttribute('data-level');
            const data = levelsData[lvl];

            if (data) {
                // Animate change
                const card = document.getElementById('level-detail-card');
                card.style.opacity = 0;
                card.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    detailLvlBadge.innerText = `LEVEL ${lvl}`;
                    detailTitle.innerText = data.title;
                    detailSkill.innerText = data.skill;
                    detailBoss.innerText = data.boss;
                    detailDesc.innerText = data.desc;
                    detailPreviewImg.src = data.image;

                    card.style.opacity = 1;
                    card.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    });


    /* ==========================================
     * 4. 8-Bit Retro Sound Synth (Web Audio API)
     * ========================================== */
    let audioCtx = null;
    let soundEnabled = true;

    function initAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Core sound synthesizer
    function playBeep(frequency, duration, type = 'sine', sweepTo = null) {
        if (!soundEnabled) return;
        try {
            initAudioContext();

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

            if (sweepTo !== null) {
                osc.frequency.exponentialRampToValueAtTime(sweepTo, audioCtx.currentTime + duration);
            }

            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.warn("AudioContext failed to play sound: ", e);
        }
    }
});

/* ==========================================
 * 5. Fake Realistic Download Simulator
 * ========================================== */
function downloadGame() {
    // Play sound click
    playBeepTone(440, 0.08, 'sine');

    // Inject download dialog overlay
    const downloadModal = document.createElement('div');
    downloadModal.style.position = 'fixed';
    downloadModal.style.top = '0';
    downloadModal.style.left = '0';
    downloadModal.style.width = '100vw';
    downloadModal.style.height = '100vh';
    downloadModal.style.backgroundColor = 'rgba(12, 13, 20, 0.85)';
    downloadModal.style.zIndex = '9999';
    downloadModal.style.display = 'flex';
    downloadModal.style.alignItems = 'center';
    downloadModal.style.justifyContent = 'center';
    downloadModal.style.fontFamily = 'Sarabun, sans-serif';

    downloadModal.innerHTML = `
        <div style="background-color: #1b1107; border: 4px solid #ffbe1a; border-radius: 12px; padding: 40px; text-align: center; max-width: 480px; width: 90%; color: white; box-shadow: 0 10px 40px rgba(0,0,0,0.8); position: relative;">
            <div id="close-dl" style="position: absolute; top: 15px; right: 20px; font-size: 1.5rem; cursor: pointer; color: #9ca3af;" onclick="this.parentElement.parentElement.remove()">&times;</div>
            <i class="fa-solid fa-cloud-arrow-down" style="font-size: 3.5rem; color: #ffbe1a; margin-bottom: 20px;"></i>
            <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; color: #ffbe1a;">กำลังจัดเตรียมไฟล์ดาวน์โหลด...</h3>
            <p style="font-size: 0.95rem; color: #d1d5db; margin-bottom: 25px;">กำลังบีบอัดแพ็กเกจเกมนวัตกรรมการศึกษา MATH BOUND สำหรับ Windows 64-bit</p>
            
            <div style="width: 100%; height: 20px; background-color: #333; border-radius: 10px; border: 1px solid #000; overflow: hidden; margin-bottom: 15px; position: relative;">
                <div id="dl-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #ffbe1a, #ff9f1c); transition: width 0.1s linear;"></div>
                <span id="dl-percent" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.75rem; color: white; font-weight: 700; text-shadow: 1px 1px 0 #000;">0%</span>
            </div>
            
            <div id="dl-status" style="font-size: 0.85rem; color: #9ca3af;">กำลังเชื่อมต่อกับโฮสต์การแจกจ่าย...</div>
        </div>
    `;

    document.body.appendChild(downloadModal);

    let progress = 0;
    const progressFill = document.getElementById('dl-progress');
    const percentText = document.getElementById('dl-percent');
    const statusText = document.getElementById('dl-status');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            progressFill.style.width = '100%';
            percentText.innerText = '100%';
            statusText.innerText = 'จัดเตรียมไฟล์สำเร็จ! ดาวน์โหลดเรียบร้อย.';

            playBeepTone(523.25, 0.15, 'sine');
            setTimeout(() => playBeepTone(659.25, 0.1, 'sine'), 100);
            setTimeout(() => playBeepTone(783.99, 0.25, 'sine'), 200);

            setTimeout(() => {
                downloadModal.remove();
                alert("จำลองการดาวน์โหลดเกมสำเร็จ! ไฟล์: math_bound_v1.0.4_win64.zip (234.5 MB)");
            }, 1500);
        } else {
            progressFill.style.width = `${progress}%`;
            percentText.innerText = `${progress}%`;

            if (progress < 25) {
                statusText.innerText = 'กำลังคำนวณค่าแฮช SHA-256...';
            } else if (progress < 55) {
                statusText.innerText = 'กำลังบรรจุไลบรารี Unity WebGL & Windows DLLs...';
            } else if (progress < 85) {
                statusText.innerText = 'กำลังดาวน์โหลดไฟล์ด่านทั้ง 6 ด่าน...';
            } else {
                statusText.innerText = 'เสร็จสิ้นขั้นตอนดาวน์โหลด ไฟล์กำลังจัดส่ง...';
            }
        }
    }, 150);
}

function playBeepTone(frequency, duration, type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) { }
}
