interface Option {
  id: string;
  text: string;
}

export const gradeQuestions: {
  [key: number]: Array<{
    id: number;
    category: string;
    question: string;
    options: Option[];
    correctAnswer: string;
  }>;
} = {
  7: [
    {
      id: 1,
      category: "Reading Comprehension - Grade 7 (Chami in Lucena)",
      question: "Which of the following ingredients makes chami tastier?",
      options: [
        { id: "a", text: "chicharon or dried squid" },
        { id: "b", text: "seasoning or sauce" },
        { id: "c", text: "caldo or chicken broth" },
        { id: "d", text: "chili or vinegar" },
      ],
      correctAnswer: "c",
    },
    {
      id: 2,
      category: "Reading Comprehension - Grade 7 (Chami in Lucena)",
      question: "What is one of the highlights of the fiesta celebration?",
      options: [
        { id: "a", text: "Chami festival" },
        { id: "b", text: "Street Dancing" },
        { id: "c", text: "Floral Parade" },
        { id: "d", text: "Niyogniyugan Festival" },
      ],
      correctAnswer: "a",
    },
    // ... continuing with all 20 questions from the provided text
    {
      id: 20,
      category: "Reading Comprehension - Grade 7 (Hermano Puli)",
      question: "Another good title of the selection is__________.",
      options: [
        { id: "a", text: "Hermano Puli's Destiny" },
        { id: "b", text: "Hermano Puli's Journey" },
        { id: "c", text: "Hermano Puli's Life" },
        { id: "d", text: "Hermano Puli's Heroism" },
      ],
      correctAnswer: "d",
    },
  ],
  8: [
    {
      id: 1,
      category: "Reading Comprehension - Grade 8 (Philippine Mythology)",
      question:
        "What is the significance of the Bakunawa in Philippine mythology?",
      options: [
        { id: "a", text: "A creature that causes eclipses by eating the moon" },
        { id: "b", text: "A guardian of the forest" },
        { id: "c", text: "A bringer of good harvest" },
        { id: "d", text: "A protector of fishermen" },
      ],
      correctAnswer: "a",
    },
    // ... similar pattern for 20 questions about Philippine mythology and folklore
  ],
  9: [
    {
      id: 1,
      category: "Reading Comprehension - Grade 9 (Rizal's Works)",
      question: 'What is the main theme of "Noli Me Tangere"?',
      options: [
        { id: "a", text: "The social cancer in Philippine society" },
        { id: "b", text: "The love story of Maria Clara" },
        { id: "c", text: "The revolution against Spain" },
        { id: "d", text: "The education system" },
      ],
      correctAnswer: "a",
    },
    // ... similar pattern for 20 questions about Philippine literature and history
  ],
  10: [
    {
      id: 1,
      category: "Reading Comprehension - Grade 10 (Contemporary Issues)",
      question:
        "What is the main environmental challenge facing the Philippines today?",
      options: [
        { id: "a", text: "Deforestation and loss of biodiversity" },
        { id: "b", text: "Air pollution in urban areas" },
        { id: "c", text: "Plastic pollution in oceans" },
        { id: "d", text: "Climate change impacts" },
      ],
      correctAnswer: "d",
    },
    // ... similar pattern for 20 questions about contemporary issues
  ],
};

// Reading passages for each grade level
export const readingPassages: {
  [grade: number]: { title: string; content: string }[];
} = {
  7: [
    {
      title: "Chami in Lucena",
      content: `If there is one menu that most people in Lucena would like to order, 
      it's probably their favorite "chami". With only P25.00 to P40.00 per order, one can 
      experience tasting the delectable pancit made from flat or round noodles...`,
      // Full passage content
    },
    // Other passages for grade 7
  ],
  8: [
    {
      title: "Philippine Mythology",
      content: "In the rich tapestry of Philippine mythology...",
      // Full passage content
    },
  ],
  9: [
    {
      title: "Rizal's Works",
      content: "Jose Rizal's novels served as the catalyst...",
      // Full passage content
    },
  ],
  10: [
    {
      title: "Contemporary Issues",
      content: "The Philippines faces numerous challenges...",
      // Full passage content
    },
  ],
};
