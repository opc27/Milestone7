import React, { useState } from 'react';
import styles from './ModuleCard.module.css';

interface Question {
  moduleId: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

interface ComprehensionCheckProps {
  moduleId: number;
  onCorrectAnswer: () => void;
  onClose: () => void;
  userId: number; // Pass the userId to update currentModule
}

const moduleQuestions: Question[] = [
  {
    moduleId: 0,
    text: "What is the main purpose of this course?",
    options: [
      "To learn about world history",
      "To prepare for temple attendance",
      "To study computer programming",
      "To learn a new language"
    ],
    correctAnswer: 1
  },
  {
    moduleId: 1,
    text: "What is the first step in preparing for temple attendance?",
    options: [
      "Buying formal clothes",
      "Memorizing scriptures",
      "Understanding the purpose of temples",
      "Learning temple ceremonies"
    ],
    correctAnswer: 2
  },
  {
    moduleId: 2,
    text: "What is a temple primarily considered as?",
    options: [
      "A tourist attraction",
      "A community center",
      "A house of learning",
      "A house of the Lord"
    ],
    correctAnswer: 3
  },
  {
    moduleId: 3,
    text: "How does the Plan of Salvation relate to temple work?",
    options: [
      "It doesn't relate at all",
      "Temple ordinances are essential parts of the Plan of Salvation",
      "The Plan of Salvation is only taught outside temples",
      "Temple work replaces the Plan of Salvation"
    ],
    correctAnswer: 1
  },
  {
    moduleId: 4,
    text: "What is a covenant?",
    options: [
      "A type of temple clothing",
      "A sacred agreement between God and a person",
      "A temple building",
      "A prayer offered in temples"
    ],
    correctAnswer: 1
  },
  {
    moduleId: 5,
    text: "What is the purpose of priesthood blessings?",
    options: [
      "To replace medical treatment",
      "To provide comfort, healing, and guidance",
      "To predict the future",
      "To replace personal prayer"
    ],
    correctAnswer: 1
  },
  {
    moduleId: 6,
    text: "What is the initiatory ordinance?",
    options: [
      "A welcoming ceremony for new temple visitors",
      "A preparatory ordinance before the endowment",
      "The final temple ordinance",
      "A monthly temple meeting"
    ],
    correctAnswer: 1
  },
  {
    moduleId: 7,
    text: "What do temple garments represent?",
    options: [
      "Fashion choices",
      "Cultural traditions",
      "Sacred covenants and protection",
      "Temple uniforms"
    ],
    correctAnswer: 2
  },
  {
    moduleId: 8,
    text: "What is the endowment?",
    options: [
      "A financial contribution to the temple",
      "A gift of spiritual knowledge and power",
      "A temple construction ceremony",
      "A leadership position in the temple"
    ],
    correctAnswer: 1
  },
  {
    moduleId: 9,
    text: "What is required for temple worthiness?",
    options: [
      "Perfect obedience to all commandments",
      "Wealth and social status",
      "Living gospel principles and having a recommend",
      "Advanced religious knowledge"
    ],
    correctAnswer: 2
  },
  {
    moduleId: 10,
    text: "What is the main purpose of temple worship?",
    options: [
      "To impress others with our righteousness",
      "To fulfill a religious obligation",
      "To draw closer to God and serve others",
      "To learn secret information"
    ],
    correctAnswer: 2
  }
];

const updateCurrentModule = async (userId: number, newCurrentModule: number) => {
  const response = await fetch(`http://localhost:5000/users/${userId}/updateModule`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currentModule: newCurrentModule }),
  });

  if (response.ok) {
    const updatedUser = await response.json();
    console.log('Updated user:', updatedUser);
  } else {
    console.error('Failed to update module');
  }
};

export const ComprehensionCheck: React.FC<ComprehensionCheckProps> = ({ 
  moduleId, 
  onCorrectAnswer, 
  onClose,
  userId // Receive the userId as a prop
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Find the question for this module
  const question = moduleQuestions.find(q => q.moduleId === moduleId) || moduleQuestions[0];

  const handleOptionSelect = (index: number) => {
    if (!hasSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === null) return;

    setHasSubmitted(true);
    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      // Update the currentModule for the user if they answered correctly
      const newCurrentModule = moduleId + 1; // Move to the next module
      await updateCurrentModule(userId, newCurrentModule); // Call the API to update

      // Wait a moment to show the correct answer before calling the onCorrectAnswer callback
      setTimeout(() => {
        onCorrectAnswer();
      }, 1500);
    }
  };

  return (
    <div className={styles.comprehensionCheckOverlay}>
      <div className={styles.comprehensionCheckModal}>
        <h2>Comprehension Check</h2>
        <p>Please answer the following question to complete this module:</p>

        <div className={styles.question}>
          <h3>{question.text}</h3>
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`${styles.option} ${selectedOption === index ? styles.selected : ''} ${
                  hasSubmitted ? (
                    index === question.correctAnswer ? styles.correct : 
                    selectedOption === index ? styles.incorrect : ''
                  ) : ''
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {hasSubmitted && (
          <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
            {isCorrect 
              ? "Correct! You can now proceed to the next module." 
              : "Incorrect. Please try again."}
          </div>
        )}

        <div className={styles.buttons}>
          {!hasSubmitted && (
            <button 
              className={styles.submitButton} 
              onClick={handleSubmit}
              disabled={selectedOption === null}
            >
              Submit Answer
            </button>
          )}

          {(hasSubmitted && !isCorrect) && (
            <button 
              className={styles.tryAgainButton} 
              onClick={() => {
                setHasSubmitted(false);
                setSelectedOption(null);
              }}
            >
              Try Again
            </button>
          )}

          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import styles from './ModuleCard.module.css';

// interface Question {
//   moduleId: number;
//   text: string;
//   options: string[];
//   correctAnswer: number; // Index of the correct option
// }

// interface ComprehensionCheckProps {
//   moduleId: number;
//   onCorrectAnswer: () => void;
//   onClose: () => void;
// }

// // Sample questions for each module
// const moduleQuestions: Question[] = [
//   {
//     moduleId: 0,
//     text: "What is the main purpose of this course?",
//     options: [
//       "To learn about world history",
//       "To prepare for temple attendance",
//       "To study computer programming",
//       "To learn a new language"
//     ],
//     correctAnswer: 1
//   },
//   {
//     moduleId: 1,
//     text: "What is the first step in preparing for temple attendance?",
//     options: [
//       "Buying formal clothes",
//       "Memorizing scriptures",
//       "Understanding the purpose of temples",
//       "Learning temple ceremonies"
//     ],
//     correctAnswer: 2
//   },
//   {
//     moduleId: 2,
//     text: "What is a temple primarily considered as?",
//     options: [
//       "A tourist attraction",
//       "A community center",
//       "A house of learning",
//       "A house of the Lord"
//     ],
//     correctAnswer: 3
//   },
//   {
//     moduleId: 3,
//     text: "How does the Plan of Salvation relate to temple work?",
//     options: [
//       "It doesn't relate at all",
//       "Temple ordinances are essential parts of the Plan of Salvation",
//       "The Plan of Salvation is only taught outside temples",
//       "Temple work replaces the Plan of Salvation"
//     ],
//     correctAnswer: 1
//   },
//   {
//     moduleId: 4,
//     text: "What is a covenant?",
//     options: [
//       "A type of temple clothing",
//       "A sacred agreement between God and a person",
//       "A temple building",
//       "A prayer offered in temples"
//     ],
//     correctAnswer: 1
//   },
//   {
//     moduleId: 5,
//     text: "What is the purpose of priesthood blessings?",
//     options: [
//       "To replace medical treatment",
//       "To provide comfort, healing, and guidance",
//       "To predict the future",
//       "To replace personal prayer"
//     ],
//     correctAnswer: 1
//   },
//   {
//     moduleId: 6,
//     text: "What is the initiatory ordinance?",
//     options: [
//       "A welcoming ceremony for new temple visitors",
//       "A preparatory ordinance before the endowment",
//       "The final temple ordinance",
//       "A monthly temple meeting"
//     ],
//     correctAnswer: 1
//   },
//   {
//     moduleId: 7,
//     text: "What do temple garments represent?",
//     options: [
//       "Fashion choices",
//       "Cultural traditions",
//       "Sacred covenants and protection",
//       "Temple uniforms"
//     ],
//     correctAnswer: 2
//   },
//   {
//     moduleId: 8,
//     text: "What is the endowment?",
//     options: [
//       "A financial contribution to the temple",
//       "A gift of spiritual knowledge and power",
//       "A temple construction ceremony",
//       "A leadership position in the temple"
//     ],
//     correctAnswer: 1
//   },
//   {
//     moduleId: 9,
//     text: "What is required for temple worthiness?",
//     options: [
//       "Perfect obedience to all commandments",
//       "Wealth and social status",
//       "Living gospel principles and having a recommend",
//       "Advanced religious knowledge"
//     ],
//     correctAnswer: 2
//   },
//   {
//     moduleId: 10,
//     text: "What is the main purpose of temple worship?",
//     options: [
//       "To impress others with our righteousness",
//       "To fulfill a religious obligation",
//       "To draw closer to God and serve others",
//       "To learn secret information"
//     ],
//     correctAnswer: 2
//   }
// ];

// export const ComprehensionCheck: React.FC<ComprehensionCheckProps> = ({ 
//   moduleId, 
//   onCorrectAnswer, 
//   onClose 
// }) => {
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [hasSubmitted, setHasSubmitted] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
  
//   // Find the question for this module
//   const question = moduleQuestions.find(q => q.moduleId === moduleId) || moduleQuestions[0];
  
//   const handleOptionSelect = (index: number) => {
//     if (!hasSubmitted) {
//       setSelectedOption(index);
//     }
//   };
  
//   const handleSubmit = () => {
//     if (selectedOption === null) return;
    
//     setHasSubmitted(true);
//     const correct = selectedOption === question.correctAnswer;
//     setIsCorrect(correct);
    
//     if (correct) {
//       // Wait a moment to show the correct answer before closing
//       setTimeout(() => {
//         onCorrectAnswer();
//       }, 1500);
//     }
//   };
  
//   return (
//     <div className={styles.comprehensionCheckOverlay}>
//       <div className={styles.comprehensionCheckModal}>
//         <h2>Comprehension Check</h2>
//         <p>Please answer the following question to complete this module:</p>
        
//         <div className={styles.question}>
//           <h3>{question.text}</h3>
//           <div className={styles.options}>
//             {question.options.map((option, index) => (
//               <div 
//                 key={index} 
//                 className={`${styles.option} ${selectedOption === index ? styles.selected : ''} ${
//                   hasSubmitted ? (
//                     index === question.correctAnswer ? styles.correct : 
//                     selectedOption === index ? styles.incorrect : ''
//                   ) : ''
//                 }`}
//                 onClick={() => handleOptionSelect(index)}
//               >
//                 {option}
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {hasSubmitted && (
//           <div className={`${styles.feedback} ${isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
//             {isCorrect 
//               ? "Correct! You can now proceed to the next module." 
//               : "Incorrect. Please try again."}
//           </div>
//         )}
        
//         <div className={styles.buttons}>
//           {!hasSubmitted && (
//             <button 
//               className={styles.submitButton} 
//               onClick={handleSubmit}
//               disabled={selectedOption === null}
//             >
//               Submit Answer
//             </button>
//           )}
          
//           {(hasSubmitted && !isCorrect) && (
//             <button 
//               className={styles.tryAgainButton} 
//               onClick={() => {
//                 setHasSubmitted(false);
//                 setSelectedOption(null);
//               }}
//             >
//               Try Again
//             </button>
//           )}
          
//           <button className={styles.closeButton} onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
