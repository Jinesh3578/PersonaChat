// src/data/personalities.js

import istjImage from '../assets/images/istj-logistician.svg';
import isfjImage from '../assets/images/isfj-defender.svg';
import infjImage from '../assets/images/infj-advocate.svg';
import intjImage from '../assets/images/intj-architect.svg';
import istpImage from '../assets/images/istp-virtuoso.svg';
import isfpImage from '../assets/images/isfp-adventurer.svg';
import infpImage from '../assets/images/infp-mediator.svg';
import intpImage from '../assets/images/intp-logician.svg';
import estpImage from '../assets/images/estp-entrepreneur.svg';
import esfpImage from '../assets/images/esfp-entertainer.svg';
import enfpImage from '../assets/images/enfp-campaigner.svg';
import entpImage from '../assets/images/entp-debater.svg';
import estjImage from '../assets/images/estj-executive.svg';
import esfjImage from '../assets/images/esfj-consul.svg';
import enfjImage from '../assets/images/enfj-protagonist.svg';
import entjImage from '../assets/images/entj-commander.svg';
import customImage from '../assets/images/your-own.jpeg';

export const personalities = [
  {
    id: 'istj',
    name: 'ISTJ (The Logistician)',
    description: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
    image: istjImage,
  },
  {
    id: 'isfj',
    name: 'ISFJ (The Defender)',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    image: isfjImage,
  },
  {
    id: 'infj',
    name: 'INFJ (The Advocate)',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    image: infjImage,
  },
  {
    id: 'intj',
    name: 'INTJ (The Architect)',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    image: intjImage,
  },
  {
    id: 'istp',
    name: 'ISTP (The Virtuoso)',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
    image: istpImage,
  },
  {
    id: 'isfp',
    name: 'ISFP (The Adventurer)',
    description: 'Flexible and charming artists, always ready to explore and experience something new.',
    image: isfpImage,
  },
  {
    id: 'infp',
    name: 'INFP (The Mediator)',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    image: infpImage,
  },
  {
    id: 'intp',
    name: 'INTP (The Logician)',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    image: intpImage,
  },
  {
    id: 'estp',
    name: 'ESTP (The Entrepreneur)',
    description: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    image: estpImage,
  },
  {
    id: 'esfp',
    name: 'ESFP (The Entertainer)',
    description: 'Spontaneous, energetic and enthusiastic entertainers – life is never boring around them.',
    image: esfpImage,
  },
  {
    id: 'enfp',
    name: 'ENFP (The Campaigner)',
    description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    image: enfpImage,
  },
  {
    id: 'entp',
    name: 'ENTP (The Debater)',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    image: entpImage,
  },
  {
    id: 'estj',
    name: 'ESTJ (The Executive)',
    description: 'Excellent administrators, unsurpassed at managing things – or people.',
    image: estjImage,
  },
  {
    id: 'esfj',
    name: 'ESFJ (The Consul)',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
    image: esfjImage,
  },
  {
    id: 'enfj',
    name: 'ENFJ (The Protagonist)',
    description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    image: enfjImage,
  },
  {
    id: 'entj',
    name: 'ENTJ (The Commander)',
    description: 'Bold, imaginative and strong-willed leaders, always finding a way – or making one.',
    image: entjImage,
  },
  {
    id: 'custom',
    name: 'Create Your Own',
    description: 'Customize your own personality prompt and interact with the chatbot.',
    image: customImage,
  }
];
