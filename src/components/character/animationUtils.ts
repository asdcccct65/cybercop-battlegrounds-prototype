
export const getAnimationClasses = (animation: string) => {
  switch (animation) {
    case "wave":
      return "animate-[avatar-wave_2s_ease-in-out_infinite]"
    case "heroic":
      return "animate-[avatar-heroic_3s_ease-in-out_infinite]"
    case "typing":
      return "animate-[avatar-typing_1s_ease-in-out_infinite]"
    case "thinking":
      return "animate-[avatar-thinking_4s_ease-in-out_infinite]"
    case "salute":
      return "animate-[avatar-salute_2s_ease-in-out_infinite]"
    case "cross-arms":
      return "animate-[avatar-cross-arms_3s_ease-in-out_infinite]"
    case "sit":
      return "animate-[avatar-sit_1s_ease-out_forwards]"
    case "stretch":
      return "animate-[avatar-stretch_3s_ease-in-out_infinite]"
    default:
      return "animate-[avatar-idle_6s_ease-in-out_infinite]"
  }
}
