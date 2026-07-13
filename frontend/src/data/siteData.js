export const navLinks = [
  { href: "#roster", label: "Roster" },
  { href: "#achievements", label: "Awards" },
  { href: "#matches", label: "Matches" },
  { href: "#news", label: "Community" },
  { href: "#tryout", label: "Tryout" },
];

export const heroStats = [
  { value: "0", label: "대회 우승" },
  { value: "8", label: "선수" },
  { value: "2", label: "종목" },
  { value: "2025", label: "창단" },
];

export const fallbackRoster = {
  lol: [
    { id: "lol-1", game: "lol", role: "Top Laner", nickname: "이동영", real_name: "Lee Dong-young", role_icon: "/Image/LOL/Top.svg", region: "KR", tier: "Pro" },
    { id: "lol-2", game: "lol", role: "Jungler", nickname: "황신한", real_name: "Hwang Shin-han", role_icon: "/Image/LOL/JGL.svg", region: "KR", tier: "Pro" },
    { id: "lol-3", game: "lol", role: "Mid Laner", nickname: "김민서", real_name: "Kim Min-seo", role_icon: "/Image/LOL/MID.svg", region: "KR", tier: "Pro" },
    { id: "lol-4", game: "lol", role: "Bot Laner (ADC)", nickname: "이주형", real_name: "Lee Ju-hyung", role_icon: "/Image/LOL/BOT.svg", region: "KR", tier: "Pro" },
    { id: "lol-5", game: "lol", role: "Support", nickname: "김범진", real_name: "Kim Beom-jin", role_icon: "/Image/LOL/SPT.svg", region: "KR", tier: "Pro" },
  ],
  valorant: [
    { id: "val-1", game: "valorant", role: "Controller · IGL", nickname: "이정민", real_name: "Lee Jeong-min", role_icon: "/Image/VAL/Controller.svg", region: "KR", tier: "Pro" },
    { id: "val-2", game: "valorant", role: "Duelist", nickname: "이주형", real_name: "Lee Ju-hyung", role_icon: "/Image/VAL/Duelist.svg", region: "KR", tier: "Pro" },
    { id: "val-3", game: "valorant", role: "Sentinel", nickname: "김범진", real_name: "Kim Beom-jin", role_icon: "/Image/VAL/Sentinel.svg", region: "KR", tier: "Pro" },
  ],
};

export const trophies = [
  { icon: "🏆", title: "수상 이력 없음", meta: "2025 · 창단" },
  { icon: "🥇", title: "수상 이력 없음", meta: "2025 · 창단" },
  { icon: "🎖️", title: "수상 이력 없음", meta: "2025 · 창단" },
  { icon: "⭐", title: "수상 이력 없음", meta: "2025 · JGG Esports" },
];

export const achievementStats = [
  { value: "0", label: "총 대회 입상", note: "2025 창단" },
  { value: "65%", label: "올 시즌 승률", note: "정규리그 기준" },
  { value: "2", label: "참가 종목", note: "LoL · Valorant" },
  { value: "2025", label: "창단 연도", note: "JGG Esports" },
];

export const matches = {
  upcoming: [],
  recent: [],
};

export const sponsors = ["Partner A", "Partner B", "Partner C", "Partner D", "Partner E"];
