#!/usr/bin/env bash
set -euo pipefail

# ╔═══════════════════════════════════════════════════════════════╗
# ║  DesignForge — One-Command Project Setup                     ║
# ║  Aggregates the best free design resources for your project  ║
# ╚═══════════════════════════════════════════════════════════════╝

BOLD='\033[1m'
DIM='\033[2m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${CYAN}${BOLD}  ⚡ DesignForge Setup${NC}"
echo -e "${DIM}  Aggregating free design resources for your project${NC}"
echo ""

# --- Detect package manager ---
if command -v pnpm &>/dev/null; then
  PM="pnpm"
elif command -v bun &>/dev/null; then
  PM="bun"
elif command -v yarn &>/dev/null; then
  PM="yarn"
else
  PM="npm"
fi
echo -e "  ${DIM}Using${NC} ${BOLD}${PM}${NC} ${DIM}as package manager${NC}"

# --- 1. Init Next.js project (if no package.json) ---
if [ ! -f package.json ]; then
  echo ""
  echo -e "  ${YELLOW}→ No project detected. Creating Next.js project...${NC}"
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-$PM 2>/dev/null
  echo -e "  ${GREEN}✓${NC} Next.js project created"
fi

# --- 2. Install core design dependencies ---
echo ""
echo -e "  ${YELLOW}→ Installing design dependencies...${NC}"

CORE_DEPS="framer-motion lucide-react clsx tailwind-merge class-variance-authority"
echo -e "  ${DIM}  • Core: framer-motion, lucide-react, clsx, tw-merge${NC}"
$PM install $CORE_DEPS 2>/dev/null

echo -e "  ${GREEN}✓${NC} Core dependencies installed"

# --- 3. Init shadcn/ui ---
echo ""
echo -e "  ${YELLOW}→ Initializing shadcn/ui...${NC}"
npx shadcn@latest init -d --force 2>/dev/null || true

ESSENTIAL_SHADCN="button card input badge dialog dropdown-menu"
echo -e "  ${DIM}  • Installing: button, card, input, badge, dialog, dropdown-menu${NC}"
npx shadcn@latest add $ESSENTIAL_SHADCN --yes 2>/dev/null || true

echo -e "  ${GREEN}✓${NC} shadcn/ui initialized with essential components"

# --- 4. Install extra resources ---
echo ""
echo -e "  ${YELLOW}→ Installing extra resources...${NC}"
echo -e "  ${DIM}  • MagicUI animations${NC}"
$PM install magicui 2>/dev/null || echo -e "  ${DIM}  (skipped — optional)${NC}"

echo -e "  ${DIM}  • Recharts (charts)${NC}"
$PM install recharts 2>/dev/null || true

echo -e "  ${DIM}  • Tabler Icons${NC}"
$PM install @tabler/icons-react 2>/dev/null || true

echo -e "  ${GREEN}✓${NC} Extra resources installed"

# --- 5. Summary ---
echo ""
echo -e "╭──────────────────────────────────────────────────────────╮"
echo -e "│  ${BOLD}${GREEN}  ✓ Setup Complete!${NC}                                        │"
echo -e "├──────────────────────────────────────────────────────────┤"
echo -e "│  ${BOLD}Resources ready to use:${NC}                                          │"
echo -e "│  ${CYAN}•${NC} framer-motion     → import { motion } from 'framer-motion'      │"
echo -e "│  ${CYAN}•${NC} lucide-react      → import { Camera } from 'lucide-react'       │"
echo -e "│  ${CYAN}•${NC} @tabler/icons     → import { IconBrandGithub } from '...'       │"
echo -e "│  ${CYAN}•${NC} shadcn/ui         → import { Button } from '@/components/ui'    │"
echo -e "│  ${CYAN}•${NC} clsx/tw-merge     → import { cn } from '@/lib/utils'            │"
echo -e "│  ${CYAN}•${NC} magicui           → import { Sparkles } from 'magicui/...'      │"
echo -e "│  ${CYAN}•${NC} recharts          → import { BarChart } from 'recharts'         │"
echo -e "├──────────────────────────────────────────────────────────┤"
echo -e "│  ${DIM}More resources: https://design-forge.vercel.app${NC}                    │"
echo -e "╰──────────────────────────────────────────────────────────╯"
echo ""
echo -e "  ${BOLD}Run ${CYAN}${PM} run dev${NC}${BOLD} to start building!${NC}"
echo ""
