#!/usr/bin/env bash
# Numb.Design — Interactive Project Setup Wizard
# curl -fsSL https://numb.design/cli/setup.sh | bash
set -euo pipefail

trap 'echo -e "\n\n  \033[0;31m✗ Cancelled by user\033[0m\n"; exit 1' INT

BOLD='\033[1m'
DIM='\033[2m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[0;37m'
NC='\033[0m'

echo -e "
  ${MAGENTA}╔═══════════════════════════════════════════════════════════════╗${NC}
  ${MAGENTA}║${NC}  ${BOLD}${WHITE}██╗  ██╗██████╗ ███████╗██╗ ██████╗ ███╗   ██╗${NC}            ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${BOLD}${WHITE}██║  ██║██╔══██╗██╔════╝██║██╔════╝ ████╗  ██║${NC}            ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${BOLD}${WHITE}███████║██║  ██║█████╗  ██║██║  ███╗██╔██╗ ██║${NC}            ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${BOLD}${WHITE}██╔══██║██║  ██║██╔══╝  ██║██║   ██║██║╚██╗██║${NC}            ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${BOLD}${WHITE}██║  ██║██████╔╝██║     ██║╚██████╔╝██║ ╚████║${NC}            ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${BOLD}${WHITE}╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝${NC}            ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}                                                    ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${BOLD}${CYAN}  Numb.Design${NC}     ${DIM}— Interactive Project Setup Wizard${NC}       ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${DIM}  AI-powered frontend builder — zero bloat${NC}              ${MAGENTA}║${NC}
  ${MAGENTA}║${NC}  ${DIM}  for your project.${NC}                                      ${MAGENTA}║${NC}
  ${MAGENTA}╚═══════════════════════════════════════════════════════════════╝${NC}
"

if command -v pnpm &>/dev/null; then PM="pnpm"
elif command -v bun &>/dev/null; then PM="bun"
elif command -v yarn &>/dev/null; then PM="yarn"
else PM="npm"; fi
echo -e "  ${DIM}Using${NC} ${BOLD}${PM}${NC} ${DIM}as package manager${NC}"
echo ""

PROJECT_TYPES=("landing-page" "dashboard" "ecommerce" "portfolio" "blog" "saas" "web-app")
STYLE_OPTIONS=("modern" "minimal" "dark" "glassmorphic" "playful" "brutalist")
FEATURE_OPTIONS=("animations" "3d" "charts" "forms" "auth" "icons" "illustrations" "fonts" "dark-mode" "particles" "email" "payment")

ask_single() {
  local question="$1" ; shift
  local options=("$@")
  echo -e "  ${BOLD}${question}${NC}"
  echo ""
  for i in "${!options[@]}"; do
    printf "    ${CYAN}%2d${NC}  ${options[$i]}\n" $((i+1))
  done
  echo ""
  while true; do
    read -p "  ${BOLD}→${NC} " answer
    if [[ "$answer" =~ ^[0-9]+$ ]] && [ "$answer" -ge 1 ] && [ "$answer" -le "${#options[@]}" ]; then
      SELECTED="${options[$((answer-1))]}"
      return
    fi
    echo -e "  ${RED}✗ Please enter a number 1-${#options[@]}${NC}"
  done
}

ask_multi() {
  local question="$1" ; shift
  local options=("$@")
  echo -e "  ${BOLD}${question}${NC}"
  echo -e "  ${DIM}(type numbers separated by commas, or "all")${NC}"
  echo ""
  for i in "${!options[@]}"; do
    printf "    ${CYAN}%2d${NC}  ${options[$i]}\n" $((i+1))
  done
  echo ""
  SELECTED=()
  while true; do
    read -p "  ${BOLD}→${NC} " answer
    if [ "$answer" = "all" ]; then
      SELECTED=("${options[@]}")
      return
    fi
    IFS=',' read -ra nums <<< "$answer"
    local valid=true
    local result=()
    for n in "${nums[@]}"; do
      n=$(echo "$n" | xargs)
      if [[ "$n" =~ ^[0-9]+$ ]] && [ "$n" -ge 1 ] && [ "$n" -le "${#options[@]}" ]; then
        result+=("${options[$((n-1))]}")
      else
        valid=false
      fi
    done
    if [ ${#result[@]} -eq 0 ]; then
      echo -e "  ${RED}✗ Please enter valid numbers${NC}"
      continue
    fi
    if [ "$valid" = false ]; then
      echo -e "  ${RED}✗ Invalid choices. Use 1-${#options[@]}${NC}"
      continue
    fi
    SELECTED=("${result[@]}")
    return
  done
}

ask_single "What are you building?" "${PROJECT_TYPES[@]}"
PROJECT_TYPE="$SELECTED"
echo ""

ask_multi "What style?" "${STYLE_OPTIONS[@]}"
SELECTED_STYLES=("${SELECTED[@]}")
echo ""

ask_multi "What features?" "${FEATURE_OPTIONS[@]}"
SELECTED_FEATURES=("${SELECTED[@]}")
echo ""

echo -e "  ${BLUE}┌──────────────────────────────────────────────────────────┐${NC}"
echo -e "  ${BLUE}│${NC}  ${BOLD}Generating Your Resource Plan${NC}                         ${BLUE}│${NC}"
echo -e "  ${BLUE}└──────────────────────────────────────────────────────────┘${NC}"
echo ""

get_cmd() {
  case "$1" in
    "shadcn/ui")          echo "npx shadcn@latest init -d --force 2>/dev/null || true" ;;
    "Lucide Icons")       echo "npm install lucide-react" ;;
    "Framer Motion")      echo "npm install motion" ;;
    "Aceternity UI")      echo "npx create-aceternity-ui 2>/dev/null || true" ;;
    "Recharts")           echo "npm install recharts" ;;
    "React Hook Form")    echo "npm install react-hook-form @hookform/resolvers" ;;
    "Zod")                echo "npm install zod" ;;
    "NextAuth")           echo "npm install next-auth@beta" ;;
    "Stripe")             echo "npm install stripe @stripe/stripe-js" ;;
    "React Email")        echo "npm install @react-email/components react-email" ;;
    "Three.js")           echo "npm install three" ;;
    "React Three Fiber")  echo "npm install @react-three/fiber @react-three/drei" ;;
    "AutoAnimate")        echo "npm install @formkit/auto-animate" ;;
    "Tabler Icons")       echo "npm install @tabler/icons-react" ;;
    "tsParticles")        echo "npm install @tsparticles/react" ;;
    "MagicUI")            echo "npm install magicui" ;;
    "Radix Colors")       echo "npm install @radix-ui/colors" ;;
    "clsx+tailwind-merge") echo "npm install clsx tailwind-merge class-variance-authority" ;;
    "Fontsource")         echo "npm install @fontsource/inter" ;;
  esac
}

get_desc() {
  case "$1" in
    "Tailwind CSS")       echo "Utility-first CSS framework" ;;
    "shadcn/ui")          echo "Copy-paste React components" ;;
    "Lucide Icons")       echo "Beautiful icon library" ;;
    "Framer Motion")      echo "Production-ready motion library" ;;
    "Aceternity UI")      echo "Trending animated components" ;;
    "Recharts")           echo "React charting library" ;;
    "React Hook Form")    echo "Performant form library" ;;
    "Zod")                echo "TypeScript schema validation" ;;
    "NextAuth")           echo "Authentication for Next.js" ;;
    "Stripe")             echo "Payment processing" ;;
    "React Email")        echo "Email components for React" ;;
    "Three.js")           echo "3D graphics library" ;;
    "React Three Fiber")  echo "React renderer for Three.js" ;;
    "AutoAnimate")        echo "Zero-config animations" ;;
    "Tabler Icons")       echo "4980+ SVG icons" ;;
    "tsParticles")        echo "Particle effects" ;;
    "MagicUI")            echo "Animated React components" ;;
    "Radix Colors")       echo "Accessible color system" ;;
    "clsx+tailwind-merge") echo "Utility helpers for class names" ;;
    "unDraw")             echo "Open-source illustrations" ;;
    "Fontsource")         echo "Self-hosted fonts" ;;
    "Glassmorphism CSS")  echo "Glassmorphic style utilities" ;;
  esac
}

contains() { local e; for e in "${@:2}"; do [ "$e" = "$1" ] && return 0; done; return 1; }

add_dep() {
  if ! contains "$1" "${PLAN_DEPS[@]}"; then PLAN_DEPS+=("$1"); fi
}

PLAN_DEPS=()
add_dep "Tailwind CSS"
add_dep "shadcn/ui"
add_dep "Lucide Icons"
add_dep "clsx+tailwind-merge"

for style in "${SELECTED_STYLES[@]}"; do
  case "$style" in
    glassmorphic) add_dep "Glassmorphism CSS" ;;
    dark) add_dep "Radix Colors" ;;
    playful) add_dep "MagicUI"; add_dep "tsParticles" ;;
  esac
done

for feature in "${SELECTED_FEATURES[@]}"; do
  case "$feature" in
    animations) add_dep "Framer Motion"; add_dep "AutoAnimate" ;;
    3d) add_dep "Three.js"; add_dep "React Three Fiber" ;;
    charts) add_dep "Recharts" ;;
    forms) add_dep "React Hook Form"; add_dep "Zod" ;;
    auth) add_dep "NextAuth" ;;
    icons) add_dep "Tabler Icons" ;;
    illustrations) add_dep "unDraw" ;;
    fonts) add_dep "Fontsource" ;;
    particles) add_dep "tsParticles" ;;
    email) add_dep "React Email" ;;
    payment) add_dep "Stripe" ;;
  esac
done

case "$PROJECT_TYPE" in
  landing-page|portfolio) add_dep "Framer Motion"; add_dep "Aceternity UI" ;;
  dashboard|saas|web-app) add_dep "Recharts" ;;
  ecommerce) add_dep "React Hook Form"; add_dep "Zod"; add_dep "Stripe" ;;
esac

FINAL_PLAN=()
for d in "${PLAN_DEPS[@]}"; do
  if ! contains "$d" "${FINAL_PLAN[@]}"; then FINAL_PLAN+=("$d"); fi
done

echo -e "  ${BOLD}Project:${NC}  ${CYAN}${PROJECT_TYPE}${NC}"
echo -e "  ${BOLD}Styles:${NC}   $(printf "${MAGENTA}%s${NC}, " "${SELECTED_STYLES[@]}" | sed 's/, $//')"
echo -e "  ${BOLD}Features:${NC} $(printf "${GREEN}%s${NC}, " "${SELECTED_FEATURES[@]}" | sed 's/, $//')"
echo ""

echo -e "  ${GREEN}┌──────────────────────────────────────────────────────────┐${NC}"
echo -e "  ${GREEN}│${NC}  ${BOLD}Your Resource Plan${NC}                                        ${GREEN}│${NC}"
echo -e "  ${GREEN}├──────────────────────────────────────────────────────────┤${NC}"
for i in "${!FINAL_PLAN[@]}"; do
  name="${FINAL_PLAN[$i]}"
  cmd=$(get_cmd "$name")
  desc=$(get_desc "$name")
  printf "  ${GREEN}│${NC}  ${YELLOW}%2d.${NC} ${BOLD}%-20s${NC} ${DIM}%s${NC}\n" $((i+1)) "$name" "$desc"
  [ -n "$cmd" ] && printf "  ${GREEN}│${NC}     ${DIM}%s${NC}\n" "$cmd"
done
echo -e "  ${GREEN}└──────────────────────────────────────────────────────────┘${NC}"
echo ""

read -p "  ${BOLD}Proceed with installation?${NC} ${DIM}(Y/n)${NC} " PROCEED
echo ""
if [ "$PROCEED" != "n" ] && [ "$PROCEED" != "N" ]; then
  if [ ! -f package.json ]; then
    echo -e "  ${YELLOW}→ No package.json found. Creating Next.js project...${NC}"
    npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-$PM 2>/dev/null
    echo -e "  ${GREEN}✓${NC} Project created"
  fi

  echo ""
  echo -e "  ${BLUE}┌──────────────────────────────────────────────────────────┐${NC}"
  echo -e "  ${BLUE}│${NC}  ${BOLD}Installing Resources${NC}                                        ${BLUE}│${NC}"
  echo -e "  ${BLUE}└──────────────────────────────────────────────────────────┘${NC}"
  echo ""

  TOTAL="${#FINAL_PLAN[@]}"
  COUNT=0
  for d in "${FINAL_PLAN[@]}"; do
    COUNT=$((COUNT+1))
    cmd=$(get_cmd "$d")
    if [ -z "$cmd" ]; then
      echo -e "  ${DIM}  [${COUNT}/${TOTAL}]${NC} ${GREEN}●${NC} ${DIM}${d}${NC} ${DIM}(no install needed)${NC}"
      continue
    fi
    echo -e "  ${DIM}  [${COUNT}/${TOTAL}]${NC} ${CYAN}◉${NC} ${BOLD}Installing ${d}...${NC}"
    if eval "$cmd" 2>/dev/null; then
      echo -e "  ${DIM}  [${COUNT}/${TOTAL}]${NC} ${GREEN}●${NC} ${DIM}${d}${NC} ${GREEN}✓${NC}"
    else
      echo -e "  ${DIM}  [${COUNT}/${TOTAL}]${NC} ${YELLOW}○${NC} ${DIM}${d}${NC} ${YELLOW}(skipped)${NC}"
    fi
  done
fi
echo ""

echo ""

echo -e "  ${MAGENTA}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "  ${MAGENTA}║${NC}  ${BOLD}${GREEN}  ✓ Setup Complete!${NC}                                         ${MAGENTA}║${NC}"
echo -e "  ${MAGENTA}├───────────────────────────────────────────────────────────┤${NC}"
for d in "${FINAL_PLAN[@]}"; do
  echo -e "  ${MAGENTA}│${NC}  ${CYAN}•${NC} ${d}"
done
echo -e "  ${MAGENTA}├───────────────────────────────────────────────────────────┤${NC}"
echo -e "  ${MAGENTA}│${NC}  ${DIM}More resources: https://numb.design${NC}                         ${MAGENTA}│${NC}"
echo -e "  ${MAGENTA}╰───────────────────────────────────────────────────────────╝${NC}"
echo ""
echo -e "  ${BOLD}Run ${CYAN}${PM} run dev${NC}${BOLD} to start building!${NC}"
echo ""
