export const CHAT_CONSTANTS = {
  ANIMATION_DELAY: 5000,
  MAX_WIDTH: "70%",
  CONTAINER_WIDTH: "776px",
} as const;

export const CHAT_STYLES = {
  question:
    "self-end bg-green700 text-700 px-5 py-3 rounded-2xl rounded-br-sm shadow-lg max-w-[70%] text-base animate-fade-in",
  answer:
    "self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in",
} as const;
