"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from "recharts";
import { Home, Keyboard, Trophy, Cpu, Users, Gamepad2, Building2, TrendingUp, GitCompare, Search, X, FlaskConical, Crosshair, Layers, Shield, ChevronDown } from "lucide-react";
import { AMAZON_TAG, amazonLink, BRAND_COLORS, KEYBOARD_DIMS, KEYBOARD_IMAGE_URLS, KEYBOARD_DESCRIPTIONS, BRAND_IMAGE_URLS, GAME_IMAGE_URLS, GAME_DESCRIPTIONS, TEAM_DESCRIPTIONS, TEAM_LOGOS, I, icon, keyboards, proPlayers, extendedPlayers, allPlayers, brandMarketShare, gameBreakdown, weightTrend, pollingTrend, wirelessTrend, priceTrend, countryName } from "@/data";
import { GlowText, StatBox, SectionTitle, KeyboardCard, CustomTooltip, Flag } from "@/components/ui";

const TOP250 = new Set(["s1mple","ZywOo","NiKo","donk","m0NESY","TenZ","Scump","shroud","ImperialHal","Puppey","Faker","aspas","device","coldzera","Bugha","Shotzzy","Chovy","ropz","Proper","Beaulo","yay","Simp","electronic","Crimsix","N0tail","Twistzz","Demon1","Showmaker","EliGE","FalleN","Caps","MrSavage","rain","Profit","ScreaM","Karma","Shaiiko","olofmeister","Keria","f0rest","GeT_RiGhT","Yatoro","aceu","Clix","cNed","sh1ro","Clayster","Dendi","Zeus","TGLTN","broky","Alfajer","Jjonak","Cellium","b1t","Genburten","TaySon","gla1ve","Gumayusi","Paluh","karrigan","Derke","aBeZy","Mongraal","dupreeh","Collapse","Spoit","SP9RK1E","Oner","arT","crashies","Peterbot","KuroKy","huNter","Ras","Viper","Dashy","Fleta","Boaster","EpikWhale","jstn","Xyp9x","Magisk","Pengu","ana","Leave","f0rsakeN","Ax1Le","Jeemzz","Albralelie","Brollan","Deft","Formal","shox","Jinggg","Topson","Shrimzy","Hardecki","Kaydop","Canadian","Jimpphat","Less","Jankos","Ceb","HusKerrs","aqua","CTZN","blameF","stax","Rekkles","Carpe","Pred","Kickstart","stavn","Nisha","Queasy","Dropped","Super","njr","MaKo","NAF","Ruler","fer","nAts","Kenny","iNSaNiA","Squishy","Khanada","hwinn","YEKINDAR","SpiriTz","Nesk","Stewie2K","Zekken","CoreJJ","iceiceice","nyhrox","Vadeal","HisWattson","kscerato","SlasheR","something","Gustav","Kevster","Frozen","Arcitys","dafran","GarrettG","BrokenBlade","flameZ","Sacy","Envoy","Chapix","supr","tabseN","cr1t-","Mande","Elyoya","Fexx","Perfecto","Shao","Fairy Peak","Noahreyli","Doki","Hydra","nitr0","abed","Knight","Reps","Chronicle","Pio","woxic","Attach","Bucke","Alem4o","XANTARES","leaf","miCKe","Bin","xQc","Selly","Insight","iLLeY","jawgemo","Andilex","Brehze","cameram4n","Hans Sama","Kinstaar","Skyz","mxey","KRIMZ","saadhak","emongg","Stompy","Cyber","autimatic","Crylix","Ninja","Malibuca","cadiaN","sinatraa","Suygetsu","Upset","Larssen","TimTheTatman","ibiza","Muz","Yuzus","Jame","Lou","bogur","ZmjjKK","hampus","luke12","Tfue","soulz1","BuZz","HooXi","Hiko","9impulse","Japko","jabbi","Asuna","Aleksib","aLOW","BriD","Viol2t","Subroza","benjyfishy","Necros","Seagull","lyr1c","Boombl4","pollofn","Solotov","lionkk","mezii","Spinx","t3xture","kyxsan","n0thing","mL7","Kenzo","WARDELL","Veno","Primmie","Bestoloch","ShahZaM","YukaF","rapha","vengeurR","toxjq","k1llsen","cYpheR","RAISY","Cooller","clawz","DaHanG","Av3k","serious","Xron","maxter"]);
const GAME_COLORS = { CS2: "#c47000", Valorant: "#c43848", "League of Legends": "#c89b3c", LoL: "#c89b3c", Fortnite: "#3a60b0", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Overwatch 2": "#c48018", Apex: "#a82020", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };

const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = ((i * 2654435761) >>> 0) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ─── Animated Counter: counts up from 0 when scrolled into view ─── */
function AnimatedCounter({ value, duration = 1800, color, suffix = "", prefix = "", className = "", style = {} }) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || hasAnimated || !ref.current) return;
    // Check if already in view immediately
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setHasAnimated(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [mounted, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const raw = String(value).replace(/[^0-9.]/g, "");
    const target = parseFloat(raw) || 0;
    const isFloat = raw.includes(".");
    const steps = 60;
    const stepTime = duration / steps;
    let frame = 0;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const timer = setInterval(() => {
      frame++;
      const progress = easeOutQuart(Math.min(frame / steps, 1));
      const current = progress * target;
      setDisplay(isFloat ? current.toFixed(1) : Math.round(current).toLocaleString());
      if (frame >= steps) { clearInterval(timer); setDisplay(isFloat ? target.toFixed(1) : target.toLocaleString()); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [hasAnimated, value, duration]);

  // During SSR/before mount, render the final value to avoid hydration mismatch
  const raw = String(value).replace(/[^0-9.]/g, "");
  const target = parseFloat(raw) || 0;
  const isFloat = raw.includes(".");
  const staticDisplay = isFloat ? target.toFixed(1) : target.toLocaleString();

  return (
    <span ref={ref} className={className} style={{ color, ...style }}>
      {prefix}{!mounted ? staticDisplay : (hasAnimated ? display : "0")}{suffix}
    </span>
  );
}

// Tab-to-route mapping
const TAB_ROUTES = {
  overview: "/",
  keyboards: "/keyboards",
  rankings: "/keyboards",
  sensors: "/sensors",
  players: "/players",
  games: "/games",
  brands: "/brands",
  trends: "/trends",
  compare: "/compare",
  lab: "/lab",
  shapes: "/shapes",
  sensitivity: "/sensitivity",
  keyboardDetail: "/keyboards",
  teams: "/teams",
  teamDetail: "/teams",
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function EsportsKeyboards({ initialTab = "overview", initialKeyboardSlug = null, initialPlayerSlug = null, initialGameSlug = null, initialTeam = null }) {
  const router = useRouter();
  const [selectedKeyboard, setSelectedKeyboard] = useState(() => {
    if (initialKeyboardSlug) {
      const found = keyboards.find(m => m.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') === initialKeyboardSlug);
      return found || keyboards[0];
    }
    return keyboards[0];
  });
  const [activeTab, setActiveTabRaw] = useState(initialTab);
  const [tabFade, setTabFade] = useState(true); // true = visible, false = fading out
  const [gameDetailSlug, setGameDetailSlug] = useState(initialGameSlug || null);  const setActiveTab = (tab) => {
    if (tab === activeTab) return;
    setTabFade(false); // fade out
    setTimeout(() => {
      setActiveTabRaw(tab);
      const route = TAB_ROUTES[tab];
      if (route && tab !== "keyboardDetail") {
        router.push(route, { scroll: false });
      }
      // Small delay before fade in so new content renders first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTabFade(true); // fade in
        });
      });
    }, 180); // matches CSS transition duration
  };
  const skipScrollOnTabChange = useRef(false);
  const playerListScrollPos = useRef(0);
  useEffect(() => {
    if (skipScrollOnTabChange.current) { skipScrollOnTabChange.current = false; return; }
    // Don't scroll to top if we're restoring list position (browser back)
    try {
      if (initialTab === "players" && !initialPlayerSlug) {
        const saved = sessionStorage.getItem("playerListScroll");
        if (saved && parseInt(saved, 10) > 0) return;
      }
      if (initialTab === "keyboards" && !initialKeyboardSlug) {
        const saved = sessionStorage.getItem("keyboardListScroll");
        if (saved && parseInt(saved, 10) > 0) return;
      }
    } catch {}
    window.scrollTo({ top: 0 });
  }, [activeTab]);
  const [selectedPlayer, setSelectedPlayer] = useState(() => {
    if (initialPlayerSlug) {
      const found = proPlayers.find(p => p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') === initialPlayerSlug);
      return found || null;
    }
    return null;
  });

  // Restore scroll position when returning to players/keyboards list via browser back
  useEffect(() => {
    try {
      if (initialTab === "players" && !initialPlayerSlug) {
        const saved = sessionStorage.getItem("playerListScroll");
        if (saved) {
          const pos = parseInt(saved, 10);
          if (pos > 0) {
            setTimeout(() => { window.scrollTo({ top: pos, behavior: "instant" }); }, 50);
            sessionStorage.removeItem("playerListScroll");
          }
        }
      }
      if (initialTab === "keyboards" && !initialKeyboardSlug) {
        const saved = sessionStorage.getItem("keyboardListScroll");
        if (saved) {
          const pos = parseInt(saved, 10);
          if (pos > 0) {
            setTimeout(() => { window.scrollTo({ top: pos, behavior: "instant" }); }, 50);
            sessionStorage.removeItem("keyboardListScroll");
          }
        }
      }
    } catch {}
  }, []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState("proUsage");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterWeight, setFilterWeight] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterConn, setFilterConn] = useState("All");
  const [filterLayout, setFilterLayout] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryTab, setGalleryTab] = useState("All");
  const [showComparison, setShowComparison] = useState(false);
  const [compareList, setCompareList] = useState([keyboards[0], keyboards[1]]);
  const [heroAnim, setHeroAnim] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [gameFilter, setGameFilter] = useState("All");
  const [playerSort, setPlayerSort] = useState({ key: null, dir: "asc" });
  const [roleFilter, setRoleFilter] = useState("All");
  const [keyboardFilter, setKeyboardFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDrop, setShowSortDrop] = useState(false);
  const [profileOnly, setProfileOnly] = useState(false);
  const [playerPage, setPlayerPage] = useState(0);
  const PLAYERS_PER_PAGE = 50;
  const [rankingSort, setRankingSort] = useState({ key: "proUsage", dir: "desc" });
  const [sensorSort, setSensorSort] = useState({ key: "totalUsage", dir: "desc" });
  const [brandScoreSort, setBrandScoreSort] = useState({ key: "proShare", dir: "desc" });
  const [sensorGameFilter, setSensorGameFilter] = useState("All");
  const [compareSensor1, setCompareSensor1] = useState(null);
  const [compareSensor2, setCompareSensor2] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const globalSearchRef = useRef(null);
  const globalSearchInputRef = useRef(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    handLength: "", handWidth: "", grip: "", games: [], priorities: [],
    weightPref: "", connectivity: "", budget: "", shape: "",
  });
  const [quizDone, setQuizDone] = useState(false);
  const [sensFromGame, setSensFromGame] = useState("cs2");
  const [sensFromDpi, setSensFromDpi] = useState(800);
  const [sensFromSens, setSensFromSens] = useState(1.0);
  const [sensShowPros, setSensShowPros] = useState(false);
  const [teamSearch, setTeamSearch] = useState("");
  const [teamGameFilter, setTeamGameFilter] = useState("All");
  const [teamSortBy, setTeamSortBy] = useState("playerCount");
  const [showTeamSortDrop, setShowTeamSortDrop] = useState(false);
  const [showTeamFilters, setShowTeamFilters] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(initialTeam);
  const [expandedRosters, setExpandedRosters] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [newsletterPopup, setNewsletterPopup] = useState(false);
  const [shapeKeyboardA, setShapeKbdA] = useState(null);
  const [shapeKeyboardB, setShapeKbdB] = useState(null);
  const [shapeView, setShapeView] = useState("overlay"); // overlay | side
  const [shapeAngle, setShapeAngle] = useState("top"); // top | profile

  useEffect(() => { setTimeout(() => setHeroAnim(true), 100); }, []);

  // Navigation helpers for Next.js routing
  const keyboardSlug = (kb) => kb.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  const playerSlug = (player) => player.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');

  const navigateToKeyboard = (kbd) => {
    try { sessionStorage.setItem("keyboardListScroll", String(window.scrollY)); } catch {}
    // Save to recently viewed
    try {
      const recent = JSON.parse(sessionStorage.getItem("recentKeyboards") || "[]");
      const updated = [kbd.name, ...recent.filter(n => n !== kbd.name)].slice(0, 6);
      sessionStorage.setItem("recentKeyboards", JSON.stringify(updated));
    } catch {}
    setTabFade(false);
    setTimeout(() => {
      setSelectedKeyboard(kbd);
      setActiveTabRaw("keyboardDetail");
      router.push(`/keyboards/${keyboardSlug(kbd)}`, { scroll: false });
      requestAnimationFrame(() => { requestAnimationFrame(() => { setTabFade(true); }); });
    }, 180);
  };

  const navigateToPlayer = (player) => {
    playerListScrollPos.current = window.scrollY;
    try { sessionStorage.setItem("playerListScroll", String(window.scrollY)); } catch {}
    setTabFade(false);
    setTimeout(() => {
      setSelectedPlayer(player);
      setActiveTabRaw("players");
      router.push(`/players/${playerSlug(player)}`, { scroll: false });
      requestAnimationFrame(() => { requestAnimationFrame(() => { setTabFade(true); }); });
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── GLOBAL SEARCH: Cmd/Ctrl+K shortcut ───
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setGlobalSearchOpen(true);
        setTimeout(() => globalSearchInputRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setGlobalSearchOpen(false);
        setGlobalSearch("");
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ─── GLOBAL SEARCH: Click backdrop to close ───
  const handleSearchBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setGlobalSearchOpen(false);
      setGlobalSearch("");
    }
  };

  // ─── GLOBAL SEARCH: Compute results ───
  const globalSearchResults = (() => {
    const q = globalSearch.toLowerCase().trim();
    if (!q || q.length < 2) return { keyboards: [], players: [], teams: [], games: [], brands: [] };

    const matchedKbds = keyboards.filter(m =>
      m.name.toLowerCase().includes(q) || m.brand.toLowerCase().includes(q) || m.switchType.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedPlayers = allPlayers.filter(p =>
      p.name.toLowerCase().includes(q) || (p.team && p.team.toLowerCase().includes(q)) || (p.fullName && p.fullName.toLowerCase().includes(q))
    ).sort((a, b) => (b.hasProfile ? 1 : 0) - (a.hasProfile ? 1 : 0)).slice(0, 8);

    const teamSet = new Set();
    allPlayers.forEach(p => { if (p.team && p.team.toLowerCase().includes(q) && p.team !== "Content" && p.team !== "Free Agent" && p.team !== "Retired") teamSet.add(p.team); });
    const matchedTeams = [...teamSet].slice(0, 5).map(t => {
      const players = allPlayers.filter(p => p.team === t);
      const games = [...new Set(players.map(p => p.game))];
      return { name: t, playerCount: players.length, games };
    });

    const gameColors = GAME_COLORS;
    const gameNames = { CS2: "Counter-Strike 2", Valorant: "Valorant", LoL: "League of Legends", Fortnite: "Fortnite", "Overwatch 2": "Overwatch 2", Apex: "Apex Legends", "Dota 2": "Dota 2", "R6 Siege": "Rainbow Six Siege", "Rocket League": "Rocket League", "Call of Duty": "Call of Duty", "Marvel Rivals": "Marvel Rivals", PUBG: "PUBG", Deadlock: "Deadlock", "Quake Champions": "Quake Champions" };
    const matchedGames = Object.keys(gameColors).filter(g => {
      const gLower = g.toLowerCase();
      const fullName = (gameNames[g] || g).toLowerCase();
      return gLower.includes(q) || fullName.includes(q);
    }).slice(0, 4).map(g => ({ id: g, name: gameNames[g] || g, color: gameColors[g], playerCount: allPlayers.filter(p => p.game === g).length }));

    const matchedBrands = Object.keys(BRAND_COLORS).filter(b =>
      b.toLowerCase().includes(q)
    ).slice(0, 4).map(b => ({ name: b, color: BRAND_COLORS[b], keyboardCount: keyboards.filter(m => m.brand === b).length }));

    return { keyboards: matchedKbds, players: matchedPlayers, teams: matchedTeams, games: matchedGames, brands: matchedBrands };
  })();

  const globalSearchHasResults = globalSearch.length >= 2 && (globalSearchResults.keyboards.length + globalSearchResults.players.length + globalSearchResults.teams.length + globalSearchResults.games.length + globalSearchResults.brands.length) > 0;
  const globalSearchNoResults = globalSearch.length >= 2 && !globalSearchHasResults;

  const handleSearchResultClick = (type, item) => {
    // Navigate first
    if (type === "keyboard") {
      navigateToKeyboard(item);
    } else if (type === "player") {
      const pp = proPlayers.find(pp => pp.name === item.name && pp.game === item.game);
      if (pp) {
        navigateToPlayer(pp);
      } else {
        setSelectedPlayer(null);
        setGameFilter(item.game || "All");
        setActiveTab("players");
        router.push("/players");
      }
    } else if (type === "team") {
      setSelectedPlayer(null);
      setGameFilter("All");
      setSearchQuery(item.name);
      setActiveTab("players");
    } else if (type === "game") {
      skipScrollOnTabChange.current = true;
      setActiveTab("games");
      setTimeout(() => {
        const el = document.getElementById(`game-${item.id.replace(/\s+/g, '-').toLowerCase()}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else if (type === "brand") {
      skipScrollOnTabChange.current = true;
      setActiveTab("brands");
      setTimeout(() => {
        const el = document.getElementById(`brand-${item.name.replace(/\s+/g, '-').toLowerCase()}`);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
    // Close overlay after navigation state is set
    setGlobalSearch("");
    setGlobalSearchOpen(false);
  };

  const sortedKbds = [...keyboards]
    .filter(m => filterBrand === "All" || m.brand === filterBrand)
    .filter(m => {
      if (filterWeight === "All") return true;
      if (filterWeight === "Wooting") return m.weight < 50;
      if (filterWeight === "Light") return m.weight >= 50 && m.weight < 65;
      if (filterWeight === "Medium") return m.weight >= 65 && m.weight < 85;
      if (filterWeight === "Heavy") return m.weight >= 85;
      return true;
    })
    .filter(m => {
      if (filterPrice === "All") return true;
      if (filterPrice === "Budget") return m.price < 60;
      if (filterPrice === "Mid") return m.price >= 60 && m.price < 120;
      if (filterPrice === "Premium") return m.price >= 120;
      return true;
    })
    .filter(m => filterConn === "All" || m.connectivity === filterConn)
    .filter(m => filterLayout === "All" || m.layout === filterLayout)
    .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "proUsage") return b.proUsage - a.proUsage;
      if (sortBy === "weight") return a.weight - b.weight;
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "pollingRate") return b.pollingRate - a.pollingRate;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "releaseYear") return (b.releaseYear || 0) - (a.releaseYear || 0);
      return 0;
    });

  // Gallery-only filtered list (only used in the All Keyboards tab)
  const galleryKbds = sortedKbds.filter(m => {
    if (galleryTab === "All") return true;
    if (galleryTab === "60%") return m.layout === "60%";
    if (galleryTab === "TKL") return m.layout === "TKL";
    if (galleryTab === "Full") return m.layout === "Full" || m.layout === "Full Size";
    if (galleryTab === "Wireless") return m.connectivity === "Wireless";
    if (galleryTab === "Budget") return m.price <= 100;
    if (galleryTab === "Pro Favorites") return m.proUsage >= 3;
    return true;
  });

  const radarData = selectedKeyboard ? [
    { stat: "Lightness", value: Math.max(0, 100 - selectedKeyboard.weight), fullMark: 100 },
    { stat: "Switch", value: Math.min(100, selectedKeyboard.rapidTrigger ? 95 : 60), fullMark: 100 },
    { stat: "Poll Rate", value: (selectedKeyboard.pollingRate / 8000) * 100, fullMark: 100 },
    { stat: "Pro Usage", value: selectedKeyboard.proUsage * 4, fullMark: 100 },
    { stat: "Rating", value: selectedKeyboard.rating * 10, fullMark: 100 },
    { stat: "Value", value: Math.max(0, 100 - (selectedKeyboard.price / 2)), fullMark: 100 },
  ] : [];

  const PRO_FAME = {
    // Tier S — GOATs / household names (100)
    s1mple:100, Faker:100, TenZ:100, NiKo:100, ZywOo:100, device:100, Shotzzy:100, Bugha:100, ImperialHal:100, Dendi:100,
    // Tier A — superstars (90)
    donk:90, "m0NESY":90, aspas:90, Demon1:90, ropz:90, Twistzz:90, rain:90, electronic:90, Showmaker:90, Puppey:90,
    dupreeh:90, "gla1ve":90, Xyp9x:90, Stewie2K:90, Clix:90, MrSavage:90, Proper:90, Profit:90, KuroKy:90, yay:90,
    // Tier B — star players (80)
    "sh1ro":80, b1t:80, huNter:80, Magisk:80, NAF:80, EliGE:80, ScreaM:80, YEKINDAR:80, Alfajer:80, Derke:80,
    Boaster:80, crashies:80, Marved:80, cNed:80, Chovy:80, Caps:80, Simp:80, aBeZy:80, Cellium:80,
    broky:80, blameF:80, XANTARES:80, woxic:80, Brollan:80, Aleksib:80, Gumayusi:80, Zeus:80, Keria:80,
    CoreJJ:80, Deft:80, BrokenBlade:80, Kevster:80, Peterbot:80, Genburten:80,
    // Tier C — well-known (70)
    "f0rsakeN":70, something:70, leaf:70, jawgemo:70, Chronicle:70, Less:70, MaKo:70, stax:70, BuZz:70,
    Jimpphat:70, Spinx:70, REZ:70, flameZ:70, frozen:70, ax1Le:70, cadiaN:70, nafany:70, hobbit:70,
    saadhak:70, FNS:70, Sacy:70, pancada:70, tuyz:70, Leo:70, Rb:70, Zest:70,
    Oner:70, Viper:70, "Hans Sama":70, Nisha:70, "cr1t-":70, TORONTOTOKYO:70, Ras:70,
    arT:70, Beaulo:70, Shaiiko:70, Paluh:70, Jstn:70, Yatoro:70, Collapse:70,
  };
  const usedByPros = shuffle(allPlayers.filter(p => {
    if (!selectedKeyboard?.name || !p.keyboard) return false;
    if (!TOP250.has(p.name)) return false;
    const mn = selectedKeyboard.name.toLowerCase();
    const pm = p.keyboard.toLowerCase();
    return pm === mn || pm.includes(mn) || mn.includes(pm);
  }));

  const topBrands = Object.entries(
    keyboards.reduce((acc, m) => { acc[m.brand] = (acc[m.brand] || 0) + m.proUsage; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]);

  const proUsageChart = (() => {
    const counts = {};
    allPlayers.forEach(p => { counts[p.keyboard] = (counts[p.keyboard] || 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([name, count]) => {
        const m = keyboards.find(mm => mm.name === name || name.includes(mm.name) || mm.name.includes(name) || mm.name.toLowerCase() === name.toLowerCase());
        let fill = m ? (BRAND_COLORS[m.brand] || "#8a8078") : "#a09890";
        if (!m) {
          const n = name.toLowerCase();
          if (n.includes("razer") || n.includes("huntsman") || n.includes("blackwidow")) fill = BRAND_COLORS["Razer"];
          else if (n.includes("logitech") || n.includes("g pro")) fill = BRAND_COLORS["Logitech"];
          else if (n.includes("wooting") || n.includes("60he") || n.includes("80he")) fill = BRAND_COLORS["Wooting"];
          else if (n.includes("vaxee") || n.includes("zygen") || n.includes("np-01") || n.includes("outset")) fill = BRAND_COLORS["Vaxee"];
          else if (n.includes("lamzu") || n.includes("maya") || n.includes("atlantis")) fill = BRAND_COLORS["Lamzu"];
          else if (n.includes("pulsar") || n.includes("xlite")) fill = BRAND_COLORS["Pulsar"];
          else if (n.includes("steelseries") || n.includes("aerox") || n.includes("rival")) fill = BRAND_COLORS["SteelSeries"];
          else if (n.includes("corsair") || n.includes("sabre")) fill = BRAND_COLORS["Corsair"];
        }
        return { name: name.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair )/, ""), usage: parseFloat((count / allPlayers.length * 100).toFixed(1)), fill };
      });
  })();

  const pieData = brandMarketShare.filter(b => b.name !== "Other").map(b => ({
    name: b.name, value: b.share, fill: BRAND_COLORS[b.name] || "#8a8078"
  }));
  pieData.push({ name: "Other", value: (brandMarketShare.find(b => b.name === "Other") || { share: 3 }).share, fill: "#a09890" });

  const tabs = [
    { id: "overview", label: "Overview", icon: Home, color: "#b8956a" },
    { id: "keyboards", label: "All Keyboards", icon: Keyboard, color: "#9060d4" },
    { id: "rankings", label: "Rankings", icon: Trophy, color: "#b8956a" },
    { id: "sensors", label: "Switches", icon: Cpu, color: "#2a8a62" },
    { id: "players", label: "Pro Players", icon: Users, color: "#6b8cad" },
    { id: "lab", label: "Lab", icon: FlaskConical, color: "#b8956a" },
    { id: "sensitivity", label: "Sensitivity", icon: Crosshair, color: "#7048c4" },
    { id: "games", label: "Games", icon: Gamepad2, color: "#c4444f" },
    { id: "brands", label: "Brands", icon: Building2, color: "#e879f9" },
    { id: "teams", label: "Teams", icon: Shield, color: "#38bdf8" },
    { id: "trends", label: "Trends", icon: TrendingUp, color: "#c4508a" },
    { id: "compare", label: "Compare", icon: GitCompare, color: "#f97316" },
    { id: "shapes", label: "Layouts", icon: Layers, color: "#14b8a6" },
  ];

  const allBrands = ["All", ...new Set(keyboards.map(m => m.brand))];

  return (
    <div className="min-h-screen text-stone-800" style={{ background: "#f5f0e8", fontFamily: "'Outfit', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
        @media (max-width: 640px) {
          table { font-size: 11px !important; }
          table th, table td { padding: 6px 8px !important; white-space: nowrap; }
          .recharts-wrapper { font-size: 12px; }
          .recharts-polar-angle-axis-tick text { font-size: 11px !important; }
        }
        img[src*="/images/keyboards/"] {
          object-fit: contain;
          object-position: center;
        }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #06b6d440, #8b5cf640); border-radius: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        .ek-sidebar { width: 220px; transition: width 0.3s cubic-bezier(0.4,0,0.2,1); }
        .ek-sidebar.collapsed { width: 64px; }
        .ek-sidebar.collapsed:hover { width: 220px; }
        .ek-sidebar .tab-label { opacity: 1; transition: opacity 0.2s ease; white-space: nowrap; }
        .ek-sidebar.collapsed .tab-label { opacity: 0; }
        .ek-sidebar.collapsed:hover .tab-label { opacity: 1; }
      `}</style>

      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold" style={{ background: "#b8956a", color: "#1a1614" }}>Skip to content</a>

      {/* ─── GLOBAL SEARCH OVERLAY ─── */}
      {globalSearchOpen && (
        <div role="dialog" aria-label="Search" aria-modal="true" onClick={handleSearchBackdropClick} className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4" style={{ background: "rgba(30,26,22,0.25)", backdropFilter: "blur(8px)" }}>
          <div ref={globalSearchRef} role="search" className="w-full max-w-2xl rounded-2xl overflow-hidden glass-card" style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(6,182,212,0.15)", boxShadow: "0 25px 80px rgba(0,0,0,0.08), 0 0 40px rgba(6,182,212,0.06)" }}>
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "#06b6d410" }}>
              <Search size={18} style={{ color: "#06b6d4", flexShrink: 0 }} />
              <input
                ref={globalSearchInputRef}
                type="text"
                aria-label="Search keyboards, players, teams, games, and brands"
                role="searchbox"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Search keyboards, players, teams, games, brands..."
                autoFocus
                className="flex-1 bg-transparent outline-none text-stone-900 text-sm placeholder-stone-400"
                style={{ fontFamily: "'Fira Code', 'JetBrains Mono', monospace", fontSize: 15 }}
              />
              {globalSearch && (
                <button onClick={() => setGlobalSearch("")} className="p-1 rounded hover:bg-stone-100 transition-all">
                  <X size={14} style={{ color: "#a09890" }} />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded text-sm" style={{ background: "#00000008", color: "#a09890", border: "1px solid #e8e4df", fontSize: 11 }}>ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              {globalSearch.length < 2 && (
                <div className="px-5 py-8 text-center">
                  <div className="text-sm opacity-20 mb-3">Quick Search</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Wooting 60HE+", "s1mple", "Valorant", "Razer", "Cherry"].map(sug => (
                      <button key={sug} onClick={() => setGlobalSearch(sug)}
                        className="px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-stone-100"
                        style={{ background: "#0000000a", color: "#8a8078", border: "1px solid #e8e4df" }}>
                        {sug}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 text-sm opacity-15">
                    <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded mx-1" style={{ background: "#00000008", border: "1px solid #e8e4df" }}>⌘K</kbd> anytime to search</span>
                  </div>
                </div>
              )}

              {globalSearchNoResults && (
                <div className="px-5 py-10 text-center">
                  <div className="text-sm opacity-30 mb-1">No results found</div>
                  <div className="text-sm opacity-15">Try a different search term</div>
                </div>
              )}

              {globalSearchHasResults && (
                <div className="py-2">
                  {/* Keyboard Results */}
                  {globalSearchResults.keyboards.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#9060d4", opacity: 0.5, fontSize: 11 }}>
                        <Keyboard size={11} /> Keyboards
                      </div>
                      {globalSearchResults.keyboards.map(m => {
                        const brandCol = BRAND_COLORS[m.brand] || "#8a8078";
                        return (
                          <button key={m.id} onClick={() => handleSearchResultClick("keyboard", m)}
                            className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${brandCol}15`, border: `1px solid ${brandCol}20` }}>
                              <Keyboard size={14} style={{ color: brandCol }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold truncate" style={{ color: brandCol }}>{m.name}</div>
                              <div className="text-xs truncate" style={{ color: "#a09890" }}>{m.brand} · {m.weight}g · {m.switchType} · ${m.price}</div>
                            </div>
                            {m.proUsage > 0 && (
                              <div className="flex-shrink-0 px-2 py-0.5 rounded text-sm font-bold" style={{ background: "#b8956a18", color: "#b8956a", fontSize: 11 }}>
                                {m.proUsage}% pro
                              </div>
                            )}
                            <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Players Results */}
                  {globalSearchResults.players.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#6b8cad", opacity: 0.5, fontSize: 11 }}>
                        <Users size={11} /> Players
                      </div>
                      {globalSearchResults.players.map((p, i) => {
                        const gameColors = GAME_COLORS;
                        const gCol = gameColors[p.game] || "#8a8078";
                        return (
                          <button key={`${p.name}-${p.game}-${i}`} onClick={() => handleSearchResultClick("player", p)}
                            className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm" style={{ background: `${gCol}15`, border: `1px solid ${gCol}20` }}>
                              {p.country ? <Flag country={p.country} size={14} /> : <Gamepad2 size={14} style={{ color: "#a09890" }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold truncate">{p.name} {p.fullName ? <span className="font-normal opacity-30 text-sm">({p.fullName})</span> : null}</div>
                              <div className="text-xs truncate" style={{ color: "#a09890" }}>{p.team} · <span style={{ color: gCol }}>{p.game}</span> · {p.keyboard}</div>
                            </div>
                            {p.hasProfile && (
                              <div className="flex-shrink-0 px-2 py-0.5 rounded text-sm font-bold" style={{ background: "#6b8cad18", color: "#6b8cad", fontSize: 11 }}>
                                Profile
                              </div>
                            )}
                            <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Teams Results */}
                  {globalSearchResults.teams.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#b8956a", opacity: 0.5, fontSize: 11 }}>
                        <Building2 size={11} /> Teams
                      </div>
                      {globalSearchResults.teams.map((t, i) => (
                        <button key={`${t.name}-${i}`} onClick={() => handleSearchResultClick("team", t)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#b8956a18", border: "1px solid #b8956a30" }}>
                            <Building2 size={14} style={{ color: "#b8956a" }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate">{t.name}</div>
                            <div className="text-xs truncate" style={{ color: "#a09890" }}>{t.playerCount} players · {t.games.join(", ")}</div>
                          </div>
                          <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Games Results */}
                  {globalSearchResults.games.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#c4444f", opacity: 0.5, fontSize: 11 }}>
                        <Gamepad2 size={11} /> Games
                      </div>
                      {globalSearchResults.games.map((g, i) => (
                        <button key={`${g.id}-${i}`} onClick={() => handleSearchResultClick("game", g)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${g.color}15`, border: `1px solid ${g.color}20` }}>
                            <Gamepad2 size={14} style={{ color: g.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate" style={{ color: g.color }}>{g.name}</div>
                            <div className="text-xs truncate" style={{ color: "#a09890" }}>{g.playerCount} pros tracked</div>
                          </div>
                          <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Brands Results */}
                  {globalSearchResults.brands.length > 0 && (
                    <div className="mb-1">
                      <div className="px-5 py-2 text-sm uppercase tracking-widest flex items-center gap-2" style={{ color: "#b8956a", opacity: 0.5, fontSize: 11 }}>
                        <Building2 size={11} /> Brands
                      </div>
                      {globalSearchResults.brands.map((b, i) => (
                        <button key={`${b.name}-${i}`} onClick={() => handleSearchResultClick("brand", b)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-stone-100 transition-all group">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${b.color}15`, border: `1px solid ${b.color}20` }}>
                            <span className="text-sm font-black" style={{ color: b.color }}>{b.name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate" style={{ color: b.color }}>{b.name}</div>
                            <div className="text-xs truncate" style={{ color: "#a09890" }}>{b.keyboardCount} keyboards in database</div>
                          </div>
                          <span className="text-sm opacity-0 group-hover:opacity-30 transition-opacity flex-shrink-0">↗</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {globalSearchHasResults && (
              <div className="px-5 py-2.5 border-t flex items-center justify-between text-sm" style={{ borderColor: "#00000008", color: "#00000015" }}>
                <span>
                  {globalSearchResults.keyboards.length + globalSearchResults.players.length + globalSearchResults.teams.length + globalSearchResults.games.length + globalSearchResults.brands.length} results
                </span>
                <span className="hidden sm:inline">↑↓ navigate · ↵ select · esc close</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── NEWSLETTER MODAL ─── */}
      {newsletterPopup && newsletterStatus !== "success" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ background: "rgba(30,26,22,0.25)", backdropFilter: "blur(8px)" }} onClick={() => setNewsletterPopup(false)}>
          <div className="w-full max-w-md rounded-2xl p-8 text-center" style={{ background: "#f8f6f3", border: "1px solid #b8956a18", boxShadow: "0 25px 80px rgba(0,0,0,0.06), 0 0 40px rgba(184,149,106,0.08)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span style={{ color: "#b8956a", fontSize: 22 }}>📬</span>
              <span className="text-sm font-black uppercase tracking-widest" style={{ color: "#b8956a" }}>Newsletter</span>
            </div>
            <div className="text-xl font-black text-stone-900 mb-2">Stay ahead of the meta</div>
            <div className="text-sm mb-6" style={{ color: "#a09890" }}>Pro gear changes, new keyboard releases, and data-driven insights. No spam.</div>
            <form className="flex gap-2" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); setNewsletterPopup(false); } catch { setNewsletterStatus("error"); } }}>
              <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} autoFocus
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none" style={{ background: "#ffffff", border: "1px solid #d4cfc8", color: "#1a1614", minWidth: 0 }} />
              <button type="submit" disabled={newsletterStatus === "sending"} className="px-6 py-3 rounded-lg text-sm font-black transition-all hover:scale-105 disabled:opacity-50 whitespace-nowrap" style={{ background: "#b8956a", color: "#1a1614" }}>
                {newsletterStatus === "sending" ? "..." : "Subscribe"}
              </button>
            </form>
            {newsletterStatus === "error" && <div className="text-sm mt-3" style={{ color: "#c44040" }}>Something went wrong. Try again.</div>}
            <button onClick={() => setNewsletterPopup(false)} className="text-sm opacity-20 hover:opacity-50 mt-5 transition-all">Close</button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
           NAVIGATION — Gradient Top Bar + Vertical Sidebar
           ═══════════════════════════════════════════════════════ */}

      {/* ─── SLIM GRADIENT TOP BAR ─── */}
      <header className="sticky top-0 z-50" style={{ height: 64 }}>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #06b6d4)",
          backgroundSize: "200% 100%",
          animation: "gradient-shift 6s ease infinite",
        }} />
        <div className="relative h-full max-w-full mx-auto px-4 sm:px-6 flex items-center justify-between md:ml-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => { setActiveTab("overview"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span className="inline-flex transition-transform duration-300 group-hover:scale-110" style={{ filter: "brightness(0) invert(1)" }}>{I.keyboard(26)}</span>
            <div className="flex flex-col">
              <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 3, color: "#fff", lineHeight: 1 }}>ESPORTSKEYBOARDS.COM</span>
              <span style={{ fontSize: 9, letterSpacing: 2.5, color: "rgba(255,255,255,0.7)", fontWeight: 600, textTransform: "uppercase" }}>Pro Keyboard Data</span>
            </div>
          </div>

          {/* Center: Search command bar */}
          <button onClick={() => { setGlobalSearchOpen(true); setTimeout(() => globalSearchInputRef.current?.focus(), 50); }}
            aria-label="Search (Ctrl+K)" className="hidden sm:flex items-center gap-3 px-5 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", minWidth: 280 }}>
            <Search size={14} />
            <span>Search keyboards, players, games...</span>
            <kbd className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>⌘K</kbd>
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 text-xs mr-2" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span>{allPlayers.length}+ Pros</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span>{keyboards.length} Keyboards</span>
            </div>
            {/* Mobile search */}
            <button onClick={() => { setGlobalSearchOpen(true); setTimeout(() => globalSearchInputRef.current?.focus(), 50); }}
              aria-label="Search" className="sm:hidden p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Search size={16} style={{ color: "#fff" }} />
            </button>
            {/* Subscribe */}
            {newsletterStatus === "success" ? (
              <span style={{ fontSize: 11, color: "#fff" }} className="font-bold hidden sm:inline">✓ Subscribed</span>
            ) : (
              <button onClick={() => setNewsletterPopup(true)}
                className="hidden sm:inline-flex px-4 py-1.5 rounded-xl font-bold text-xs transition-all hover:shadow-lg"
                style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", letterSpacing: 1, backdropFilter: "blur(8px)" }}>
                Subscribe
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── DESKTOP SIDEBAR ─── */}
      <nav aria-label="Main navigation" className={`ek-sidebar hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 overflow-y-auto overflow-x-hidden${sidebarCollapsed ? " collapsed" : ""}`}
        style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex flex-col gap-1 py-4 px-2 flex-1">
          {tabs.map(t => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => { setActiveTab(t.id); if (t.id === "players") setSelectedPlayer(null); if (t.id === "lab") { setQuizStep(0); setQuizDone(false); } window.scrollTo({ top: 0, behavior: "smooth" }); }}
                role="tab" aria-selected={isActive} aria-controls="main-content"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 relative"
                style={{
                  background: isActive ? `${t.color}10` : "transparent",
                  color: isActive ? t.color : "#6b635b",
                  borderLeft: isActive ? `3px solid ${t.color}` : "3px solid transparent",
                  minHeight: 40,
                }}>
                <Icon size={18} strokeWidth={2} style={{ color: isActive ? t.color : "#a09890", flexShrink: 0 }} />
                <span className="tab-label" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{t.label}</span>
                {isActive && <div className="absolute right-2 w-1.5 h-1.5 rounded-full tab-label" style={{ background: t.color }} />}
              </button>
            );
          })}
        </div>
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex items-center justify-center px-2 py-3 transition-all hover:bg-black/5"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a09890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: sidebarCollapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
            <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
          </svg>
          <span className="tab-label text-xs ml-2" style={{ color: "#a09890" }}>{sidebarCollapsed ? "Expand" : "Collapse"}</span>
        </button>
      </nav>

      {/* ─── MOBILE BOTTOM TAB BAR ─── */}
      <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderTop: "1px solid rgba(0,0,0,0.06)", height: 64 }}>
        <div className="flex items-center justify-around h-full px-2">
          {[
            tabs.find(t => t.id === "overview"),
            tabs.find(t => t.id === "keyboards"),
            tabs.find(t => t.id === "players"),
            tabs.find(t => t.id === "lab"),
            tabs.find(t => t.id === "games"),
          ].filter(Boolean).map(t => {
            const isActive = activeTab === t.id;
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => {
                if (t.id === "players") setSelectedPlayer(null);
                if (t.id === "lab") { setQuizStep(0); setQuizDone(false); }
                const route = TAB_ROUTES[t.id] || "/";
                router.push(route, { scroll: false });
                setActiveTabRaw(t.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
                style={{ color: isActive ? t.color : "#a09890" }}>
                <Icon size={20} strokeWidth={2} />
                <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{t.label === "All Keyboards" ? "Keyboards" : t.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: t.color }} />}
              </button>
            );
          })}
          {/* More button for remaining tabs */}
          <button onClick={() => setMobileMenu(!mobileMenu)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
            style={{ color: mobileMenu ? "#8b5cf6" : "#a09890" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
            <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>More</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile "More" Menu Overlay ── */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.3)" }} onClick={() => setMobileMenu(false)}>
          <div className="absolute bottom-16 left-2 right-2 rounded-2xl p-4 glass-card" onClick={e => e.stopPropagation()}
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 -8px 40px rgba(0,0,0,0.1)" }}>
            <div className="grid grid-cols-4 gap-2">
              {tabs.filter(t => !["overview","keyboards","players","lab","games"].includes(t.id)).map(t => {
                const isActive = activeTab === t.id;
                const Icon = t.icon;
                return (
                  <button key={t.id} onClick={() => {
                    setMobileMenu(false);
                    const route = TAB_ROUTES[t.id] || "/";
                    router.push(route, { scroll: false });
                    setActiveTabRaw(t.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
                    style={{ background: isActive ? `${t.color}10` : "rgba(0,0,0,0.03)", border: isActive ? `1px solid ${t.color}25` : "1px solid transparent" }}>
                    <Icon size={18} strokeWidth={2} style={{ color: isActive ? t.color : "#a09890" }} />
                    <span style={{ fontSize: 10, fontWeight: 600, color: isActive ? t.color : "#6b635b" }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── Content wrapper with sidebar offset ─── */}
      <div className={`pb-20 md:pb-0 transition-all duration-300 ${sidebarCollapsed ? "md:ml-16" : "md:ml-[220px]"}`}>

      {/* ═══════════════════════════════════════════════════════
           HERO SECTION — Split Layout with Keycap Decorations
           ═══════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f0e8 0%, #ece6db 100%)" }}>
        {/* Decorative keycap grid pattern */}
        <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.04 }}>
          <div className="absolute top-8 left-8 grid grid-cols-5 gap-2" style={{ transform: "rotate(-8deg)" }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-lg" style={{ background: "#06b6d4", boxShadow: "0 0 8px #06b6d420" }} />
            ))}
          </div>
          <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-2" style={{ transform: "rotate(5deg)" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-md" style={{ background: "#8b5cf6", boxShadow: "0 0 8px #8b5cf620" }} />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left: Decorative keycap visual */}
            <div className="hidden md:flex justify-center" style={{ transition: "all 1s ease 0.2s", opacity: heroAnim ? 1 : 0, transform: heroAnim ? "translateX(0)" : "translateX(-20px)" }}>
              <div className="grid grid-cols-5 gap-2.5" style={{ perspective: "600px" }}>
                {["ESC","1","2","3","4","Q","W","E","R","T","A","S","D","F","G","Z","X","C","V","B"].map((key, i) => (
                  <div key={key} className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-500"
                    style={{
                      background: i % 7 === 0 ? "linear-gradient(135deg, #06b6d440, #06b6d425)" : i % 5 === 0 ? "linear-gradient(135deg, #8b5cf640, #8b5cf625)" : "rgba(255,255,255,0.75)",
                      border: "1.5px solid rgba(0,0,0,0.08)",
                      boxShadow: i % 7 === 0 ? "0 0 16px #06b6d428, 0 2px 8px #00000012" : i % 5 === 0 ? "0 0 16px #8b5cf628, 0 2px 8px #00000012" : "0 2px 6px #00000008",
                      color: i % 7 === 0 ? "#0891b2" : i % 5 === 0 ? "#7c3aed" : "#8a8078",
                      fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                      animationDelay: `${i * 50}ms`,
                    }}>
                    {key}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Headline + stats */}
            <div style={{ transition: "all 1s ease", opacity: heroAnim ? 1 : 0, transform: heroAnim ? "translateY(0)" : "translateY(20px)" }}>
              {/* Eyebrow - keycap style */}
              <div className="mb-4 sm:mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(135deg, #06b6d410, #8b5cf610)",
                    color: "#06b6d4",
                    border: "1px solid #06b6d418",
                    borderBottom: "2px solid #06b6d430",
                    boxShadow: "0 2px 0 rgba(6, 182, 212, 0.2)"
                  }}>
                  The Definitive Resource
                </span>
              </div>
              {/* Main heading - enhanced */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, color: "#1a1614" }}>
                Pro Esports<br />
                <span style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Keyboards</span>
              </h1>
              {/* Dynamic tagline subtitle */}
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed font-medium mb-3" style={{ color: "#06b6d4" }}>
                The definitive database of {keyboards.length} keyboards used by {allPlayers.length.toLocaleString()} professional esports players
              </p>
              {/* Secondary description */}
              <p className="max-w-xl text-sm sm:text-base leading-relaxed" style={{ color: "#6b635b" }}>
                Rankings, specifications, comparisons, and pro settings across {new Set(allPlayers.map(p=>p.game)).size} major esports titles.
              </p>
            </div>
          </div>

          {/* Stats strip - keyboard-themed with top borders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mt-10 sm:mt-14" style={{ transition: "all 0.8s ease 0.3s", opacity: heroAnim ? 1 : 0 }}>
            {[
              { val: allPlayers.length, label: "Pro Players", suffix: "", prefix: "", color: "#06b6d4" },
              { val: keyboards.length, label: "Keyboards", suffix: "", prefix: "", color: "#8b5cf6" },
              { val: new Set(allPlayers.map(p=>p.game)).size, label: "Games", suffix: "", prefix: "", color: "#f59e0b" },
              { val: Math.max(...keyboards.map(m => m.proUsage)), label: "Top Share", suffix: "%", prefix: "", color: "#ec4899" },
            ].map((s, i) => (
              <div key={i} className="glass-card text-center p-4 transition-all duration-300 hover:-translate-y-0.5" style={{
                boxShadow: `0 0 12px ${s.color}08, inset 0 2px 0 ${s.color}20`,
                borderTop: `3px solid ${s.color}`,
                borderRadius: "0.75rem"
              }}>
                <div className="text-2xl sm:text-4xl font-black" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#1a1614" }}>
                  <AnimatedCounter value={s.val} suffix={s.suffix} prefix={s.prefix} color={s.color} duration={1600 + i * 200} />
                </div>
                <div className="text-xs sm:text-sm mt-2 font-semibold" style={{ color: "#a09890", letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative line - cyan to violet gradient */}
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, #06b6d430, #8b5cf630, transparent)" }} />
      </header>
      )}

      {/* ─── NAV TABS ─── */}


      {/* ─── CONTENT ─── */}
      <main id="main-content" role="main" className="max-w-7xl mx-auto px-3 sm:px-6 pb-20" style={{ transition: "opacity 180ms ease, transform 180ms ease", opacity: tabFade ? 1 : 0, transform: tabFade ? "translateY(0)" : "translateY(10px)" }}>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            <SectionTitle color="#06b6d4" sub={`Based on data from ${allPlayers.length} professional esports players across ${new Set(allPlayers.map(p=>p.game)).size} major titles`}>Keyboard Usage by Professional Players</SectionTitle>
            {/* ── Horizontal Race Bars ── */}
            <div className="glass-card rounded-2xl p-4 sm:p-6" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(0,0,0,0.06)" }}>
              {(() => {
                const maxUsage = Math.max(...proUsageChart.map(d => d.usage));
                return (
                  <div className="flex flex-col gap-2.5">
                    {proUsageChart.map((d, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-6 text-right flex-shrink-0" style={{ fontSize: 13, fontWeight: 800, color: "#a09890", fontFamily: "'Fira Code', monospace" }}>{i + 1}</span>
                        <div className="flex-1 relative rounded-xl overflow-hidden" style={{ height: 38, background: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.04)" }}>
                          <div className="h-full rounded-xl flex items-center pl-3 transition-all duration-1000" style={{ width: `${Math.max((d.usage / maxUsage) * 100, 12)}%`, background: `linear-gradient(90deg, ${d.fill}20, ${d.fill}60)` }}>
                            <span className="text-sm font-bold whitespace-nowrap" style={{ color: "#1a1614", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>{d.name}</span>
                          </div>
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-extrabold" style={{ color: d.fill, fontFamily: "'Fira Code', monospace" }}>{d.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* ── QUICK INSIGHTS ── */}
            {(() => {
              const keyboardCounts = {};
              allPlayers.forEach(p => { keyboardCounts[p.keyboard] = (keyboardCounts[p.keyboard] || 0) + 1; });
              const topKeyboardEntry = Object.entries(keyboardCounts).sort((a,b) => b[1]-a[1])[0];
              const lightest = [...keyboards].sort((a,b) => a.weight - b.weight)[0];
              const uniqueBrands = new Set(allPlayers.map(p => { const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name))); return m?.brand; }).filter(Boolean));
              const playerWeights = allPlayers.map(p => { const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name))); return m?.weight; }).filter(Boolean);
              const avgProWeight = playerWeights.length ? Math.round(playerWeights.reduce((a,b) => a+b, 0) / playerWeights.length) : 0;
              const rtCount = keyboards.filter(m => m.rapidTrigger).length;
              const rtPct = Math.round((rtCount / keyboards.length) * 100);
              return (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 my-4 sm:my-6 text-center">
                {[
                  { label: "Most Used Keyboard", value: topKeyboardEntry[0].replace(/(Wooting |Razer )/, ""), sub: `${Math.round(topKeyboardEntry[1]/allPlayers.length*100)}% of pros`, color: "#b8956a", icon: "crown", numeric: false },
                  { label: "Brands in Pro Use", value: uniqueBrands.size, sub: "competing for pros", color: "#6b8cad", icon: "signal", numeric: true, numVal: uniqueBrands.size, numSuffix: "" },
                  { label: "Lightest Keyboard", value: `${lightest.weight}g`, sub: lightest.name.replace(/(Wooting |DrunkDeer )/, ""), color: "#c4508a", icon: "wind", numeric: true, numVal: lightest.weight, numSuffix: "g" },
                  { label: "Avg Keyboard Weight", value: `${avgProWeight}g`, sub: "across all pros", color: "#b8956a", icon: "gear", numeric: true, numVal: avgProWeight, numSuffix: "g" },
                  { label: "Rapid Trigger", value: `${rtPct}%`, sub: `${rtCount} of ${keyboards.length} keyboards`, color: "#9060c4", icon: "bolt", numeric: true, numVal: rtPct, numSuffix: "%" },
                ].map((card, i) => (
                  <div key={i} className="rounded-[10px] p-2 sm:p-4 text-center transition-all duration-200 hover:-translate-y-0.5" style={{
                    background: `linear-gradient(180deg, #ffffff 0%, ${card.color}04 100%)`,
                    border: `1px solid ${card.color}15`,
                    boxShadow: `0 3px 0 ${card.color}35, 0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)`,
                    cursor: "pointer"
                  }}
                  onMouseDown={(e) => e.currentTarget.style.boxShadow = `0 1px 0 ${card.color}35, inset 0 2px 4px rgba(0,0,0,0.08)`}
                  onMouseUp={(e) => e.currentTarget.style.boxShadow = `0 3px 0 ${card.color}35, 0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 3px 0 ${card.color}35, 0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)`}>
                    <div className="mb-1.5 flex items-center justify-center" style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: `${card.color}14`,
                      margin: "0 auto 0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {icon(card.icon, 20)}
                    </div>
                    <div className="text-sm sm:text-lg font-black leading-tight" style={{ color: card.color }}>
                      {card.numeric
                        ? <AnimatedCounter value={card.numVal} suffix={card.numSuffix || ""} color={card.color} duration={1400 + i * 200} />
                        : card.value
                      }
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: "#a09890" }}>{card.label}</div>
                    <div style={{ fontSize: 11, color: "#c4bfb8" }} className="mt-1">{card.sub}</div>
                    {i === 0 && <a href={amazonLink(topKeyboardEntry[0])} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-xs font-bold no-underline hover:scale-105 transition-all" style={{ background: "#b8956a18", color: "#b8956a", textDecoration: "none", fontSize: 10 }}>{I.cart(9)} Buy</a>}
                    {i === 3 && <a href={amazonLink(lightest.name)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-xs font-bold no-underline hover:scale-105 transition-all" style={{ background: "#b8956a18", color: "#b8956a", textDecoration: "none", fontSize: 10 }}>{I.cart(9)} Buy</a>}
                  </div>
                ))}
              </div>
              );
            })()}

            <SectionTitle color="#b8956a" sub="Select any keyboard to explore specs, pro users, and performance data">Featured Keyboard Spotlight</SectionTitle>
              <div className="rounded-2xl p-3 sm:p-5 mb-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                {/* ── Keyboard Picker: Top 20 keyboards by pro usage ── */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[...keyboards].sort((a, b) => b.proUsage - a.proUsage).slice(0, 20).map(m => (
                    <button key={m.id} onClick={() => setSelectedKeyboard(m)}
                      className="px-2.5 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap hover:scale-[1.03] cursor-pointer"
                      style={{
                        background: selectedKeyboard?.id === m.id ? `${BRAND_COLORS[m.brand]}15` : "#f5f2ee",
                        color: selectedKeyboard?.id === m.id ? BRAND_COLORS[m.brand] : "#6b635b",
                        border: selectedKeyboard?.id === m.id ? `1px solid ${BRAND_COLORS[m.brand]}40` : "1px solid #e8e4df",
                        fontSize: 12,
                      }}>
                      {m.name.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")}
                    </button>
                  ))}
                </div>

                {selectedKeyboard && (() => {
                  const brandCol = BRAND_COLORS[selectedKeyboard.brand];
                  const imgUrl = KEYBOARD_IMAGE_URLS[selectedKeyboard.name];
                  return (
                  <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Left: Keyboard image */}
                    <div className="flex flex-col items-center justify-center rounded-xl p-4" style={{ background: `${brandCol}06`, border: `1px solid ${brandCol}12` }}>
                      {imgUrl ? (
                        <img loading="lazy" src={imgUrl} alt={`${selectedKeyboard.name} by ${selectedKeyboard.brand} - ${selectedKeyboard.weight}g wireless esports gaming keyboard`} className="w-full max-h-32 sm:max-h-48 object-contain object-center mb-3 rounded-lg" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.08))" }}
                          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                      ) : null}
                      <div className={imgUrl ? "hidden" : "flex"} style={{ width: 180, height: 160, alignItems: "center", justifyContent: "center", background: `${brandCol}10`, borderRadius: 16 }}>
                        <span className="inline-block">{icon(selectedKeyboard.image, 80)}</span>
                      </div>
                      <div className="text-xl font-black mt-2 text-center cursor-pointer hover:underline" style={{ color: brandCol }} onClick={() => navigateToKeyboard(selectedKeyboard)}>{selectedKeyboard.name}</div>
                      <div className="text-sm opacity-85 text-center">{selectedKeyboard.brand} · {selectedKeyboard.layout} · {selectedKeyboard.connectivity}</div>
                    </div>

                    {/* Center: Radar chart */}
                    <div className="flex flex-col items-center justify-center md:col-span-2 lg:col-span-1">
                      <ResponsiveContainer width="100%" height={200}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#e8e4df" />
                          <PolarAngleAxis dataKey="stat" tick={{ fill: "#6b635b", fontSize: 13 }} />
                          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                          <Radar name={selectedKeyboard.name} dataKey="value" stroke={brandCol} fill={brandCol} fillOpacity={0.2} strokeWidth={2.5} dot={{ r: 3, fill: brandCol, strokeWidth: 0 }} />
                        </RadarChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full mt-2">
                        <StatBox label="Weight" value={selectedKeyboard.weight} unit="g" color={brandCol} />
                        <StatBox label="Actuation" value={`${selectedKeyboard.actuationPoint}mm`} color={brandCol} />
                        <StatBox label="Poll Rate" value={selectedKeyboard.pollingRate >= 1000 ? `${selectedKeyboard.pollingRate / 1000}K` : selectedKeyboard.pollingRate} unit="Hz" color={brandCol} />
                        <StatBox label="Price" value={`$${selectedKeyboard.price}`} color={brandCol} />
                      </div>
                      <a href={amazonLink(selectedKeyboard.name)} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm font-black transition-all mt-2"
                        style={{ background: brandCol, color: "#fff" }}>
                        {I.cart(16, "#fff")} Buy on Amazon
                      </a>
                    </div>

                    {/* Right: Pro users */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Notable Pro Users</div>
                      {usedByPros.length > 0 ? (
                        <div className="space-y-2">
                          {usedByPros.slice(0, 3).map((p, i) => {
                            const gameColors = GAME_COLORS;
                            const gc = gameColors[p.game] || "#8a8078";
                            return (
                              <button key={i} onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { navigateToPlayer(pp); } else { setActiveTab("players"); } }}
                                className="w-full flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all hover:scale-[1.02] text-left"
                                style={{ background: `${gc}08`, border: `1px solid ${gc}15` }}>
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${gc}15` }}>
                                  <Flag country={p.country} size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-black">{p.name}</div>
                                  <div className="text-sm" style={{ color: "#6b635b" }}>{p.team} · <span style={{ color: gc }}>{p.game}</span> · {p.role}</div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className="text-sm font-bold" style={{ color: gc }}>{p.game}</div>
                                  <div className="text-xs opacity-60">{p.role}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-sm opacity-20 py-8 text-center">No tracked pros currently using this keyboard</div>
                      )}
                    </div>
                  </div>

                  {/* ── Keyboard Description ── */}
                  {KEYBOARD_DESCRIPTIONS[selectedKeyboard.name] && (() => {
                    const desc = KEYBOARD_DESCRIPTIONS[selectedKeyboard.name];
                    const brandCol = BRAND_COLORS[selectedKeyboard.brand];
                    const parts = [];
                    
                    if (desc.highlights && desc.highlights.length > 0) {
                      // Sort highlights by position in text
                      const sorted = [...desc.highlights]
                        .map(h => ({ h, idx: desc.text.indexOf(h) }))
                        .filter(x => x.idx !== -1)
                        .sort((a, b) => a.idx - b.idx);
                      
                      let cursor = 0;
                      sorted.forEach(({ h, idx }) => {
                        if (idx > cursor) parts.push({ text: desc.text.slice(cursor, idx), highlight: false });
                        parts.push({ text: h, highlight: true });
                        cursor = idx + h.length;
                      });
                      if (cursor < desc.text.length) parts.push({ text: desc.text.slice(cursor), highlight: false });
                    } else {
                      parts.push({ text: desc.text, highlight: false });
                    }

                    return (
                      <div className="rounded-xl p-5 mt-4" style={{ background: `${brandCol}05`, border: `1px solid ${brandCol}10` }}>
                        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#a09890" }}>About this keyboard</div>
                        <p className="text-sm leading-relaxed opacity-60">
                          {parts.map((p, i) => p.highlight ? (
                            <span key={i} className="font-bold opacity-100" style={{ color: brandCol }}>{p.text}</span>
                          ) : (
                            <span key={i}>{p.text}</span>
                          ))}
                        </p>
                      </div>
                    );
                  })()}

                  {/* ── Magazine Spread Editorial Design ── */}
                  {(() => {
                    const keyboardPlayers = allPlayers.filter(p => p.keyboard && (p.keyboard === selectedKeyboard.name || p.keyboard.includes(selectedKeyboard.name.split(" ").slice(-2).join(" "))));
                    const totalTracked = allPlayers.length;
                    const marketShare = totalTracked > 0 ? ((keyboardPlayers.length / totalTracked) * 100).toFixed(1) : 0;

                    const gameDistro = {};
                    keyboardPlayers.forEach(p => { gameDistro[p.game] = (gameDistro[p.game] || 0) + 1; });
                    const topGames = Object.entries(gameDistro).sort((a, b) => b[1] - a[1]);
                    const gcols = { CS2: "#c47000", Valorant: "#c43848", LoL: "#c89b3c", Fortnite: "#3a60b0", "Overwatch 2": "#c48018", Apex: "#a82020", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };

                    const countryCounts = {};
                    keyboardPlayers.forEach(p => { if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1; });
                    const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

                    const teamCounts = {};
                    keyboardPlayers.forEach(p => { if (p.team && p.team !== "Content" && p.team !== "Inactive") teamCounts[p.team] = (teamCounts[p.team] || 0) + 1; });
                    const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

                    const allKeyboardCounts = {};
                    allPlayers.forEach(p => { if (p.keyboard) allKeyboardCounts[p.keyboard] = (allKeyboardCounts[p.keyboard] || 0) + 1; });
                    const ranked = Object.entries(allKeyboardCounts).sort((a, b) => b[1] - a[1]);
                    const rank = ranked.findIndex(([name]) => name === selectedKeyboard.name || name.includes(selectedKeyboard.name.split(" ").slice(-2).join(" "))) + 1;

                    const competitors = keyboards.filter(m => m.id !== selectedKeyboard.id && m.layout === selectedKeyboard.layout && m.connectivity === selectedKeyboard.connectivity)
                      .sort((a, b) => b.proUsage - a.proUsage).slice(0, 3);

                    if (keyboardPlayers.length === 0) return <div className="mt-4 rounded-lg p-6 text-center text-sm opacity-20" style={{ background: "#00000008" }}>No tracked players found for this keyboard in our database</div>;

                    return (
                      <div className="mt-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${brandCol}12` }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ background: "#ffffff" }}>
                          {/* LEFT COLUMN: Keyboard Dossier */}
                          <div className="p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: `${brandCol}12` }}>
                            <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Keyboard Dossier</div>
                            <h2 className="text-4xl font-black mb-6" style={{ color: brandCol }}>
                              {selectedKeyboard.name.replace(selectedKeyboard.brand + " ", "")}
                            </h2>

                            {/* Hero stats row */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                              <div>
                                <div className="text-2xl font-black" style={{ color: brandCol }}>{keyboardPlayers.length}</div>
                                <div className="text-xs opacity-60">Pro Users</div>
                              </div>
                              <div>
                                <div className="text-2xl font-black" style={{ color: brandCol }}>{marketShare}%</div>
                                <div className="text-xs opacity-60">Market Share</div>
                              </div>
                              <div>
                                <div className="text-2xl font-black" style={{ color: brandCol }}>#{rank}</div>
                                <div className="text-xs opacity-60">Popularity</div>
                              </div>
                            </div>

                            {/* Pull quote */}
                            <div className="pl-4 py-4 mb-6" style={{ borderLeft: `3px solid ${brandCol}` }}>
                              <p className="text-sm font-bold opacity-85">
                                A {selectedKeyboard.connectivity === "Wireless" ? "wireless" : "wired"} {selectedKeyboard.layout} with {selectedKeyboard.switchType} switches at {selectedKeyboard.pollingRate}Hz polling rate. {selectedKeyboard.rapidTrigger ? "Rapid Trigger enabled." : ""} Chosen by {keyboardPlayers.length} tracked esports professionals across {topGames.length} competitive titles.
                              </p>
                            </div>
                          </div>

                          {/* RIGHT COLUMN: Details */}
                          <div className="p-6 space-y-5">
                            {/* Where It's Used - Game Pills */}
                            {topGames.length > 0 && (
                              <div>
                                <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Where It's Used</div>
                                <div className="flex flex-wrap gap-2">
                                  {topGames.slice(0, 4).map(([game, count]) => (
                                    <div key={game} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: `${gcols[game] || "#8a8078"}20`, color: gcols[game] || "#8a8078" }}>
                                      {game} ({((count / keyboardPlayers.length) * 100).toFixed(0)}%)
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Specs DNA */}
                            <div>
                              <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Specs DNA</div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="opacity-60">Polling Rate</span>
                                  <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.pollingRate}Hz</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="opacity-60">Actuation</span>
                                  <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.actuationPoint}mm</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="opacity-60">Switch Type</span>
                                  <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.switchType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="opacity-60">Rapid Trigger</span>
                                  <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.rapidTrigger ? "Yes" : "No"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="opacity-60">Layout</span>
                                  <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.layout}</span>
                                </div>
                              </div>
                            </div>

                            {/* Global Reach */}
                            {topCountries.length > 0 && (
                              <div>
                                <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Global Reach</div>
                                <div className="flex flex-wrap gap-2">
                                  {topCountries.map(([flag, count]) => (
                                    <span key={flag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs" style={{ background: `${brandCol}10` }}>
                                      <Flag country={flag} size={14} />
                                      <span className="font-bold" style={{ color: brandCol }}>{count}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Rivals */}
                            {competitors.length > 0 && (
                              <div>
                                <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Rivals</div>
                                <div className="space-y-2">
                                  {competitors.map(c => {
                                    const cc = BRAND_COLORS[c.brand] || "#8a8078";
                                    return (
                                      <button key={c.id} onClick={() => { navigateToKeyboard(c); }}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all hover:scale-105 justify-between"
                                        style={{ background: `${cc}08`, border: `1px solid ${cc}15` }}>
                                        <div className="flex items-center gap-2">
                                          {KEYBOARD_IMAGE_URLS[c.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[c.name]} alt={c.name} className="h-5 object-contain" />}
                                          <span className="font-bold" style={{ color: cc }}>{c.name.replace(c.brand + " ", "")}</span>
                                        </div>
                                        <span className="opacity-60">{c.switchType}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  </>
                  );
                })()}
              </div>


            {/* Gear Check Callout */}
            {(() => {
              const hotKeyboard = gameBreakdown[1]?.topKeyboards[0]?.name || "Wooting 60HE+";
              const hotGame = gameBreakdown[1]?.game || "Valorant";
              const hotPct = gameBreakdown[1]?.topKeyboards[0]?.pct || 30;
              const hm = keyboards.find(m => m.name === hotKeyboard);
              return (
                <div className="rounded-xl p-4 my-6 flex flex-col sm:flex-row items-center gap-4" style={{ background: "linear-gradient(135deg, #b8956a08, #b8956a03)", border: "1px solid #b8956a25" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold" style={{ color: "#b8956a" }}>Trending Now</div>
                      <div className="text-sm font-bold" style={{ color: "#1a1614" }}>{hotKeyboard} — used by {hotPct}% of {hotGame} pros</div>
                      {hm && <div style={{ fontSize: 11, color: "#a09890" }}>{hm.weight}g · {hm.switchType} · {hm.connectivity}</div>}
                    </div>
                  </div>
                  <a href={amazonLink(hotKeyboard)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 no-underline flex-shrink-0" style={{ background: "#b8956a", color: "#1a1614", textDecoration: "none" }}>
                    {I.cart(14, "#1a1614")} Buy on Amazon{hm ? ` — $${hm.price}` : ""}
                  </a>
                </div>
              );
            })()}

            {/* Popular Comparisons */}
            <div className="mb-4">
              <div className="text-xs uppercase tracking-widest opacity-25 mb-3 font-bold">Popular Comparisons</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { a: "Wooting 60HE+", b: "Razer Huntsman V3 Pro Mini" },
                  { a: "Wooting 60HE", b: "Wooting 60HE+" },
                  { a: "DrunkDeer A75", b: "Wooting 60HE" },
                  { a: "Wooting 60HE+", b: "SteelSeries Apex Pro TKL (2024)" },
                  { a: "Corsair K65 Plus", b: "Wooting 60HE+" },
                ].map(c => {
                  const sa = c.a.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                  const sb = c.b.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                  return <a key={sa+sb} href={`/compare/${sa}-vs-${sb}`} className="text-xs px-3 py-1.5 rounded-full no-underline transition-all hover:scale-105" style={{ background: "#0000000a", border: "1px solid #d4cfc8", color: "#8a8078", textDecoration: "none" }}>{c.a.replace(/(Wooting |Razer )/, "")} vs {c.b.replace(/(Wooting |Razer )/, "")}</a>;
                })}
              </div>
            </div>

            {/* ── EDITORIAL COLLECTIONS ── */}
            <div className="mt-10 sm:mt-16 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl mb-2" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, color: "#1a1614" }}>Curated Collections</h2>
                <p className="text-sm" style={{ color: "#a09890" }}>Hand-picked guides for competitive players</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {[
                  { title: "Tournament Favorites", sub: "The keyboards winning major championships", href: "/best/cs2", accent: "#b8956a", tag: "Most Popular" },
                  { title: "Rapid Trigger Boards", sub: "Sub-0.1mm actuation for competitive FPS", href: "/best/rapid-trigger", accent: "#c02870", tag: "Trending" },
                  { title: "Best for Valorant", sub: "Top picks from professional Valorant players", href: "/best/valorant", accent: "#c43848", tag: "FPS" },
                  { title: "Budget Champions", sub: "Pro-grade performance under $100", href: "/best/budget", accent: "#0a8060", tag: "Value" },
                  { title: "Wireless Freedom", sub: "Cutting the cord without cutting performance", href: "/best/wireless", accent: "#2874a6", tag: "Wireless" },
                  { title: "The 60% Standard", sub: "Why compact layouts dominate esports", href: "/best/lightweight", accent: "#6d40c4", tag: "Compact" },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg no-underline block"
                    style={{ background: "#ffffff", border: "1px solid #e8e4df", textDecoration: "none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.accent}30`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e4df"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${c.accent}0a`, color: c.accent, border: `1px solid ${c.accent}18` }}>{c.tag}</span>
                      <span className="text-xs opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: c.accent }}>→</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#1a1614" }}>{c.title}</h3>
                    <p className="text-xs" style={{ color: "#a09890" }}>{c.sub}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="glass-card rounded-2xl p-5 sm:p-8 mt-8 mb-2 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.04), rgba(139,92,246,0.04))", border: "1px solid #06b6d415" }}>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {I.keyboard(20)}
                  <span className="text-sm font-black uppercase tracking-widest" style={{ color: "#06b6d4", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Newsletter</span>
                </div>
                <div className="text-base sm:text-lg font-black text-stone-900 mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Stay ahead of the meta</div>
                <div className="text-sm opacity-30 mb-4 max-w-md mx-auto">Pro gear changes, new keyboard releases, and data-driven insights delivered to your inbox. No spam.</div>
                {newsletterStatus === "success" ? (
                  <div className="text-sm font-black" style={{ color: "#06b6d4" }}>✓ You're subscribed!</div>
                ) : (
                  <form className="flex gap-2 max-w-sm mx-auto" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); } catch { setNewsletterStatus("error"); } }}>
                    <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid #06b6d420", color: "#1a1614" }} />
                    <button type="submit" disabled={newsletterStatus === "sending"} className="px-5 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-105 disabled:opacity-50" style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", color: "#fff" }}>
                      {newsletterStatus === "sending" ? "..." : "Subscribe"}
                    </button>
                  </form>
                )}
                {newsletterStatus === "error" && <div className="text-sm mt-2" style={{ color: "#c44040" }}>Something went wrong. Try again.</div>}
              </div>
            </div>

          </div>
        )}

        {/* ── KEYBOARD DETAIL PAGE ── */}
        {activeTab === "keyboardDetail" && selectedKeyboard && (() => {
          const brandCol = BRAND_COLORS[selectedKeyboard.brand];
          const imgUrl = KEYBOARD_IMAGE_URLS[selectedKeyboard.name];
          return (
          <div>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mt-8 mb-4 flex items-center gap-1.5 text-sm">
              <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
              <span style={{ color: "#d4cfc8" }}>›</span>
              <a href="/keyboards" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Keyboards</a>
              <span style={{ color: "#d4cfc8" }}>›</span>
              <span style={{ color: brandCol }} className="font-bold opacity-70">{selectedKeyboard.name}</span>
            </nav>

            {/* Share buttons */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#a09890" }}>Share</span>
              <button onClick={() => { navigator.clipboard.writeText(`https://esportskeyboards.com/keyboards/${selectedKeyboard.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`); }} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105" style={{ background: "#00000008", border: "1px solid #d4cfc8", color: "#1a1614" }}>📋 Copy Link</button>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedKeyboard.name + " — " + selectedKeyboard.weight + "g, " + selectedKeyboard.proUsage + "% pro usage")}&url=${encodeURIComponent("https://esportskeyboards.com/keyboards/" + selectedKeyboard.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#1da1f220", border: "1px solid #6b8cad30", color: "#1da1f2", textDecoration: "none" }}>𝕏 Tweet</a>
              <a href={`https://reddit.com/submit?url=${encodeURIComponent("https://esportskeyboards.com/keyboards/" + selectedKeyboard.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}&title=${encodeURIComponent(selectedKeyboard.name + " — Pro Usage, Specs & Review")}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c4737320", border: "1px solid #c4737330", color: "#ff4499", textDecoration: "none" }}>Reddit</a>
              <a href={`/contact?subject=correction&keyboard=${encodeURIComponent(selectedKeyboard.name)}`} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline ml-auto" style={{ background: "#0000000a", border: "1px solid #d4cfc8", color: "#8a8078", textDecoration: "none" }}>⚠️ Suggest Correction</a>
            </div>

            {/* Hero Section */}
            <div className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: "#ffffff", border: `1px solid ${brandCol}15` }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Left: Keyboard image */}
                <div className="flex flex-col items-center justify-center rounded-xl p-6" style={{ background: `${brandCol}06`, border: `1px solid ${brandCol}12` }}>
                  {imgUrl ? (
                    <img loading="lazy" src={imgUrl} alt={`${selectedKeyboard.name} by ${selectedKeyboard.brand} - professional esports gaming keyboard review`} className="w-full max-h-48 sm:max-h-64 object-contain object-center mb-4 rounded-lg" style={{ filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.08))" }}
                      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  ) : null}
                  <div className={imgUrl ? "hidden" : "flex"} style={{ width: 200, height: 180, alignItems: "center", justifyContent: "center", background: `${brandCol}10`, borderRadius: 16 }}>
                    <span className="inline-block">{icon(selectedKeyboard.image, 100)}</span>
                  </div>
                  <div className="text-2xl font-black mt-3 text-center" style={{ color: brandCol }}>{selectedKeyboard.name}</div>
                  <div className="text-sm opacity-85 text-center mt-1">{selectedKeyboard.brand} · {selectedKeyboard.layout} · {selectedKeyboard.connectivity}</div>
                </div>

                {/* Center: Radar chart + specs */}
                <div className="flex flex-col items-center justify-center md:col-span-2 lg:col-span-1">
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e8e4df" />
                      <PolarAngleAxis dataKey="stat" tick={{ fill: "#6b635b", fontSize: 13 }} />
                      <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                      <Radar name={selectedKeyboard.name} dataKey="value" stroke={brandCol} fill={brandCol} fillOpacity={0.2} strokeWidth={2.5} dot={{ r: 3, fill: brandCol, strokeWidth: 0 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-4 gap-2 w-full mt-2">
                    <StatBox label="Weight" value={selectedKeyboard.weight} unit="g" color={brandCol} />
                    <StatBox label="Actuation" value={`${selectedKeyboard.actuationPoint}mm`} color={brandCol} />
                    <StatBox label="Poll Rate" value={selectedKeyboard.pollingRate >= 1000 ? `${selectedKeyboard.pollingRate / 1000}K` : selectedKeyboard.pollingRate} unit="Hz" color={brandCol} />
                    <StatBox label="Price" value={`$${selectedKeyboard.price}`} color={brandCol} />
                  </div>
                  <a href={amazonLink(selectedKeyboard.name)} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-sm font-black transition-all mt-3"
                    style={{ background: brandCol, color: "#1a1614" }}>
                    {I.cart(16, "#1a1614")} Buy on Amazon
                  </a>
                </div>

                {/* Right: Pro users */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Notable Pro Users</div>
                  {usedByPros.length > 0 ? (
                    <div className="space-y-2">
                      {usedByPros.slice(0, 5).map((p, i) => {
                        const gameColors = GAME_COLORS;
                        const gc = gameColors[p.game] || "#8a8078";
                        return (
                          <button key={i} onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { navigateToPlayer(pp); } else { setActiveTab("players"); } }}
                            className="w-full flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all hover:scale-[1.02] text-left"
                            style={{ background: `${gc}08`, border: `1px solid ${gc}15` }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${gc}15` }}>
                              <Flag country={p.country} size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-black">{p.name}</div>
                              <div className="text-sm opacity-85">{p.team} · <span style={{ color: gc }}>{p.game}</span> · {p.role}</div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-sm font-bold" style={{ color: gc }}>{p.game}</div>
                              <div className="text-xs opacity-60">{p.role}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-sm opacity-20 py-8 text-center">No tracked pros currently using this keyboard</div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Keyboard Description ── */}
            {KEYBOARD_DESCRIPTIONS[selectedKeyboard.name] && (() => {
              const desc = KEYBOARD_DESCRIPTIONS[selectedKeyboard.name];
              const parts = [];
              if (desc.highlights && desc.highlights.length > 0) {
                const sorted = [...desc.highlights]
                  .map(h => ({ h, idx: desc.text.indexOf(h) }))
                  .filter(x => x.idx !== -1)
                  .sort((a, b) => a.idx - b.idx);
                let cursor = 0;
                sorted.forEach(({ h, idx }) => {
                  if (idx > cursor) parts.push({ text: desc.text.slice(cursor, idx), highlight: false });
                  parts.push({ text: h, highlight: true });
                  cursor = idx + h.length;
                });
                if (cursor < desc.text.length) parts.push({ text: desc.text.slice(cursor), highlight: false });
              } else {
                parts.push({ text: desc.text, highlight: false });
              }
              return (
                <div className="rounded-2xl p-6 mb-6" style={{ background: `${brandCol}05`, border: `1px solid ${brandCol}10` }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>About this keyboard</div>
                  <p className="text-sm leading-relaxed opacity-60">
                    {parts.map((p, i) => p.highlight ? (
                      <span key={i} className="font-bold opacity-100" style={{ color: brandCol }}>{p.text}</span>
                    ) : (
                      <span key={i}>{p.text}</span>
                    ))}
                  </p>
                </div>
              );
            })()}

            {/* ── Full Spec Table ── */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Full Specifications</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { label: "Brand", value: selectedKeyboard.brand },
                  { label: "Shape", value: selectedKeyboard.layout },
                  { label: "Connectivity", value: selectedKeyboard.connectivity },
                  { label: "Weight", value: `${selectedKeyboard.weight}g` },
                  { label: "Switch", value: selectedKeyboard.switchType },
                  { label: "Actuation", value: `${selectedKeyboard.actuationPoint}mm` },
                  { label: "Polling Rate", value: `${selectedKeyboard.pollingRate >= 1000 ? `${selectedKeyboard.pollingRate / 1000}K` : selectedKeyboard.pollingRate}Hz` },
                  { label: "Price", value: `$${selectedKeyboard.price}` },
                  { label: "Pro Usage", value: `${selectedKeyboard.proUsage}%` },
                  { label: "Rating", value: `${selectedKeyboard.rating}/10` },
                ].map((spec, idx) => (
                  <div key={idx} className="rounded-lg p-3" style={{ background: "#00000008" }}>
                    <div className="text-sm opacity-30 mb-1">{spec.label}</div>
                    <div className="text-sm font-bold" style={{ color: brandCol }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Magazine Spread Editorial Design ── */}
            {(() => {
              const keyboardPlayers = allPlayers.filter(p => p.keyboard && (p.keyboard === selectedKeyboard.name || p.keyboard.includes(selectedKeyboard.name.split(" ").slice(-2).join(" "))));
              const totalTracked = allPlayers.length;
              const marketShare = totalTracked > 0 ? ((keyboardPlayers.length / totalTracked) * 100).toFixed(1) : 0;
              const gameDistro = {};
              keyboardPlayers.forEach(p => { gameDistro[p.game] = (gameDistro[p.game] || 0) + 1; });
              const topGames = Object.entries(gameDistro).sort((a, b) => b[1] - a[1]);
              const gcols = { CS2: "#c47000", Valorant: "#c43848", LoL: "#c89b3c", Fortnite: "#3a60b0", "Overwatch 2": "#c48018", Apex: "#a82020", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };
              const countryCounts = {};
              keyboardPlayers.forEach(p => { if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1; });
              const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
              const teamCounts = {};
              keyboardPlayers.forEach(p => { if (p.team && p.team !== "Content" && p.team !== "Inactive") teamCounts[p.team] = (teamCounts[p.team] || 0) + 1; });
              const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
              const allKeyboardCounts = {};
              allPlayers.forEach(p => { if (p.keyboard) allKeyboardCounts[p.keyboard] = (allKeyboardCounts[p.keyboard] || 0) + 1; });
              const ranked = Object.entries(allKeyboardCounts).sort((a, b) => b[1] - a[1]);
              const rank = ranked.findIndex(([name]) => name === selectedKeyboard.name || name.includes(selectedKeyboard.name.split(" ").slice(-2).join(" "))) + 1;
              const competitors = keyboards.filter(m => m.id !== selectedKeyboard.id && m.layout === selectedKeyboard.layout && m.connectivity === selectedKeyboard.connectivity)
                .sort((a, b) => b.proUsage - a.proUsage).slice(0, 4);

              if (keyboardPlayers.length === 0) return <div className="rounded-2xl p-6 text-center text-sm opacity-20 mb-6" style={{ background: "#00000008" }}>No tracked players found for this keyboard in our database</div>;

              return (
                <div className="rounded-2xl overflow-hidden mb-6" style={{ border: `1px solid ${brandCol}12` }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ background: "#ffffff" }}>
                    {/* LEFT COLUMN: Keyboard Dossier */}
                    <div className="p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: `${brandCol}12` }}>
                      <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Keyboard Dossier</div>
                      <h2 className="text-4xl font-black mb-6" style={{ color: brandCol }}>
                        {selectedKeyboard.name.replace(selectedKeyboard.brand + " ", "")}
                      </h2>

                      {/* Hero stats row */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div>
                          <div className="text-2xl font-black" style={{ color: brandCol }}>{keyboardPlayers.length}</div>
                          <div className="text-xs opacity-60">Pro Users</div>
                        </div>
                        <div>
                          <div className="text-2xl font-black" style={{ color: brandCol }}>{marketShare}%</div>
                          <div className="text-xs opacity-60">Market Share</div>
                        </div>
                        <div>
                          <div className="text-2xl font-black" style={{ color: brandCol }}>#{rank}</div>
                          <div className="text-xs opacity-60">Popularity</div>
                        </div>
                      </div>

                      {/* Pull quote */}
                      <div className="pl-4 py-4 mb-6" style={{ borderLeft: `3px solid ${brandCol}` }}>
                        <p className="text-sm font-bold opacity-85">
                          A {selectedKeyboard.connectivity === "Wireless" ? "wireless" : "wired"} {selectedKeyboard.layout} with {selectedKeyboard.switchType} switches at {selectedKeyboard.pollingRate}Hz polling rate. {selectedKeyboard.rapidTrigger ? "Rapid Trigger enabled." : ""} Chosen by {keyboardPlayers.length} tracked esports professionals across {topGames.length} competitive titles.
                        </p>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Details */}
                    <div className="p-6 space-y-5">
                      {/* Where It's Used - Game Pills */}
                      {topGames.length > 0 && (
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Where It's Used</div>
                          <div className="flex flex-wrap gap-2">
                            {topGames.slice(0, 4).map(([game, count]) => (
                              <div key={game} className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: `${gcols[game] || "#8a8078"}20`, color: gcols[game] || "#8a8078" }}>
                                {game} ({((count / keyboardPlayers.length) * 100).toFixed(0)}%)
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Specs DNA */}
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Specs DNA</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="opacity-60">Polling Rate</span>
                            <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.pollingRate}Hz</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Actuation</span>
                            <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.actuationPoint}mm</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Switch Type</span>
                            <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.switchType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Rapid Trigger</span>
                            <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.rapidTrigger ? "Yes" : "No"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-60">Layout</span>
                            <span className="font-bold" style={{ color: brandCol }}>{selectedKeyboard.layout}</span>
                          </div>
                        </div>
                      </div>

                      {/* Global Reach */}
                      {topCountries.length > 0 && (
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Global Reach</div>
                          <div className="flex flex-wrap gap-2">
                            {topCountries.map(([flag, count]) => (
                              <span key={flag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs" style={{ background: `${brandCol}10` }}>
                                <Flag country={flag} size={14} />
                                <span className="font-bold" style={{ color: brandCol }}>{count}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rivals */}
                      {competitors.length > 0 && (
                        <div>
                          <div className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: "#a09890" }}>Rivals</div>
                          <div className="space-y-2">
                            {competitors.map(c => {
                              const cc = BRAND_COLORS[c.brand] || "#8a8078";
                              return (
                                <button key={c.id} onClick={() => { setSelectedKeyboard(c); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all hover:scale-105 justify-between"
                                  style={{ background: `${cc}08`, border: `1px solid ${cc}15` }}>
                                  <div className="flex items-center gap-2">
                                    {KEYBOARD_IMAGE_URLS[c.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[c.name]} alt={c.name} className="h-5 object-contain" />}
                                    <span className="font-bold" style={{ color: cc }}>{c.name.replace(c.brand + " ", "")}</span>
                                  </div>
                                  <span className="opacity-60">{c.switchType}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── All Pro Players Using This Keyboard ── */}
            {usedByPros.length > 5 && (
              <div className="rounded-2xl p-6 mb-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">All Pro Players Using {selectedKeyboard.name}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {usedByPros.slice(5).map((p, i) => {
                    const gameColors = GAME_COLORS;
                    const gc = gameColors[p.game] || "#8a8078";
                    return (
                      <button key={i} onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { navigateToPlayer(pp); } }}
                        className="flex items-center gap-2 p-2 rounded-lg text-left text-sm transition-all hover:scale-[1.01]"
                        style={{ background: `${gc}06`, border: `1px solid ${gc}10` }}>
                        <Flag country={p.country} size={16} />
                        <span className="font-bold">{p.name}</span>
                        <span className="opacity-30">·</span>
                        <span style={{ color: gc }}>{p.game}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          {/* Recently Viewed */}
          {(() => {
            try {
              const recent = JSON.parse(sessionStorage.getItem("recentKeyboards") || "[]").filter(n => n !== selectedKeyboard.name);
              if (recent.length === 0) return null;
              const recentKeyboards = recent.map(n => keyboards.find(m => m.name === n)).filter(Boolean).slice(0, 4);
              if (recentKeyboards.length === 0) return null;
              return (
                <div className="rounded-2xl p-6 mb-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                  <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Recently Viewed</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {recentKeyboards.map((m, i) => {
                      const bc = BRAND_COLORS[m.brand] || "#8a8078";
                      return (
                        <button key={i} onClick={() => navigateToKeyboard(m)} className="rounded-xl p-3 text-center transition-all hover:scale-[1.03]" style={{ background: `${bc}06`, border: `1px solid ${bc}12` }}>
                          {KEYBOARD_IMAGE_URLS[m.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt={m.name} className="h-10 mx-auto object-contain mb-2" />}
                          <div className="text-xs font-bold truncate" style={{ color: bc }}>{m.name.replace(m.brand + " ", "")}</div>
                          <div style={{ fontSize: 10 }} className="opacity-30">{m.weight}g · ${m.price}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            } catch { return null; }
          })()}

          {/* Sticky buy bar */}
          <div className="fixed bottom-0 left-0 right-0 z-[80] md:hidden" style={{ background: "#fffffff0", borderTop: "1px solid #d4cfc8", backdropFilter: "blur(20px)" }}>
            <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black truncate" style={{ color: brandCol }}>{selectedKeyboard.name}</div>
                <div style={{ fontSize: 11, color: "#a09890" }}>{selectedKeyboard.weight}g · {selectedKeyboard.switchType}</div>
              </div>
              <a href={amazonLink(selectedKeyboard.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg font-black text-sm transition-all no-underline flex-shrink-0" style={{ background: "#b8956a", color: "#1a1614", textDecoration: "none" }}>
                {I.cart(14, "#1a1614")} ${selectedKeyboard.price}
              </a>
            </div>

            {/* Suggest correction + best-of links */}
            <div className="flex flex-wrap items-center gap-3 mt-4 mb-2">
              <a href="/contact" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>📝 Suggest a correction</a>
              <span className="opacity-10">·</span>
              <a href="/best/cs2" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#c47000", textDecoration: "none" }}>Best for CS2</a>
              <a href="/best/valorant" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#c4444f", textDecoration: "none" }}>Best for Valorant</a>
              <a href="/best/fortnite" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#4c7bd9", textDecoration: "none" }}>Best for Fortnite</a>
              <a href="/best/wireless" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#b8956a", textDecoration: "none" }}>Best Wireless</a>
              <a href="/best/lightweight" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#8060c4", textDecoration: "none" }}>Best Lightweight</a>
            </div>
          </div>
          </div>
          );
        })()}
        {/* ── GAMES TAB ── */}
        {activeTab === "games" && !gameDetailSlug && (
          <div>
            <SectionTitle color="#c44040" sub="Click any game to see full keyboard usage data, player settings, brand splits, and sensitivity analysis">Game Profiles</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {gameBreakdown.map((g, i) => {
                const gameColors = GAME_COLORS;
                const col = gameColors[g.game] || "#8a8078";
                const gSlug = g.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                return (
                  <div key={i}
                    className="block rounded-xl p-4 transition-all duration-200 cursor-pointer"
                    style={{ background: `${col}08`, border: `1px solid ${col}15` }}
                    onClick={() => { window.location.href = `/games/${gSlug}`; }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${col}0a`; e.currentTarget.style.borderColor = `${col}25`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${col}10`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${col}06`; e.currentTarget.style.borderColor = `${col}12`; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {GAME_IMAGE_URLS[g.game] ? <img loading="lazy" src={GAME_IMAGE_URLS[g.game]} alt={g.game} className="h-7 w-7 object-contain" /> : <span className="inline-flex justify-center">{icon(g.icon, 28)}</span>}
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-black" style={{ color: col }}>{g.game}</div>
                        <div style={{ fontSize: 12, color: "#a09890" }}>{g.players} pros tracked</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                        <path d="M6 3L11 8L6 13" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="rounded-lg px-2 py-1.5" style={{ background: `${col}10` }}>
                        <div style={{ fontSize: 10, color: "#a09890", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Top Keyboard</div>
                        <div style={{ fontSize: 12, color: "#2d2824", fontWeight: 800 }}>{g.topKeyboards[0]?.name.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")}</div>
                      </div>
                      <div className="rounded-lg px-2 py-1.5" style={{ background: `${col}10` }}>
                        <div style={{ fontSize: 11, color: "#a09890", fontWeight: 700 }}>Avg Weight</div>
                        <div style={{ fontSize: 12, color: "#2d2824", fontWeight: 800 }}>{g.avgWeight}g</div>
                      </div>
                      <div className="rounded-lg px-2 py-1.5" style={{ background: `${col}10` }}>
                        <div style={{ fontSize: 11, color: "#a09890", fontWeight: 700 }}>Wireless</div>
                        <div style={{ fontSize: 12, color: "#2d2824", fontWeight: 800 }}>{g.wirelessPct}%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold no-underline" style={{ background: `${col}06`, color: `${col}50`, border: `1px solid ${col}10`, fontSize: 10, cursor: "default" }}>
                        📖 Guide Coming Soon
                      </span>
                      <a href={`/games/${gSlug}`} onClick={(e) => e.stopPropagation()} style={{ fontSize: 12, fontWeight: 700, color: col, opacity: 0.7, textDecoration: "none" }}>
                        View →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── GAME DETAIL VIEW ── */}
        {activeTab === "games" && gameDetailSlug && (() => {
          const gameColorMap = GAME_COLORS;
          const slugToGame = {};
          Object.keys(gameColorMap).forEach(g => { slugToGame[g.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")] = g; });
          const gameName = slugToGame[gameDetailSlug];
          if (!gameName) return <div className="text-center py-20 opacity-40">Game not found</div>;
          const col = gameColorMap[gameName];
          const gb = gameBreakdown.find(g => g.game === gameName);
          const gamePlayers = allPlayers.filter(p => p.game === gameName);
          const featuredPlayers = proPlayers.filter(p => p.game === gameName);

          // Keyboard usage stats
          const keyboardCounts = {};
          gamePlayers.forEach(p => { keyboardCounts[p.keyboard] = (keyboardCounts[p.keyboard] || 0) + 1; });
          const keyboardRanking = Object.entries(keyboardCounts).sort((a, b) => b[1] - a[1]);
          const totalPlayers = gamePlayers.length;

          // Brand stats
          const brandCounts = {};
          gamePlayers.forEach(p => {
            const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name)));
            if (m) brandCounts[m.brand] = (brandCounts[m.brand] || 0) + 1;
          });
          const brandRanking = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]);
          const totalBranded = brandRanking.reduce((a, b) => a + b[1], 0);


          // Weight stats
          const weights = gamePlayers.map(p => { const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name))); return m?.weight; }).filter(Boolean);
          const avgWeight = weights.length ? Math.round(weights.reduce((a, b) => a + b, 0) / weights.length) : 0;
          const lightPct = weights.length ? Math.round(weights.filter(w => w < 60).length / weights.length * 100) : 0;
          const midPct = weights.length ? Math.round(weights.filter(w => w >= 60 && w < 75).length / weights.length * 100) : 0;
          const heavyPct = weights.length ? Math.round(weights.filter(w => w >= 75).length / weights.length * 100) : 0;

          // Shape preference
          const shapes = gamePlayers.map(p => { const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name))); return m?.layout; }).filter(Boolean);
          const symPct = shapes.length ? Math.round(shapes.filter(s => s === "Symmetrical").length / shapes.length * 100) : 50;
          const ergoPct = 100 - symPct;

          // Wireless stats
          const connTypes = gamePlayers.map(p => { const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name))); return m?.connectivity; }).filter(Boolean);
          const wirelessPct = connTypes.length ? Math.round(connTypes.filter(c => c === "Wireless").length / connTypes.length * 100) : 0;

          // Polling rate distribution
          const hzGroups = {};
          gamePlayers.forEach(p => {
            const hz = p.hz;
            const label = hz >= 4000 ? "4K+" : hz >= 2000 ? "2K" : hz >= 1000 ? "1K" : `${hz}`;
            hzGroups[label] = (hzGroups[label] || 0) + 1;
          });
          const hzRanking = Object.entries(hzGroups).sort((a, b) => b[1] - a[1]);

          // Team stats
          const teamCounts = {};
          gamePlayers.forEach(p => { if (p.team && p.team !== "—") teamCounts[p.team] = (teamCounts[p.team] || 0) + 1; });
          const topTeams = Object.entries(teamCounts).sort((a, b) => b[1] - a[1]).slice(0, 12);


          // Keyboard usage chart data
          const keyboardChartData = keyboardRanking.slice(0, 10).map(([name, count]) => ({
            name: name.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |Keychron |Glorious |CIDOO )/, ""),
            fullName: name,
            usage: Math.round(count / totalPlayers * 100),
            count,
          }));

          // Brand chart data
          const brandChartData = brandRanking.slice(0, 6).map(([name, count]) => ({
            name,
            usage: Math.round(count / totalBranded * 100),
            count,
            fill: BRAND_COLORS[name] || "#8a8078",
          }));

          // Role breakdown (if roles exist)
          const roleCounts = {};
          gamePlayers.forEach(p => { if (p.role && p.role !== "—") { let r = p.role; if (gameName === "CS2") { if (r === "Sniper") r = "AWPer"; else if (r === "AWPer/IGL" || r === "Rifler/IGL") r = "IGL"; else if (r === "Entry" || r === "Lurker" || r === "Support") r = "Rifler"; } roleCounts[r] = (roleCounts[r] || 0) + 1; } });
          const roleRanking = Object.entries(roleCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

          return (
          <div>
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mt-4 mb-4 flex items-center gap-1.5 text-sm">
              <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
              <span style={{ color: "#d4cfc8" }}>›</span>
              <a href="/games" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Games</a>
              <span style={{ color: "#d4cfc8" }}>›</span>
              <span style={{ color: col }} className="font-bold opacity-70">{gameName}</span>
            </nav>

            {/* ── HERO SECTION ── */}
            <div className="rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${col}12, ${col}04)`, border: `1px solid ${col}20` }}>
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5" style={{ background: `radial-gradient(circle, ${col}, transparent)`, transform: "translate(30%, -30%)" }} />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                {GAME_IMAGE_URLS[gameName] && <img loading="lazy" src={GAME_IMAGE_URLS[gameName]} alt={gameName} className="h-16 w-16 sm:h-20 sm:w-20 object-contain" />}
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl tracking-tight mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, color: col }}>{gameName}</h1>
                  <div className="text-sm opacity-50">{totalPlayers} professional players tracked · Keyboard & settings database</div>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${col}08`, border: `1px solid ${col}15`, color: `${col}60`, cursor: "default" }}>📖 Best Keyboard Guide — Coming Soon</span>
                </div>
                {keyboardRanking[0] && (() => { const topM = keyboards.find(mm => mm.name === keyboardRanking[0][0] || keyboardRanking[0][0].includes(mm.name)); return (
                  <a href={amazonLink(keyboardRanking[0][0])} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all hover:scale-105 no-underline flex-shrink-0" style={{ background: "#b8956a14", border: "1px solid #b8956a25", textDecoration: "none" }}>
                    {KEYBOARD_IMAGE_URLS[keyboardRanking[0][0]] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[keyboardRanking[0][0]]} alt="" className="h-8 object-contain" />}
                    <div>
                      <div className="text-xs font-bold" style={{ color: "#b8956a" }}>#1 Keyboard</div>
                      <div className="text-xs font-black" style={{ color: "#1a1614" }}>{keyboardRanking[0][0].replace(/(Wooting |Razer )/, "")}</div>
                    </div>
                    <span className="text-sm font-black px-2 py-1 rounded-lg" style={{ background: "#b8956a", color: "#1a1614" }}>{topM ? `$${topM.price}` : "Buy"}</span>
                  </a>
                ); })()}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: "Players", value: totalPlayers, icon: "player" },
                  { label: "Avg Weight", value: `${avgWeight}g`, icon: "wind" },
                  { label: "Wireless", value: `${wirelessPct}%`, icon: "signal" },
                  { label: "Avg Poll Rate", value: gb ? `${gb.avgPollRate >= 1000 ? `${(gb.avgPollRate/1000).toFixed(1)}K` : gb.avgPollRate}Hz` : "—", icon: "gear" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl px-3 py-2.5 text-center" style={{ background: `${col}10`, border: `1px solid ${col}10` }}>
                    <div className="text-lg sm:text-xl font-black" style={{ color: col }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "#a09890", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── GAME DESCRIPTION ── */}
            {GAME_DESCRIPTIONS[gameName] && (
              <div className="rounded-2xl p-5 sm:p-6 mb-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: col }}>Game Analysis</div>
                <p className="text-sm leading-relaxed" style={{ color: "#3d3530" }}>{GAME_DESCRIPTIONS[gameName]}</p>
              </div>
            )}

            {/* ── KEYBOARD USAGE RANKINGS ── */}
            <SectionTitle color={col} sub={`Which keyboards ${gameName} professionals trust to compete at the highest level`} style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>Keyboard Usage Rankings</SectionTitle>
            {/* #1 Keyboard highlight CTA */}
            {keyboardRanking[0] && (() => {
              const topName = keyboardRanking[0][0];
              const topPct = Math.round(keyboardRanking[0][1] / totalPlayers * 100);
              const topM = keyboards.find(mm => mm.name === topName || topName.includes(mm.name));
              return (
                <div className="rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-4" style={{ background: `${col}08`, border: `1px solid ${col}20` }}>
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <div className="text-xs uppercase tracking-widest font-bold" style={{ color: "#a09890" }}>#1 Keyboard in {gameName}</div>
                      <div className="text-base font-black" style={{ color: col }}>{topName}</div>
                      <div className="text-xs opacity-40">{topPct}% of pros{topM ? ` · ${topM.weight}g · ${topM.switchType}` : ""}</div>
                    </div>
                  </div>
                  <a href={amazonLink(topName)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all hover:scale-105 no-underline" style={{ background: "#b8956a", color: "#1a1614", textDecoration: "none", fontSize: 14 }}>
                    {I.cart(16, "#1a1614")} Buy on Amazon{topM ? ` — $${topM.price}` : ""}
                  </a>
                </div>
              );
            })()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar chart */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={keyboardChartData} margin={{ top: 10, right: 20, left: 0, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4df" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#a09890", fontSize: 11 }} angle={-40} textAnchor="end" interval={0} tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <YAxis tick={{ fill: "#a09890", fontSize: 11 }} unit="%" tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="usage" radius={[6, 6, 0, 0]} name="Usage %" label={{ position: "top", fill: "#8a8078", fontSize: 11, formatter: (v) => `${v}%` }}>
                      {keyboardChartData.map((entry, i) => <Cell key={i} fill={i === 0 ? col : `${col}${i < 3 ? "80" : "40"}`} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Full ranking table */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#a09890" }}>Full Keyboard Rankings</div>
                <div className="max-h-[320px] overflow-y-auto pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: `${col}30 transparent` }}>
                  <div className="space-y-1.5">
                    {keyboardRanking.slice(0, 20).map(([name, count], i) => {
                      const pct = Math.round(count / totalPlayers * 100);
                      const m = keyboards.find(mm => mm.name === name || name.includes(mm.name));
                      return (
                        <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all hover:bg-stone-100" style={{ background: i === 0 ? `${col}08` : "transparent" }}>
                          <span className="w-5 text-center font-black text-xs" style={{ color: i < 3 ? col : "#a09890" }}>{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold truncate" style={{ color: i === 0 ? col : "#2d2824" }}>{name}</span>
                              {m && <span className="text-xs px-1.5 rounded" style={{ background: `${BRAND_COLORS[m.brand] || "#8a8078"}15`, color: BRAND_COLORS[m.brand] || "#8a8078", fontSize: 10 }}>{m.weight}g</span>}
                            </div>
                          </div>
                          <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                            <div className="h-full rounded-full" style={{ width: `${(pct / keyboardRanking[0][1] * totalPlayers / 100) * 100}%`, background: i === 0 ? col : `${col}50` }} />
                          </div>
                          <span className="text-xs font-bold w-8 text-right" style={{ color: i < 3 ? col : "#a09890" }}>{pct}%</span>
                          <a href={amazonLink(name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#b8956a18", color: "#b8956a", border: "1px solid #b8956a30", textDecoration: "none", fontSize: 10 }}>
                            {I.cart(10)} {m ? `$${m.price}` : "Buy"}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ── BRAND MARKET SHARE ── */}
            <SectionTitle color={col} sub={`Brand loyalty and market share among ${gameName} professionals`}>Brand Dominance</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Brand bars */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="space-y-3">
                  {brandRanking.slice(0, 8).map(([name, count], i) => {
                    const pct = Math.round(count / totalBranded * 100);
                    const bc = BRAND_COLORS[name] || "#8a8078";
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-black" style={{ color: bc }}>{name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold" style={{ color: `${bc}cc` }}>{pct}% ({count} players)</span>
                            {(() => { const topBrandKeyboard = keyboards.filter(m => m.brand === name).sort((a, b) => b.proUsage - a.proUsage)[0]; return topBrandKeyboard ? (
                              <a href={amazonLink(topBrandKeyboard.name)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-0.5 px-1.5 py-0.5 rounded no-underline hover:scale-110 transition-all" style={{ background: "#b8956a14", color: "#b8956a", textDecoration: "none", fontSize: 9 }}>
                                {I.cart(8)} ${topBrandKeyboard.price}
                              </a>
                            ) : null; })()}
                          </div>
                        </div>
                        <div className="h-4 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: `${bc}40` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Brand pie chart */}
              <div className="rounded-2xl p-4 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={brandChartData} dataKey="usage" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={100} paddingAngle={2} label={({name, usage}) => `${name} ${usage}%`}>
                      {brandChartData.map((entry, i) => <Cell key={i} fill={entry.fill} fillOpacity={0.7} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Top keyboard per brand - shop row */}
            <div className="flex flex-wrap gap-2 mb-8">
              {brandRanking.slice(0, 5).map(([bName], bi) => {
                const topBM = keyboards.filter(m => m.brand === bName).sort((a, b) => b.proUsage - a.proUsage)[0];
                if (!topBM) return null;
                const bc = BRAND_COLORS[bName] || "#8a8078";
                return (
                  <a key={bi} href={amazonLink(topBM.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-105 no-underline" style={{ background: `${bc}08`, border: `1px solid ${bc}15`, textDecoration: "none" }}>
                    {KEYBOARD_IMAGE_URLS[topBM.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[topBM.name]} alt={topBM.name} className="h-5 object-contain" />}
                    <div>
                      <div className="text-xs font-black" style={{ color: bc }}>{topBM.name.replace(/(Wooting |Razer )/, "")}</div>
                      <div style={{ fontSize: 10, color: "#a09890" }}>Top {bName} keyboard in {gameName}</div>
                    </div>
                    <span className="text-xs font-bold" style={{ color: "#b8956a" }}>${topBM.price}</span>
                  </a>
                );
              })}
            </div>



            {/* ── GEAR DEEP DIVE ── */}
            <SectionTitle color={col} sub={`Weight, layout, connectivity, and polling rate breakdown`}>Gear Deep Dive</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {/* Weight breakdown */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#a09890" }}>Weight</div>
                <div className="text-2xl font-black mb-2" style={{ color: col }}>{avgWeight}g</div>
                <div className="text-xs mb-3" style={{ color: "#a09890" }}>average keyboard weight</div>
                <div className="space-y-1.5">
                  {[
                    { label: "Wooting (<60g)", pct: lightPct, color: "#b8956a" },
                    { label: "Medium (60–75g)", pct: midPct, color: col },
                    { label: "Heavy (75g+)", pct: heavyPct, color: "#c44040" },
                  ].map((w, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span style={{ color: "#6b635b" }}>{w.label}</span>
                        <span className="font-bold" style={{ color: w.color }}>{w.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full" style={{ width: `${w.pct}%`, background: w.color, opacity: 0.5 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shape preference */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#a09890" }}>Shape</div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: `${col}10` }}>
                    <div className="text-xl font-black" style={{ color: col }}>{symPct}%</div>
                    <div style={{ fontSize: 10, color: "#a09890" }}>Symmetrical</div>
                  </div>
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: "#0000000a" }}>
                    <div className="text-xl font-black" style={{ color: "#3d3530" }}>{ergoPct}%</div>
                    <div style={{ fontSize: 10, color: "#a09890" }}>Ergonomic</div>
                  </div>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex" style={{ background: "#0000000a" }}>
                  <div className="h-full" style={{ width: `${symPct}%`, background: `${col}60` }} />
                  <div className="h-full" style={{ width: `${ergoPct}%`, background: "#00000012" }} />
                </div>
              </div>

              {/* Connectivity */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#a09890" }}>Connectivity</div>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: `${col}10` }}>
                    <div className="text-xl font-black" style={{ color: col }}>{wirelessPct}%</div>
                    <div style={{ fontSize: 10, color: "#a09890" }}>Wireless</div>
                  </div>
                  <div className="flex-1 text-center rounded-lg px-2 py-2" style={{ background: "#0000000a" }}>
                    <div className="text-xl font-black" style={{ color: "#3d3530" }}>{100 - wirelessPct}%</div>
                    <div style={{ fontSize: 10, color: "#a09890" }}>Wired</div>
                  </div>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex" style={{ background: "#0000000a" }}>
                  <div className="h-full" style={{ width: `${wirelessPct}%`, background: `${col}60` }} />
                  <div className="h-full" style={{ width: `${100 - wirelessPct}%`, background: "#00000012" }} />
                </div>
              </div>

              {/* Polling rate */}
              <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#a09890" }}>Polling Rate</div>
                <div className="text-2xl font-black mb-2" style={{ color: col }}>{gb ? `${gb.avgPollRate >= 1000 ? `${(gb.avgPollRate/1000).toFixed(1)}K` : gb.avgPollRate}Hz` : "—"}</div>
                <div className="text-xs mb-3" style={{ color: "#a09890" }}>average polling rate</div>
                <div className="space-y-1.5">
                  {hzRanking.slice(0, 4).map(([label, count], i) => {
                    const pct = Math.round(count / totalPlayers * 100);
                    return (
                      <div key={i} className="flex justify-between text-xs">
                        <span style={{ color: "#6b635b" }}>{label}Hz</span>
                        <span className="font-bold" style={{ color: i === 0 ? col : "#8a8078" }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shop by Gear Category */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {(() => {
                const gameKeyboardData = gamePlayers.map(p => keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name)))).filter(Boolean);
                const lightestUsed = [...new Set(gameKeyboardData)].filter(m => m.weight < 60).sort((a, b) => a.weight - b.weight)[0];
                const topWireless = [...new Set(gameKeyboardData)].filter(m => m.connectivity === "Wireless").sort((a, b) => b.proUsage - a.proUsage)[0];
                const bestValue = [...new Set(gameKeyboardData)].filter(m => m.proUsage >= 1).sort((a, b) => a.price - b.price)[0];
                const topSym = [...new Set(gameKeyboardData)].filter(m => m.layout === "Symmetrical").sort((a, b) => b.proUsage - a.proUsage)[0];
                return [
                  lightestUsed && { label: "⚡ Lightest", kbd: lightestUsed, sub: `${lightestUsed.weight}g` },
                  topWireless && { label: "📡 Top Wireless", kbd: topWireless, sub: topWireless.connectivity },
                  bestValue && { label: "💰 Best Value", kbd: bestValue, sub: `$${bestValue.price}` },
                  topSym && { label: "◉ Top Symmetrical", kbd: topSym, sub: topSym.layout },
                ].filter(Boolean).map((item, i) => (
                  <a key={i} href={amazonLink(item.kbd.name)} target="_blank" rel="noopener noreferrer" className="rounded-xl p-3 text-center transition-all hover:scale-[1.03] no-underline block" style={{ background: `${col}06`, border: `1px solid ${col}10`, textDecoration: "none" }}>
                    <div className="text-xs font-bold mb-1" style={{ color: col }}>{item.label}</div>
                    <div className="text-xs font-black truncate" style={{ color: "#1a1614" }}>{item.kbd.name.replace(/(Wooting |Razer )/, "")}</div>
                    <div style={{ fontSize: 10, color: "#a09890" }}>{item.sub}</div>
                    <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded text-xs font-bold" style={{ background: "#b8956a18", color: "#b8956a", fontSize: 10 }}>
                      {I.cart(8)} ${item.kbd.price}
                    </div>
                  </a>
                ));
              })()}
            </div>

            {/* ── TOP FEATURED PROS ── */}
            {featuredPlayers.length > 0 && (
              <>
                <SectionTitle color={col} sub="Star players and their complete keyboard configurations">Featured Pro Players</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {featuredPlayers.slice(0, 12).map((p, i) => {
                    const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name)));
                    return (
                      <div key={i} className="rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02]"
                        style={{ background: `${col}06`, border: `1px solid ${col}10` }}
                        onClick={() => navigateToPlayer(p)}>
                        <div className="flex items-center gap-2 mb-3">
                          <Flag country={p.country} size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-black truncate" style={{ color: col }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: "#a09890" }}>{p.team}{p.role && p.role !== "—" ? ` · ${p.role}` : ""}</div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs"><span className="opacity-50">Keyboard</span><span className="font-bold truncate ml-2" style={{ color: "#2d2824", maxWidth: 160 }}>{p.keyboard}</span></div>
                          <div className="flex justify-between text-xs"><span className="opacity-50">Polling</span><span className="font-bold" style={{ color: "#2d2824" }}>{p.hz >= 1000 ? `${(p.hz/1000).toFixed(p.hz % 1000 === 0 ? 0 : 1)}KHz` : `${p.hz}Hz`}</span></div>
                          {m && <div className="flex justify-between text-xs"><span className="opacity-50">Weight</span><span className="font-bold" style={{ color: "#2d2824" }}>{m.weight}g</span></div>}
                        </div>
                        <a href={amazonLink(p.keyboard)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline w-full" style={{ background: "#b8956a18", color: "#b8956a", border: "1px solid #b8956a30", textDecoration: "none" }}>
                          {I.cart(12)} Buy {p.keyboard.split(" ").slice(-2).join(" ")}{m ? ` — $${m.price}` : ""}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── TOP TEAMS ── */}
            {topTeams.length > 0 && (
              <>
                <SectionTitle color={col} sub={`Organizations with the most tracked ${gameName} professionals`}>Top Teams</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                  {topTeams.map(([team, count], i) => {
                    const teamPlayers = gamePlayers.filter(p => p.team === team);
                    const teamKeyboards = {};
                    teamPlayers.forEach(p => { teamKeyboards[p.keyboard] = (teamKeyboards[p.keyboard] || 0) + 1; });
                    const topKbd = Object.entries(teamKeyboards).sort((a, b) => b[1] - a[1])[0];
                    return (
                      <div key={i} className="rounded-xl px-3 py-3" style={{ background: `${col}06`, border: `1px solid ${col}10` }}>
                        <div className="text-xs font-black mb-1 truncate" style={{ color: col }}>{team}</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black" style={{ color: "#1a1614" }}>{count}</span>
                          <span style={{ fontSize: 10, color: "#a09890" }}>players</span>
                        </div>
                        {topKbd && <div className="text-xs mt-1 truncate" style={{ color: "#a09890" }}>Top: {topKbd[0].replace(/(Wooting |Razer )/, "")}</div>}
                        {topKbd && <a href={amazonLink(topKbd[0])} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-0.5 mt-1 px-1.5 py-0.5 rounded no-underline hover:scale-110 transition-all" style={{ background: "#b8956a12", color: "#b8956a", textDecoration: "none", fontSize: 9 }}>{I.cart(7)} Buy{(() => { const tm = keyboards.find(mm => mm.name === topKbd[0]); return tm ? ` $${tm.price}` : ""; })()}</a>}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── ROLE BREAKDOWN ── */}
            {roleRanking.length > 1 && (
              <div className="rounded-2xl p-4 sm:p-6 mb-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: col }}>Role Breakdown</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {roleRanking.map(([role, count], i) => {
                    const rolePlayers = gamePlayers.filter(p => { let r = p.role; if (gameName === "CS2") { if (r === "Sniper") r = "AWPer"; else if (r === "AWPer/IGL" || r === "Rifler/IGL") r = "IGL"; else if (r === "Entry" || r === "Lurker" || r === "Support") r = "Rifler"; } return r === role; });
                    const roleKeyboardCounts = {};
                    rolePlayers.forEach(p => { roleKeyboardCounts[p.keyboard] = (roleKeyboardCounts[p.keyboard] || 0) + 1; });
                    const roleTopKeyboard = Object.entries(roleKeyboardCounts).sort((a, b) => b[1] - a[1])[0];
                    return (
                      <div key={i} className="rounded-lg px-3 py-2 text-center" style={{ background: `${col}08` }}>
                        <div className="text-xs font-black mb-1" style={{ color: col }}>{role}</div>
                        <div className="text-sm font-bold" style={{ color: "#1a1614" }}>{count} pros</div>
                        {roleTopKeyboard && <div className="mt-1 truncate" style={{ fontSize: 9, color: "#b8b0a8" }}>#1: {roleTopKeyboard[0].replace(/(Wooting |Razer )/, "")}</div>}
                        {roleTopKeyboard && <a href={amazonLink(roleTopKeyboard[0])} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 mt-1 px-1 py-0.5 rounded no-underline hover:scale-110 transition-all" style={{ background: "#b8956a12", color: "#b8956a", textDecoration: "none", fontSize: 8 }}>{I.cart(7)} Buy</a>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── FULL PLAYER ROSTER ── */}
            <SectionTitle color={col} sub={`Complete settings database for every tracked ${gameName} professional`}>Full Player Roster</SectionTitle>
            <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "1px solid #e8e4df" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{ background: "#ffffff" }}>
                  <thead>
                    <tr style={{ background: `${col}10` }}>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>#</th>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>Player</th>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>Team</th>
                      <th className="text-left px-3 py-2 font-black" style={{ color: col }}>Keyboard</th>
                      <th className="text-right px-3 py-2 font-black" style={{ color: col }}>Hz</th>
                      <th className="text-center px-3 py-2 font-black" style={{ color: "#b8956a" }}>Buy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamePlayers.sort((a, b) => a.name.localeCompare(b.name)).map((p, i) => (
                      <tr key={i} className="transition-all hover:bg-stone-100 cursor-pointer" onClick={() => navigateToPlayer(p)}
                        style={{ borderBottom: "1px solid #00000008" }}>
                        <td className="px-3 py-1.5" style={{ color: "#00000015" }}>{i + 1}</td>
                        <td className="px-3 py-1.5">
                          <span className="flex items-center gap-1.5">
                            <Flag country={p.country} size={16} />
                            <span className="font-bold" style={{ color: "#1a1614" }}>{p.name}</span>
                            {p.role && p.role !== "—" && <span className="px-1 rounded" style={{ background: `${col}15`, color: `${col}aa`, fontSize: 9 }}>{p.role}</span>}
                          </span>
                        </td>
                        <td className="px-3 py-1.5" style={{ color: "#8a8078" }}>{p.team}</td>
                        <td className="px-3 py-1.5 font-bold truncate" style={{ maxWidth: 180 }}><a href={amazonLink(p.keyboard)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="no-underline hover:underline" style={{ color: "#b8956a", textDecoration: "none" }}>{p.keyboard}</a></td>
                        <td className="px-3 py-1.5 text-right" style={{ color: "#8a8078" }}>{p.hz >= 1000 ? `${(p.hz/1000).toFixed(p.hz % 1000 === 0 ? 0 : 1)}K` : p.hz}</td>
                        <td className="px-3 py-1.5 text-center"><a href={amazonLink(p.keyboard)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="px-1.5 py-0.5 rounded no-underline hover:scale-110 transition-all inline-flex" style={{ background: "#b8956a12", color: "#b8956a", textDecoration: "none", fontSize: 9 }}>{I.cart(8)}</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── COMPLETE YOUR SETUP CTA ── */}
            <div className="rounded-2xl p-5 sm:p-8 mb-8 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${col}08, #ffffff)`, border: `1px solid ${col}15` }}>
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: col }}>Complete Your {gameName} Pro Setup</div>
                <div className="text-sm opacity-40 mb-4 max-w-lg mx-auto">The keyboards that {gameName} professionals trust. Click any keyboard to shop on Amazon.</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {keyboardRanking.slice(0, 5).map(([name, count], mi) => {
                    const m = keyboards.find(mm => mm.name === name || name.includes(mm.name));
                    const pct = Math.round(count / totalPlayers * 100);
                    return (
                      <a key={mi} href={amazonLink(name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all hover:scale-105 no-underline" style={{ background: mi === 0 ? `${col}15` : "#0000000a", border: mi === 0 ? `1px solid ${col}30` : "1px solid #e8e4df", textDecoration: "none" }}>
                        {KEYBOARD_IMAGE_URLS[name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[name]} alt={name} className="h-6 object-contain" />}
                        <div className="text-left">
                          <div className="text-xs font-black" style={{ color: mi === 0 ? col : "#1a1614" }}>{name.replace(/(Wooting |Razer )/, "")}</div>
                          <div style={{ fontSize: 10, color: "#a09890" }}>{pct}% of pros{m ? ` · ${m.weight}g` : ""}</div>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: "#b8956a20", color: "#b8956a" }}>{m ? `$${m.price}` : "Buy"}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── OTHER GAMES NAV ── */}
            <div className="rounded-2xl p-5 mb-4" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
              <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#a09890" }}>Explore Other Games</div>
              <div className="flex flex-wrap gap-2">
                {gameBreakdown.filter(g => g.game !== gameName).map((g, i) => {
                  const gc = { CS2: "#c47000", Valorant: "#c43848", LoL: "#c89b3c", Fortnite: "#3a60b0", "Overwatch 2": "#c48018", Apex: "#a82020", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", "Rocket League": "#1478c4", "Call of Duty": "#3a8a3a", "Marvel Rivals": "#b81820", PUBG: "#c48a00", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" }[g.game] || "#8a8078";
                  return (
                    <button key={i} onClick={() => { window.location.href = `/games/${g.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`; }}
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
                      style={{ background: `${gc}10`, color: gc, border: `1px solid ${gc}20` }}>
                      {g.game} ({g.players})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          );
        })()}


        {/* ── RANKINGS TAB ── */}
        {activeTab === "rankings" && (
          <div>
            <SectionTitle color="#b8956a" sub="Sort and filter to find the perfect competitive keyboard">Complete Keyboard Rankings</SectionTitle>
            {/* ── UNIFIED FILTER BAR ── */}
            {(() => {
              const SORT_OPTIONS_R = [
                { value: "proUsage", label: "Pro Usage" },
                { value: "weight", label: "Weight ↑" },
                { value: "price", label: "Price ↑" },
                { value: "rating", label: "Rating" },
                { value: "pollingRate", label: "Poll Rate" },
              ];
              const sortLabelR = SORT_OPTIONS_R.find(o => o.value === sortBy)?.label || "Pro Usage";
              const brandListR = [...new Set(keyboards.map(m => m.brand))].sort();
              const activeFilterCountR = [filterBrand, filterWeight, filterPrice, filterConn, filterLayout].filter(f => f !== "All").length;
              const activeFiltersR = [];
              if (filterBrand !== "All") activeFiltersR.push({ label: filterBrand, clear: () => setFilterBrand("All") });
              if (filterWeight !== "All") activeFiltersR.push({ label: filterWeight === "Wooting" ? "<50g" : filterWeight === "Light" ? "50-64g" : filterWeight === "Medium" ? "65-84g" : "85g+", clear: () => setFilterWeight("All") });
              if (filterPrice !== "All") activeFiltersR.push({ label: filterPrice === "Budget" ? "Under $60" : filterPrice === "Mid" ? "$60-$119" : "$120+", clear: () => setFilterPrice("All") });
              if (filterConn !== "All") activeFiltersR.push({ label: filterConn, clear: () => setFilterConn("All") });
              if (filterLayout !== "All") activeFiltersR.push({ label: filterLayout, clear: () => setFilterLayout("All") });
              const clearAllFiltersR = () => { setFilterBrand("All"); setFilterWeight("All"); setFilterPrice("All"); setFilterConn("All"); setFilterLayout("All"); };
              const accentR = "#b8956a";
              const chipStyleR = (active, brandColor) => ({
                padding: "5px 10px", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: active ? (brandColor ? `${brandColor}18` : `${accentR}20`) : "#ffffff",
                border: `1px solid ${active ? (brandColor ? `${brandColor}50` : `${accentR}50`) : "#0000000a"}`,
                color: active ? (brandColor || accentR) : "#8a8078",
                transition: "all 0.15s", whiteSpace: "nowrap",
              });

              return (
                <div className="mb-5" style={{ background: "#f5f2ee", border: "1px solid #e8e4df", borderRadius: 12, padding: 10, position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, borderRadius: "12px 12px 0 0", background: `linear-gradient(90deg, transparent, ${accentR}50, transparent)` }} />

                  <div className="flex gap-2.5 items-center" style={{ marginBottom: showFilters ? 10 : 0, transition: "margin 0.3s" }}>
                    <div className="flex-1 relative" style={{ minWidth: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.25 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="text" placeholder={`Search ${keyboards.length} keyboards...`} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full outline-none" style={{ padding: "7px 12px 7px 34px", background: "#ffffff", border: "1px solid #e8e4df", borderRadius: 10, color: "#1a1614", fontFamily: "inherit", fontSize: 14 }} />
                    </div>

                    <div className="relative">
                      <button className="flex items-center gap-1.5" onClick={() => setShowSortDrop(!showSortDrop)}
                        style={{ padding: "7px 12px", background: "#ffffff", border: `1px solid ${showSortDrop ? `${accentR}50` : "#0000000a"}`, borderRadius: 10, color: showSortDrop ? accentR : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                        <span style={{ color: "#8a8078", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Sort</span>
                        <span style={{ color: accentR, fontWeight: 700 }}>{sortLabelR}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      {showSortDrop && (
                        <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowSortDrop(false)} />
                        <div className="absolute" style={{ top: "calc(100% + 6px)", right: 0, background: "#f0ede8", border: "1px solid #d4cfc8", borderRadius: 10, padding: 4, minWidth: 180, zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                          {SORT_OPTIONS_R.map(o => (
                            <div key={o.value} className="flex items-center justify-between cursor-pointer"
                              style={{ padding: "8px 12px", borderRadius: 7, fontSize: 13, fontWeight: 600, color: sortBy === o.value ? accentR : "#3d3530", transition: "all 0.15s" }}
                              onMouseEnter={e => { if (sortBy !== o.value) e.currentTarget.style.background = `${accentR}20`; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                              onClick={() => { setSortBy(o.value); setRankingSort({ key: o.value, dir: ["weight", "price"].includes(o.value) ? "asc" : "desc" }); setShowSortDrop(false); }}>
                              {o.label}
                              {sortBy === o.value && <span style={{ fontSize: 12 }}>✓</span>}
                            </div>
                          ))}
                        </div>
                        </>
                      )}
                    </div>

                    <button className="flex items-center gap-1.5"
                      onClick={() => setShowFilters(!showFilters)}
                      style={{ padding: "7px 12px", background: (showFilters || activeFilterCountR > 0) ? `${accentR}20` : "#ffffff", border: `1px solid ${(showFilters || activeFilterCountR > 0) ? `${accentR}50` : "#0000000a"}`, borderRadius: 10, color: (showFilters || activeFilterCountR > 0) ? accentR : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                      Filters
                      {activeFilterCountR > 0 && <span style={{ width: 18, height: 18, borderRadius: "50%", background: accentR, color: "#1a1614", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{activeFilterCountR}</span>}
                    </button>
                  </div>

                  <div style={{ maxHeight: showFilters ? 500 : 0, overflow: "hidden", opacity: showFilters ? 1 : 0, transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s" }}>
                    <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                      <div style={{ gridColumn: "span 2" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 5, paddingLeft: 2 }}>Brand</div>
                        <div className="flex flex-wrap gap-1">
                          <span style={chipStyleR(filterBrand === "All")} onClick={() => setFilterBrand("All")}>All</span>
                          {brandListR.map(b => <span key={b} style={chipStyleR(filterBrand === b, BRAND_COLORS[b])} onClick={() => setFilterBrand(filterBrand === b ? "All" : b)}>{b}</span>)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 5, paddingLeft: 2 }}>Weight</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Wooting","<50g"],["Light","50-64g"],["Medium","65-84g"],["Heavy","85g+"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterWeight === v)} onClick={() => setFilterWeight(filterWeight === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 5, paddingLeft: 2 }}>Price</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Budget","Under $60"],["Mid","$60–$119"],["Premium","$120+"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterPrice === v)} onClick={() => setFilterPrice(filterPrice === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 5, paddingLeft: 2 }}>Connection</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Wireless","Wireless"],["Wired","Wired"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterConn === v)} onClick={() => setFilterConn(filterConn === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 5, paddingLeft: 2 }}>Shape</div>
                        <div className="flex flex-wrap gap-1">
                          {[["All","All"],["Symmetrical","Symmetrical"],["Ergonomic","Ergonomic"]].map(([v,l]) => (
                            <span key={v} style={chipStyleR(filterLayout === v)} onClick={() => setFilterLayout(filterLayout === v && v !== "All" ? "All" : v)}>{l}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {!showFilters && activeFiltersR.length > 0 && (
                    <div className="flex flex-wrap gap-1.5" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e8e4df" }}>
                      {activeFiltersR.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5" style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: `${accentR}20`, color: accentR, border: `1px solid ${accentR}50` }}>
                          {f.label} <span className="cursor-pointer opacity-50 hover:opacity-100" style={{ fontSize: 11 }} onClick={f.clear}>✕</span>
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 cursor-pointer" onClick={clearAllFiltersR}
                        style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: "#c4737312", color: "#ff6b6b", border: "1px solid #c4737330" }}>
                        ✕ Clear all
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #e8e4df" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#ffffff" }}>
                    {[
                      { key: null, label: "#" },
                      { key: "name", label: "Keyboard" },
                      { key: "brand", label: "Brand" },
                      { key: "weight", label: "Weight" },
                      { key: "sensor", label: "Switch" },
                      { key: "pollingRate", label: "Poll Rate" },
                      { key: "layout", label: "Layout" },
                      { key: "price", label: "Price" },
                      { key: "proUsage", label: "Pro %" },
                      { key: "rating", label: "Rating" },
                      { key: null, label: "Buy" },
                    ].map(h => (
                      <th key={h.label} className={`px-4 py-3 text-left text-sm uppercase tracking-wider font-bold ${h.key ? "cursor-pointer select-none hover:opacity-80" : ""}`}
                        style={{ color: rankingSort.key === h.key ? "#b8956a" : "#a09890" }}
                        onClick={() => { if (h.key) setRankingSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: ["name","brand","sensor","shape"].includes(h.key) ? "asc" : "desc" }); }}>
                        {h.label}{rankingSort.key === h.key ? (rankingSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filtered = keyboards
                      .filter(m => filterBrand === "All" || m.brand === filterBrand)
                      .filter(m => {
                        if (filterWeight === "All") return true;
                        if (filterWeight === "Wooting") return m.weight < 50;
                        if (filterWeight === "Light") return m.weight >= 50 && m.weight < 65;
                        if (filterWeight === "Medium") return m.weight >= 65 && m.weight < 85;
                        if (filterWeight === "Heavy") return m.weight >= 85;
                        return true;
                      })
                      .filter(m => {
                        if (filterPrice === "All") return true;
                        if (filterPrice === "Budget") return m.price < 60;
                        if (filterPrice === "Mid") return m.price >= 60 && m.price < 120;
                        if (filterPrice === "Premium") return m.price >= 120;
                        return true;
                      })
                      .filter(m => filterConn === "All" || (filterConn === "Wireless" ? m.wireless : !m.wireless))
                      .filter(m => filterLayout === "All" || m.layout === filterLayout)
                      .filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()));
                    const k = rankingSort.key || "proUsage";
                    const dir = rankingSort.dir || "desc";
                    const sorted = [...filtered].sort((a, b) => {
                      let av = a[k], bv = b[k];
                      if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
                      if (av !== bv) return dir === "asc" ? av - bv : bv - av;
                      return a.id - b.id;
                    });
                    return sorted.map((m, i) => {
                      const col = BRAND_COLORS[m.brand] || "#8a8078";
                      return (
                        <tr key={`rank-${m.id}`} className="cursor-pointer transition-colors hover:bg-stone-50" onClick={() => { navigateToKeyboard(m); }}
                          style={{ borderBottom: "1px solid #00000008", background: i % 2 === 0 ? "#f5f0e8" : "#f5f2ee" }}>
                          <td className="px-4 py-3 font-black opacity-20">{i + 1}</td>
                          <td className="px-4 py-3 font-bold" style={{ color: col }}>{KEYBOARD_IMAGE_URLS[m.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt={`${m.name}`} className="inline h-5 mr-2 object-contain" />}{m.name}</td>
                          <td className="px-4 py-3 opacity-50">{m.brand}</td>
                          <td className="px-4 py-3 font-bold">{m.weight}g</td>
                          <td className="px-4 py-3 opacity-50 text-sm">{m.switchType}</td>
                          <td className="px-4 py-3">{m.pollingRate >= 1000 ? `${m.pollingRate / 1000}K` : m.pollingRate}Hz</td>
                          <td className="px-4 py-3 opacity-50">{m.layout}</td>
                          <td className="px-4 py-3 font-bold"><a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "#b8956a", textDecoration: "none" }}>{"$"}{m.price}</a></td>
                          <td className="px-4 py-3 font-black" style={{ color: col }}>{m.proUsage}%</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: "#00000008" }}>
                                <div className="h-full rounded-full" style={{ width: `${m.rating * 10}%`, background: col }} />
                              </div>
                              <span className="text-sm opacity-50">{m.rating}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap"
                              style={{ background: `${col}15`, color: col, border: `1px solid ${col}25` }}
                              onMouseEnter={e => { e.currentTarget.style.background = col; e.currentTarget.style.color = "#1a1614"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = `${col}15`; e.currentTarget.style.color = col; }}>
                              {I.cart(12)} {"$"}{m.price}
                            </a>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
            {/* Gear Check Callout */}
            {(() => {
              const topKbd = keyboards.sort((a, b) => b.proUsage - a.proUsage)[0];
              return (
                <div className="rounded-xl p-4 mt-6 flex flex-col sm:flex-row items-center gap-4" style={{ background: "linear-gradient(135deg, #b8956a08, #b8956a04)", border: "1px solid #b8956a14" }}>
                  <span className="text-xl">🏆</span>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#b8956a", letterSpacing: 2 }}>Pro Favorite</div>
                    <div className="text-sm font-bold" style={{ color: "#1a1614" }}>{topKbd.name} — {topKbd.proUsage}% pro usage · {topKbd.weight}g · {topKbd.switchType}</div>
                  </div>
                  <a href={amazonLink(topKbd.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 no-underline flex-shrink-0" style={{ background: "#b8956a", color: "#1a1614", textDecoration: "none" }}>
                    {I.cart(14, "#1a1614")} ${topKbd.price} on Amazon
                  </a>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── ALL KEYBOARDS TAB ── */}
        {activeTab === "keyboards" && (
          <div>
            <SectionTitle color="#9060c4" sub="Click any keyboard for detailed breakdown">Keyboard Showcase Gallery</SectionTitle>
            {/* ── TABBED CATEGORIES GALLERY ── */}
            {(() => {
              const SORT_OPTIONS = [
                { value: "proUsage", label: "Pro Usage" },
                { value: "weight", label: "Weight ↑" },
                { value: "price", label: "Price ↑" },
                { value: "rating", label: "Rating" },
                { value: "pollingRate", label: "Poll Rate" },
                { value: "name", label: "Name A-Z" },
                { value: "releaseYear", label: "Newest" },
              ];
              const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Pro Usage";

              // Gallery tab definitions with counts
              const galleryTabs = [
                { id: "All", label: "All", count: keyboards.length },
                { id: "60%", label: "60%", count: keyboards.filter(m => m.layout === "60%").length },
                { id: "TKL", label: "TKL", count: keyboards.filter(m => m.layout === "TKL").length },
                { id: "Full", label: "Full", count: keyboards.filter(m => m.layout === "Full" || m.layout === "Full Size").length },
                { id: "Wireless", label: "Wireless", count: keyboards.filter(m => m.connectivity === "Wireless").length },
                { id: "Budget", label: "Budget", count: keyboards.filter(m => m.price <= 100).length },
                { id: "Pro Favorites", label: "Pro Favorites", count: keyboards.filter(m => m.proUsage >= 3).length },
              ];

              return (
                <div className="mb-6" style={{ background: "#f5f2ee", border: "1px solid #e8e4df", borderRadius: 12, padding: 12, position: "relative" }}>
                  {/* Accent top line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, borderRadius: "12px 12px 0 0", background: "linear-gradient(90deg, transparent, #9060c450, transparent)" }} />

                  {/* Tab bar - styled as keyboard keys */}
                  <div className="flex gap-2 items-center flex-wrap mb-4">
                    {galleryTabs.map(tab => {
                      const isActive = galleryTab === tab.id;
                      const tabCount = tab.count;
                      const accentColor = "#9060d4";

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setGalleryTab(tab.id)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            cursor: "pointer",
                            border: "1px solid #d4cfc8",
                            background: isActive ? accentColor : "#f5f2ee",
                            color: isActive ? "#ffffff" : "#1a1614",
                            transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            boxShadow: isActive ? "0 4px 12px rgba(144, 96, 212, 0.25), inset 0 -2px 0 rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
                            transform: isActive ? "translateY(2px)" : "translateY(0px)",
                            position: "relative",
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              e.currentTarget.style.background = "#ede8e0";
                              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.08)";
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isActive) {
                              e.currentTarget.style.background = "#f5f2ee";
                              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                            }
                          }}
                        >
                          {tab.label}
                          {tabCount > 0 && (
                            <span style={{
                              marginLeft: 5,
                              display: "inline-block",
                              padding: "1px 6px",
                              borderRadius: 10,
                              background: isActive ? "rgba(255, 255, 255, 0.25)" : `${accentColor}20`,
                              color: isActive ? "#ffffff" : accentColor,
                              fontSize: 10,
                              fontWeight: 800,
                            }}>
                              {tabCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Search + Sort bar */}
                  <div className="flex gap-2.5 items-center">
                    {/* Search */}
                    <div className="flex-1 relative" style={{ minWidth: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.25 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="text" placeholder={`Search ${keyboards.length} keyboards...`} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        className="w-full outline-none" style={{ padding: "7px 12px 7px 34px", background: "#ffffff", border: "1px solid #e8e4df", borderRadius: 10, color: "#1a1614", fontFamily: "inherit", fontSize: 14 }} />
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative">
                      <button className="flex items-center gap-1.5" onClick={() => setShowSortDrop(!showSortDrop)}
                        style={{ padding: "7px 12px", background: "#ffffff", border: `1px solid ${showSortDrop ? "#9060c450" : "#0000000a"}`, borderRadius: 10, color: showSortDrop ? "#9060c4" : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                        <span style={{ color: "#8a8078", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Sort</span>
                        <span style={{ color: "#9060d4", fontWeight: 700 }}>{sortLabel}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      {showSortDrop && (
                        <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowSortDrop(false)} />
                        <div className="absolute" style={{ top: "calc(100% + 6px)", right: 0, background: "#f0ede8", border: "1px solid #d4cfc8", borderRadius: 10, padding: 4, minWidth: 180, zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.08)", animation: "fadeIn 0.15s ease" }}>
                          {SORT_OPTIONS.map(o => (
                            <div key={o.value} className="flex items-center justify-between cursor-pointer"
                              style={{ padding: "8px 12px", borderRadius: 7, fontSize: 13, fontWeight: 600, color: sortBy === o.value ? "#9060c4" : "#3d3530", transition: "all 0.15s" }}
                              onMouseEnter={e => { if (sortBy !== o.value) e.currentTarget.style.background = "#9060c420"; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                              onClick={() => { setSortBy(o.value); setShowSortDrop(false); }}>
                              {o.label}
                              {sortBy === o.value && <span style={{ fontSize: 12 }}>✓</span>}
                            </div>
                          ))}
                        </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
            {/* Results count */}
            <div className="text-sm opacity-40 mb-3">{galleryKbds.length} {galleryKbds.length === 1 ? "keyboard" : "keyboards"} found</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {galleryKbds.map(m => (
                <KeyboardCard key={m.id} keyboard={m} onClick={(kb) => { navigateToKeyboard(kb); }} isSelected={selectedKeyboard?.id === m.id} />
              ))}
            </div>
            {galleryKbds.length === 0 && (
              <div className="text-center py-16 opacity-40">
                <div className="text-2xl mb-2">No keyboards match your filters</div>
                <div className="text-sm">Try adjusting your filters or search query</div>
              </div>
            )}
          </div>
        )}

        {/* ── PRO PLAYER PROFILE VIEW ── */}
        {activeTab === "players" && selectedPlayer && (() => {
          const p = selectedPlayer;
          const gameColors = GAME_COLORS;
          const gc = gameColors[p.game] || "#8a8078";
          const currentKeyboardData = keyboards.find(m => m.name === p.keyboard);
          const brandCol = currentKeyboardData ? BRAND_COLORS[currentKeyboardData.brand] : "#a09890";
          return (
            <div>
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="mt-8 mb-4 flex items-center gap-1.5 text-sm">
                <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
                <span style={{ color: "#d4cfc8" }}>›</span>
                <a href="/players" onClick={(e) => { e.preventDefault(); const savedPos = playerListScrollPos.current; setSelectedPlayer(null); try { sessionStorage.removeItem("playerListScroll"); } catch {} router.push("/players", { scroll: false }); requestAnimationFrame(() => { requestAnimationFrame(() => { window.scrollTo({ top: savedPos, behavior: "instant" }); }); }); }} className="opacity-30 hover:opacity-60 transition-all no-underline cursor-pointer" style={{ color: "#1a1614", textDecoration: "none" }}>Players</a>
                <span style={{ color: "#d4cfc8" }}>›</span>
                <span style={{ color: gc }} className="font-bold opacity-70">{p.name}</span>
              </nav>
              {/* Share buttons */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "#a09890" }}>Share</span>
                <button onClick={() => { navigator.clipboard.writeText(`https://esportskeyboards.com/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`); }} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105" style={{ background: "#00000008", border: "1px solid #d4cfc8", color: "#1a1614" }}>📋 Copy Link</button>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(p.name + " uses " + p.keyboard)}&url=${encodeURIComponent("https://esportskeyboards.com/players/" + p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#1da1f220", border: "1px solid #6b8cad30", color: "#1da1f2", textDecoration: "none" }}>𝕏 Tweet</a>
                <a href={`https://reddit.com/submit?url=${encodeURIComponent("https://esportskeyboards.com/players/" + p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, ""))}&title=${encodeURIComponent(p.name + " (" + p.game + ") — Keyboard, Settings & Setup")}`} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#c4737320", border: "1px solid #c4737330", color: "#ff4499", textDecoration: "none" }}>Reddit</a>
                <a href={`/contact?subject=correction&player=${encodeURIComponent(p.name)}`} className="px-2.5 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline ml-auto" style={{ background: "#0000000a", border: "1px solid #d4cfc8", color: "#8a8078", textDecoration: "none" }}>⚠️ Suggest Correction</a>
              </div>
              {/* Header */}
              <div className="rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${gc}10, #ffffff)`, border: `1px solid ${gc}25` }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: gc }} />
                <div className="flex flex-col gap-3 sm:gap-6 items-start">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center"><Flag country={p.country} size={32} /></div>
                    {p.keyboard && (
                      <div className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all" style={{
                        background: `${brandCol}18`,
                        color: brandCol,
                        border: `1px solid ${brandCol}40`,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.04)"
                      }}>
                        <span>{I.keyboard(12)}</span>
                        {p.keyboard.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="text-sm uppercase tracking-widest opacity-30 mb-1">{p.role} · {p.team}</div>
                    <h2 className="text-2xl sm:text-4xl font-black mb-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: gc }}>{p.name}</h2>
                    <div className="text-sm sm:text-sm opacity-50 mb-2 sm:mb-3">{p.fullName} · Age {p.age}</div>
                    <p className="text-sm sm:text-sm opacity-50 leading-relaxed max-w-2xl">{(() => {
                      const keyboardName = p.keyboard;
                      const desc = `${p.fullName || p.name} is a professional ${p.game} ${p.role || "player"} for ${p.team}, currently using the `;
                      return <>{desc}<a href={amazonLink(keyboardName)} target="_blank" rel="noopener noreferrer"
                        className="font-bold underline decoration-dotted underline-offset-2 transition-all hover:opacity-100"
                        style={{ color: brandCol, opacity: 0.85 }}
                        onClick={e => e.stopPropagation()}>{keyboardName}</a>{`.`}</>;
                    })()}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                      <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ background: `${gc}20`, color: gc }}>{p.game}</span>
                      <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ background: "#00000008", color: "#1a1614" }}>{p.team}</span>
                      <span className="px-3 py-1 rounded-lg text-sm font-bold" style={{ background: "#00000008", color: "#1a1614" }}>{p.role}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 min-w-48">
                    <StatBox label="Age" value={p.age} color={gc} />
                  </div>
                  {/* Get This Setup CTA */}
                  <a href={amazonLink(p.keyboard)} target="_blank" rel="noopener noreferrer"
                    className="self-end mt-2 flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl transition-all group/cta"
                    style={{ background: `linear-gradient(135deg, ${brandCol}12, ${brandCol}06)`, border: `1px solid ${brandCol}30` }}
                    onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${brandCol}25, ${brandCol}15)`; e.currentTarget.style.borderColor = `${brandCol}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${brandCol}12, ${brandCol}06)`; e.currentTarget.style.borderColor = `${brandCol}30`; }}>
                    {KEYBOARD_IMAGE_URLS[p.keyboard] ? <img loading="lazy" src={KEYBOARD_IMAGE_URLS[p.keyboard]} alt={`${p.keyboard} gaming keyboard`} className="h-8 w-8 object-contain flex-shrink-0" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }} /> : <span>{I.keyboard(20)}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold" style={{ color: brandCol }}>Play like {p.name}</div>
                      <div className="text-sm opacity-85 truncate">Get the {p.keyboard} on Amazon</div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-black flex-shrink-0 transition-all"
                      style={{ background: brandCol, color: "#fff" }}>
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="#6b635b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" fill="#e8e4df"/><circle cx="20" cy="21" r="1.5" fill="#e8e4df"/></svg> {currentKeyboardData ? `$${currentKeyboardData.price}` : "Buy"}
                    </div>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                  <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#a09890" }}><span className="inline-flex mr-1.5 align-middle">{I.trophy(14)}</span>Top Achievements</div>
                  <div className="space-y-2">
                    {p.achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl border-l-4" style={{ background: i < 3 ? `${gc}08` : "#f5f2ee", borderLeftColor: "#b8956a", border: `1px solid ${i < 3 ? `${gc}15` : "#e8e4df"}`, borderLeftWidth: "4px" }}>
                        <span className="text-sm mt-0.5 flex-shrink-0">{i === 0 ? I.medal("#fbbf24", 18) : i === 1 ? I.medal("#94a3b8", 18) : i === 2 ? I.medal("#cd7f32", 18) : "▸"}</span>
                        <span className="text-sm" style={{ color: i < 3 ? gc : "#3d3530" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keyboard History + Current Setup */}
                <div className="space-y-6">
                  {/* Current Keyboard */}
                  <div className="rounded-2xl p-6" style={{ background: `${brandCol}08`, border: `1px solid ${brandCol}20` }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#a09890" }}><span className="inline-flex mr-1.5 align-middle">{I.keyboard(14)}</span>Current Keyboard</div>
                    <div className="flex items-center gap-4 mb-4">
                      {KEYBOARD_IMAGE_URLS[p.keyboard] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[p.keyboard]} alt={`${p.keyboard} - keyboard used by ${p.name} in ${p.game}`} className="h-14 w-14 object-contain object-center" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.06))" }} />}
                      <div>
                        <div className="text-xl font-black" style={{ color: brandCol }}>{p.keyboard}</div>
                        <div className="text-sm opacity-85">{currentKeyboardData?.brand} · {currentKeyboardData?.weight}g · {currentKeyboardData?.layout} · {currentKeyboardData?.connectivity}</div>
                      </div>
                    </div>
                    {currentKeyboardData && (
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#a09890" }}>Weight</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentKeyboardData.weight}g</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#a09890" }}>Switch</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentKeyboardData.switchType}</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#a09890" }}>Poll Rate</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{currentKeyboardData.pollingRate >= 1000 ? `${currentKeyboardData.pollingRate/1000}K` : currentKeyboardData.pollingRate}Hz</div>
                        </div>
                        <div className="text-center p-2 rounded-lg" style={{ background: "#0000000a" }}>
                          <div className="text-xs font-semibold" style={{ color: "#a09890" }}>Price</div>
                          <div className="text-sm font-bold" style={{ color: brandCol }}>{"$"}{currentKeyboardData.price}</div>
                        </div>
                      </div>
                    )}
                    <a href={amazonLink(p.keyboard)} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all"
                      style={{ background: brandCol, color: "#fff" }}>
                      {I.cart(16, "#fff")} Buy {p.keyboard.split(" ").slice(-3).join(" ")} on Amazon
                    </a>
                  </div>

                  {/* Keyboard History Timeline */}
                  <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-sm uppercase tracking-widest opacity-30 mb-4"><span className="inline-flex mr-1.5 align-middle">{I.refresh(14)}</span>Keyboard History</div>
                    <div className="space-y-2">
                      {p.keyboardHistory.map((mh, i) => {
                        const histKeyboard = keyboards.find(m => m.name === mh.keyboard);
                        const hCol = histKeyboard ? BRAND_COLORS[histKeyboard.brand] : "#8a8078";
                        const isActive = i === 0;
                        return (
                          <div key={i} className="p-3 rounded-lg border-l-4 transition-all" style={{
                            background: isActive ? `${hCol}12` : "#f5f2ee",
                            borderLeftColor: hCol,
                            border: `1px solid ${isActive ? `${hCol}25` : "#e8e4df"}`,
                            borderLeftWidth: "4px",
                            boxShadow: isActive ? `0 4px 12px ${hCol}20` : "0 2px 4px rgba(0,0,0,0.04)"
                          }}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold" style={{ color: hCol }}>{mh.keyboard}</div>
                                <div className="text-xs opacity-40 mt-0.5">{mh.period}</div>
                              </div>
                              {isActive && (
                                <a href={amazonLink(mh.keyboard)} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-bold transition-all flex-shrink-0 no-underline"
                                  style={{ background: hCol, color: "#ffffff", textDecoration: "none" }}
                                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
                                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
                                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none"><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" fill="currentColor"/><circle cx="20" cy="21" r="1.5" fill="currentColor"/></svg>
                                  {histKeyboard ? `$${histKeyboard.price}` : "Buy"}
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Other players from same game */}
              <div className="mt-8">
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Other {p.game} Players</div>
                <div className="flex flex-wrap gap-3">
                  {proPlayers.filter(op => op.game === p.game && op.name !== p.name).map((op, i) => (
                    <a key={i} href={`/players/${op.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.03] no-underline"
                      style={{ background: "#ffffff", border: "1px solid #d4cfc8", color: "#1a1614", textDecoration: "none" }}>
                      <Flag country={op.country} size={16} />
                      <span>{op.name}</span>
                      <span className="opacity-30">({op.team})</span>
                    </a>
                  ))}
                </div>
              </div>

            {/* Suggest correction + related links */}
            <div className="flex flex-wrap items-center gap-3 mt-4 mb-2">
              <a href="/contact" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>📝 Suggest a correction</a>
              <span className="opacity-10">·</span>
              <a href={`/best/${p.game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`} className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: gc, textDecoration: "none" }}>Best keyboards for {p.game}</a>
              <a href="/players" className="text-xs opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>All pro settings</a>
            </div>
            </div>
          );
        })()}

        {/* ── PRO PLAYERS LIST TAB ── */}
        {activeTab === "players" && !selectedPlayer && (() => {
          const gameColors = GAME_COLORS;
          const allGames = ["All", ...new Set(allPlayers.map(p => p.game))];
          const allRoles = ["All", ...new Set(allPlayers.map(p => p.role).filter(Boolean))];
          const allCountries = ["All", ...new Set(allPlayers.map(p => p.country).filter(Boolean)).values()].sort();
          const activeFilterCount = [gameFilter !== "All", roleFilter !== "All", countryFilter !== "All", keyboardFilter, teamFilter, profileOnly].filter(Boolean).length;
          const filteredPlayers = allPlayers
            .filter(p => gameFilter === "All" || p.game === gameFilter)
            .filter(p => roleFilter === "All" || p.role === roleFilter)
            .filter(p => countryFilter === "All" || p.country === countryFilter)
            .filter(p => !keyboardFilter || (p.keyboard || "").toLowerCase().includes(keyboardFilter.toLowerCase()))
            .filter(p => !teamFilter || (p.team || "").toLowerCase().includes(teamFilter.toLowerCase()))
            .filter(p => !profileOnly || p.hasProfile)
            .filter(p => (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || (p.team || "").toLowerCase().includes(searchQuery.toLowerCase()) || (p.keyboard || "").toLowerCase().includes(searchQuery.toLowerCase()));
          const sortedPlayers = [...filteredPlayers].sort((a, b) => {
            if (!playerSort.key) return 0;
            const k = playerSort.key;
            let av = a[k], bv = b[k];
            if (av == null) av = k === "name" || k === "game" || k === "team" || k === "keyboard" || k === "role" ? "" : -Infinity;
            if (bv == null) bv = k === "name" || k === "game" || k === "team" || k === "keyboard" || k === "role" ? "" : -Infinity;
            if (typeof av === "string") { return playerSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av); }
            return playerSort.dir === "asc" ? av - bv : bv - av;
          });
          const sortHeaders = [
            { key: null, label: "" },
            { key: "name", label: "Player" },
            { key: "game", label: "Game" },
            { key: "team", label: "Team" },
            { key: "keyboard", label: "Keyboard" },
            { key: "hz", label: "Hz" },
            { key: "actuationPoint", label: "Actuation" },
            { key: "role", label: "Role" },
          ];
          return (
          <div>
            <SectionTitle color="#6b8cad" sub={`${allPlayers.length} players across ${new Set(allPlayers.map(p=>p.game)).size} games  -  click starred players for full profiles`}>Pro Player Settings Database</SectionTitle>
            {/* Player quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {(() => {
                const fp = gameFilter === "All" ? allPlayers : allPlayers.filter(p => p.game === gameFilter);
                const mc = {}; fp.forEach(p => { mc[p.keyboard] = (mc[p.keyboard] || 0) + 1; });
                const topM = Object.entries(mc).sort((a,b) => b[1]-a[1])[0];
                const countries = new Set(fp.map(p => p.country)).size;
                const teams = new Set(fp.filter(p => p.team !== "Content" && p.team !== "Free Agent" && p.team !== "Inactive" && p.team !== "Retired").map(p => p.team)).size;
                return [
                  { label: "Top Keyboard", value: topM ? topM[0].replace(/(Wooting |Razer )/, "") : "-", color: "#b8956a" },
                  { label: "Countries", value: countries, color: "#6b8cad" },
                  { label: "Active Teams", value: teams, color: "#b8956a" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center" style={{ background: `${s.color}06`, border: `1px solid ${s.color}10` }}>
                    <div className="text-sm font-black" style={{ color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 12 }} className="opacity-30 mt-0.5">{s.label}</div>
                  </div>
                ));
              })()}
            </div>

            {/* ── MOST USED PRO KEYBOARDS — BUY STRIP ── */}
            {(() => {
              const fp = gameFilter === "All" ? allPlayers : allPlayers.filter(p => p.game === gameFilter);
              const mc = {}; fp.forEach(p => { mc[p.keyboard] = (mc[p.keyboard] || 0) + 1; });
              const topKeyboards = Object.entries(mc).sort((a,b) => b[1]-a[1]).slice(0, 5);
              return (
                <div className="rounded-xl p-4 mb-5" style={{ background: "#b8956a06", border: "1px solid #b8956a20" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: "#b8956a" }}>{I.trophy(16)}</span>
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#b8956a" }}>Most Used by {gameFilter === "All" ? "All" : gameFilter} Pros</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topKeyboards.map(([kbdName, count], i) => {
                      const m = keyboards.find(mm => mm.name === kbdName);
                      const pct = Math.round(count / fp.length * 100);
                      return (
                        <a key={i} href={amazonLink(kbdName)} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:scale-[1.03] no-underline"
                          style={{ background: i === 0 ? "#b8956a14" : "#0000000a", border: i === 0 ? "1px solid #b8956a25" : "1px solid #e8e4df", textDecoration: "none" }}>
                          <span className="text-xs font-black" style={{ color: i === 0 ? "#b8956a" : "#a09890" }}>#{i+1}</span>
                          <div>
                            <div className="text-xs font-bold text-stone-900">{kbdName.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |Endgame Gear |ASUS |Keychron |Glorious )/, "")}</div>
                            <div style={{ fontSize: 10, color: "#a09890" }}>{pct}% of pros{m ? ` · $${m.price}` : ""}</div>
                          </div>
                          <span style={{ color: "#b8956a", opacity: 0.6 }}>{I.cart(12)}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Game pill filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {allGames.map(g => {
                const gc2 = g === "All" ? "#6b8cad" : (gameColors[g] || "#8a8078");
                const active = gameFilter === g;
                return (
                  <button key={g} onClick={() => { setGameFilter(g); setPlayerPage(0); }}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5"
                    style={{ background: active ? `${gc2}25` : "#ffffff", color: active ? gc2 : "#2d2824", border: active ? `1px solid ${gc2}50` : "1px solid #e8e4df" }}>
                    {g !== "All" && GAME_IMAGE_URLS[g] && <img loading="lazy" src={GAME_IMAGE_URLS[g]} alt={g} className="w-4 h-4 object-contain" />}
                    {g}{g !== "All" && <span className="ml-1 opacity-50">({allPlayers.filter(p => p.game === g).length})</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 mb-3">
              <input type="text" aria-label="Search players" placeholder="Search player, team, or keyboard..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPlayerPage(0); }}
                className="px-4 py-2 rounded-lg text-sm outline-none flex-1 min-w-48" style={{ background: "#ffffff", border: "1px solid #d4cfc8", color: "#1a1614" }} />
              <button onClick={() => setShowFilters(f => !f)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                style={{ background: showFilters || activeFilterCount > 0 ? "#6b8cad18" : "#ffffff", border: showFilters || activeFilterCount > 0 ? "1px solid #6b8cad40" : "1px solid #d4cfc8", color: showFilters || activeFilterCount > 0 ? "#6b8cad" : "#6b635b" }}>
                {I.gear(14)} Filters {activeFilterCount > 0 && <span className="px-1.5 py-0.5 rounded-full text-sm font-black" style={{ background: "#6b8cad", color: "#fff", fontSize: 10 }}>{activeFilterCount}</span>}
              </button>
              <button onClick={() => { setProfileOnly(p => !p); setPlayerPage(0); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all"
                style={{ background: profileOnly ? "#b8956a15" : "#ffffff", border: profileOnly ? "1px solid #b8956a40" : "1px solid #d4cfc8", color: profileOnly ? "#b8956a" : "#8a8078" }}>
                {I.star(14)} Full Profiles Only
              </button>
              <div className="flex items-center gap-2 text-sm opacity-70 px-3">
                {I.star(16)} = Full profile available
              </div>
            </div>

            {/* Expanded filters panel */}
            {showFilters && (
              <div className="rounded-xl p-4 mb-4 grid grid-cols-2 md:grid-cols-4 gap-4" style={{ background: "#ffffff", border: "1px solid #d4cfc8" }}>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#a09890" }}>Role</div>
                  <select aria-label="Filter by role" value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm cursor-pointer" style={{ background: "#f5f2ee", border: "1px solid #d4cfc8", color: "#1a1614" }}>
                    {allRoles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#a09890" }}>Country</div>
                  <select aria-label="Filter by country" value={countryFilter} onChange={e => { setCountryFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm cursor-pointer" style={{ background: "#f5f2ee", border: "1px solid #d4cfc8", color: "#1a1614" }}>
                    {allCountries.map(c => <option key={c} value={c}>{c === "All" ? "All" : countryName(c)}</option>)}
                  </select>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#a09890" }}>Keyboard</div>
                  <input type="text" aria-label="Filter by keyboard" placeholder="e.g. Wooting, Huntsman..." value={keyboardFilter} onChange={e => { setKeyboardFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "#f5f2ee", border: "1px solid #d4cfc8", color: "#1a1614" }} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#a09890" }}>Team</div>
                  <input type="text" aria-label="Filter by team name" placeholder="e.g. Navi, Fnatic..." value={teamFilter} onChange={e => { setTeamFilter(e.target.value); setPlayerPage(0); }}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={{ background: "#f5f2ee", border: "1px solid #d4cfc8", color: "#1a1614" }} />
                </div>
                <div className="col-span-2 flex items-end">
                  <button onClick={() => { setGameFilter("All"); setRoleFilter("All"); setCountryFilter("All"); setKeyboardFilter(""); setTeamFilter(""); setProfileOnly(false); setSearchQuery(""); setPlayerPage(0); }}
                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                    style={{ background: "#00000008", border: "1px solid #d4cfc8", color: "#8a8078" }}>
                    ✕ Clear All Filters
                  </button>
                </div>
              </div>
            )}
            <div data-player-table className="overflow-x-auto rounded-2xl" style={{ border: "1px solid #e8e4df" }}>
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr style={{ background: "#ffffff" }}>
                    {sortHeaders.map(h => (
                      <th key={h.label || "_star"} className={`px-3 py-3 text-left text-sm uppercase tracking-wider font-bold ${h.key ? "cursor-pointer select-none hover:opacity-80" : ""}`}
                        style={{ color: playerSort.key === h.key ? "#6b8cad" : "#8a8078" }}
                        aria-sort={playerSort.key === h.key ? (playerSort.dir === "asc" ? "ascending" : "descending") : undefined}
                        onClick={() => { if (h.key) { setPlayerSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: "asc" }); setPlayerPage(0); } }}>
                        {h.label}{playerSort.key === h.key ? (playerSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.slice(playerPage * PLAYERS_PER_PAGE, (playerPage + 1) * PLAYERS_PER_PAGE).map((p, i) => {
                    const gc = gameColors[p.game] || "#8a8078";
                    const profilePlayer = p.hasProfile ? proPlayers.find(pp => pp.name === p.name && pp.game === (p.game)) || proPlayers.find(pp => pp.name === p.name) : null;
                    const keyboardMatch = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name)));
                    const brandCol = keyboardMatch ? (BRAND_COLORS[keyboardMatch.brand] || "#8a8078") : "#a09890";
                    const actualIndex = playerPage * PLAYERS_PER_PAGE + i;
                    return (
                      <tr key={`${p.name}-${p.game}-${actualIndex}`}
                        className={`transition-all duration-200 ${p.hasProfile ? "cursor-pointer" : ""}`}
                        onClick={() => { if (profilePlayer) { navigateToPlayer(profilePlayer); } }}
                        style={{ borderBottom: "1px solid #e8e4df", background: actualIndex % 2 === 0 ? "#f5f0e8" : "#f5f2ee", borderLeft: `3px solid ${gc}` }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${gc}0c`; e.currentTarget.style.boxShadow = `inset 4px 0 12px ${gc}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.background = actualIndex % 2 === 0 ? "#f5f0e8" : "#f5f2ee"; e.currentTarget.style.boxShadow = "none"; }}>
                        <td className="pl-3 pr-1 py-2.5 text-center">{p.hasProfile ? <span title="Full profile available" className="inline-flex" style={{ filter: `drop-shadow(0 0 4px ${gc}60)` }}>{I.star(14)}</span> : <span className="opacity-10">·</span>}</td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Flag country={p.country} size={18} className="flex-shrink-0" />
                            <div>
                              <div className="text-sm font-black text-stone-900 leading-tight">{p.name}</div>
                              {p.hasProfile && <div style={{ fontSize: 10, color: gc, opacity: 0.7 }}>{p.fullName || ""}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-sm font-bold" style={{ background: `${gc}12`, color: gc, fontSize: 11 }}>{p.game}</span>
                        </td>
                        <td className="px-2 py-2.5 opacity-50 whitespace-nowrap text-sm">{p.team}</td>
                        <td className="px-2 py-2.5 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            {keyboardMatch && KEYBOARD_IMAGE_URLS[keyboardMatch.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[keyboardMatch.name]} alt="" className="h-4 w-6 object-contain opacity-60 flex-shrink-0" />}
                            <span className="text-sm truncate" style={{ color: brandCol, maxWidth: 140 }}>{p.keyboard}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 text-sm opacity-40">{p.hz ? `${p.hz >= 1000 ? `${p.hz/1000}K` : p.hz}` : " - "}</td>
                        <td className="px-2 py-2.5 text-sm">
                          <span className="opacity-40">{p.role}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {(() => {
              const totalPages = Math.ceil(sortedPlayers.length / PLAYERS_PER_PAGE);
              const showing = Math.min((playerPage + 1) * PLAYERS_PER_PAGE, sortedPlayers.length);
              const from = sortedPlayers.length > 0 ? playerPage * PLAYERS_PER_PAGE + 1 : 0;
              if (totalPages <= 1) return (
                <div className="text-center text-sm opacity-20 mt-3">{filteredPlayers.length} of {allPlayers.length} players shown{activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active` : ""}</div>
              );
              // Build page numbers to show
              const pages = [];
              for (let p = 0; p < totalPages; p++) {
                if (p === 0 || p === totalPages - 1 || Math.abs(p - playerPage) <= 2) pages.push(p);
                else if (pages[pages.length - 1] !== -1) pages.push(-1); // ellipsis
              }
              return (
                <div className="flex flex-col items-center gap-3 mt-4">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => { setPlayerPage(p => Math.max(0, p - 1)); document.querySelector("[data-player-table]")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      disabled={playerPage === 0}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-20"
                      style={{ background: "#00000008", border: "1px solid #d4cfc8", color: "#1a1614" }}>
                      ← Prev
                    </button>
                    {pages.map((p, idx) => p === -1 ? (
                      <span key={`e${idx}`} className="px-1 text-xs opacity-20">…</span>
                    ) : (
                      <button key={p} onClick={() => { setPlayerPage(p); document.querySelector("[data-player-table]")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                        className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                        style={{ background: p === playerPage ? "#6b8cad20" : "#0000000a", border: `1px solid ${p === playerPage ? "#6b8cad40" : "#00000008"}`, color: p === playerPage ? "#6b8cad" : "#8a8078" }}>
                        {p + 1}
                      </button>
                    ))}
                    <button onClick={() => { setPlayerPage(p => Math.min(totalPages - 1, p + 1)); document.querySelector("[data-player-table]")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      disabled={playerPage >= totalPages - 1}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-20"
                      style={{ background: "#00000008", border: "1px solid #d4cfc8", color: "#1a1614" }}>
                      Next →
                    </button>
                  </div>
                  <div className="text-xs opacity-20">Showing {from}–{showing} of {sortedPlayers.length} players{activeFilterCount > 0 ? ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active` : ""}</div>
                </div>
              );
            })()}

            {/* ── PRO SETUP SPOTLIGHT ── */}
            {(() => {
              const top250Pros = shuffle(proPlayers.filter(p => TOP250.has(p.name) && (gameFilter === "All" || p.game === gameFilter))).slice(0, 3);
              if (!top250Pros.length) return null;
              return (
                <div className="mt-8 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ color: "#b8956a" }}>{I.star(16)}</span>
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "#b8956a" }}>Featured Pro Setups</span>
                    <span className="text-xs opacity-20 ml-1">refreshes on load</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {top250Pros.map((p, i) => {
                      const gc = gameColors[p.game] || "#8a8078";
                      const m = keyboards.find(mm => mm.name === p.keyboard);
                      return (
                        <div key={i} className="rounded-xl p-4 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]" style={{ background: `${gc}06`, border: `1px solid ${gc}12` }}
                          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px ${gc}15`; e.currentTarget.style.borderColor = `${gc}30`; }}
                          onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${gc}12`; }}>
                          <div className="absolute top-0 right-0 w-24 h-24 opacity-5" style={{ background: `radial-gradient(circle, ${gc}, transparent)`, transform: "translate(30%, -30%)" }} />
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: `${gc}15`, border: `1px solid ${gc}20` }}><Flag country={p.country} size={22} /></div>
                            <div className="flex-1 min-w-0">
                              <a href={`/players/${p.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`} className="text-sm font-black text-stone-900 no-underline hover:underline" style={{ textDecoration: "none" }}>{p.name}</a>
                              <div style={{ fontSize: 11, color: gc }}>{p.team} · {p.game}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg" style={{ background: "#00000008" }}>
                            {m && KEYBOARD_IMAGE_URLS[m.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt="" className="h-5 w-8 object-contain opacity-70 flex-shrink-0" />}
                            <span className="text-xs font-bold truncate" style={{ color: m ? (BRAND_COLORS[m.brand] || "#6b635b") : "#6b635b" }}>{p.keyboard}</span>
                            {p.role && p.role !== "—" && <span className="text-xs opacity-20 ml-auto flex-shrink-0">{p.role}</span>}
                          </div>
                          <a href={amazonLink(p.keyboard)} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.03] no-underline"
                            style={{ background: "#b8956a14", color: "#b8956a", border: "1px solid #b8956a30", textDecoration: "none" }}>
                            {I.cart(11)} Get {p.name}'s Keyboard{m ? ` — $${m.price}` : ""}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          </div>
          );
        })()}

        {/* ── BRANDS TAB ── */}
        {activeTab === "brands" && (
          <div>
            <SectionTitle color="#b8956a" sub="The companies defining competitive keyboard performance">Keyboard Manufacturers</SectionTitle>

            {/* Brand Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "Wooting", tagline: "Pioneers of Analog & Rapid Trigger",
                  desc: "The Dutch startup that revolutionized competitive keyboards with the 60HE. Wooting introduced Hall-effect analog switches and rapid trigger technology to mainstream gaming, allowing sub-0.1mm actuation adjustments that fundamentally changed how FPS players press keys. The 60HE became the most-used keyboard in professional esports by 2024, adopted by top CS2 and Valorant players worldwide. Their Lekker switches and open-source firmware approach have earned them a cult following among competitive players.",
                  achievements: ["#1 keyboard in professional esports (60HE, 2024–Present)", "Pioneered consumer rapid trigger technology", "Open-source firmware with community-driven features"],
                  flagships: ["60HE+", "60HE", "80HE"] },
                { name: "Razer", tagline: "Esports Heritage Meets Innovation",
                  desc: "Razer brought their decades of esports peripheral expertise to the keyboard market with the Huntsman series. The Huntsman V3 Pro introduced Razer's 2nd-gen optical switches with adjustable actuation from 0.1mm to 4.0mm and rapid trigger support, directly challenging Wooting's dominance. With massive brand recognition, tournament sponsorships, and a proven track record in competitive peripherals, Razer keyboards are a staple in professional setups across every major title.",
                  achievements: ["Huntsman V3 Pro: flagship rapid trigger keyboard for esports", "2nd-gen optical switches with 0.1mm adjustable actuation", "Largest esports sponsorship portfolio in the industry"],
                  flagships: ["Huntsman V3 Pro Mini", "Huntsman V3 Pro TKL", "Huntsman V3 Pro"] },
                { name: "SteelSeries", tagline: "The OmniPoint Advantage",
                  desc: "SteelSeries redefined what a mainstream gaming keyboard could do with the Apex Pro series. Their proprietary OmniPoint adjustable switches were among the first to offer per-key actuation tuning, and the Apex Pro TKL (2024) refresh brought rapid trigger and 8KHz polling to the lineup. Popular with streamers and professionals alike, SteelSeries keyboards combine premium build quality with an intuitive software experience through SteelSeries GG.",
                  achievements: ["OmniPoint switches: early pioneer in adjustable actuation", "Apex Pro TKL: consistent top-5 in pro keyboard rankings", "Industry-leading keyboard customization software"],
                  flagships: ["Apex Pro TKL (2024)", "Apex Pro Mini", "Apex 9 TKL"] },
                { name: "Logitech", tagline: "Swiss Engineering, Pro Performance",
                  desc: "Logitech G has been a cornerstone of esports peripherals for over a decade. Their keyboard lineup leverages proprietary GX switches and Lightspeed wireless technology to deliver reliable competitive performance. The G Pro X series keyboards have been adopted by numerous professional teams, and Logitech's reputation for build quality and longevity makes them a trusted choice. Their recent push into analog and rapid trigger technology shows commitment to staying competitive.",
                  achievements: ["G Pro X keyboard: staple of professional team sponsorships", "Lightspeed wireless technology across keyboard lineup", "Largest esports team partnership portfolio"],
                  flagships: ["G Pro X TKL Rapid", "G Pro X 60", "G Pro X TKL"] },
                { name: "Corsair", tagline: "Flagship Features at Every Price",
                  desc: "Corsair brings manufacturing scale and engineering depth to the competitive keyboard market. The K65 Plus and K70 MAX feature rapid trigger and adjustable actuation through magnetic Hall-effect switches, while the iCUE ecosystem provides deep customization. Corsair's strength lies in delivering premium features across multiple price points, making advanced keyboard technology accessible to a broader audience of competitive players.",
                  achievements: ["K65 Plus: compelling rapid trigger keyboard at competitive pricing", "iCUE: one of the most comprehensive customization platforms", "Full ecosystem spanning keyboards, peripherals, audio, and streaming"],
                  flagships: ["K65 Plus", "K70 MAX", "K100 Air"] },
                { name: "Cherry", tagline: "The Switch Standard-Bearer",
                  desc: "Cherry is the legendary German company whose MX switches defined mechanical keyboards for decades. While newer Hall-effect and optical technologies have disrupted the market, Cherry's switches remain the benchmark that all others are measured against. Their own branded keyboards now incorporate modern features like hot-swappable sockets and refined Cherry MX2A switches, bridging the gap between their heritage of mechanical precision and the demands of modern competitive gaming.",
                  achievements: ["MX switches: the global standard for mechanical keyboards since 1983", "Cherry MX2A: refined next-gen mechanical switches", "Over 40 years of keyboard switch engineering expertise"],
                  flagships: ["XTRFY K5V2", "MX Board", "MX 10.0N"] },
                { name: "Ducky", tagline: "Mechanical Keyboard Purists",
                  desc: "Ducky has been a beloved name in the mechanical keyboard community long before gaming keyboards became mainstream. The Taiwanese manufacturer is known for clean designs, premium PBT keycaps, and a focus on typing feel that appeals to both gamers and enthusiasts. The One 3 series and recent competitive-focused models have kept Ducky relevant in the esports era, with several pro players choosing Ducky boards for their balanced feel and build quality.",
                  achievements: ["One 3 series: benchmark for premium stock mechanical keyboards", "PBT keycaps standard when most brands used ABS", "Cult following in both enthusiast and competitive communities"],
                  flagships: ["One 3 SF", "One 3 Mini", "One 3 TKL"] },
                { name: "DrunkDeer", tagline: "Rapid Trigger for Everyone",
                  desc: "DrunkDeer disrupted the competitive keyboard market by bringing rapid trigger and Hall-effect technology to aggressive price points. The A75 proved you don't need to spend $200 to get competitive-grade actuation speed, and their follow-up models continued to push value. Popular with budget-conscious FPS players, DrunkDeer has carved out a significant niche by democratizing the rapid trigger technology that was once exclusive to premium boards.",
                  achievements: ["A75: brought rapid trigger to the sub-$100 market", "Fastest-growing budget competitive keyboard brand (2024–2025)", "Hall-effect switches at 40-50% lower price than competitors"],
                  flagships: ["A75", "G65", "A75 Pro"] },
              ].map((brand, bi) => {
                const col = BRAND_COLORS[brand.name] || "#8a8078";
                const brandKbds = keyboards.filter(m => m.brand === brand.name).sort((a, b) => b.proUsage - a.proUsage);
                const totalProUsage = brandKbds.reduce((s, m) => s + m.proUsage, 0);
                const proCount = allPlayers.filter(p => brandKbds.some(m => m.name === p.keyboard)).length;
                return (
                  <div key={brand.name} className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg group"
                    style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    {/* Header bar */}
                    <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 relative overflow-hidden">
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${col}06, transparent)` }} />
                      <div className="relative flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl sm:text-2xl" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, color: "#1a1614" }}>{brand.name}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${col}0a`, color: col, border: `1px solid ${col}18` }}>{brandKbds.length} models</span>
                          </div>
                          <div className="text-xs font-semibold tracking-wide" style={{ color: col }}>{brand.tagline}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: col }}>{proCount}</div>
                          <div className="text-[10px] uppercase tracking-widest" style={{ color: "#a09890" }}>Pro Users</div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      {/* Description */}
                      <p className="text-xs leading-relaxed mb-4" style={{ color: "#6b635b" }}>{brand.desc}</p>

                      {/* Achievements */}
                      <div className="space-y-1.5 mb-4">
                        {brand.achievements.map((a, ai) => (
                          <div key={ai} className="flex items-start gap-2 text-xs">
                            <span style={{ color: col, fontSize: 8, marginTop: 4 }}>●</span>
                            <span style={{ color: "#2d2824" }}>{a}</span>
                          </div>
                        ))}
                      </div>

                      {/* Flagship products */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {brand.flagships.map((f, fi) => {
                          const kbd = keyboards.find(m => m.name === f || m.name.includes(f));
                          return (
                            <a key={fi} href={kbd ? amazonLink(kbd.name) : "#"} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all hover:scale-105 no-underline"
                              style={{ background: `${col}08`, color: col, border: `1px solid ${col}15`, textDecoration: "none" }}>
                              {KEYBOARD_IMAGE_URLS[f] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[f]} alt={f} className="h-4 w-5 object-contain" />}
                              {f.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer )/, "")}
                              {kbd && <span style={{ color: "#a09890" }}>${kbd.price}</span>}
                            </a>
                          );
                        })}
                      </div>

                      {/* View full page */}
                      <button onClick={() => { window.location.href = `/brands/${brand.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`; }}
                        className="text-xs font-semibold transition-all hover:gap-3 flex items-center gap-1.5"
                        style={{ color: col }}>
                        View full {brand.name} profile <span className="transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "trends" && (
          <div>
            <SectionTitle color="#f472b6" sub="How esports keyboards have evolved over the years">Industry Trends & Evolution</SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Average Keyboard Weight Over Time</div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={weightTrend}>
                    <defs>
                      <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c4508a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#c4508a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b8956a" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#b8956a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4df" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#a09890", fontSize: 13 }} tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <YAxis tick={{ fill: "#a09890", fontSize: 13 }} unit="g" tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="avgWeight" stroke="#f472b6" fill="url(#wg1)" strokeWidth={2} name="Avg Weight" />
                    <Area type="monotone" dataKey="lightest" stroke="#b8956a" fill="url(#wg2)" strokeWidth={2} name="Lightest" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Polling Rate Evolution (Hz)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={pollingTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4df" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#a09890", fontSize: 13 }} tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <YAxis tick={{ fill: "#a09890", fontSize: 13 }} tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 13, opacity: 0.5 }} />
                    <Line type="monotone" dataKey="max" stroke="#b8956a" strokeWidth={2} dot={{ r: 3, fill: "#b8956a" }} name="Max Available" />
                    <Line type="monotone" dataKey="avg" stroke="#6b8cad" strokeWidth={2} dot={{ r: 3, fill: "#6b8cad" }} name="Average" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <SectionTitle color="#06b6d4" sub="Which keyboard layouts dominate the professional scene">Pro Keyboard Layout Breakdown</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Shape Distribution Among Pros</div>
                {(() => {
                  const shapeCounts = {};
                  allPlayers.forEach(p => {
                    const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name)));
                    if (m) shapeCounts[m.layout] = (shapeCounts[m.layout] || 0) + 1;
                  });
                  const total = Object.values(shapeCounts).reduce((a, b) => a + b, 0);
                  const shapeData = Object.entries(shapeCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({
                    name, value: parseFloat((count / total * 100).toFixed(1)),
                    fill: name === "Symmetrical" ? "#06b6d4" : name === "Ergonomic" ? "#f472b6" : "#d4af37"
                  }));
                  return (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={shapeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} strokeWidth={0}
                          label={({ name, value }) => `${name}: ${value}%`}>
                          {shapeData.map((s, i) => <Cell key={i} fill={s.fill} fillOpacity={0.7} />)}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  );
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Wireless vs Wired Adoption in Pro Esports (%)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={wirelessTrend}>
                    <defs>
                      <linearGradient id="wlg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b8956a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#b8956a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wlg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c44040" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#c44040" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4df" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#a09890", fontSize: 13 }} tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <YAxis tick={{ fill: "#a09890", fontSize: 13 }} unit="%" domain={[0, 100]} tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 13, opacity: 0.5 }} />
                    <Area type="monotone" dataKey="wireless" stroke="#b8956a" fill="url(#wlg1)" strokeWidth={2} name="Wireless %" />
                    <Area type="monotone" dataKey="wired" stroke="#ff3c3c" fill="url(#wlg2)" strokeWidth={2} name="Wired %" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Keyboard Price Evolution (USD)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={priceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e4df" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: "#a09890", fontSize: 13 }} tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <YAxis tick={{ fill: "#a09890", fontSize: 13 }} unit="$" tickLine={false} axisLine={{ stroke: '#e8e4df' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 13, opacity: 0.5 }} />
                    <Line type="monotone" dataKey="flagship" stroke="#d4af37" strokeWidth={2} dot={{ r: 3, fill: "#b8956a" }} name="Flagship" />
                    <Line type="monotone" dataKey="avg" stroke="#6b8cad" strokeWidth={2} dot={{ r: 3, fill: "#6b8cad" }} name="Average" />
                    <Line type="monotone" dataKey="budget" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#2a8a62" }} name="Budget" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 sm:mt-8 text-center">
              {[
                (() => {
                  const lightest = [...keyboards].sort((a, b) => a.weight - b.weight)[0];
                  const mostPopular = [...keyboards].sort((a, b) => b.proUsage - a.proUsage)[0];
                  const highestPolling = Math.max(...keyboards.map(m => m.pollingRate));
                  const cheapest = [...keyboards].sort((a, b) => a.price - b.price)[0];
                  return [
                    { label: "Lightest Keyboard", value: lightest.name, sub: `${lightest.weight}g`, color: "#c4508a", kbd: lightest },
                    { label: "Most Popular", value: mostPopular.name, sub: `${mostPopular.proUsage}% pro share`, color: "#b8956a", kbd: mostPopular },
                    { label: "Highest Polling", value: `${(highestPolling/1000).toFixed(0)},000 Hz`, sub: `${keyboards.filter(m => m.pollingRate === highestPolling).length} keyboards`, color: "#6b8cad", kbd: keyboards.find(m => m.pollingRate === highestPolling) },
                    { label: "Most Affordable", value: cheapest.name, sub: `$${cheapest.price}`, color: "#c4a020", kbd: cheapest },
                  ];
                })()
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: `${s.color}06`, border: `1px solid ${s.color}15` }}>
                  <div className="text-sm uppercase tracking-widest opacity-30 mb-2">{s.label}</div>
                  <div className="text-sm font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-sm opacity-85 mt-1">{s.sub}</div>
                  {s.kbd && <a href={amazonLink(s.kbd.name)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded text-xs font-bold no-underline hover:scale-105 transition-all" style={{ background: "#b8956a18", color: "#b8956a", textDecoration: "none", fontSize: 10 }}>{I.cart(9)} ${s.kbd.price}</a>}
                </div>
              ))}
            </div>

            {/* ── Brand Dominance Race ── */}
            <SectionTitle color="#e879f9" sub="How the top brands stack up across every major metric">Brand Performance Scorecard</SectionTitle>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e8e4df" }}>
              {(() => {
                const topBrandNames = ["Wooting", "Razer", "Logitech", "SteelSeries", "Corsair", "Ducky", "Cherry"];
                const brandStats = topBrandNames.map(brand => {
                  const brandKeyboards = keyboards.filter(m => m.brand === brand);
                  const guessBrand = (kbName) => {
                    const n = kbName.toLowerCase();
                    if (n.includes("razer") || n.includes("huntsman") || n.includes("blackwidow")) return "Razer";
                    if (n.includes("logitech") || n.includes("g pro") || n.includes("gpro") || n.includes("g915") || n.includes("g715")) return "Logitech";
                    if (n.includes("wooting") || n.includes("60he") || n.includes("80he")) return "Wooting";
                    if (n.includes("steelseries") || n.includes("apex pro") || n.includes("apex 9")) return "SteelSeries";
                    if (n.includes("corsair") || n.includes("k65") || n.includes("k70") || n.includes("k100")) return "Corsair";
                    if (n.includes("ducky") || n.includes("one 3")) return "Ducky";
                    return null;
                  };
                  const brandPlayers = allPlayers.filter(p => {
                    const m = keyboards.find(mm => mm.name === p.keyboard || (p.keyboard && p.keyboard.includes(mm.name)));
                    const detected = m ? m.brand : guessBrand(p.keyboard);
                    return detected === brand;
                  });
                  const avgWeight = brandKeyboards.length ? Math.round(brandKeyboards.reduce((a, m) => a + m.weight, 0) / brandKeyboards.length) : 0;
                  const avgPrice = brandKeyboards.length ? Math.round(brandKeyboards.reduce((a, m) => a + m.price, 0) / brandKeyboards.length) : 0;
                  const maxPoll = brandKeyboards.length ? Math.max(...brandKeyboards.map(m => m.pollingRate)) : 0;
                  const proShare = Math.round(brandPlayers.length / allPlayers.length * 100);
                  const avgRating = brandKeyboards.length ? (brandKeyboards.reduce((a, m) => a + m.rating, 0) / brandKeyboards.length).toFixed(1) : 0;
                  const keyboardCount = brandKeyboards.length;
                  return { brand, avgWeight, avgPrice, maxPoll, proShare, avgRating, keyboardCount };
                });
                const headers = [
                  { label: "Brand", key: "brand" },
                  { label: "Models", key: "keyboardCount" },
                  { label: "Pro Share", key: "proShare" },
                  { label: "Avg Weight", key: "avgWeight" },
                  { label: "Avg Price", key: "avgPrice" },
                  { label: "Max Poll", key: "maxPoll" },
                  { label: "Avg Rating", key: "avgRating" },
                ];
                const sorted = [...brandStats].sort((a, b) => {
                  const key = brandScoreSort.key;
                  const dir = brandScoreSort.dir === "asc" ? 1 : -1;
                  if (key === "brand") return dir * a.brand.localeCompare(b.brand);
                  if (key === "avgRating") return dir * (parseFloat(a[key]) - parseFloat(b[key]));
                  return dir * (a[key] - b[key]);
                });
                return (
                  <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "#ffffff" }}>
                        {headers.map(h => (
                          <th key={h.label} className="px-4 py-3 text-sm uppercase tracking-widest font-bold text-left cursor-pointer select-none hover:opacity-80"
                            style={{ color: brandScoreSort.key === h.key ? "#e879f9" : "#8a8078" }}
                            onClick={() => setBrandScoreSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: h.key === "brand" ? "asc" : "desc" })}>
                            {h.label}{brandScoreSort.key === h.key ? (brandScoreSort.dir === "asc" ? " ▲" : " ▼") : ""}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((b, i) => (
                        <tr key={b.brand} style={{ background: i % 2 === 0 ? "#f5f0e8" : "#f5f2ee", borderBottom: "1px solid #00000008" }}>
                          <td className="px-4 py-3 font-black" style={{ color: BRAND_COLORS[b.brand] }}>{b.brand}</td>
                          <td className="px-4 py-3 opacity-60">{b.keyboardCount}</td>
                          <td className="px-4 py-3 font-bold" style={{ color: b.proShare >= 30 ? "#b8956a" : b.proShare >= 10 ? "#d4af37" : "#8a8078" }}>{b.proShare}%</td>
                          <td className="px-4 py-3 opacity-60">{b.avgWeight}g</td>
                          <td className="px-4 py-3 opacity-60">${b.avgPrice}</td>
                          <td className="px-4 py-3 opacity-60">{b.maxPoll >= 1000 ? `${b.maxPoll/1000}K` : b.maxPoll}Hz</td>
                          <td className="px-4 py-3 font-bold" style={{ color: b.avgRating >= 9 ? "#b8956a" : b.avgRating >= 8.5 ? "#d4af37" : "#8a8078" }}>{b.avgRating}/10</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                );
              })()}
            </div>

            {/* ── Technology Adoption ── */}
            <SectionTitle color="#9060c4" sub="How quickly pros adopt new peripheral technology">Technology Adoption Snapshot</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Polling Rate Tiers (Keyboards in DB)</div>
                {(() => {
                  const tiers = [
                    { label: "1KHz (Standard)", min: 0, max: 1500, color: "#c44040" },
                    { label: "4KHz (High)", min: 1500, max: 5000, color: "#b8956a" },
                    { label: "8KHz (Ultra)", min: 5000, max: 99999, color: "#b8956a" },
                  ];
                  return (
                    <div className="space-y-3">
                      {tiers.map((t, i) => {
                        const count = keyboards.filter(m => m.pollingRate >= t.min && m.pollingRate < t.max).length;
                        const pct = Math.round(count / keyboards.length * 100);
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-bold" style={{ color: t.color }}>{t.label}</span>
                              <span className="opacity-50">{count} keyboards ({pct}%)</span>
                            </div>
                            <div className="h-3 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: `${t.color}60` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Top Switches by Keyboard Count</div>
                {(() => {
                  const sensorCounts = {};
                  keyboards.forEach(m => { sensorCounts[m.switchType] = (sensorCounts[m.switchType] || 0) + 1; });
                  const top5 = Object.entries(sensorCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
                  const colors = ["#06b6d4", "#8b5cf6", "#b8956a", "#10b981", "#ec4899"];
                  return (
                    <div className="space-y-3">
                      {top5.map(([sensor, count], i) => (
                        <div key={sensor}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold" style={{ color: colors[i] }}>{sensor}</span>
                            <span className="opacity-50">{count} keyboards</span>
                          </div>
                          <div className="h-3 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                            <div className="h-full rounded-full" style={{ width: `${(count / top5[0][1]) * 100}%`, background: `${colors[i]}60` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#a09890" }}>Weight Class Distribution</div>
                {(() => {
                  const classes = [
                    { label: "Wooting (< 45g)", min: 0, max: 45, color: "#b8956a" },
                    { label: "Featherweight (45-55g)", min: 45, max: 55, color: "#0890a8" },
                    { label: "Lightweight (55-65g)", min: 55, max: 65, color: "#6b8cad" },
                    { label: "Midweight (65-80g)", min: 65, max: 80, color: "#b8956a" },
                    { label: "Standard (80g+)", min: 80, max: 999, color: "#c4508a" },
                  ];
                  return (
                    <div className="space-y-3">
                      {classes.map((c, i) => {
                        const count = keyboards.filter(m => m.weight >= c.min && m.weight < c.max).length;
                        const pct = Math.round(count / keyboards.length * 100);
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-bold" style={{ color: c.color }}>{c.label}</span>
                              <span className="opacity-50">{count} ({pct}%)</span>
                            </div>
                            <div className="h-3 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `${c.color}60` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>

          </div>
        )}

        {/* ── SENSORS TAB ── */}
        {activeTab === "sensors" && (() => {
          const sensorData = keyboards.map(m => ({
            sensor: m.switchType,
            brand: m.brand,
            name: m.name,
            actuation: m.actuationPoint,
            pollingRate: m.pollingRate,
            weight: m.weight,
            proUsage: m.proUsage,
            price: m.price,
          }));
          // Build sensor profiles
          const sensorMap = {};
          keyboards.forEach(m => {
            if (!sensorMap[m.switchType]) sensorMap[m.switchType] = { switchType: m.switchType, keyboards: [], totalUsage: 0, avgActuation: 0, avgPolling: 0, avgWeight: 0, avgPrice: 0, brands: new Set() };
            sensorMap[m.switchType].keyboards.push(m);
            sensorMap[m.switchType].totalUsage += m.proUsage;
            sensorMap[m.switchType].brands.add(m.brand);
          });
          const sensorProfiles = Object.values(sensorMap).map(s => {
            const switchKeyboardNames = s.keyboards.map(m => m.name);
            const playerCount = allPlayers.filter(p => p.keyboard && switchKeyboardNames.some(mn => p.keyboard === mn || p.keyboard.includes(mn.split(" ").slice(-2).join(" ")))).length;
            return {
            ...s,
            totalUsage: Math.round(s.totalUsage * 10) / 10,
            keyboardCount: s.keyboards.length,
            playerCount,
            avgActuation: Math.round(s.keyboards.reduce((a, m) => a + m.actuationPoint, 0) / s.keyboards.length),
            avgPolling: Math.round(s.keyboards.reduce((a, m) => a + m.pollingRate, 0) / s.keyboards.length),
            avgWeight: Math.round(s.keyboards.reduce((a, m) => a + m.weight, 0) / s.keyboards.length * 10) / 10,
            avgPrice: Math.round(s.keyboards.reduce((a, m) => a + m.price, 0) / s.keyboards.length),
            brandList: [...s.brands].join(", "),
            topKbd: s.keyboards.sort((a, b) => b.proUsage - a.proUsage)[0]?.name || "",
          }});

          // Sensor usage by game
          const gameColors = GAME_COLORS;
          const allGamesForSensor = ["All", ...new Set(allPlayers.map(p => p.game))];
          const sensorByGame = {};
          allPlayers.forEach(p => {
            const m = keyboards.find(mm => mm.name === p.keyboard);
            if (!m) return;
            const game = p.game;
            if (!sensorByGame[game]) sensorByGame[game] = {};
            sensorByGame[game][m.switchType] = (sensorByGame[game][m.switchType] || 0) + 1;
          });

          // Sort sensor profiles
          const sortedSensors = [...sensorProfiles].sort((a, b) => {
            if (!sensorSort.key) return 0;
            const k = sensorSort.key;
            let av = a[k], bv = b[k];
            if (typeof av === "string") return sensorSort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
            return sensorSort.dir === "asc" ? (av || 0) - (bv || 0) : (bv || 0) - (av || 0);
          });

          const sensorHeaders = [
            { key: "sensor", label: "Switch" },
            { key: "keyboardCount", label: "Keyboards" },
            { key: "totalUsage", label: "Pro Usage %" },
            { key: "brandList", label: "Brands" },
            { key: "topKbd", label: "Top Keyboard" },
            { key: "avgActuation", label: "Avg Actuation" },
            { key: "avgPolling", label: "Avg Poll" },
            { key: "avgWeight", label: "Avg Weight" },
            { key: "avgPrice", label: "Avg Price" },
          ];

          // Overall top sensor
          const topSensor = sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage)[0];

          return (
          <div>
            <SectionTitle color="#10b981" sub="Comprehensive breakdown of every switch powering pro esports keyboards">Keyboard Switch Analytics</SectionTitle>

            {/* Top switch highlight */}
            <div className="rounded-2xl p-5 mb-5" style={{ background: "#2a8a6208", border: "1px solid #2a8a6215" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#2a8a620a" }}>
                  <Cpu size={24} style={{ color: "#2a8a62" }} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#a09890" }}>Most Popular Switch in Esports</div>
                  <div className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#2a8a62" }}>{topSensor?.switchType}</div>
                  <div className="text-xs" style={{ color: "#6b635b" }}>Used in {topSensor?.keyboardCount} keyboards · {topSensor?.playerCount} pro players · {topSensor?.totalUsage}% combined pro usage</div>
                </div>
              </div>
            </div>

            {/* Sensor overview cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).slice(0, 4).map((s, i) => {
                const colors = ["#06b6d4", "#8b5cf6", "#b8956a", "#10b981"];
                const sensorImageMap = {
                  // Switch images not yet available — placeholder
                };
                const sensorDescs = {
                  "Lekker (Hall Effect)": "Wooting's Hall Effect analog switches use magnetic sensing to detect exact key position, enabling rapid trigger with actuation as low as 0.1mm. This technology removes the physical contact point of traditional switches, allowing instant re-actuation and giving players frame-perfect movement in FPS titles. The Lekker switch made Wooting the dominant brand in competitive keyboard usage.",
                  "Lekker V2 (Hall Effect)": "The second generation of Wooting's Hall Effect switch platform, featured in the 60HE+. Lekker V2 offers improved stability, smoother actuation feel, and enhanced firmware support for advanced rapid trigger profiles. Many professional players consider it the gold standard for competitive keyboard switches.",
                  "Razer Analog Optical Gen-2": "Razer's analog optical switches use an infrared beam to detect key position without physical contact, eliminating debounce delay. Gen-2 improves on the original with smoother travel and adjustable actuation from 0.1mm to 4.0mm. Found in the Huntsman V3 Pro series, these switches are Razer's answer to the Hall Effect revolution.",
                  "OmniPoint 3.0 (Hall Effect)": "SteelSeries' magnetic Hall Effect switches power the Apex Pro series, offering adjustable actuation from 0.2mm to 4.0mm per key. OmniPoint 3.0 brought rapid trigger capability to SteelSeries keyboards, making them competitive with Wooting's offerings. The technology allows different actuation depths for different keys — a unique advantage for players who want WASD at 0.2mm but ability keys at 1.5mm.",
                  "Cherry MX Red": "The legendary linear mechanical switch from Cherry, the German company that invented the modern mechanical keyboard switch in the 1980s. MX Red offers 2.0mm actuation with 45g force — a proven, reliable choice trusted by decades of competitive players. While lacking rapid trigger, Cherry MX Red remains the benchmark that all other linear switches are measured against.",
                  "Gateron Magnetic (Hall Effect)": "Gateron's entry into the magnetic switch market brings Hall Effect sensing to a wider range of keyboard brands. These switches support rapid trigger and adjustable actuation, providing an affordable pathway to competitive-grade technology. Found in DrunkDeer and other brands pushing rapid trigger to the mainstream.",
                };
                const sensorImg = sensorImageMap[s.switchType];
                const sensorDesc = sensorDescs[s.switchType];
                return (
                  <div key={i} className="rounded-xl p-4" style={{ background: `${colors[i]}08`, border: `1px solid ${colors[i]}12` }}>
                    <div className="text-sm font-black mb-1 text-center" style={{ color: colors[i], color: colors[i] }}>#{i + 1} Most Used</div>
                    <div className="text-sm font-black mb-2 text-center" style={{ color: colors[i] }}>{s.switchType}</div>
                    {sensorImg && <div className="flex justify-center mb-2"><img loading="lazy" src={sensorImg} alt={s.switchType} className="h-24 sm:h-32 object-contain" style={{ filter: `drop-shadow(0 4px 12px ${colors[i]}30)` }} /></div>}
                    <div className="text-xl sm:text-2xl font-black text-center">{s.totalUsage}%</div>
                    <div className="text-sm opacity-30 text-center mt-1">of pros use this switch</div>
                    {sensorDesc && <p className="text-sm opacity-70 mt-3 leading-relaxed">{sensorDesc}</p>}
                    <div className="text-sm opacity-85 mt-3">{s.keyboardCount} keyboards use this switch:</div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {s.keyboards.map(m => (
                        <button key={m.id} onClick={() => { navigateToKeyboard(m); }}
                          className="px-2 py-1 rounded-md text-sm transition-all hover:scale-105 cursor-pointer"
                          style={{ background: `${colors[i]}15`, border: `1px solid ${colors[i]}20`, color: colors[i], fontSize: 12 }}>
                          {m.name.replace(m.brand + " ", "")}
                        </button>
                      ))}
                    </div>
                    <div className="text-sm font-bold mt-1.5" style={{ color: colors[i] }}>{s.playerCount} pro players</div>
                  </div>
                );
              })}
            </div>

            {/* ── Switch Popularity Stats (from actual player data) ── */}
            {(() => {
              // Count switch usage across all tracked players
              const sensorCounts = {};
              let totalMatched = 0;
              allPlayers.forEach(p => {
                if (!p.keyboard) return;
                const m = keyboards.find(mm => {
                  const mn = mm.name.toLowerCase();
                  const pm = p.keyboard.toLowerCase();
                  return pm === mn || pm.includes(mn) || mn.includes(pm);
                });
                if (m) {
                  sensorCounts[m.switchType] = (sensorCounts[m.switchType] || 0) + 1;
                  totalMatched++;
                }
              });
              const sortedSensorStats = Object.entries(sensorCounts).sort((a, b) => b[1] - a[1]);
              const top10 = sortedSensorStats.slice(0, 10);
              const maxCount = top10[0]?.[1] || 1;

              // Sensor by game breakdown for top 5 sensors
              const topSensorNames = top10.slice(0, 5).map(s => s[0]);
              const sensorGameBreakdown = {};
              topSensorNames.forEach(sn => { sensorGameBreakdown[sn] = {}; });
              allPlayers.forEach(p => {
                if (!p.keyboard) return;
                const m = keyboards.find(mm => {
                  const mn = mm.name.toLowerCase();
                  const pm = p.keyboard.toLowerCase();
                  return pm === mn || pm.includes(mn) || mn.includes(pm);
                });
                if (m && topSensorNames.includes(m.switchType)) {
                  sensorGameBreakdown[m.switchType][p.game] = (sensorGameBreakdown[m.switchType][p.game] || 0) + 1;
                }
              });

              // Unique stats
              const uniqueSensors = Object.keys(sensorCounts).length;
              const topSensorPct = totalMatched > 0 ? Math.round(top10[0][1] / totalMatched * 100) : 0;
              const top3Pct = totalMatched > 0 ? Math.round(top10.slice(0, 3).reduce((a, s) => a + s[1], 0) / totalMatched * 100) : 0;

              const barColors = ["#06b6d4", "#8b5cf6", "#b8956a", "#10b981", "#ec4899", "#a78bfa", "#f472b6", "#84cc16", "#d4af37", "#fbbf24"];
              const gameBarColors = { CS2: "#c47000", Valorant: "#c43848", LoL: "#c89b3c", Fortnite: "#3a60b0", "Dota 2": "#b83c30", "R6 Siege": "#3a6ca0", Apex: "#a82020", PUBG: "#c48a00", "Overwatch 2": "#c48018", "Call of Duty": "#3a8a3a", "Marvel Rivals": "#b81820", Deadlock: "#6d40c4", "Quake Champions": "#a83c00" };

              return (
                <div className="rounded-2xl p-5 mb-6" style={{ background: "#0000000a", border: "1px solid #e8e4df" }}>
                  <div className="text-sm uppercase tracking-widest opacity-70 mb-4 font-bold text-center sm:text-left">Switch Popularity Across {totalMatched.toLocaleString()} Matched Pro Players</div>

                  {/* Summary stat pills */}
                  <div className="flex flex-wrap gap-2 mb-5 justify-center sm:justify-start">
                    <div className="rounded-lg px-3 py-2" style={{ background: "#10b98110" }}>
                      <span className="text-sm opacity-85">Top sensor: </span>
                      <span className="text-sm font-black" style={{ color: "#2a8a62" }}>{top10[0]?.[0]} ({topSensorPct}%)</span>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: "#6b8cad12" }}>
                      <span className="text-sm opacity-85">Top 3 concentration: </span>
                      <span className="text-sm font-black" style={{ color: "#6b8cad" }}>{top3Pct}%</span>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: "#b8956a12" }}>
                      <span className="text-sm opacity-85">Unique sensors tracked: </span>
                      <span className="text-sm font-black" style={{ color: "#b8956a" }}>{uniqueSensors}</span>
                    </div>
                    <div className="rounded-lg px-3 py-2" style={{ background: "#a78bfa10" }}>
                      <span className="text-sm opacity-85">Players on proprietary sensors: </span>
                      <span className="text-sm font-black" style={{ color: "#8060c4" }}>{sensorCounts["Custom"] || sensorCounts["Custom Sony"] || 0}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                    {/* Left: Bar chart */}
                    <div>
                      <div className="text-sm opacity-30 mb-3 font-bold uppercase tracking-wider">Top 10 Sensors by Player Count</div>
                      <div className="space-y-2">
                        {top10.map(([sensor, count], i) => {
                          const pct = Math.round(count / totalMatched * 100);
                          const barW = Math.max(count / maxCount * 100, 4);
                          return (
                            <div key={sensor} className="flex items-center gap-2">
                              <div className="text-sm font-bold w-20 sm:w-32 truncate cursor-pointer hover:underline" style={{ color: barColors[i] }}
                                onClick={() => document.getElementById(`sensor-group-${sensor.replace(/\s+/g, "-").toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{sensor}</div>
                              <div className="flex-1 h-6 rounded-md overflow-hidden" style={{ background: "#0000000a" }}>
                                <div className="h-full rounded-md flex items-center px-2 transition-all" style={{ width: `${barW}%`, background: `${barColors[i]}25`, borderRight: `2px solid ${barColors[i]}` }}>
                                  <span className="text-sm font-black" style={{ color: barColors[i] }}>{count}</span>
                                </div>
                              </div>
                              <div className="text-sm opacity-30 w-10 text-right">{pct}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Game breakdown for top 5 sensors */}
                    <div>
                      <div className="text-sm opacity-30 mb-3 font-bold uppercase tracking-wider">Top 5 Sensors — Game Distribution</div>
                      <div className="space-y-3">
                        {topSensorNames.map((sn, si) => {
                          const games = Object.entries(sensorGameBreakdown[sn]).sort((a, b) => b[1] - a[1]);
                          const total = games.reduce((a, g) => a + g[1], 0);
                          return (
                            <div key={sn}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-base font-black cursor-pointer hover:underline transition-all" style={{ color: barColors[si] }}
                                  onClick={() => document.getElementById(`sensor-group-${sn.replace(/\s+/g, "-").toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{sn}</span>
                                <span className="text-base opacity-20">({total} players)</span>
                              </div>
                              {/* Stacked bar */}
                              <div className="flex h-6 rounded-md overflow-hidden" style={{ background: "#0000000a" }}>
                                {games.map(([game, cnt]) => {
                                  const w = Math.max(cnt / total * 100, 2);
                                  return (
                                    <div key={game} className="h-full flex items-center justify-center relative group" style={{ width: `${w}%`, background: `${gameBarColors[game] || "#666"}40` }}
                                      title={`${game}: ${cnt} players (${Math.round(cnt/total*100)}%)`}>
                                      {w > 8 && <span style={{ fontSize: 12 }} className="font-bold opacity-70">{game}</span>}
                                    </div>
                                  );
                                })}
                              </div>
                              {/* Legend */}
                              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                                {games.slice(0, 5).map(([game, cnt]) => (
                                  <span key={game} style={{ fontSize: 12 }} className="opacity-85">
                                    <span style={{ color: gameBarColors[game] || "#666" }}>●</span> {game} {Math.round(cnt/total*100)}%
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Sensor table */}
            <div className="text-sm uppercase tracking-widest opacity-70 mb-3 mt-8">All Sensors  -  Click Headers to Sort</div>
            <div className="overflow-x-auto rounded-2xl mb-8" style={{ border: "1px solid #e8e4df" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#ffffff" }}>
                    {sensorHeaders.map(h => (
                      <th key={h.label} className="px-4 py-3 text-left text-sm uppercase tracking-wider font-bold cursor-pointer select-none hover:opacity-80"
                        style={{ color: sensorSort.key === h.key ? "#10b981" : "#a09890" }}
                        onClick={() => setSensorSort(prev => prev.key === h.key ? { key: h.key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key: h.key, dir: typeof sensorProfiles[0]?.[h.key] === "string" ? "asc" : "desc" })}>
                        {h.label}{sensorSort.key === h.key ? (sensorSort.dir === "asc" ? " ▲" : " ▼") : ""}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedSensors.map((s, i) => (
                    <tr key={s.switchType} style={{ borderBottom: "1px solid #00000008", background: i % 2 === 0 ? "#f5f0e8" : "#f5f2ee" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#10b98108"}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#f5f0e8" : "#f5f2ee"}>
                      <td className="px-4 py-3 font-black cursor-pointer hover:underline" style={{ color: "#2a8a62" }}
                        onClick={() => document.getElementById(`sensor-group-${s.switchType.replace(/\s+/g, "-").toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>{s.switchType}</td>
                      <td className="px-4 py-3 font-bold">{s.keyboardCount}</td>
                      <td className="px-4 py-3 font-black">{s.totalUsage}%</td>
                      <td className="px-4 py-3 text-sm opacity-50">{s.brandList}</td>
                      <td className="px-4 py-3 text-sm"><a href={amazonLink(s.topKbd)} target="_blank" rel="noopener noreferrer" className="no-underline hover:opacity-80" style={{ color: "#b8956a", textDecoration: "none" }}>{s.topKbd.replace(/(Wooting |Razer )/, "")}</a></td>
                      <td className="px-4 py-3">{`${s.avgActuation}mm`}</td>
                      <td className="px-4 py-3">{s.avgPolling >= 1000 ? `${(s.avgPolling/1000).toFixed(1)}K` : s.avgPolling}Hz</td>
                      <td className="px-4 py-3">{s.avgWeight}g</td>
                      <td className="px-4 py-3">{"$"}{s.avgPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Which keyboards use each sensor */}
            <SectionTitle color="#6b8cad" sub="Every keyboard in our database grouped by switch">Keyboards by Switch</SectionTitle>
            <div className="space-y-4 mb-8">
              {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map((s, si) => (
                <div key={s.switchType} id={`sensor-group-${s.switchType.replace(/\s+/g, "-").toLowerCase()}`} className="rounded-xl p-4" style={{ background: "#ffffff", border: "1px solid #e8e4df", scrollMarginTop: 70 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-black" style={{ color: "#2a8a62" }}>{s.switchType}</div>
                      <div className="text-sm opacity-70">{s.totalUsage}% pro usage</div>
                    </div>
                    <div className="text-sm opacity-70">{s.keyboardCount} model{s.keyboardCount !== 1 ? "s" : ""}</div>
                  </div>
                  {s.keyboards.length > 0 && (() => { const topM = s.keyboards.sort((a, b) => b.proUsage - a.proUsage)[0]; return (
                    <a href={amazonLink(topM.name)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#b8956a14", color: "#b8956a", border: "1px solid #b8956a18", textDecoration: "none" }}>
                      {I.cart(10)} Top pick: {topM.name.replace(/(Wooting |Razer )/, "")} — ${topM.price}
                    </a>
                  ); })()}
                  <div className="flex flex-wrap gap-2">
                    {s.keyboards.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                      <button key={mi} onClick={() => { navigateToKeyboard(m); }}
                        className="px-3 py-1.5 rounded-lg text-sm font-bold cursor-pointer transition-all hover:scale-105"
                        style={{ background: `${BRAND_COLORS[m.brand]}12`, border: `1px solid ${BRAND_COLORS[m.brand]}20`, color: BRAND_COLORS[m.brand] }}>
                        {KEYBOARD_IMAGE_URLS[m.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt={`${m.name}`} className="inline h-4 mr-1 object-contain" />} {m.name} <span className="opacity-85">({m.proUsage}%)</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sensor popularity by game */}
            <SectionTitle color="#b8956a" sub="Which mechanical switches are favored by professionals across competitive titles">Switch Popularity by Game</SectionTitle>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {allGamesForSensor.map(g => (
                <button key={g} onClick={() => setSensorGameFilter(g)}
                  className="px-3 py-1 rounded-full text-sm font-bold transition-all flex items-center gap-1.5"
                  style={{
                    background: sensorGameFilter === g ? (gameColors[g] || "#10b981") : "#0000000a",
                    color: sensorGameFilter === g ?  "#1a1614" : "#2d2824",
                    border: sensorGameFilter === g ? "none" : "1px solid #e8e4df",
                  }}>
                  {g !== "All" && GAME_IMAGE_URLS[g] && <img loading="lazy" src={GAME_IMAGE_URLS[g]} alt={g} className="w-4 h-4 object-contain" />}
                  {g}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(sensorGameFilter === "All" ? Object.keys(sensorByGame) : [sensorGameFilter]).filter(g => sensorByGame[g]).map(game => {
                const gc = gameColors[game] || "#8a8078";
                const entries = Object.entries(sensorByGame[game]).sort((a, b) => b[1] - a[1]);
                const total = entries.reduce((a, e) => a + e[1], 0);
                return (
                  <div key={game} className="rounded-xl p-4" style={{ background: `${gc}06`, border: `1px solid ${gc}12` }}>
                    <div className="text-sm font-black mb-3 flex items-center gap-2" style={{ color: gc }}>{GAME_IMAGE_URLS[game] && <img loading="lazy" src={GAME_IMAGE_URLS[game]} alt={game} className="w-5 h-5 object-contain" />}{game}</div>
                    <div className="space-y-2">
                      {entries.slice(0, 5).map(([sensor, count], ei) => (
                        <div key={sensor} className="flex items-center gap-2">
                          <div className="w-28 text-sm font-bold truncate" style={{ color: ei === 0 ? gc : "#8a8078" }}>{sensor}</div>
                          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(count / entries[0][1]) * 100}%`, background: ei === 0 ? gc : `${gc}40` }} />
                          </div>
                          <div className="text-sm font-bold w-12 text-right" style={{ color: ei === 0 ? gc : "#a09890" }}>{Math.round((count / total) * 100)}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sensor specs comparison */}
            <SectionTitle color="#9060c4" sub="Technical specifications compared across all switches">Switch Spec Comparison</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Actuation by Switch Type</div>
                <div className="space-y-2">
                  {sensorProfiles.sort((a, b) => b.avgActuation - a.avgActuation).map((s, i) => (
                    <div key={s.switchType} className="flex items-center gap-2">
                      <div className="w-28 text-sm font-bold truncate">{s.switchType}</div>
                      <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                          style={{ width: `${(s.avgActuation / 4) * 100}%`, background: i === 0 ? "#9060c430" : "#00000008" }}>
                          <span className="text-sm font-bold" style={{ color: i === 0 ? "#9060c4" : "#a09890", fontSize: 11 }}>{`${s.avgActuation}mm`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-5" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Avg Polling Rate by Sensor</div>
                <div className="space-y-2">
                  {sensorProfiles.sort((a, b) => b.avgPolling - a.avgPolling).map((s, i) => (
                    <div key={s.switchType} className="flex items-center gap-2">
                      <div className="w-28 text-sm font-bold truncate">{s.switchType}</div>
                      <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#0000000a" }}>
                        <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-700"
                          style={{ width: `${(s.avgPolling / 8000) * 100}%`, background: i === 0 ? "#10b98130" : "#00000008" }}>
                          <span className="text-sm font-bold" style={{ color: i === 0 ? "#10b981" : "#a09890", fontSize: 11 }}>{s.avgPolling >= 1000 ? `${(s.avgPolling/1000).toFixed(1)}K` : s.avgPolling}Hz</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sensor Comparison Tool */}
            <SectionTitle color="#b8956a" sub="Select two switches to compare specs, usage, and popularity head-to-head">Switch vs Switch Comparison</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-2">Switch A</div>
                <select aria-label="Select first switch to compare" value={compareSensor1 || ""} onChange={e => setCompareSensor1(e.target.value || null)}
                  className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer font-bold"
                  style={{ background: "#ffffff", border: `1px solid ${compareSensor1 ? "#b8956a30" : "#00000012"}`, color: compareSensor1 ? "#b8956a" : "#6b635b" }}>
                  <option value="">Select sensor...</option>
                  {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map(s => (
                    <option key={s.switchType} value={s.switchType}>{s.switchType} ({s.totalUsage}% usage)</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-2">Switch B</div>
                <select aria-label="Select second switch to compare" value={compareSensor2 || ""} onChange={e => setCompareSensor2(e.target.value || null)}
                  className="w-full px-4 py-3 rounded-xl text-sm cursor-pointer font-bold"
                  style={{ background: "#ffffff", border: `1px solid ${compareSensor2 ? "#6b8cad30" : "#00000012"}`, color: compareSensor2 ? "#6b8cad" : "#6b635b" }}>
                  <option value="">Select sensor...</option>
                  {sensorProfiles.sort((a, b) => b.totalUsage - a.totalUsage).map(s => (
                    <option key={s.switchType} value={s.switchType}>{s.switchType} ({s.totalUsage}% usage)</option>
                  ))}
                </select>
              </div>
            </div>

            {compareSensor1 && compareSensor2 ? (() => {
              const s1 = sensorProfiles.find(s => s.switchType === compareSensor1);
              const s2 = sensorProfiles.find(s => s.switchType === compareSensor2);
              if (!s1 || !s2) return null;
              const c1 = "#b8956a", c2 = "#6b8cad";
              const compareRows = [
                { label: "Pro Usage", v1: `${s1.totalUsage}%`, v2: `${s2.totalUsage}%`, n1: s1.totalUsage, n2: s2.totalUsage, higher: "more" },
                { label: "Keyboard Models", v1: s1.keyboardCount, v2: s2.keyboardCount, n1: s1.keyboardCount, n2: s2.keyboardCount, higher: "more" },
                { label: "Avg Actuation", v1: `${s1.avgActuation}mm`, v2: `${s2.avgActuation}mm`, n1: s1.avgActuation, n2: s2.avgActuation, higher: "more" },
                { label: "Avg Poll Rate", v1: `${s1.avgPolling >= 1000 ? `${(s1.avgPolling/1000).toFixed(1)}K` : s1.avgPolling}Hz`, v2: `${s2.avgPolling >= 1000 ? `${(s2.avgPolling/1000).toFixed(1)}K` : s2.avgPolling}Hz`, n1: s1.avgPolling, n2: s2.avgPolling, higher: "more" },
                { label: "Avg Weight", v1: `${s1.avgWeight}g`, v2: `${s2.avgWeight}g`, n1: s1.avgWeight, n2: s2.avgWeight, higher: "less" },
                { label: "Avg Price", v1: `$${s1.avgPrice}`, v2: `$${s2.avgPrice}`, n1: s1.avgPrice, n2: s2.avgPrice, higher: "less" },
                { label: "Brands", v1: s1.brandList, v2: s2.brandList, n1: 0, n2: 0, higher: "none" },
                { label: "Top Keyboard", v1: s1.topKbd, v2: s2.topKbd, n1: 0, n2: 0, higher: "none" },
              ];
              const s1Wins = compareRows.filter(r => r.higher !== "none" && ((r.higher === "more" && r.n1 > r.n2) || (r.higher === "less" && r.n1 < r.n2))).length;
              const s2Wins = compareRows.filter(r => r.higher !== "none" && ((r.higher === "more" && r.n2 > r.n1) || (r.higher === "less" && r.n2 < r.n1))).length;
              return (
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e8e4df" }}>
                  <div className="grid grid-cols-3" style={{ background: "#ffffff" }}>
                    <div className="p-4 text-center">
                      <div className="text-base sm:text-lg font-black text-center sm:text-left" style={{ color: c1 }}>{s1.switchType}</div>
                      <div className="text-sm opacity-30">{s1.brandList}</div>
                      <div className="text-2xl font-black mt-1" style={{ color: s1Wins > s2Wins ? c1 : "#00000015" }}>{s1Wins}</div>
                      <div className="text-xs" style={{ color: "#c4bfb8" }}>wins</div>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center">
                      <div className="text-xl font-black opacity-20">VS</div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-base sm:text-lg font-black text-center sm:text-left" style={{ color: c2 }}>{s2.switchType}</div>
                      <div className="text-sm opacity-30">{s2.brandList}</div>
                      <div className="text-2xl font-black mt-1" style={{ color: s2Wins > s1Wins ? c2 : "#00000015" }}>{s2Wins}</div>
                      <div className="text-xs" style={{ color: "#c4bfb8" }}>wins</div>
                    </div>
                  </div>
                  {compareRows.map((row, ri) => {
                    const winner = row.higher === "none" ? "none" : row.higher === "more" ? (row.n1 > row.n2 ? "s1" : row.n2 > row.n1 ? "s2" : "tie") : (row.n1 < row.n2 ? "s1" : row.n2 < row.n1 ? "s2" : "tie");
                    return (
                      <div key={ri} className="grid grid-cols-3" style={{ background: ri % 2 === 0 ? "#f5f0e8" : "#f5f2ee", borderTop: "1px solid #00000008" }}>
                        <div className="p-3 text-center">
                          <span className="text-sm font-bold" style={{ color: winner === "s1" ? c1 : "#8a8078" }}>{row.v1}</span>
                          {winner === "s1" && <span className="ml-1 text-sm" style={{ color: c1 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                        </div>
                        <div className="p-3 text-center">
                          <span className="text-sm uppercase tracking-wider opacity-30">{row.label}</span>
                          {row.higher !== "none" && row.n1 !== row.n2 && (
                            <div className="flex items-center gap-1 justify-center mt-1">
                              <div className="h-1.5 rounded-full" style={{ width: `${Math.min((row.n1 / Math.max(row.n1, row.n2)) * 40, 40)}px`, background: winner === "s1" ? c1 : `${c1}40` }} />
                              <div className="h-1.5 rounded-full" style={{ width: `${Math.min((row.n2 / Math.max(row.n1, row.n2)) * 40, 40)}px`, background: winner === "s2" ? c2 : `${c2}40` }} />
                            </div>
                          )}
                        </div>
                        <div className="p-3 text-center">
                          {winner === "s2" && <span className="mr-1 text-sm" style={{ color: c2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                          <span className="text-sm font-bold" style={{ color: winner === "s2" ? c2 : "#8a8078" }}>{row.v2}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="grid grid-cols-2" style={{ background: "#ffffff", borderTop: "1px solid #e8e4df" }}>
                    <div className="p-4">
                      <div className="text-sm uppercase tracking-widest opacity-20 mb-2">Keyboards with {s1.switchType}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {s1.keyboards.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                          <button key={mi} onClick={() => { navigateToKeyboard(m); }}
                            className="px-2 py-1 rounded text-sm font-bold cursor-pointer transition-all hover:scale-105"
                            style={{ background: `${c1}12`, color: c1 }}>{KEYBOARD_IMAGE_URLS[m.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt={`${m.name}`} className="inline h-4 mr-1 object-contain" />} {m.name.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |HyperX |Keychron |Endgame Gear |Glorious |NuPhy |ASUS )/, "")}</button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm uppercase tracking-widest opacity-20 mb-2">Keyboards with {s2.switchType}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {s2.keyboards.sort((a, b) => b.proUsage - a.proUsage).map((m, mi) => (
                          <button key={mi} onClick={() => { navigateToKeyboard(m); }}
                            className="px-2 py-1 rounded text-sm font-bold cursor-pointer transition-all hover:scale-105"
                            style={{ background: `${c2}12`, color: c2 }}>{KEYBOARD_IMAGE_URLS[m.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt={`${m.name}`} className="inline h-4 mr-1 object-contain" />} {m.name.replace(/(Wooting |Razer |Logitech |SteelSeries |Corsair |Cherry |Ducky |DrunkDeer |HyperX |Keychron |Endgame Gear |Glorious |NuPhy |ASUS )/, "")}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div className="rounded-2xl p-8 text-center" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                <div className="text-2xl sm:text-3xl mb-2 opacity-20 text-center"><span className="inline-flex gap-2">{I.lab(28)}{I.bolt(28)}{I.lab(28)}</span></div>
                <div className="text-sm opacity-30">Select two sensors above to compare them head-to-head</div>
              </div>
            )}
          </div>
          );
        })()}

        {/* ── COMPARE TAB ── */}
        {activeTab === "compare" && (
          <div>
            <SectionTitle color="#9060c4" sub="Select two keyboards to compare specs side-by-side">Keyboard Comparison Tool</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[0, 1].map(idx => (
                <div key={idx}>
                  <select
                    value={compareList[idx]?.id || ""}
                    onChange={e => {
                      const m = keyboards.find(m => m.id === parseInt(e.target.value));
                      const newList = [...compareList];
                      newList[idx] = m;
                      setCompareList(newList);
                    }}
                    className="w-full px-4 py-3 rounded-xl text-sm font-bold mb-4"
                    style={{ background: "#ffffff", border: `1px solid ${BRAND_COLORS[compareList[idx]?.brand] || "#a09890"}40`, color: BRAND_COLORS[compareList[idx]?.brand] || "#6b635b" }}
                  >
                    {keyboards.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  {compareList[idx] && (
                    <div className="rounded-2xl p-5 text-center" style={{ background: `${BRAND_COLORS[compareList[idx].brand]}08`, border: `1px solid ${BRAND_COLORS[compareList[idx].brand]}20` }}>
                      {KEYBOARD_IMAGE_URLS[compareList[idx].name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[compareList[idx].name]} alt={compareList[idx].name} className="h-16 w-full mx-auto mb-3 object-contain object-center" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" }} />}
                      <div className="text-xl font-black" style={{ color: BRAND_COLORS[compareList[idx].brand] }}>{compareList[idx].name}</div>
                      <div className="text-xs mt-1" style={{ color: "#a09890" }}>{compareList[idx].brand}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {compareList[0] && compareList[1] && (() => {
              const specs = [
                { label: "Weight", key: "weight", unit: "g", lower: true },
                { label: "Price", key: "price", unit: "$", lower: true, prefix: "$" },
                { label: "Switch", key: "switchType", unit: "" },
                { label: "Actuation", key: "actuationPoint", unit: "mm", lower: true },
                { label: "Polling Rate", key: "pollingRate", unit: " Hz" },
                { label: "Layout", key: "layout", unit: "" },
                { label: "Connectivity", key: "connectivity", unit: "" },
                { label: "Rapid Trigger", key: "rapidTrigger", unit: "" },
                { label: "Pro Usage", key: "proUsage", unit: "%", lower: false },
                { label: "Rating", key: "rating", unit: "/10", lower: false },
              ];
              const c0 = BRAND_COLORS[compareList[0].brand];
              const c1 = BRAND_COLORS[compareList[1].brand];
              let wins0 = 0, wins1 = 0;
              specs.forEach(spec => {
                const v0 = compareList[0][spec.key], v1 = compareList[1][spec.key];
                if (typeof v0 === "number") {
                  const w = spec.lower ? (v0 < v1 ? 0 : v0 > v1 ? 1 : -1) : (v0 > v1 ? 0 : v0 < v1 ? 1 : -1);
                  if (w === 0) wins0++; else if (w === 1) wins1++;
                }
              });
              const verdictColor = wins0 > wins1 ? c0 : wins1 > wins0 ? c1 : "#a09890";
              const verdictName = wins0 > wins1 ? compareList[0].name : wins1 > wins0 ? compareList[1].name : null;
              return (
              <div>
                {/* Verdict banner */}
                <div className="rounded-xl p-5 mb-6 text-center" style={{ background: `${verdictColor}08`, border: `1px solid ${verdictColor}20` }}>
                  <div className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#a09890", letterSpacing: 2 }}>Spec Comparison Verdict</div>
                  <div className="text-base sm:text-lg font-black text-center" style={{ color: verdictColor }}>
                    {verdictName ? `${verdictName} wins ${Math.max(wins0, wins1)}-${Math.min(wins0, wins1)}` : `Tied ${wins0}-${wins1}`}
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="text-sm" style={{ color: c0 }}>● {compareList[0].name.replace(/(Wooting |Razer )/, "")}: {wins0} wins</span>
                    <span className="text-sm" style={{ color: c1 }}>● {compareList[1].name.replace(/(Wooting |Razer )/, "")}: {wins1} wins</span>
                  </div>
                  {verdictName && (() => {
                    const winnerKbd = wins0 > wins1 ? compareList[0] : compareList[1];
                    const loserKbd = wins0 > wins1 ? compareList[1] : compareList[0];
                    const winnerCol = wins0 > wins1 ? c0 : c1;
                    const loserCol = wins0 > wins1 ? c1 : c0;
                    return (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                        <a href={amazonLink(winnerKbd.name)} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-[1.03] no-underline"
                          style={{ background: winnerCol, color: "#f5f2ee", boxShadow: `0 0 20px ${winnerCol}30`, textDecoration: "none" }}>
                          {KEYBOARD_IMAGE_URLS[winnerKbd.name] ? <img loading="lazy" src={KEYBOARD_IMAGE_URLS[winnerKbd.name]} alt={`${winnerKbd.name} gaming keyboard`} className="h-6 object-contain" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))" }} /> : null}
                          {I.cart(14, "#fff")} 🏆 Get the Winner — {winnerKbd.name.split(" ").slice(-3).join(" ")} {"$"}{winnerKbd.price}
                        </a>
                        <a href={amazonLink(loserKbd.name)} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline"
                          style={{ background: `${loserCol}15`, color: loserCol, border: `1px solid ${loserCol}25`, textDecoration: "none" }}>
                          {I.cart(12)} {loserKbd.name.split(" ").slice(-2).join(" ")} — {"$"}{loserKbd.price}
                        </a>
                      </div>
                    );
                  })()}
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e8e4df" }}>
                  {specs.map((spec, i) => {
                    const v0 = compareList[0][spec.key];
                    const v1 = compareList[1][spec.key];
                    const isNum = typeof v0 === "number";
                    const winner = !isNum ? null : spec.lower ? (v0 < v1 ? 0 : v0 > v1 ? 1 : null) : (v0 > v1 ? 0 : v0 < v1 ? 1 : null);
                    return (
                      <div key={i} className="grid grid-cols-3 items-center" style={{ background: i % 2 === 0 ? "#f5f0e8" : "#f5f2ee", borderBottom: "1px solid #00000008" }}>
                        <div className="px-4 py-3 text-right font-bold text-sm" style={{ color: winner === 0 ? c0 : "#6b635b" }}>
                          {spec.prefix}{v0}{typeof v0 === "number" ? spec.unit : ""} {winner === 0 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{display:"inline"}}><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <div className="px-4 py-3 text-center text-sm uppercase tracking-widest opacity-30">{spec.label}</div>
                        <div className="px-4 py-3 text-left font-bold text-sm" style={{ color: winner === 1 ? c1 : "#6b635b" }}>
                          {winner === 1 && <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{display:"inline",verticalAlign:"middle"}}><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>{" "}</>}{spec.prefix}{v1}{typeof v1 === "number" ? spec.unit : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                  <div className="text-sm font-bold mb-4 opacity-60 text-center">Performance Radar Overlay</div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={[
                      { stat: "Lightness", a: Math.max(0, 100 - compareList[0].weight), b: Math.max(0, 100 - compareList[1].weight) },
                      { stat: "Switch", a: compareList[0].rapidTrigger ? 95 : 60, b: compareList[1].rapidTrigger ? 95 : 60 },
                      { stat: "Poll Rate", a: (compareList[0].pollingRate / 8000) * 100, b: (compareList[1].pollingRate / 8000) * 100 },
                      { stat: "Pro Usage", a: compareList[0].proUsage * 4, b: compareList[1].proUsage * 4 },
                      { stat: "Rating", a: compareList[0].rating * 10, b: compareList[1].rating * 10 },
                      { stat: "Value", a: Math.max(0, 100 - (compareList[0].price / 2)), b: Math.max(0, 100 - (compareList[1].price / 2)) },
                    ]}>
                      <PolarGrid stroke="#e8e4df" />
                      <PolarAngleAxis dataKey="stat" tick={{ fill: "#6b635b", fontSize: 13 }} />
                      <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                      <Radar name={compareList[0].name} dataKey="a" stroke={BRAND_COLORS[compareList[0].brand]} fill={BRAND_COLORS[compareList[0].brand]} fillOpacity={0.15} strokeWidth={2} />
                      <Radar name={compareList[1].name} dataKey="b" stroke={BRAND_COLORS[compareList[1].brand]} fill={BRAND_COLORS[compareList[1].brand]} fillOpacity={0.15} strokeWidth={2} />
                      <Legend wrapperStyle={{ fontSize: 13 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {compareList.map((m, idx) => {
                    const isWinner = (idx === 0 && wins0 > wins1) || (idx === 1 && wins1 > wins0);
                    const col = BRAND_COLORS[m.brand];
                    return (
                      <div key={idx} className="relative">
                        {isWinner && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-sm font-black z-10" style={{ background: col, color: "#1a1614", fontSize: 11, boxShadow: `0 0 12px ${col}40` }}>⭐ WINNER</div>}
                        <a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all text-center hover:scale-[1.02]"
                          style={isWinner
                            ? { background: col, color: "#1a1614", boxShadow: `0 0 24px ${col}25` }
                            : { background: `${col}15`, color: col, border: `1px solid ${col}30` }
                          }>
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" stroke={isWinner ?  "#1a1614" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1.5" fill={isWinner ?  "#1a1614" : "currentColor"}/><circle cx="20" cy="21" r="1.5" fill={isWinner ?  "#1a1614" : "currentColor"}/></svg>
                          {isWinner ? "★ " : ""}Buy {m.name.split(" ").slice(-2).join(" ")}  -  {"$"}{m.price}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )})()}
          </div>
        )}

        {/* ── LAB TAB ── */}
        {activeTab === "lab" && (() => {

          const setAnswer = (key, val) => setQuizAnswers(prev => ({ ...prev, [key]: val }));
          const toggleArrayAnswer = (key, val) => setQuizAnswers(prev => {
            const arr = prev[key] || [];
            return { ...prev, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
          });

          const canProceed = () => {
            if (quizStep === 0) return true;
            if (quizStep === 1) return String(quizAnswers.handLength).length > 0 && String(quizAnswers.handWidth).length > 0;
            if (quizStep === 2) return !!quizAnswers.grip;
            if (quizStep === 3) return quizAnswers.games.length > 0;
            if (quizStep === 4) return quizAnswers.priorities.length > 0;
            if (quizStep === 5) return !!quizAnswers.weightPref;
            if (quizStep === 6) return !!quizAnswers.shape;
            if (quizStep === 7) return !!quizAnswers.connectivity;
            if (quizStep === 8) return !!quizAnswers.budget;
            return true;
          };

          const nextStep = () => {
            if (quizStep === 8) { setQuizDone(true); return; }
            setQuizStep(prev => prev + 1);
          };

          // Scoring algorithm
          const getResults = () => {
            const a = quizAnswers;
            const hl = parseFloat(a.handLength) || 18;
            const hw = parseFloat(a.handWidth) || 9;

            return keyboards.map(m => {
              let score = 0;
              let reasons = [];

              // Hand size → weight mapping (smaller hands = lighter keyboards)
              const handArea = hl * hw;
              if (a.grip === "fingertip") {
                if (m.weight <= 650) { score += 15; reasons.push("Ultra-light for competitive play"); }
                else if (m.weight <= 750) { score += 10; }
                else if (m.weight > 75) { score -= 10; }
              } else if (a.grip === "claw") {
                if (m.weight <= 700) { score += 12; reasons.push("Light and responsive for speed"); }
                else if (m.weight <= 850) { score += 8; }
                else if (m.weight > 80) { score -= 8; }
              } else if (a.grip === "palm") {
                if (m.weight >= 700) { score += 10; reasons.push("Substantial build for comfortable typing"); }
                else if (m.weight < 45) { score -= 5; }
              }

              // Hand size → shape recommendations
              if (handArea < 150) { // small hands
                if (m.weight <= 700) { score += 5; reasons.push("Compact and lightweight"); }
                if (m.name.toLowerCase().includes("mini")) { score += 8; reasons.push("Mini form factor fits smaller hands"); }
              } else if (handArea > 190) { // large hands
                if (m.layout === "Ergonomic") { score += 5; reasons.push("Ergonomic shape suits larger hands"); }
                if (m.name.toLowerCase().includes("mini")) { score -= 8; }
              }

              // Grip → shape
              if (a.grip === "palm" && m.layout === "Ergonomic") { score += 12; reasons.push("Full layout ideal for comfort priority"); }
              if (a.grip === "palm" && m.layout === "Symmetrical") { score += 4; }
              if (a.grip === "claw" && m.layout === "Symmetrical") { score += 10; reasons.push("Compact layout great for speed focus"); }
              if (a.grip === "claw" && m.layout === "Ergonomic") { score += 5; }
              if (a.grip === "fingertip" && m.layout === "Symmetrical") { score += 12; reasons.push("Compact + light = competitive perfection"); }
              if (a.grip === "fingertip" && m.layout === "Ergonomic") { score -= 2; }

              // Shape preference
              if (a.shape === "symmetrical" && m.layout === "Symmetrical") score += 10;
              if (a.shape === "ergonomic" && m.layout === "Ergonomic") score += 10;
              if (a.shape === "either") score += 5;

              // Game-specific preferences
              const fpsGames = ["CS2", "Valorant", "Apex", "R6 Siege", "Call of Duty", "Overwatch 2", "Fortnite"];
              const mobaGames = ["LoL", "Dota 2"];
              const userPlaysFPS = a.games.some(g => fpsGames.includes(g));
              const userPlaysMOBA = a.games.some(g => mobaGames.includes(g));

              if (userPlaysFPS) {
                if (m.rapidTrigger) { score += 12; reasons.push("Rapid trigger for frame-perfect inputs"); }
                if (m.pollingRate >= 4000) { score += 5; reasons.push(`${m.pollingRate >= 8000 ? "8K" : "4K"}Hz polling rate`); }
                if (m.weight <= 60) score += 5;
                // Check what pros actually use in those games
                const proCount = allPlayers.filter(p => a.games.includes(p.game) && p.keyboard && (p.keyboard === m.name || p.keyboard.includes(m.name) || m.name.includes(p.keyboard))).length;
                if (proCount >= 10) { score += 15; reasons.push(`Used by ${proCount}+ pros in your game(s)`); }
                else if (proCount >= 5) { score += 10; reasons.push(`Used by ${proCount} pros in your game(s)`); }
                else if (proCount >= 2) { score += 5; }
              }
              if (userPlaysMOBA) {
                if (m.layout === "Ergonomic") { score += 5; reasons.push("Ergonomic comfort for long MOBA sessions"); }
                if (m.weight >= 55 && m.weight <= 80) score += 3;
              }

              // Priorities
              if (a.priorities.includes("weight")) {
                if (m.weight <= 45) { score += 12; reasons.push(`Featherweight at ${m.weight}g`); }
                else if (m.weight <= 55) score += 8;
                else if (m.weight <= 65) score += 4;
                else score -= 4;
              }
              if (a.priorities.includes("sensor")) {
                if (m.pollingRate >= 8000) { score += 10; reasons.push("Top-tier 8KHz polling rate"); }
                else if (m.pollingRate >= 4000) score += 6;
                else score -= 2;
              }
              if (a.priorities.includes("pro")) {
                score += Math.min(15, m.proUsage * 2);
                if (m.proUsage >= 5) reasons.push(`${m.proUsage}% pro adoption rate`);
              }
              if (a.priorities.includes("price")) {
                if (m.price <= 80) { score += 10; reasons.push(`Great value at $${m.price}`); }
                else if (m.price <= 100) score += 6;
                else if (m.price <= 130) score += 2;
                else score -= 3;
              }
              if (a.priorities.includes("build")) {
                score += Math.round(m.rating * 1.5);
                if (m.rating >= 9.3) reasons.push(`Exceptional ${m.rating}/10 build quality`);
              }

              // Weight preference
              if (a.weightPref === "ultralight" && m.weight <= 45) score += 10;
              else if (a.weightPref === "ultralight" && m.weight > 65) score -= 10;
              if (a.weightPref === "light" && m.weight > 45 && m.weight <= 60) score += 8;
              if (a.weightPref === "medium" && m.weight > 60 && m.weight <= 80) score += 8;
              if (a.weightPref === "heavy" && m.weight > 80) score += 8;

              // Connectivity
              if (a.connectivity === "wireless" && m.connectivity === "Wireless") score += 10;
              if (a.connectivity === "wireless" && m.connectivity === "Wired") score -= 15;
              if (a.connectivity === "wired" && m.connectivity === "Wired") score += 5;
              if (a.connectivity === "either") score += 3;

              // Budget
              if (a.budget === "under80" && m.price <= 80) score += 10;
              else if (a.budget === "under80" && m.price > 120) score -= 15;
              if (a.budget === "80to120" && m.price >= 80 && m.price <= 120) score += 10;
              else if (a.budget === "80to120" && m.price > 160) score -= 10;
              if (a.budget === "120to160" && m.price >= 100 && m.price <= 160) score += 8;
              if (a.budget === "over160") score += 3; // no limit
              if (a.budget === "nolimit") score += 5;

              // Baseline from rating
              score += Math.round(m.rating * 2);

              // Deduplicate reasons
              reasons = [...new Set(reasons)].slice(0, 4);

              return { kbd: m, score, reasons };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);
          };

          const maxScore = quizDone ? Math.max(...getResults().map(r => r.score)) : 0;

          const accent = "#b8956a";
          const stepLabels = ["Welcome", "Hand Size", "Grip Style", "Games", "Priorities", "Weight", "Shape", "Connection", "Budget"];
          const totalSteps = 9;

          const OptionButton = ({ selected, onClick, children, color, large }) => (
            <button onClick={onClick}
              className={`rounded-xl text-left transition-all duration-100 ${large ? "p-4 sm:p-5" : "p-3 sm:p-4"}`}
              style={{
                background: selected ? `${color || accent}15` : "#ffffff",
                border: selected ? `2px solid ${color || accent}` : "1px solid #d4cfc8",
                boxShadow: selected ? `0 2px 0 ${color || accent}60, 0 0 20px ${color || accent}15` : `0 2px 0 #d4cfc8`,
                transform: selected ? "translateY(1px)" : "translateY(0)",
              }}>
              {children}
            </button>
          );

          return (
          <div>
            <SectionTitle color="#b8956a" sub={`Unique tools to help you get the most out of your keyboard — powered by data from ${allPlayers.length}+ pro players`}>The Lab</SectionTitle>

            {!quizDone ? (
              <div className={quizStep === 0 ? "max-w-4xl mx-auto" : "max-w-2xl mx-auto"}>
                {/* Progress bar */}
                {quizStep > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm opacity-30">Step {quizStep} of {totalSteps - 1}</span>
                      <span className="text-sm opacity-30">{stepLabels[quizStep]}</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: "#00000008" }}>
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(quizStep / (totalSteps - 1)) * 100}%`, background: `linear-gradient(to right, #06b6d4, #a855f7)` }} />
                    </div>
                  </div>
                )}

                {/* Step 0: Intro */}
                {quizStep === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl p-8 sm:p-10 text-center flex flex-col relative overflow-hidden" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: accent }} />
                      <FlaskConical size={48} style={{ color: accent, margin: "0 auto 20px" }} />
                      <div className="text-xl sm:text-2xl font-black mb-4" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: accent }}>Find Your Perfect Keyboard</div>
                      <p className="text-sm opacity-85 max-w-lg mx-auto leading-relaxed mb-2">
                        This quiz analyzes your hand measurements, grip style, gaming preferences, and priorities to recommend keyboards from our database of {keyboards.length} models — cross-referenced with data from {allPlayers.length}+ pro players.
                      </p>
                      <p className="text-sm opacity-25 mb-4">Takes about 2 minutes. Your answers aren't stored anywhere.</p>
                      <div className="flex-1" />
                      <button onClick={nextStep}
                        className="px-8 py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                        style={{ background: accent, color: "#fff" }}>
                        Start Quiz →
                      </button>
                    </div>
                    <div className="rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden flex flex-col" style={{ background: "#ffffff", border: "1px solid #8b5cf615" }}>
                      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "#7048c4" }} />
                      <div className="flex justify-center mb-5">{I.gear(48)}</div>
                      <div className="text-xl sm:text-2xl font-black mb-4" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#7048c4" }}>Compare Keyboards</div>
                      <p className="text-sm opacity-85 max-w-lg mx-auto leading-relaxed mb-2">
                        Put any two keyboards head-to-head with detailed spec breakdowns, radar charts, pro usage stats, and side-by-side shape analysis.
                      </p>
                      <p className="text-sm opacity-25 mb-4">Pick two keyboards and see exactly how they differ.</p>
                      <div className="flex-1" />
                      <button onClick={() => { setActiveTab("compare"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="px-8 py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
                        style={{ background: "#9060c4", color: "#fff" }}>
                        Compare Keyboards →
                      </button>
                    </div>
                    <div className="rounded-2xl p-8 sm:p-10 text-center flex flex-col relative overflow-hidden" style={{ background: "#ffffff", border: "1px solid #06b6d415" }}>
                      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "#06b6d4" }} />
                      <Layers size={48} style={{ color: "#0890a8", margin: "0 auto 20px" }} />
                      <div className="text-xl sm:text-2xl font-black mb-2" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: "#0890a8" }}>Shape Overlay</div>
                      <div className="mb-4 flex flex-wrap gap-1.5 justify-center">
                        <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ background: "#06b6d415", color: "#0890a8", border: "1px solid #06b6d430", fontSize: 12 }}>BETA</span>
                        <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ background: "#b8956a18", color: "#b8956a", border: "1px solid #b8956a30", fontSize: 12 }}>🚧 UNDER CONSTRUCTION</span>
                      </div>
                      <p className="text-sm opacity-85 max-w-lg mx-auto leading-relaxed mb-2">
                        Overlay actual keyboard images scaled to real dimensions — instantly see how any two keyboards compare in size from all {keyboards.filter(m => KEYBOARD_DIMS[m.name] && KEYBOARD_IMAGE_URLS[m.name]).length} keyboards.
                      </p>
                      <p className="text-sm opacity-25 mb-4">See exactly how two keyboards compare in shape.</p>
                      <div className="flex-1" />
                      <div className="px-8 py-3 rounded-xl font-black text-sm text-center"
                        style={{ background: "#06b6d420", color: "#06b6d450", border: "1px solid #06b6d420", cursor: "not-allowed" }}>
                        🚧 Under Construction
                      </div>
                      <div className="text-sm opacity-30 mt-2 text-center"><button onClick={() => setNewsletterPopup(true)} className="underline font-bold transition-all hover:opacity-100" style={{ color: "#b8956a", opacity: 1, cursor: "pointer" }}>Subscribe to our newsletter</button> for updates</div>
                    </div>
                  </div>
                )}

                {/* Step 1: Hand Size */}
                {quizStep === 1 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What's your hand size?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>Measure from the base of your palm to the tip of your middle finger (length), and across your knuckles (width).</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      {/* Visual guide */}
                      <div className="rounded-xl p-5 flex flex-col items-center" style={{ background: "#00000008", border: "1px solid #e8e4df" }}>
                        <svg width="140" height="200" viewBox="0 0 140 200" fill="none">
                          <path d="M70 10 C55 10, 30 20, 25 50 L20 90 C18 100, 25 105, 32 100 L35 80 M70 10 C60 10, 45 15, 40 35 L38 70 M70 10 C65 10, 55 12, 50 30 L48 75 M70 10 C75 10, 85 12, 90 30 L92 75 M70 10 C85 10, 105 20, 108 45 L108 65 C108 72, 104 73, 102 68 L100 55 M25 95 C22 110, 25 140, 35 160 L40 175 C50 190, 90 190, 100 175 L105 160 C115 140, 118 110, 108 80" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                          {/* Length arrow */}
                          <line x1="130" y1="15" x2="130" y2="185" stroke="#a09890" strokeWidth="1" strokeDasharray="3 3" />
                          <polygon points="130,15 127,22 133,22" fill="#a09890" />
                          <polygon points="130,185 127,178 133,178" fill="#a09890" />
                          <text x="125" y="100" fill="#8a8078" fontSize="8" textAnchor="end" transform="rotate(-90, 125, 100)">LENGTH</text>
                          {/* Width arrow */}
                          <line x1="20" y1="195" x2="115" y2="195" stroke="#a09890" strokeWidth="1" strokeDasharray="3 3" />
                          <polygon points="20,195 27,192 27,198" fill="#a09890" />
                          <polygon points="115,195 108,192 108,198" fill="#a09890" />
                          <text x="67" y="192" fill="#8a8078" fontSize="8" textAnchor="middle">WIDTH</text>
                        </svg>
                      </div>

                      {/* Inputs */}
                      <div className="flex flex-col gap-4 justify-center">
                        <div>
                          <label className="text-sm opacity-85 mb-1.5 block">Hand Length (cm)</label>
                          <input type="text" inputMode="decimal" placeholder="e.g. 18.5"
                            value={quizAnswers.handLength} onChange={e => setAnswer("handLength", e.target.value.replace(/[^0-9.]/g, ""))}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-transparent outline-none"
                            style={{ border: `1px solid ${quizAnswers.handLength ? accent + "60" : "#00000012"}`, color: "#1a1614" }} />
                          <div className="text-sm opacity-20 mt-1">Average male: 18-20cm · Average female: 16-18cm</div>
                        </div>
                        <div>
                          <label className="text-sm opacity-85 mb-1.5 block">Hand Width (cm)</label>
                          <input type="text" inputMode="decimal" placeholder="e.g. 9.5"
                            value={quizAnswers.handWidth} onChange={e => setAnswer("handWidth", e.target.value.replace(/[^0-9.]/g, ""))}
                            className="w-full px-4 py-3 rounded-xl text-sm bg-transparent outline-none"
                            style={{ border: `1px solid ${quizAnswers.handWidth ? accent + "60" : "#00000012"}`, color: "#1a1614" }} />
                          <div className="text-sm opacity-20 mt-1">Average male: 9-10cm · Average female: 7.5-9cm</div>
                        </div>
                        {quizAnswers.handLength && quizAnswers.handWidth && (
                          <div className="rounded-lg px-3 py-2 text-sm" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
                            <span style={{ color: accent }}>
                              {parseFloat(quizAnswers.handLength) * parseFloat(quizAnswers.handWidth) < 150 ? "Small" :
                               parseFloat(quizAnswers.handLength) * parseFloat(quizAnswers.handWidth) < 175 ? "Medium" :
                               parseFloat(quizAnswers.handLength) * parseFloat(quizAnswers.handWidth) < 200 ? "Large" : "Extra Large"} hands
                            </span>
                            <span className="opacity-85"> · {quizAnswers.handLength} × {quizAnswers.handWidth} cm</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Grip Style */}
                {quizStep === 2 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What do you prioritize in a keyboard?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>Choose what matters most in your competitive keyboard setup.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "palm", label: "Comfort & Stability", desc: "A heavier, full-featured keyboard with a complete layout. Stability during intense gameplay and no compromises on key access.", icon: "⌨️", tips: "Full layout · Heavier · All keys" },
                        { id: "claw", label: "Speed & Precision", desc: "Compact layout with rapid trigger and low actuation for the fastest possible inputs. The competitive standard for FPS professionals.", icon: "⚡", tips: "60%/65% · Rapid trigger · Minimal" },
                        { id: "fingertip", label: "Ultra-Minimal", desc: "The absolute smallest form factor with only the essential keys. Maximum desk space, minimum weight, pure competitive focus.", icon: "🎯", tips: "60% or smaller · Lightest · Pure gaming" },
                      ].map(g => (
                        <OptionButton key={g.id} selected={quizAnswers.grip === g.id} onClick={() => setAnswer("grip", g.id)} large>
                          <div className="text-center">
                            <div className="text-3xl mb-3">{g.icon}</div>
                            <div className="text-sm font-black mb-2" style={{ color: quizAnswers.grip === g.id ? accent : "#6b635b" }}>{g.label}</div>
                            <div className="text-sm opacity-85 leading-relaxed mb-3">{g.desc}</div>
                            <div className="text-sm px-2 py-1 rounded-lg inline-block" style={{ background: "#0000000a", color: "#a09890", fontSize: 12 }}>{g.tips}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Games */}
                {quizStep === 3 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What games do you play?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>Select all that apply. This helps us match keyboards that pros use in your games.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: "CS2", label: "Counter-Strike 2", color: "#c47000" },
                        { id: "Valorant", label: "Valorant", color: "#c4444f" },
                        { id: "Apex", label: "Apex Legends", color: "#dc2626" },
                        { id: "Fortnite", label: "Fortnite", color: "#4c7bd9" },
                        { id: "Overwatch 2", label: "Overwatch 2", color: "#f99e1a" },
                        { id: "Call of Duty", label: "Call of Duty", color: "#5cb85c" },
                        { id: "R6 Siege", label: "Rainbow Six Siege", color: "#4a86c8" },
                        { id: "LoL", label: "League of Legends", color: "#c89b3c" },
                        { id: "Dota 2", label: "Dota 2", color: "#e74c3c" },
                        { id: "Marvel Rivals", label: "Marvel Rivals", color: "#ed1d24" },
                        { id: "Deadlock", label: "Deadlock", color: "#7048c4" },
                        { id: "PUBG", label: "PUBG", color: "#f2a900" },
                      ].map(g => (
                        <OptionButton key={g.id} selected={quizAnswers.games.includes(g.id)} onClick={() => toggleArrayAnswer("games", g.id)} color={g.color}>
                          <div className="flex items-center gap-2">
                            {GAME_IMAGE_URLS[g.id] && <img loading="lazy" src={GAME_IMAGE_URLS[g.id]} alt={g.label} className="w-5 h-5 object-contain" />}
                            <div>
                              <div className="text-sm font-bold" style={{ color: quizAnswers.games.includes(g.id) ? g.color : "#6b635b" }}>{g.label}</div>
                            </div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                    {quizAnswers.games.length > 0 && (
                      <div className="mt-4 text-sm opacity-30">{quizAnswers.games.length} game{quizAnswers.games.length !== 1 ? "s" : ""} selected</div>
                    )}
                  </div>
                )}

                {/* Step 4: Priorities */}
                {quizStep === 4 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What matters most to you?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>Select up to 3 priorities. This shapes how we rank your recommendations.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "weight", label: "Lightweight", desc: "Lighter = faster flicks and less fatigue", icon: "⚡" },
                        { id: "sensor", label: "Best Switch Best Sensor & Polling Polling", desc: "Cutting-edge tracking and 4K/8K polling", icon: "🎯" },
                        { id: "pro", label: "Pro Validated", desc: "Used and trusted by professional players", icon: "🏆" },
                        { id: "price", label: "Value for Money", desc: "Best performance per dollar spent", icon: "💰" },
                        { id: "build", label: "Build Quality", desc: "Premium materials, clicks, and feel", icon: "✨" },
                      ].map(p => (
                        <OptionButton key={p.id}
                          selected={quizAnswers.priorities.includes(p.id)}
                          onClick={() => { if (quizAnswers.priorities.includes(p.id) || quizAnswers.priorities.length < 3) toggleArrayAnswer("priorities", p.id); }}>
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{p.icon}</span>
                            <div>
                              <div className="text-sm font-bold" style={{ color: quizAnswers.priorities.includes(p.id) ? accent : "#6b635b" }}>{p.label}</div>
                              <div className="text-sm opacity-85">{p.desc}</div>
                            </div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                    <div className="mt-3 text-sm opacity-25">{quizAnswers.priorities.length}/3 selected</div>
                  </div>
                )}

                {/* Step 5: Weight */}
                {quizStep === 5 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>Weight preference?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>What weight range do you prefer?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "ultralight", label: "Wooting", range: "Under 50g", desc: "Like holding almost nothing. Maximum flick speed.", example: "Wooting 60HE+, DrunkDeer A75, Razer Huntsman Mini" },
                        { id: "light", label: "Light", range: "50-65g", desc: "The competitive sweet spot. Fast but controlled.", example: "Wooting 60HE, Razer Huntsman V3 Pro TKL, Corsair K65 Plus" },
                        { id: "medium", label: "Medium", range: "65-85g", desc: "Stable and comfortable. Some prefer the control.", example: "Cherry MX Board, SteelSeries Apex Pro" },
                        { id: "heavy", label: "Heavy / Don't Care", range: "85g+", desc: "Maximum stability, or weight just isn't a factor.", example: "G502 X Plus, BlackWidow V3 Pro" },
                      ].map(w => (
                        <OptionButton key={w.id} selected={quizAnswers.weightPref === w.id} onClick={() => setAnswer("weightPref", w.id)} large>
                          <div className="text-sm font-black mb-1" style={{ color: quizAnswers.weightPref === w.id ? accent : "#6b635b" }}>{w.label}</div>
                          <div className="text-sm font-bold mb-1" style={{ color: accent, opacity: 0.6 }}>{w.range}</div>
                          <div className="text-sm opacity-85 mb-2">{w.desc}</div>
                          <div className="text-sm opacity-20" style={{ fontSize: 12 }}>e.g. {w.example}</div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 6: Shape */}
                {quizStep === 6 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>Shape preference?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>Ergonomic keyboards are contoured for your right hand. Symmetrical keyboards work for any hand.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "ergonomic", label: "Ergonomic", desc: "Right-hand contoured. Natural resting position. Great for palm grip and long sessions.", icon: "🤚" },
                        { id: "symmetrical", label: "Symmetrical", desc: "Ambidextrous shape. Preferred by most FPS pros. Works with all grip styles.", icon: "🔲" },
                        { id: "either", label: "No Preference", desc: "I'm open to both. Recommend whatever scores highest for me.", icon: "🤷" },
                      ].map(s => (
                        <OptionButton key={s.id} selected={quizAnswers.shape === s.id} onClick={() => setAnswer("shape", s.id)} large>
                          <div className="text-center">
                            <div className="text-2xl mb-2">{s.icon}</div>
                            <div className="text-sm font-black mb-2" style={{ color: quizAnswers.shape === s.id ? accent : "#6b635b" }}>{s.label}</div>
                            <div className="text-sm opacity-85 leading-relaxed">{s.desc}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 7: Connectivity */}
                {quizStep === 7 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>Wired or wireless?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>Modern wireless keyboards have zero perceptible latency difference vs wired. 98% of pros use wireless.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "wireless", label: "Wireless Only", desc: "No cable drag. Freedom of movement. The pro standard.", icon: "📡" },
                        { id: "wired", label: "Wired OK", desc: "Don't mind a cable. Sometimes lighter and cheaper.", icon: "🔌" },
                        { id: "either", label: "No Preference", desc: "Either works. Just give me the best keyboard for my needs.", icon: "🤷" },
                      ].map(c => (
                        <OptionButton key={c.id} selected={quizAnswers.connectivity === c.id} onClick={() => setAnswer("connectivity", c.id)} large>
                          <div className="text-center">
                            <div className="text-2xl mb-2">{c.icon}</div>
                            <div className="text-sm font-black mb-2" style={{ color: quizAnswers.connectivity === c.id ? accent : "#6b635b" }}>{c.label}</div>
                            <div className="text-sm opacity-85 leading-relaxed">{c.desc}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 8: Budget */}
                {quizStep === 8 && (
                  <div className="rounded-2xl p-6 sm:p-8" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                    <div className="text-xl font-black mb-1" style={{ color: accent }}>What's your budget?</div>
                    <p className="text-sm mb-6" style={{ color: "#a09890" }}>There are excellent keyboards at every price point.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: "under80", label: "Under $80", desc: "Budget-friendly", color: "#2a8a62" },
                        { id: "80to120", label: "$80 – $120", desc: "Mid-range", color: "#6b8cad" },
                        { id: "120to160", label: "$120 – $160", desc: "Premium", color: "#a855f7" },
                        { id: "nolimit", label: "No Limit", desc: "Best regardless", color: "#b8956a" },
                      ].map(b => (
                        <OptionButton key={b.id} selected={quizAnswers.budget === b.id} onClick={() => setAnswer("budget", b.id)} color={b.color} large>
                          <div className="text-center">
                            <div className="text-sm font-black mb-1" style={{ color: quizAnswers.budget === b.id ? b.color : "#6b635b" }}>{b.label}</div>
                            <div className="text-sm opacity-85">{b.desc}</div>
                          </div>
                        </OptionButton>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {quizStep > 0 && (
                  <div className="flex justify-between mt-6">
                    <button onClick={() => setQuizStep(prev => prev - 1)}
                      className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-stone-100"
                      style={{ background: "#00000008", border: "1px solid #d4cfc8" }}>
                      ← Back
                    </button>
                    <button onClick={nextStep} disabled={!canProceed()}
                      className="px-6 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-105 disabled:opacity-20 disabled:hover:scale-100"
                      style={{ background: canProceed() ? accent : "#00000010", color: canProceed() ? "#1a1614" : "#a09890" }}>
                      {quizStep === 8 ? "See My Results →" : "Next →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ─── RESULTS ─── */
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <div className="text-xl font-black" style={{ color: accent }}>Your Top Keyboards</div>
                    <div className="text-sm opacity-30 mt-1">
                      Based on {quizAnswers.grip} grip · {quizAnswers.handLength}×{quizAnswers.handWidth}cm hands · {quizAnswers.games.join(", ")} · {quizAnswers.weightPref} weight · {quizAnswers.budget === "nolimit" ? "no budget limit" : quizAnswers.budget}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setQuizDone(false); setQuizStep(0); setQuizAnswers({ handLength: "", handWidth: "", grip: "", games: [], priorities: [], weightPref: "", connectivity: "", budget: "", shape: "" }); }}
                      className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-stone-100"
                      style={{ background: "#00000008", border: "1px solid #d4cfc8" }}>
                      ↺ Retake Quiz
                    </button>
                    <button onClick={() => { setQuizDone(false); setQuizStep(0); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-stone-100"
                      style={{ background: `${accent}10`, border: `1px solid ${accent}30`, color: accent }}>
                      ← Back to Lab
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {getResults().map((r, i) => {
                    const m = r.kbd;
                    const brandCol = BRAND_COLORS[m.brand] || "#8a8078";
                    const matchPct = Math.min(99, Math.max(40, Math.round((r.score / maxScore) * 98)));
                    const isTop = i === 0;
                    return (
                      <div key={m.id}
                        className="rounded-2xl p-4 sm:p-6 cursor-pointer transition-all hover:scale-[1.01]"
                        onClick={() => { navigateToKeyboard(m); }}
                        style={{
                          background: isTop ? `${brandCol}10` : "#ffffff",
                          border: isTop ? `2px solid ${brandCol}40` : "1px solid #e8e4df",
                          boxShadow: isTop ? `0 0 30px ${brandCol}10` : "none",
                        }}>
                        <div className="flex items-start gap-4">
                          {/* Rank badge */}
                          <div className="flex flex-col items-center flex-shrink-0 pt-1">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                              style={{
                                background: i === 0 ? "#fbbf2420" : i === 1 ? "#94a3b820" : i === 2 ? "#cd7f3220" : "#00000008",
                                color: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#cd7f32" : "#a09890",
                                border: i < 3 ? `1px solid ${i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : "#cd7f32"}30` : "1px solid #e8e4df",
                              }}>
                              #{i + 1}
                            </div>
                          </div>

                          {/* Keyboard image */}
                          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center" style={{ background: `${brandCol}08`, border: `1px solid ${brandCol}12` }}>
                            {KEYBOARD_IMAGE_URLS[m.name] ? (
                              <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt={m.name} className="w-full h-full object-contain p-1.5"
                                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.06))" }}
                                onError={e => { e.target.style.display = "none"; e.target.nextElementSibling && (e.target.nextElementSibling.style.display = "flex"); }} />
                            ) : null}
                            
                          </div>

                          {/* Keyboard info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <div className="text-base sm:text-lg font-black" style={{ color: brandCol }}>{m.name}</div>
                                <div className="text-sm opacity-85">{m.brand} · {m.weight}g · {m.layout} · {m.connectivity} · ${m.price}</div>
                              </div>
                              <div className="flex-shrink-0 text-center">
                                <div className="w-14 h-14 rounded-lg flex items-center justify-center font-black text-lg transition-all" style={{
                                  background: matchPct >= 80 ? "#06b6d420" : matchPct >= 60 ? "#a855f720" : "#b8956a20",
                                  border: `2px solid ${matchPct >= 80 ? "#06b6d4" : matchPct >= 60 ? "#a855f7" : "#b8956a"}`,
                                  color: matchPct >= 80 ? "#06b6d4" : matchPct >= 60 ? "#a855f7" : "#b8956a"
                                }}>{matchPct}%</div>
                                <div className="text-xs opacity-25 mt-1">match</div>
                              </div>
                            </div>

                            {/* Match bar */}
                            <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "#00000008" }}>
                              <div className="h-full rounded-full transition-all duration-1000"
                                style={{ width: `${matchPct}%`, background: `linear-gradient(to right, ${brandCol}80, ${brandCol})` }} />
                            </div>

                            {/* Reasons */}
                            {r.reasons.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {r.reasons.map((reason, ri) => (
                                  <span key={ri} className="px-2 py-1 rounded-lg text-sm" style={{ background: `${brandCol}10`, color: brandCol, fontSize: 12 }}>
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Buy button */}
                        <a href={amazonLink(m.name)} target="_blank" rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`mt-4 flex items-center justify-center gap-2 py-${isTop ? "3" : "2"} rounded-xl text-sm font-${isTop ? "black" : "bold"} transition-all hover:scale-[1.02] no-underline`}
                          style={isTop
                            ? { background: brandCol, color: "#1a1614", textDecoration: "none" }
                            : { background: `${brandCol}15`, color: brandCol, border: `1px solid ${brandCol}25`, textDecoration: "none" }
                          }>
                          {I.cart(isTop ? 16 : 12)}
                          {isTop ? `🏆 Best Match — Buy ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}` :
                           i === 1 ? `Runner Up — ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}` :
                           i === 2 ? `${m.price < 100 ? "💰 Budget Pick" : "Bronze Pick"} — ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}` :
                           `Buy ${m.name.split(" ").slice(-2).join(" ")} — $${m.price}`}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Coming Soon Teasers */}
            <div className="mt-10">
              <SectionTitle color={accent} sub="New lab experiments dropping soon">Coming Soon</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: I.crosshair(32), title: "Aim Style Analyzer", desc: "Answer questions about how you aim — tracking, flicking, micro-adjustments — and we'll profile your style and suggest optimal sensitivity ranges and keyboards." },
                  { icon: I.bolt(32), title: "Pro Config Simulator", desc: "Pick any pro player from our database and simulate their full setup — actuation, polling rate, switch type, and keyboard layout — applied to your favorite game." },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl p-6 text-center relative overflow-hidden transition-all hover:scale-[1.02]"
                    style={{ background: "#ffffff", border: `1px solid ${accent}15` }}>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-sm font-black" style={{ background: `${accent}20`, color: accent, fontSize: 11 }}>COMING SOON</div>
                    <div className="mb-3 flex justify-center opacity-60">{item.icon}</div>
                    <div className="text-sm font-black mb-2" style={{ color: `${accent}90` }}>{item.title}</div>
                    <div className="text-sm opacity-30 leading-relaxed">{item.desc}</div>
                    <div className="mt-4 h-1 rounded-full mx-auto" style={{ width: 40, background: `${accent}20` }} />
                  </div>
                ))}
              </div>
            </div>

          </div>
          );
        })()}

        {/* ── SHAPES TAB ── */}
        {activeTab === "shapes" && (
          <div>
            <SectionTitle color="#06b6d4" sub="Select two keyboards and overlay their layouts — scaled to real dimensions for true size comparison">Keyboard Layout Overlay</SectionTitle>

            {(() => {
                const kbdsWithDims = keyboards.filter(m => KEYBOARD_DIMS[m.name] && KEYBOARD_IMAGE_URLS[m.name]);
                const mA = shapeKeyboardA || kbdsWithDims[0];
                const mB = shapeKeyboardB || kbdsWithDims[1];
                const dA = KEYBOARD_DIMS[mA?.name];
                const dB = KEYBOARD_DIMS[mB?.name];
                if (!dA || !dB) return null;

                const colA = BRAND_COLORS[mA.brand] || "#b8956a";
                const colB_raw = BRAND_COLORS[mB.brand] || "#8b5cf6";
                const altColors = ["#06b6d4", "#8b5cf6", "#b8956a", "#10b981", "#ec4899"];
                const colB = (mA.brand === mB.brand || colA === colB_raw) 
                  ? altColors.find(c => c !== colA) || "#8b5cf6"
                  : colB_raw;

                const diffL = Math.abs(dA[0] - dB[0]).toFixed(1);
                const diffW = Math.abs(dA[1] - dB[1]).toFixed(1);
                const diffH = Math.abs(dA[2] - dB[2]).toFixed(1);
                const diffWt = Math.abs(mA.weight - mB.weight).toFixed(0);

                const sortedKbdsWithDims = [...kbdsWithDims].sort((a, b) => a.name.localeCompare(b.name));

                // Scale: pixels per mm. Images are scaled so their width matches real mm width.
                const pxPerMm = 4;
                const imgWA = dA[1] * pxPerMm;
                const imgHA = dA[0] * pxPerMm; // length = image height (top-down view)
                const imgWB = dB[1] * pxPerMm;
                const imgHB = dB[0] * pxPerMm;

                const containerW = Math.max(imgWA, imgWB) + 60;
                const containerH = Math.max(imgHA, imgHB) + 80;

                return (
                  <div>
                    {/* Keyboard selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {[
                        { kbd: mA, set: setShapeKbdA, col: colA, label: "Keyboard A" },
                        { kbd: mB, set: setShapeKbdB, col: colB, label: "Keyboard B" },
                      ].map(({ kbd, set, col, label }) => (
                        <div key={label} className="rounded-xl p-4" style={{ background: "#ffffff", border: `1px solid ${col}15` }}>
                          <div className="text-sm font-bold mb-2" style={{ color: col }}>{label}</div>
                          <select value={kbd?.id || ""} onChange={e => { const m = keyboards.find(x => x.id === parseInt(e.target.value)); if (m && KEYBOARD_DIMS[m.name] && KEYBOARD_IMAGE_URLS[m.name]) set(m); }}
                            className="w-full px-3 py-2.5 rounded-lg text-sm cursor-pointer" style={{ background: "#f8f6f3", border: `1px solid ${col}25`, color: "#1a1614" }}>
                            {sortedKbdsWithDims.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                          </select>
                          <div className="flex items-center gap-3 mt-3">
                            {KEYBOARD_IMAGE_URLS[kbd.name] && <img loading="lazy" src={KEYBOARD_IMAGE_URLS[kbd.name]} alt={`${kbd.name} layout outline`} className="h-10 object-contain" style={{ filter: `drop-shadow(0 2px 8px ${col}30)` }} />}
                            <div className="flex flex-wrap gap-2 text-sm opacity-50">
                              <span>{KEYBOARD_DIMS[kbd.name]?.[0]}mm L</span>
                              <span>×</span>
                              <span>{KEYBOARD_DIMS[kbd.name]?.[1]}mm W</span>
                              <span>×</span>
                              <span>{KEYBOARD_DIMS[kbd.name]?.[2]}mm H</span>
                              <span>·</span>
                              <span className="font-bold">{kbd.weight}g</span>
                              <span>·</span>
                              <span>{kbd.layout}</span>
                            </div>
                          </div>
                          <a href={amazonLink(kbd.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: "#b8956a18", color: "#b8956a", border: "1px solid #b8956a30", textDecoration: "none" }}>
                            {I.cart(10)} Buy on Amazon — ${kbd.price}
                          </a>
                        </div>
                      ))}
                    </div>

                    {/* View controls */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[
                        { id: "overlay", label: "Overlay" },
                        { id: "side", label: "Side by Side" },
                      ].map(v => (
                        <button key={v.id} onClick={() => setShapeView(v.id)}
                          className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                          style={{ background: shapeView === v.id ? "#06b6d420" : "#0000000a", border: `1px solid ${shapeView === v.id ? "#06b6d4" : "#00000010"}`, color: shapeView === v.id ? "#06b6d4" : "#a09890" }}>
                          {v.label}
                        </button>
                      ))}
                    </div>

                    {/* Image Overlay Visualization */}
                    <div className="rounded-2xl overflow-hidden relative" style={{ background: "#060606", border: "1px solid #e8e4df" }}>
                      {shapeView === "overlay" ? (
                        <div style={{ position: "relative", width: "100%", maxWidth: containerW, height: containerH, margin: "0 auto" }}>
                          {/* Grid background */}
                          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#0000000a 1px, transparent 1px), linear-gradient(90deg, #0000000a 1px, transparent 1px)", backgroundSize: `${10 * pxPerMm}px ${10 * pxPerMm}px` }} />
                          {/* Center crosshair */}
                          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#00000008" }} />
                          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#00000008" }} />
                          {/* Keyboard B (behind) */}
                          <img loading="lazy" src={KEYBOARD_IMAGE_URLS[mB.name]} alt={mB.name} width={Math.round(imgWB)} height={Math.round(imgHB)}
                            style={{
                              position: "absolute",
                              left: "50%", top: "50%",
                              width: imgWB, height: imgHB,
                              transform: "translate(-50%, -50%)",
                              objectFit: "contain",
                              opacity: 0.45,
                              filter: `drop-shadow(0 0 12px ${colB}40)`,
                            }} />
                          {/* Keyboard A (front) */}
                          <img loading="lazy" src={KEYBOARD_IMAGE_URLS[mA.name]} alt={mA.name} width={Math.round(imgWA)} height={Math.round(imgHA)}
                            style={{
                              position: "absolute",
                              left: "50%", top: "50%",
                              width: imgWA, height: imgHA,
                              transform: "translate(-50%, -50%)",
                              objectFit: "contain",
                              opacity: 0.65,
                              filter: `drop-shadow(0 0 12px ${colA}40)`,
                            }} />
                          {/* Dimension labels */}
                          <div style={{ position: "absolute", top: 8, left: 8, fontSize: 12, fontFamily: "monospace", color: colA, opacity: 0.7 }}>
                            {dA[0]}mm × {dA[1]}mm
                          </div>
                          <div style={{ position: "absolute", top: 8, right: 8, fontSize: 12, fontFamily: "monospace", color: colB, opacity: 0.7 }}>
                            {dB[0]}mm × {dB[1]}mm
                          </div>
                          {/* Scale bar */}
                          <div style={{ position: "absolute", bottom: 10, left: 12, display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 10 * pxPerMm, height: 2, background: "#a09890", borderRadius: 1 }} />
                            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#a09890" }}>10mm</span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-0">
                          {[
                            { m: mA, d: dA, col: colA },
                            { m: mB, d: dB, col: colB },
                          ].map(({ m, d, col }, idx) => (
                            <div key={idx} style={{ position: "relative", height: containerH, borderRight: idx === 0 ? "1px solid #e8e4df" : "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#0000000a 1px, transparent 1px), linear-gradient(90deg, #0000000a 1px, transparent 1px)", backgroundSize: `${10 * pxPerMm}px ${10 * pxPerMm}px` }} />
                              <img loading="lazy" src={KEYBOARD_IMAGE_URLS[m.name]} alt={m.name}
                                style={{ maxWidth: "75%", maxHeight: containerH * 0.65, objectFit: "contain", position: "relative", zIndex: 1, filter: `drop-shadow(0 0 12px ${col}30)` }} />
                              <div style={{ position: "absolute", top: 10, left: 0, right: 0, textAlign: "center", zIndex: 2 }}>
                                <div style={{ fontSize: 13, fontFamily: "monospace", fontWeight: "bold", color: col }}>{m.name.replace(m.brand + " ", "")}</div>
                                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#a09890", marginTop: 2 }}>{d[0]} × {d[1]} × {d[2]}mm · {m.weight}g</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Difference Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                      {[
                        { label: "Length", valA: dA[0], valB: dB[0], unit: "mm", diff: diffL },
                        { label: "Width", valA: dA[1], valB: dB[1], unit: "mm", diff: diffW },
                        { label: "Height", valA: dA[2], valB: dB[2], unit: "mm", diff: diffH },
                        { label: "Weight", valA: mA.weight, valB: mB.weight, unit: "g", diff: diffWt },
                      ].map((s, i) => (
                        <div key={i} className="rounded-xl p-4 text-center" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                          <div className="text-sm uppercase tracking-widest opacity-20 mb-2">{s.label}</div>
                          <div className="flex items-center justify-center gap-3 mb-1">
                            <span className="text-sm font-black" style={{ color: colA }}>{s.valA}{s.unit}</span>
                            <span className="text-xs" style={{ color: "#c4bfb8" }}>vs</span>
                            <span className="text-sm font-black" style={{ color: colB }}>{s.valB}{s.unit}</span>
                          </div>
                          <div className="text-sm font-bold" style={{ color: s.diff > 0 ? "#b8956a" : "#10b981" }}>
                            {s.diff > 0 ? `Δ ${s.diff}${s.unit}` : "Identical"}
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#00000008" }}>
                              <div className="h-full rounded-full" style={{ width: `${(s.valA / Math.max(s.valA, s.valB)) * 100}%`, background: colA }} />
                            </div>
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#00000008" }}>
                              <div className="h-full rounded-full" style={{ width: `${(s.valB / Math.max(s.valA, s.valB)) * 100}%`, background: colB }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-5 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-1.5 rounded-full" style={{ background: colA }} />
                        <span style={{ color: colA }} className="font-bold">{mA.name.replace(mA.brand + " ", "")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-1.5 rounded-full" style={{ background: colB }} />
                        <span style={{ color: colB }} className="font-bold">{mB.name.replace(mB.brand + " ", "")}</span>
                      </div>
                    </div>

                    {/* Buy both */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                      <a href={amazonLink(mA.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: `${colA}15`, color: colA, border: `1px solid ${colA}25`, textDecoration: "none" }}>
                        {I.cart(12)} Buy {mA.name.replace(mA.brand + " ", "")} — ${mA.price}
                      </a>
                      <a href={amazonLink(mB.name)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 no-underline" style={{ background: `${colB}15`, color: colB, border: `1px solid ${colB}25`, textDecoration: "none" }}>
                        {I.cart(12)} Buy {mB.name.replace(mB.brand + " ", "")} — ${mB.price}
                      </a>
                    </div>

                    {/* Quick size guide */}
                    <div className="rounded-xl p-4 mt-6" style={{ background: "#06b6d406", border: "1px solid #06b6d410" }}>
                      <div className="text-sm uppercase tracking-widest opacity-30 mb-3 font-bold">Quick Size Reference</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div><span className="opacity-30">Small:</span> <span className="opacity-60">&lt;118mm L, &lt;60mm W</span></div>
                        <div><span className="opacity-30">Medium:</span> <span className="opacity-60">118-125mm L, 60-65mm W</span></div>
                        <div><span className="opacity-30">Large:</span> <span className="opacity-60">&gt;125mm L, &gt;65mm W</span></div>
                        <div><span className="opacity-30">Low profile:</span> <span className="opacity-60">&lt;38mm H</span></div>
                      </div>
                    </div>
                  </div>
                );
            })()}
          </div>
        )}

        {/* ── SENSITIVITY CONVERTER PAGE ── */}
        {activeTab === "sensitivity" && (() => {
          const accentC = "#9060c4";
          const SENS_GAMES = [
            { id: "cs2", name: "Counter-Strike 2", img: GAME_IMAGE_URLS["CS2"], yaw: 0.022, defaultSens: 1.0, step: 0.01, note: "In-game Sensitivity" },
            { id: "val", name: "Valorant", img: GAME_IMAGE_URLS["Valorant"], yaw: 0.07, defaultSens: 0.35, step: 0.001, note: "Sensitivity" },
            { id: "ow2", name: "Overwatch 2", img: GAME_IMAGE_URLS["Overwatch 2"], yaw: 0.0066, defaultSens: 5, step: 0.1, note: "Sensitivity (1-100)" },
            { id: "apex", name: "Apex Legends", img: GAME_IMAGE_URLS["Apex"], yaw: 0.022, defaultSens: 1.5, step: 0.1, note: "Mouse Sensitivity" },
            { id: "fn", name: "Fortnite", img: GAME_IMAGE_URLS["Fortnite"], yaw: 0.005555, defaultSens: 8, step: 0.1, note: "X Axis Sensitivity (%)" },
            { id: "cod", name: "Call of Duty", img: GAME_IMAGE_URLS["Call of Duty"], yaw: 0.0066, defaultSens: 5, step: 0.1, note: "Mouse Sensitivity" },
            { id: "r6", name: "Rainbow Six Siege", img: GAME_IMAGE_URLS["R6 Siege"], yaw: 0.00572958, defaultSens: 10, step: 1, note: "Mouse Sensitivity" },
            { id: "tf2", name: "Team Fortress 2", img: GAME_IMAGE_URLS["Team Fortress 2"], yaw: 0.022, defaultSens: 2, step: 0.01, note: "Sensitivity" },
            { id: "tarkov", name: "Escape from Tarkov", img: GAME_IMAGE_URLS["Escape from Tarkov"], yaw: 0.022, defaultSens: 0.5, step: 0.01, note: "Mouse Sensitivity" },
            { id: "deadlock", name: "Deadlock", img: GAME_IMAGE_URLS["Deadlock"], yaw: 0.022, defaultSens: 1.5, step: 0.01, note: "Sensitivity (Source 2)" },
            { id: "finals", name: "The Finals", img: GAME_IMAGE_URLS["The Finals"], yaw: 0.022, defaultSens: 2, step: 0.01, note: "Mouse Sensitivity" },
            { id: "marvel", name: "Marvel Rivals", img: GAME_IMAGE_URLS["Marvel Rivals"], yaw: 0.0066, defaultSens: 5, step: 0.1, note: "Mouse Sensitivity" },
            { id: "pubg", name: "PUBG", img: GAME_IMAGE_URLS["PUBG"], yaw: 0.000440, defaultSens: 50, step: 1, note: "General Sensitivity" },
            { id: "bf", name: "Battlefield 2042", img: GAME_IMAGE_URLS["Battlefield 2042"], yaw: 0.01222, defaultSens: 25, step: 0.5, note: "Soldier Sensitivity (%)" },
            { id: "destiny2", name: "Destiny 2", img: GAME_IMAGE_URLS["Destiny 2"], yaw: 0.0066, defaultSens: 5, step: 0.5, note: "Mouse Look Sensitivity" },
            { id: "halo", name: "Halo Infinite", img: GAME_IMAGE_URLS["Halo Infinite"], yaw: 0.012195, defaultSens: 3, step: 0.1, note: "Mouse Sensitivity" },
            { id: "quake", name: "Quake Champions", img: GAME_IMAGE_URLS["Quake Champions"], yaw: 0.022, defaultSens: 3, step: 0.01, note: "Sensitivity" },
          ];

          const fromGame = SENS_GAMES.find(g => g.id === sensFromGame) || SENS_GAMES[0];
          const cm360 = (sensFromDpi > 0 && sensFromSens > 0) ? 914.4 / (sensFromDpi * fromGame.yaw * sensFromSens) : 0;
          const inches360 = cm360 / 2.54;

          let speedLabel = "", speedColor = "";
          if (cm360 > 80) { speedLabel = "Very Slow"; speedColor = "#3b82f6"; }
          else if (cm360 > 50) { speedLabel = "Slow"; speedColor = "#06b6d4"; }
          else if (cm360 > 30) { speedLabel = "Medium"; speedColor = "#10b981"; }
          else if (cm360 > 18) { speedLabel = "Fast"; speedColor = "#b8956a"; }
          else if (cm360 > 10) { speedLabel = "Very Fast"; speedColor = "#ef4444"; }
          else { speedLabel = "Extreme"; speedColor = "#dc2626"; }

          return (
          <div>
            <SectionTitle color={accentC} sub="Convert your sensitivity between any game — supporting 17 titles with cm/360 as the universal reference">Sensitivity Converter</SectionTitle>

            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${accentC}15` }}>
              {/* Input Section */}
              <div className="p-4 sm:p-6" style={{ background: `linear-gradient(135deg, ${accentC}08, #ffffff)` }}>
                <div className="text-sm uppercase tracking-widest opacity-30 mb-4">Your Current Settings</div>

                <div className="mb-4">
                  <div className="text-sm opacity-85 mb-2">Game</div>
                  <div className="flex flex-wrap gap-1.5">
                    {SENS_GAMES.map(g => (
                      <button key={g.id} onClick={() => { setSensFromGame(g.id); setSensFromSens(g.defaultSens); }}
                        className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-100 cursor-pointer whitespace-nowrap"
                        style={{
                          background: sensFromGame === g.id ? accentC : "#ffffff",
                          color: sensFromGame === g.id ?  "#ffffff" : "#1a1614",
                          border: `1px solid ${sensFromGame === g.id ? accentC : "#d4cfc8"}`,
                          fontSize: 12,
                          boxShadow: sensFromGame === g.id ? `0 2px 0 ${accentC}80` : "0 2px 0 #d4cfc8",
                          transform: sensFromGame === g.id ? "translateY(1px)" : "translateY(0)",
                        }}>
                        {g.img ? <img loading="lazy" src={g.img} alt={`${g.name} game icon`} className="inline-block mr-1 rounded-sm" style={{ width: 14, height: 14, objectFit: "contain", verticalAlign: "middle", marginTop: -1 }} /> : null}{g.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm opacity-85 mb-2">Mouse DPI</div>
                    <input type="number" value={sensFromDpi} onChange={e => setSensFromDpi(Number(e.target.value))}
                      className="w-full rounded-xl px-4 py-3 text-lg font-black text-center"
                      style={{ background: "#00000008", border: `1px solid ${accentC}25`, color: accentC, outline: "none" }} />
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {[400, 800, 1600, 3200].map(d => (
                        <button key={d} onClick={() => setSensFromDpi(d)}
                          className="px-2 py-0.5 rounded text-sm cursor-pointer transition-all"
                          style={{ background: sensFromDpi === d ? `${accentC}30` : "#0000000a", color: sensFromDpi === d ? accentC : "#6b635b", fontSize: 11 }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-85 mb-2">{fromGame.note}</div>
                    <input type="number" value={sensFromSens} onChange={e => setSensFromSens(Number(e.target.value))}
                      step={fromGame.step}
                      className="w-full rounded-xl px-4 py-3 text-lg font-black text-center"
                      style={{ background: "#00000008", border: `1px solid ${accentC}25`, color: "#1a1614", outline: "none" }} />
                  </div>
                </div>
              </div>

              {/* Universal Metrics */}
              {cm360 > 0 && cm360 < 10000 && (
                <div className="px-4 sm:px-6 py-4" style={{ background: "#ffffff", borderTop: `1px solid ${accentC}10`, borderBottom: `1px solid ${accentC}10` }}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">cm/360°</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: accentC }}>{cm360.toFixed(1)}</div>
                      <div className="text-sm opacity-50">centimeters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">in/360°</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: "#6b8cad" }}>{inches360.toFixed(1)}</div>
                      <div className="text-sm opacity-50">inches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">Speed</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: speedColor }}>{speedLabel}</div>
                      <div className="text-sm opacity-50">{cm360 > 40 ? "arm aimer" : cm360 > 22 ? "hybrid" : "wrist aimer"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-60 mb-1">Mousepad</div>
                      <div className="text-xl sm:text-2xl font-black" style={{ color: "#b8956a" }}>{cm360 > 50 ? "XL+" : cm360 > 30 ? "Large" : cm360 > 18 ? "Medium" : "Any"}</div>
                      <div className="text-sm opacity-50">recommended size</div>
                    </div>
                  </div>

                  {/* Swipe distance bar */}
                  <div className="mt-4">
                    <div className="text-sm opacity-55 mb-1.5 text-center">Swipe distance for a full 360° turn</div>
                    <div className="relative h-8 rounded-lg overflow-hidden" style={{ background: "#0000000a" }}>
                      <div className="absolute left-0 top-0 h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${Math.min(Math.max(cm360 / 100 * 100, 5), 100)}%`, background: `linear-gradient(to right, ${accentC}40, ${accentC})` }}>
                        <span className="text-sm font-black" style={{ color: "#1a1614" }}>{cm360.toFixed(1)}cm</span>
                      </div>
                      {[20, 40, 60, 80].map(mark => (
                        <div key={mark} className="absolute top-0 h-full flex items-end pb-0.5 justify-center" style={{ left: `${mark}%`, width: 1 }}>
                          <div className="w-px h-2 bg-white/10" />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm opacity-40 mt-1 px-1" style={{ fontSize: 10 }}>
                      <span>0cm (instant)</span>
                      <span>50cm</span>
                      <span>100cm+</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Converted Sensitivities */}
              {cm360 > 0 && cm360 < 10000 && (
                <div className="p-4 sm:p-6" style={{ background: "#f5f0e8" }}>
                  <div className="text-sm uppercase tracking-widest opacity-60 mb-4">Equivalent Sensitivity in Every Game</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {SENS_GAMES.filter(g => g.id !== sensFromGame).map(g => {
                      const targetSens = 914.4 / (sensFromDpi * g.yaw * cm360);
                      const isSameEngine = g.yaw === fromGame.yaw;
                      const formatted = targetSens < 0.01 ? targetSens.toFixed(4) : targetSens < 1 ? targetSens.toFixed(3) : targetSens < 10 ? targetSens.toFixed(2) : targetSens.toFixed(1);
                      return (
                        <div key={g.id} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all group/sens"
                          style={{ background: "#00000008", border: "1px solid #e8e4df" }}
                          onMouseEnter={e => { e.currentTarget.style.background = `${accentC}08`; e.currentTarget.style.borderColor = `${accentC}20`; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#00000008"; e.currentTarget.style.borderColor = "#00000008"; }}>
                          {g.img ? <img loading="lazy" src={g.img} alt={`${g.name} game icon`} className="flex-shrink-0 rounded-sm" style={{ width: 20, height: 20, objectFit: "contain" }} /> : <span className="flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center text-sm" style={{ background: "#00000008" }}>{g.name.charAt(0)}</span>}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate" style={{ color: "#2d2824" }}>{g.name}</div>
                            <div className="text-sm opacity-25" style={{ fontSize: 11 }}>{g.note}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-sm font-black" style={{ color: accentC }}>{formatted}</div>
                            {isSameEngine && <div className="text-sm font-bold" style={{ color: "#2a8a62", fontSize: 10 }}>Same engine</div>}
                          </div>
                          <button onClick={() => { navigator.clipboard?.writeText(formatted); }}
                            className="opacity-0 group-hover/sens:opacity-85 hover:!opacity-100 transition-all cursor-pointer flex-shrink-0"
                            title="Copy sensitivity">
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/></svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


              {/* Quick Reference */}
              {cm360 > 0 && cm360 < 10000 && (
                <div className="p-4 sm:p-6" style={{ background: "#f5f0e8", borderTop: `1px solid ${accentC}10` }}>
                  <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Sensitivity Ranges by Game Type</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg p-3" style={{ background: "#00000008" }}>
                      <div className="text-sm font-bold mb-2" style={{ color: "#4a74c4" }}>🎯 Tactical Shooters</div>
                      <div className="text-sm opacity-85 leading-relaxed">CS2, Valorant, R6 Siege — Pros typically use 25-55 cm/360. Precise aim over flick speed. Your {cm360.toFixed(0)}cm is {cm360 > 55 ? "slower than most" : cm360 > 25 ? "in the sweet spot" : "faster than most"} tactical pros.</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "#00000008" }}>
                      <div className="text-sm font-bold mb-2" style={{ color: "#c44040" }}>💥 Fast-Paced Shooters</div>
                      <div className="text-sm opacity-85 leading-relaxed">Apex, OW2, CoD, Fortnite — Pros typically use 18-40 cm/360. More tracking and flicking. Your {cm360.toFixed(0)}cm is {cm360 > 40 ? "slower than most" : cm360 > 18 ? "in the sweet spot" : "faster than most"} arena pros.</div>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: "#00000008" }}>
                      <div className="text-sm font-bold mb-2" style={{ color: "#2a8a62" }}>📏 The Universal Range</div>
                      <div className="text-sm opacity-85 leading-relaxed">Most FPS pros across all titles fall between 20-50 cm/360. If you're between 25-40cm, you're in the most popular zone. Experiment ±5cm from your current to find your sweet spot.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          );
        })()}

        {/* ── TEAMS TAB ── */}
        {activeTab === "teams" && (() => {
          const teamColor = "#38bdf8";
          const teamMap = {};
          allPlayers.forEach(p => {
            if (!p.team || p.team === "Free Agent" || p.team === "Content Creator" || p.team === "Content" || p.team === "Retired" || p.team === "Streamer") return;
            if (!teamMap[p.team]) teamMap[p.team] = { players: [], games: new Set(), keyboards: {} };
            teamMap[p.team].players.push(p);
            teamMap[p.team].games.add(p.game);
            if (p.keyboard) teamMap[p.team].keyboards[p.keyboard] = (teamMap[p.team].keyboards[p.keyboard] || 0) + 1;
          });
          const teamList = Object.entries(teamMap)
            .map(([name, data]) => ({
              name,
              playerCount: data.players.length,
              games: [...data.games].sort(),
              topKbd: Object.entries(data.keyboards).sort((a, b) => b[1] - a[1])[0]?.[0] || "—",
              countries: [...new Set(data.players.map(p => p.country).filter(Boolean))],
            }))
            .sort((a, b) => b.playerCount - a.playerCount);

          const allTeamGames = ["All", ...new Set(teamList.flatMap(t => t.games))].sort();

          const filteredTeams = teamList
            .filter(t => teamGameFilter === "All" || t.games.includes(teamGameFilter))
            .filter(t => t.name.toLowerCase().includes(teamSearch.toLowerCase()))
            .sort((a, b) => {
              if (teamSortBy === "playerCount") return b.playerCount - a.playerCount;
              if (teamSortBy === "name") return a.name.localeCompare(b.name);
              if (teamSortBy === "games") return b.games.length - a.games.length;
              return 0;
            });

          const gameColors = GAME_COLORS;

          return (
          <div>
            <SectionTitle color={teamColor} sub={`${teamList.length} organizations across ${allTeamGames.length - 1} games — click any team for details`}>Pro Teams</SectionTitle>

            {/* ── UNIFIED FILTER BAR ── */}
            {(() => {
              const TEAM_SORT_OPTIONS = [
                { value: "playerCount", label: "Most Players" },
                { value: "name", label: "Name A-Z" },
                { value: "games", label: "Most Games" },
              ];
              const teamSortLabel = TEAM_SORT_OPTIONS.find(o => o.value === teamSortBy)?.label || "Most Players";
              const activeTeamFilterCount = teamGameFilter !== "All" ? 1 : 0;
              const accentT = teamColor;
              const chipStyleT = (active, chipColor) => ({
                padding: "5px 10px", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: active ? (chipColor ? `${chipColor}18` : `${accentT}20`) : "#ffffff",
                border: `1px solid ${active ? (chipColor ? `${chipColor}50` : `${accentT}50`) : "#0000000a"}`,
                color: active ? (chipColor || accentT) : "#8a8078",
                transition: "all 0.15s", whiteSpace: "nowrap",
              });

              return (
                <div className="mb-5" style={{ background: "#f5f2ee", border: "1px solid #e8e4df", borderRadius: 12, padding: 10, position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, borderRadius: "12px 12px 0 0", background: `linear-gradient(90deg, transparent, ${accentT}50, transparent)` }} />

                  <div className="flex gap-2.5 items-center" style={{ marginBottom: showTeamFilters ? 10 : 0, transition: "margin 0.3s" }}>
                    <div className="flex-1 relative" style={{ minWidth: 0 }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: 0.25 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      <input type="text" placeholder={`Search ${teamList.length} teams...`} value={teamSearch} onChange={e => setTeamSearch(e.target.value)}
                        className="w-full outline-none" style={{ padding: "7px 12px 7px 34px", background: "#ffffff", border: "1px solid #e8e4df", borderRadius: 10, color: "#1a1614", fontFamily: "inherit", fontSize: 14 }} />
                    </div>

                    <div className="relative">
                      <button className="flex items-center gap-1.5" onClick={() => setShowTeamSortDrop(!showTeamSortDrop)}
                        style={{ padding: "7px 12px", background: "#ffffff", border: `1px solid ${showTeamSortDrop ? `${accentT}50` : "#0000000a"}`, borderRadius: 10, color: showTeamSortDrop ? accentT : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M6 12h12M9 18h6"/></svg>
                        <span style={{ color: "#8a8078", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Sort</span>
                        <span style={{ color: accentT, fontWeight: 700 }}>{teamSortLabel}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                      {showTeamSortDrop && (
                        <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowTeamSortDrop(false)} />
                        <div className="absolute" style={{ top: "calc(100% + 6px)", right: 0, background: "#f0ede8", border: "1px solid #d4cfc8", borderRadius: 10, padding: 4, minWidth: 180, zIndex: 100, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
                          {TEAM_SORT_OPTIONS.map(o => (
                            <div key={o.value} className="flex items-center justify-between cursor-pointer"
                              style={{ padding: "8px 12px", borderRadius: 7, fontSize: 13, fontWeight: 600, color: teamSortBy === o.value ? accentT : "#3d3530", transition: "all 0.15s" }}
                              onMouseEnter={e => { if (teamSortBy !== o.value) e.currentTarget.style.background = `${accentT}20`; }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                              onClick={() => { setTeamSortBy(o.value); setShowTeamSortDrop(false); }}>
                              {o.label}
                              {teamSortBy === o.value && <span style={{ fontSize: 12 }}>✓</span>}
                            </div>
                          ))}
                        </div>
                        </>
                      )}
                    </div>

                    <button className="flex items-center gap-1.5"
                      onClick={() => setShowTeamFilters(!showTeamFilters)}
                      style={{ padding: "7px 12px", background: (showTeamFilters || activeTeamFilterCount > 0) ? `${accentT}20` : "#ffffff", border: `1px solid ${(showTeamFilters || activeTeamFilterCount > 0) ? `${accentT}50` : "#0000000a"}`, borderRadius: 10, color: (showTeamFilters || activeTeamFilterCount > 0) ? accentT : "#3d3530", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                      Filters
                      {activeTeamFilterCount > 0 && <span style={{ width: 18, height: 18, borderRadius: "50%", background: accentT, color: "#1a1614", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{activeTeamFilterCount}</span>}
                    </button>
                  </div>

                  <div style={{ maxHeight: showTeamFilters ? 500 : 0, overflow: "hidden", opacity: showTeamFilters ? 1 : 0, transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s" }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#8a8078", marginBottom: 5, paddingLeft: 2 }}>Game</div>
                      <div className="flex flex-wrap gap-1">
                        <span style={chipStyleT(teamGameFilter === "All")} onClick={() => setTeamGameFilter("All")}>All</span>
                        {allTeamGames.filter(g => g !== "All").map(g => (
                          <span key={g} style={chipStyleT(teamGameFilter === g, gameColors[g])} onClick={() => setTeamGameFilter(teamGameFilter === g ? "All" : g)}>{g}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {!showTeamFilters && teamGameFilter !== "All" && (
                    <div className="flex flex-wrap gap-1.5" style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e8e4df" }}>
                      <span className="inline-flex items-center gap-1.5" style={{ padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: `${gameColors[teamGameFilter] || accentT}20`, color: gameColors[teamGameFilter] || accentT, border: `1px solid ${gameColors[teamGameFilter] || accentT}50` }}>
                        {teamGameFilter} <span className="cursor-pointer opacity-50 hover:opacity-100" style={{ fontSize: 11 }} onClick={() => setTeamGameFilter("All")}>✕</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="text-sm opacity-40 mb-4">{filteredTeams.length} {filteredTeams.length === 1 ? "team" : "teams"} found</div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredTeams.map(team => {
                const primaryGame = team.games[0];
                const gc = gameColors[primaryGame] || teamColor;
                return (
                  <div key={team.name}
                    onClick={() => { window.location.href = `/teams/${team.name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`; }}
                    className="rounded-xl p-4 cursor-pointer transition-all duration-200 group hover:scale-[1.02] flex flex-col relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #ffffff, #faf8f5)", border: `1px solid ${gc}15`, borderTopWidth: "4px", borderTopColor: gc }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${gc}50`; e.currentTarget.style.boxShadow = `0 0 20px ${gc}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${gc}15`; e.currentTarget.style.boxShadow = "none"; }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 mx-auto overflow-hidden flex-shrink-0" style={{ background: `linear-gradient(135deg, ${gc}20, ${gc}10)`, border: `2px solid ${gc}25` }}>
                      {TEAM_LOGOS[team.name] ? <img loading="lazy" src={TEAM_LOGOS[team.name]} alt={team.name} className="w-12 h-12 object-contain" onError={e => { e.target.style.display = "none"; e.target.parentElement.querySelector('.team-fallback').style.display = "block"; }} /> : null}
                      <Shield size={28} className="team-fallback" style={{ color: gc, display: TEAM_LOGOS[team.name] ? "none" : "block" }} />
                    </div>
                    <div className="text-sm font-bold text-center mb-2 leading-tight" style={{ color: gc, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{team.name}</div>
                    <div className="text-center mb-3">
                      <span className="text-2xl font-black" style={{ color: gc }}>{team.playerCount}</span>
                      <span className="text-xs opacity-40 ml-1 block">{team.playerCount === 1 ? "player" : "players"}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-2">
                      {team.games.slice(0, 3).map(g => (
                        <span key={g} className="px-2 py-0.5 rounded-md text-center text-xs font-bold" style={{ background: `${gameColors[g] || "#8a8078"}18`, color: gameColors[g] || "#8a8078", fontSize: 10, border: `1px solid ${gameColors[g] || "#8a8078"}30`, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>{g}</span>
                      ))}
                      {team.games.length > 3 && <span className="px-1.5 py-0.5 rounded text-center opacity-40" style={{ fontSize: 10 }}>+{team.games.length - 3}</span>}
                    </div>
                    <div className="mt-auto pt-2" style={{ borderTop: "1px solid #e8e4df" }}>
                      <div className="text-center opacity-40" style={{ fontSize: 10 }}>TOP KEYBOARD</div>
                      <div className="text-center font-bold truncate" style={{ fontSize: 11, color: "#3d3530" }}>{team.topKbd}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredTeams.length === 0 && (
              <div className="text-center py-16 opacity-40">
                <div className="text-2xl mb-2">No teams match your search</div>
                <div className="text-sm">Try adjusting your search or filter</div>
              </div>
            )}
          </div>
          );
        })()}

        {/* ── TEAM DETAIL PAGE ── */}
        {activeTab === "teamDetail" && selectedTeam && (() => {
          const tc = "#38bdf8";
          const teamPlayers = allPlayers.filter(p => p.team === selectedTeam);
          const seen = new Set();
          const uniquePlayers = teamPlayers.filter(p => {
            const key = p.name + "|" + p.game;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

          const byGame = {};
          uniquePlayers.forEach(p => {
            if (!byGame[p.game]) byGame[p.game] = [];
            byGame[p.game].push(p);
          });
          const gameEntries = Object.entries(byGame).sort((a, b) => b[1].length - a[1].length);

          const keyboardCounts = {};
          uniquePlayers.forEach(p => { if (p.keyboard && p.keyboard !== "Unknown") keyboardCounts[p.keyboard] = (keyboardCounts[p.keyboard] || 0) + 1; });
          const topKeyboards = Object.entries(keyboardCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

          const brandCounts = {};
          uniquePlayers.forEach(p => {
            if (p.keyboard) {
              const brand = p.keyboard.split(" ")[0];
              brandCounts[brand] = (brandCounts[brand] || 0) + 1;
            }
          });
          const topBrands = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);


          const countries = [...new Set(uniquePlayers.map(p => p.country).filter(Boolean))];

          const gameColors = GAME_COLORS;

          return (
          <div>
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm">
              <a href="/" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Home</a>
              <span style={{ color: "#d4cfc8" }}>›</span>
              <a href="/teams" className="opacity-30 hover:opacity-60 transition-all no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>Teams</a>
              <span style={{ color: "#d4cfc8" }}>›</span>
              <span style={{ color: tc }} className="font-bold opacity-70">{selectedTeam}</span>
            </nav>

            <div className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: "linear-gradient(135deg, #ffffff, #faf8f5)", border: `1px solid ${tc}20` }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden" style={{ background: `${tc}15`, border: `1px solid ${tc}30` }}>
                  {TEAM_LOGOS[selectedTeam] ? <img loading="lazy" src={TEAM_LOGOS[selectedTeam]} alt={selectedTeam} className="w-14 h-14 object-contain" onError={e => { e.target.style.display = "none"; e.target.parentElement.querySelector('.team-fallback').style.display = "block"; }} /> : null}
                  <Shield size={36} className="team-fallback" style={{ color: tc, display: TEAM_LOGOS[selectedTeam] ? "none" : "block" }} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", color: tc }}>{selectedTeam}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {gameEntries.map(([game]) => (
                      <span key={game} className="px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all hover:scale-105 hover:bg-stone-50"
                        style={{ background: `${gameColors[game] || "#8a8078"}20`, color: gameColors[game] || "#8a8078", border: `1px solid ${gameColors[game] || "#8a8078"}30` }}
                        onClick={() => { setGameDetailSlug(game.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")); setActiveTab("games"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{game}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Players Tracked", value: uniquePlayers.length, color: tc },
                  { label: "Games", value: gameEntries.length, color: "#b8956a" },
                  { label: "Nationalities", value: countries.length, color: "#6b8cad" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "#ffffff", border: `1px solid ${s.color}15` }}>
                    <div className="text-lg sm:text-xl font-black" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs opacity-40">{s.label}</div>
                  </div>
                ))}
              </div>
              {countries.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#a09890" }}>Nationalities:</span>
                  <div className="flex flex-wrap gap-1.5">{countries.map((c, i) => <Flag key={i} country={c} size={20} />)}</div>
                </div>
              )}
            </div>

            {/* Team Bio & Achievements */}
            {TEAM_DESCRIPTIONS[selectedTeam] && (
              <div className="mb-6 rounded-xl p-5 sm:p-6" style={{ background: "#ffffff", border: "1px solid #e8e4df" }}>
                {TEAM_DESCRIPTIONS[selectedTeam].bio && (
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: tc }}>About</div>
                    <p className="text-sm leading-relaxed opacity-70">{TEAM_DESCRIPTIONS[selectedTeam].bio}</p>
                  </div>
                )}
                {TEAM_DESCRIPTIONS[selectedTeam].achievements && (
                  <div>
                    <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: "#b8956a" }}>Top Achievements</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {TEAM_DESCRIPTIONS[selectedTeam].achievements.map((a, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="font-bold shrink-0" style={{ color: "#b8956a" }}>#{i + 1}</span>
                          <span className="opacity-60">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {topKeyboards.length > 0 && (
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: tc }}>Keyboard Breakdown</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {topKeyboards.map(([kbdName, count]) => {
                    const pct = Math.round((count / uniquePlayers.length) * 100);
                    return (
                      <div key={kbdName} className="rounded-xl p-3 relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:bg-stone-50"
                        style={{ background: "#ffffff", border: "1px solid #e8e4df" }}
                        onClick={() => { const mm = keyboards.find(mm => mm.name === kbdName || kbdName.includes(mm.name)); if (mm) { setSelectedKeyboard(mm); setActiveTab("keyboardDetail"); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>
                        <div className="absolute bottom-0 left-0 h-1 rounded-full" style={{ width: `${pct}%`, background: tc, opacity: 0.5 }} />
                        <div className="text-sm font-bold truncate hover:underline" style={{ color: "#1a1614" }}>{kbdName}</div>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-lg font-black" style={{ color: tc }}>{count}</span>
                          <span className="text-xs opacity-30">{count === 1 ? "player" : "players"} · {pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {topBrands.length > 0 && (
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: tc }}>Brand Share</div>
                <div className="flex flex-wrap gap-2">
                  {topBrands.map(([brand, count]) => {
                    const pct = Math.round((count / uniquePlayers.length) * 100);
                    return (
                      <div key={brand} className="rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 hover:bg-stone-50"
                        style={{ background: "#ffffff", border: "1px solid #e8e4df" }}
                        onClick={() => { setActiveTab("brands"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                        <span className="text-sm font-bold">{brand}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: `${tc}15`, color: tc }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {gameEntries.map(([game, players]) => {
              const gc = gameColors[game] || tc;
              const isOpen = expandedRosters[game] || false;
              return (
                <div key={game} className="mb-3">
                  <button onClick={() => setExpandedRosters(prev => ({ ...prev, [game]: !prev[game] }))}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:bg-stone-50"
                    style={{ background: "#ffffff", border: `1px solid ${gc}20` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-widest font-bold" style={{ color: gc }}>{game} Roster</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: `${gc}15`, color: gc }}>{players.length}</span>
                    </div>
                    <span className="text-sm transition-transform" style={{ color: gc, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                  </button>
                  {isOpen && (
                  <div className="rounded-xl overflow-hidden mt-1" style={{ border: "1px solid #e8e4df" }}>
                    {(() => {
                      const hasRoles = players.some(p => p.role && p.role !== "—");
                      return (<>
                    <div className="hidden sm:grid px-4 py-2 text-xs uppercase tracking-widest opacity-30 items-center" style={{ background: "#ffffff", gridTemplateColumns: hasRoles ? "20% 10% 40% 12%" : "22% 38% 12%" }}>
                      <div>Player</div>
                      {hasRoles && <div>Role</div>}
                      <div>Keyboard</div>
                      <div className="text-center">Hz</div>
                    </div>
                    {players.map((p, i) => (
                      <div key={p.name + i} className="grid px-4 py-3 items-center transition-all hover:bg-white/[0.02]"
                        style={{ borderTop: i > 0 ? "1px solid #e8e4df" : "none", gridTemplateColumns: hasRoles ? "20% 10% 40% 12%" : "22% 38% 12%" }}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Flag country={p.country} size={18} className="shrink-0" />
                          <span className="text-sm font-bold truncate cursor-pointer hover:underline" style={{ color: "#1a1614" }}
                            onClick={() => { const pp = proPlayers.find(pp => pp.name === p.name); if (pp) { setSelectedPlayer(pp); setActiveTab("players"); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>{p.name}</span>
                        </div>
                        {hasRoles && <div>
                          {p.role && p.role !== "—" ? <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${gc}15`, color: gc }}>{p.role}</span> : null}
                        </div>}
                        <div className="text-sm truncate">
                          <span className="opacity-80 cursor-pointer hover:underline hover:opacity-100 transition-opacity"
                            onClick={() => { const mm = keyboards.find(mm => mm.name === p.keyboard || p.keyboard?.includes(mm.name)); if (mm) { setSelectedKeyboard(mm); setActiveTab("keyboardDetail"); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>{p.keyboard || "Unknown"}</span>
                        </div>
                        <div className="text-center text-sm opacity-60">{p.hz ? p.hz.toLocaleString() : "—"}</div>
                      </div>
                    ))}
                    </>);
                    })()}
                  </div>
                  )}
                </div>
              );
            })}
          </div>
          );
        })()}

        {/* ── Mini Newsletter CTA ── */}
        {activeTab !== "overview" && (
        <div className="flex justify-end mt-10 mb-2">
        <div className="rounded-lg px-4 py-2.5 flex items-center gap-3 flex-wrap w-fit" style={{ background: "linear-gradient(135deg, #b8956a08, #6b8cad06)", border: "1px solid #b8956a12" }}>
          <span className="text-sm font-black text-stone-900">Stay ahead of the meta</span>
          <span className="opacity-20 text-sm hidden sm:inline">·</span>
          <span style={{ fontSize: 12 }} className="opacity-30 hidden sm:inline">Pro gear changes & data insights</span>
          {newsletterStatus === "success" ? (
            <span style={{ fontSize: 12, color: "#b8956a" }} className="font-bold">✓ Subscribed!</span>
          ) : (
            <form className="flex gap-1.5" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); } catch { setNewsletterStatus("error"); } }}>
              <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                className="w-36 px-2.5 py-1 rounded-md outline-none" style={{ background: "#ffffff", border: "1px solid #d4cfc8", color: "#1a1614", fontSize: 12 }} />
              <button type="submit" disabled={newsletterStatus === "sending"} className="px-3 py-1 rounded-md font-black transition-all hover:scale-105 disabled:opacity-50" style={{ background: "#b8956a", color: "#1a1614", fontSize: 12 }}>
                {newsletterStatus === "sending" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>
        </div>
        )}

      </main>

      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <button aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 md:bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", color: "#fff", boxShadow: "0 4px 20px #06b6d430" }}>
          ▲
        </button>
      )}

      {/* ─── FOOTER ─── */}
      <footer role="contentinfo" aria-label="Site footer" className="relative py-12 px-6 overflow-hidden" style={{ background: "#ece6db" }}>
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #06b6d4, #8b5cf6, transparent)" }} />
        {/* Decorative keyboard outline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.03 }}>
          <svg width="800" height="280" viewBox="0 0 800 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="780" height="260" rx="16" stroke="#1a1614" strokeWidth="2"/>
            {Array.from({ length: 14 }).map((_, i) => <rect key={`r1-${i}`} x={24 + i * 55} y="28" width="44" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>)}
            {Array.from({ length: 13 }).map((_, i) => <rect key={`r2-${i}`} x={38 + i * 55} y="82" width="44" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>)}
            {Array.from({ length: 12 }).map((_, i) => <rect key={`r3-${i}`} x={52 + i * 55} y="136" width="44" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>)}
            <rect x="180" y="190" width="440" height="44" rx="6" stroke="#1a1614" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block">{I.keyboard(24)}</span>
                <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 15, letterSpacing: 4, color: "#b8956a" }}>ESPORTSKEYBOARDS.COM</span>
              </div>
              <p className="text-sm opacity-30 leading-relaxed">{`The definitive resource for professional esports keyboards. Data from ${allPlayers.length}+ pro players across ${new Set(allPlayers.map(p=>p.game)).size} major competitive titles.`}</p>
              <p className="text-xs opacity-20 mt-2">Data last updated: February 2026</p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Best Keyboards By Game</div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Best for CS2", href: "/best/cs2", color: "#c47000" },
                  { label: "Best for Valorant", href: "/best/valorant", color: "#c4444f" },
                  { label: "Best for Fortnite", href: "/best/fortnite", color: "#4c7bd9" },
                  { label: "Best for Apex", href: "/best/apex", color: "#dc2626" },
                  { label: "Best for LoL", href: "/best/lol", color: "#c89b3c" },
                  { label: "Best for R6 Siege", href: "/best/r6-siege", color: "#4a86c8" },
                  { label: "Best for OW2", href: "/best/overwatch-2", color: "#f99e1a" },
                  { label: "Best Wireless", href: "/best/wireless", color: "#b8956a" },
                  { label: "Best Lightweight", href: "/best/lightweight", color: "#8060c4" },
                  { label: "Best Budget", href: "/best/budget", color: "#b8956a" },
                ].map(g => (
                  <a key={g.href} href={g.href} className="block hover:opacity-80 transition-all no-underline" style={{ color: g.color, textDecoration: "none" }}>{g.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Games</div>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Counter-Strike 2", slug: "cs2", color: "#c47000" },
                  { name: "Valorant", slug: "valorant", color: "#c4444f" },
                  { name: "League of Legends", slug: "lol", color: "#c89b3c" },
                  { name: "Fortnite", slug: "fortnite", color: "#4c7bd9" },
                  { name: "Apex Legends", slug: "apex", color: "#dc2626" },
                  { name: "Dota 2", slug: "dota-2", color: "#e74c3c" },
                  { name: "R6 Siege", slug: "r6-siege", color: "#4a86c8" },
                  { name: "Overwatch 2", slug: "overwatch-2", color: "#f99e1a" },
                  { name: "Rocket League", slug: "rocket-league", color: "#1a9fff" },
                ].map(g => (
                  <a key={g.slug} href={`/games/${g.slug}`} className="block hover:opacity-80 transition-all no-underline" style={{ color: g.color, textDecoration: "none" }}>{g.name}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Top Brands</div>
              <div className="space-y-2 text-sm">
                {["Razer", "Logitech", "Wooting", "Cherry", "Ducky", "DrunkDeer", "SteelSeries", "Endgame Gear"].map(b => (
                  <a key={b} href={`/brands/${b.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="block hover:opacity-80 transition-all no-underline" style={{ color: BRAND_COLORS[b] || "#8a8078", textDecoration: "none" }}>{b}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest opacity-30 mb-3">Resources</div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "All Keyboards", href: "/keyboards" },
                  { label: "Keyboard Rankings", href: "/keyboards" },
                  { label: "Pro Player Settings", href: "/players" },
                  { label: "Compare Keyboards", href: "/compare" },
                  { label: "Sensitivity Converter", href: "/sensitivity" },
                  { label: "Switch Database", href: "/sensors" },
                  { label: "Best Keyboard Guides", href: "/best" },
                  { label: "Blog", href: "/blog" },
                  { label: "Industry Trends", href: "/trends" },
                  { label: "Pro Teams", href: "/teams" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "About Our Data", href: "/about" },
                ].map(r => (
                  <a key={r.label} href={r.href} className="block cursor-pointer hover:opacity-80 transition-all opacity-50 hover:opacity-70 no-underline" style={{ color: "#1a1614", textDecoration: "none" }}>{r.label}</a>
                ))}
              </div>
            </div>
          </div>
          {/* Popular Comparisons */}
          <div className="mb-6 pb-6 border-b" style={{ borderColor: "#00000008" }}>
            <div className="text-xs uppercase tracking-widest opacity-20 mb-3">Popular Comparisons</div>
            <div className="flex flex-wrap gap-2">
              {[
                { a: "Wooting 60HE+", b: "Razer Huntsman V3 Pro Mini" },
                { a: "Wooting 60HE", b: "Wooting 60HE+" },
                { a: "Razer Huntsman V3 Pro Mini", b: "Razer Huntsman V3 Pro TKL" },
                { a: "Wooting 60HE+", b: "SteelSeries Apex Pro TKL (2024)" },
                { a: "Corsair K65 Plus", b: "Wooting 60HE+" },
                { a: "DrunkDeer A75", b: "Wooting 60HE" },
              ].map(c => {
                const sa = c.a.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                const sb = c.b.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
                return <a key={sa+sb} href={`/compare/${sa}-vs-${sb}`} className="text-xs px-2.5 py-1 rounded-full no-underline transition-all hover:opacity-80" style={{ background: "#0000000a", border: "1px solid #e8e4df", color: "#8a8078", textDecoration: "none" }}>{c.a.replace(/(Wooting |Razer )/, "")} vs {c.b.replace(/(Wooting |Razer )/, "")}</a>;
              })}
            </div>
          </div>
          {/* Newsletter */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b" style={{ borderColor: "#00000008" }}>
            <span style={{ fontSize: 12, color: "#b8956a", letterSpacing: 2 }} className="font-black uppercase flex-shrink-0">Newsletter</span>
            <span style={{ fontSize: 12 }} className="opacity-20 hidden sm:inline">·</span>
            <span style={{ fontSize: 12 }} className="opacity-25 flex-shrink-0 hidden sm:inline">Pro gear updates & data insights</span>
            {newsletterStatus === "success" ? (
              <span style={{ fontSize: 11, color: "#b8956a" }} className="font-black">✓ Subscribed</span>
            ) : (
              <form className="flex gap-1.5" onSubmit={async e => { e.preventDefault(); setNewsletterStatus("sending"); try { const res = await fetch("https://formspree.io/f/xvzbwrzv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: newsletterEmail }) }); setNewsletterStatus(res.ok ? "success" : "error"); } catch { setNewsletterStatus("error"); } }}>
                <input type="email" required placeholder="your@email.com" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-36 sm:w-44 px-2.5 py-1.5 rounded-md outline-none" style={{ background: "#ffffff", border: "1px solid #d4cfc8", color: "#1a1614", fontSize: 12 }} />
                <button type="submit" disabled={newsletterStatus === "sending"} className="px-3 py-1.5 rounded-md font-black transition-all hover:scale-105 disabled:opacity-50" style={{ background: "#b8956a", color: "#1a1614", fontSize: 12 }}>
                  {newsletterStatus === "sending" ? "..." : "Join"}
                </button>
              </form>
            )}
          </div>
          <div className="border-t pt-6 flex flex-wrap justify-between items-center text-sm opacity-20 gap-2" style={{ borderColor: "#00000008" }}>
            <span>© 2026 EsportsKeyboards.com  -  All rights reserved</span>
            <span>Data last updated: February 2026 · {allPlayers.length} players · {keyboards.length} keyboards</span>
            <span>As an Amazon Associate, EsportsKeyboards earns from qualifying purchases</span>
          </div>
        </div>
      </footer>
      </div>{/* end sidebar-offset wrapper */}
    </div>
  );
}
