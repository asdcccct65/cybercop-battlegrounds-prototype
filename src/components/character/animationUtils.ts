
export const getAnimationClasses = (animation: string) => {
  switch (animation) {
    case "wave":
      return "animate-[avatar-wave_2.5s_ease-in-out_infinite]"
    case "heroic":
      return "animate-[avatar-heroic_4s_ease-in-out_infinite]"
    case "typing":
      return "animate-[avatar-typing_1.2s_ease-in-out_infinite]"
    case "thinking":
      return "animate-[avatar-thinking_5s_ease-in-out_infinite]"
    case "salute":
      return "animate-[avatar-salute_3s_ease-in-out_infinite]"
    case "cross-arms":
      return "animate-[avatar-cross-arms_4s_ease-in-out_infinite]"
    case "sit":
      return "animate-[avatar-sit_1.5s_ease-out_forwards]"
    case "stretch":
      return "animate-[avatar-stretch_4s_ease-in-out_infinite]"
    case "walk":
      return "animate-[avatar-walk_1s_ease-in-out_infinite]"
    case "dance":
      return "animate-[avatar-dance_2s_ease-in-out_infinite]"
    case "look-around":
      return "animate-[avatar-look-around_6s_ease-in-out_infinite]"
    default:
      return "animate-[avatar-idle_8s_ease-in-out_infinite]"
  }
}

// Enhanced animation system with body part specific animations
export const getBodyPartAnimation = (animation: string, bodyPart: string) => {
  const animations: Record<string, Record<string, string>> = {
    wave: {
      "arm-right": "animate-[arm-wave_2.5s_ease-in-out_infinite]",
      "hand-right": "animate-[hand-wave_2.5s_ease-in-out_infinite]"
    },
    typing: {
      "arm-left": "animate-[arm-typing-left_1.2s_ease-in-out_infinite]",
      "arm-right": "animate-[arm-typing-right_1.2s_ease-in-out_infinite_0.1s]",
      "hand-left": "animate-[hand-typing_1.2s_ease-in-out_infinite]",
      "hand-right": "animate-[hand-typing_1.2s_ease-in-out_infinite_0.1s]"
    },
    salute: {
      "arm-right": "animate-[arm-salute_3s_ease-in-out_infinite]",
      "hand-right": "animate-[hand-salute_3s_ease-in-out_infinite]"
    },
    stretch: {
      "arm-left": "animate-[arm-stretch-left_4s_ease-in-out_infinite]",
      "arm-right": "animate-[arm-stretch-right_4s_ease-in-out_infinite_0.2s]"
    },
    walk: {
      "leg-left": "animate-[leg-walk-left_1s_ease-in-out_infinite]",
      "leg-right": "animate-[leg-walk-right_1s_ease-in-out_infinite_0.5s]",
      "arm-left": "animate-[arm-walk-left_1s_ease-in-out_infinite_0.5s]",
      "arm-right": "animate-[arm-walk-right_1s_ease-in-out_infinite]"
    },
    dance: {
      "arm-left": "animate-[arm-dance-left_2s_ease-in-out_infinite]",
      "arm-right": "animate-[arm-dance-right_2s_ease-in-out_infinite_0.5s]",
      "leg-left": "animate-[leg-dance-left_2s_ease-in-out_infinite_0.25s]",
      "leg-right": "animate-[leg-dance-right_2s_ease-in-out_infinite_0.75s]"
    },
    "look-around": {
      "head": "animate-[head-look-around_6s_ease-in-out_infinite]"
    }
  }

  return animations[animation]?.[bodyPart] || ""
}
